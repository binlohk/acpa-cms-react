import React, { useState, useEffect, useContext } from 'react';
import Video from '../../../utilComponents/video';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import useSidebar from '../../../../hooks/useSidebar';

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
        width: '20vw',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        borderBottomWidth: '2px',
        background: 'transparent'
    },
}));

const Lesson = ({ history, match }) => {
    const { getUser } = useContext(UserContext);
    const user = getUser();

    const [lessonData, setLessonData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [button, setButton] = useState(null);

    const { lessonId } = match.params
    const classes = useStyles()

    const fetchLessonData = async (lessonId) => {
        if (user && user.id !== "" && user.id !== null) {
            try {
                const result = await httpClient.get(`http://localhost:1337/lessons/${lessonId}`)
                setLessonData(result.data);
                const courseResult = await httpClient.get(`http://localhost:1337/courses/${result.data.course.id}`)
                setCourseData(courseResult.data.lessonsDetail)
                console.log(courseResult.data.lessonsDetail);
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
        event.target.disabled = true;
        setButton(!button)
        await updateLessonProgress(event.target.id, button);
        event.target.disabled = false;
        console.log(event.target, 'event.target.id')
    }

    const updateLessonProgress = async (lessonId, isFinished) => {
        let result;
        try {
            if (user.id != "" && user.id != null) {
                const route = `user-progresses/${lessonId}/${user.id}`;
                if (isFinished) {
                    result = await httpClient.post(route);
                } else {
                    result = await httpClient.delete(route);
                }
                await fetchCourseData(courseData.id);
                console.log(courseData.id, 'courseData.id')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchCourseData = async (courseId) => {
        try {
            const result = await httpClient.get(`http://localhost:1337/courses/${courseId}`)
            setCourseData(result.data);
        } catch (e) {
            console.log(e)
        }
    };


    return (
        <div className='m-6 text-gray-300 '>
            {lessonData && (
                <>
                    <div className='flex justify-center'>
                        <Video
                            videoUrl={lessonData.videoUrl} width='1000' height='600' />
                    </div>
                    <h1 className='text-3xl'>課程內容</h1>
                    <div>{lessonData.lessonDescription}</div>

                </>
            )
            }

            <List
                className={classes.list}
            >
                {
                    courseData && courseData.title
                }
                {
                    courseData && courseData.map((course, ind) => {
                        return (
                            <>
                                <ListItem
                                    key={ind}
                                    className={classes.item}
                                >

                                    <ListItemText
                                        primary={
                                            <span>
                                                {course.title}
                                            </span>
                                        }
                                    />
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="end"
                                            checked={`${course.finished}`}
                                            // checked='true'
                                            disableRipple
                                            onChange={handleClick}
                                            id={course.id}
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
