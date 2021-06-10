import React, { useState, useEffect, useContext } from 'react';
import Video from '../../../utilComponents/video';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Vimeo from '@u-wave/react-vimeo';

const useStyles = makeStyles(theme => ({
    list: {
        background: '#fff',
        color: '#4B5563',
        position: 'fixed',
        height: '100%',
        top: '10%',
        right: '0',
    },
    item: {
        background: '#4B5563',
        width: '20vw',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        borderBottomWidth: '2px',
        background: 'transparent'
    },
}));

const Lesson = ({ match }) => {
    const { getUser } = useContext(UserContext);
    const user = getUser();

    const [lessonData, setLessonData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [video, setVideo] = useState(null)

    const { lessonId } = match.params
    const classes = useStyles()

    const fetchLessonData = async (lessonId) => {
        if (user && user.id !== "" && user.id !== null) {
            try {
                const result = await httpClient.get(`http://localhost:1337/lessons/${lessonId}`)
                setLessonData(result.data);
                const courseResult = await httpClient.get(`http://localhost:1337/courses/${result.data.course.id}`)
                setCourseData(courseResult.data)
                setVideo(lessonData.videoUrl.substring(31, result.data.videoUrl.length.toString()))
                console.log(result.data.videoUrl.substring(31, result.data.videoUrl.length).toString(), 'lessonData..length')
                // console.log(courseResult.data);
            } catch (e) {
                // history.push(`/user/${user.id}`)
                console.log(e)
            }
        }
    };

    useEffect(() => {
        fetchLessonData(lessonId);
    }, []);

    /**events for lessons progress bar */
    const handleClick = async (event) => {
        // event.target.disabled = true;
        await updateLessonProgress(event.target.id);
        // event.target.disabled = false;
        console.log(event.target.id, 'event.target.id')
    }

    const updateLessonProgress = async (lessonId) => {
        try {
            if (user.id != "" && user.id != null) {
                const route = `/user-progresses/${lessonId}/${user.id}`;

                console.log(courseData, 'courseData')
                if (!lessonData.finished) {
                    await httpClient.post(route);
                } else {
                    await httpClient.delete(route);
                }
                await fetchCourseData(courseData.id);
                console.log(courseData, 'courseData')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchCourseData = async (courseId) => {
        try {
            const result = await httpClient.get(`http://localhost:1337/courses/${courseId}`)
            setCourseData(result.data);
            console.log(result.data, '333')
        } catch (e) {
            console.log(e)
        }
    };

    /**on video end */
    const handleEnd = async () => {
        await updateLessonProgressByFinishVideo();
    }

    const updateLessonProgressByFinishVideo = async () => {
        try {
            if (!lessonData.finished) {
                const route = `user-progresses/${lessonId}/${user.id}`;
                await httpClient.post(route);
            }
            const result = await httpClient.get(`http://localhost:1337/lessons/${lessonId}`);
            setLessonData(result.data);
            const courseResult = await httpClient.get(`http://localhost:1337/courses/${result.data.course.id}`);
            setCourseData(courseResult.data);
            console.log(courseResult.data, 'courseResult.data')
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className='m-6 text-gray-300 '>
            {lessonData && (
                <>
                    <div className='flex flex-col justify-start'>
                        <Vimeo
                            video={lessonData.videoUrl}
                            autoplay
                            width='1500'
                            height='600'
                            onEnd={handleEnd}
                        />
                        <div className='pt-12'>
                            <h1 className='text-3xl'>課程內容</h1>
                            <p>{lessonData.lessonDescription}</p>
                        </div>
                        <div>

                        </div>
                    </div>

                </>
            )
            }

            <List
                className={classes.list}
            >
                {
                    <div className='flex justify-center border-b-2'>
                        <h1 className='p-2 w-48'>{courseData && courseData.title}</h1>
                    </div>
                }
                {
                    courseData && courseData.lessonsDetail.map((lesson, ind) => {
                        return (
                            <>
                                <ListItem
                                    key={ind}
                                    style={{ background: '#eee' }}
                                    className={classes.item}
                                >

                                    <ListItemText
                                        primary={
                                            <span>
                                                {lesson.title}
                                            </span>
                                        }
                                    />
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="end"
                                            checked={lesson.finished}
                                            disableRipple
                                            onChange={handleClick}
                                            id={lesson.id}
                                        />
                                    </ListItemIcon>
                                </ListItem>
                            </>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default Lesson
