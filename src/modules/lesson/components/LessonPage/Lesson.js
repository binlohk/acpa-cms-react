import React, { useState, useEffect, useContext } from 'react';
import Video from '../../../utilComponents/video';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import { Drawer, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import useSidebar from '../../../../hooks/useSidebar';
import Vimeo from '@u-wave/react-vimeo';

const useStyles = makeStyles(theme => ({
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

    const { setOpen } = useSidebar()

    const [lessonData, setLessonData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const { lessonId } = match.params
    const classes = useStyles()

    const fetchLessonData = async (lessonId) => {
        if (user && user.id !== "" && user.id !== null) {
            try {
                const result = await httpClient.get(`http://localhost:1337/lessons/${lessonId}`)
                setLessonData(result.data);
                const courseResult = await httpClient.get(`http://localhost:1337/courses/${result.data.course.id}`)
                setCourseData(courseResult.data.lessonsDetail)
                setOpen(true)
                console.log(courseResult.data.lessonsDetail);
            } catch (e) {
                history.push(`/user/${user.id}`)
                console.log(e)
            }
        }
    };

    const updateLessonProgress = async () => {
        try {
            if (!lessonData.finished) {
                const route = `user-progresses/${lessonId}/${user.id}`;
                await httpClient.post(route);
                const result = await httpClient.get(`http://localhost:1337/lessons/${lessonId}`);
                setLessonData(result.data);
                const courseResult = await httpClient.get(`http://localhost:1337/courses/${result.data.course.id}`);
                setCourseData(courseResult.data.lessonsDetail);
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        fetchLessonData(lessonId);
    }, []);

    const handleEnd = async () => {
        await updateLessonProgress();
    }

    return (
        <div className='m-6 text-gray-300 '>
            {lessonData && (
                <>
                    <div className='flex justify-center'>
                        {/* <Video
                            videoUrl={lessonData.videoUrl} width='1000' height='600' /> */}
                            <Vimeo 
                            video="517298823"
                            autoplay
                            width='1000' 
                            height='600'
                            onEnd={handleEnd}
                            />
                    </div>
                    <h1 className='text-3xl'>課程內容</h1>
                    <div>{lessonData.lessonDescription}</div>

                </>
            )
            }

            <Drawer
                variant="permanent"
                anchor="right"
            >
                {
                    courseData && courseData.title
                }
                {
                    courseData && courseData.map((course, ind) => {
                        return (
                            <>
                                <ListItem
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
                                        {course.finished && <CheckIcon />}
                                    </ListItemIcon>
                                </ListItem>
                            </>
                        )

                    })
                }
            </Drawer>

        </div>
    )
}

export default Lesson
