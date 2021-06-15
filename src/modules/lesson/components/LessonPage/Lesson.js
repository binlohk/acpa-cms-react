import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link, withRouter } from "react-router-dom";
import Video from '../../../utilComponents/video';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import { Drawer, List, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import { Divider } from '@material-ui/core';
import Vimeo from '@u-wave/react-vimeo';
import LessonStepper from './LessonStepper';

const useStyles = makeStyles(theme => ({
    list: {
        background: '#fff',
        color: '#4B5563',
        marginRight: '3rem',
        borderRadius: '0.75rem',
        height: '1200px',
        overflow: 'scroll'
    },
    item: {
        width: '15vw',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem 0 1.5rem 1.5rem',
        background: 'transparent',
    },
    divider: {
        width: '90%',
        margin: '0 5%',
    },
}));

const Lesson = ({ match }) => {
    const { getUser } = useContext(UserContext);
    const user = getUser();

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
                setCourseData(courseResult.data)
            } catch (e) {
                console.log(e)
            }
        }
    };

    useEffect(() => {
        fetchLessonData(lessonId);
    }, []);

    /**grabbing video length */
    // useEffect(() => {

    //     Vimeo.getDuration().then(function (duration) {
    //         // duration = the duration of the video in seconds
    //         console.log(duration, 'duration')
    //     }).catch(function (error) {
    //         // an error occurred
    //         console.log(error)
    //     });
    // }, [lessonData])

    /**events for lessons progress bar */
    const handleClick = async (event) => {
        event.target.disabled = true;
        await updateLessonProgress(event.target.id);
        event.target.disabled = false;
    }

    const updateLessonProgress = async (lessonId) => {
        try {
            if (user.id != "" && user.id != null) {
                const route = `/user-progresses/${lessonId}/${user.id}`;
                const { data: dbIsLessonFinished } = await httpClient.get(route);
                if (!dbIsLessonFinished) {
                    await httpClient.post(route);
                } else {
                    await httpClient.delete(route);
                }
                await fetchLessonData(lessonId);
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**on video end */
    const handleEnd = async () => {
        if (!lessonData.finished) {
            await updateLessonProgress(lessonId);
        }
    }

    return (
        <div className='flex justify-center pb-6 w-full'>
            {lessonData && (
                <>
                    <div className='bg-white mx-6 w-4/5 rounded-xl'>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-col justify-items-stetch items-center w-full bg-black flex justify-center rounded-t-xl'>
                                <h1 className='text-white text-3xl py-12'>{courseData && courseData.title}</h1>
                                <Vimeo
                                    video={lessonData.videoUrl}
                                    playerOptions
                                    autoplay
                                    style={{ display: 'flex', flexBasis: '100%' }}
                                    width='1500'
                                    height='800'
                                    onEnd={handleEnd}
                                />
                            </div>
                            {courseData && courseData.lessonsDetail &&
                                <div className='w-full px-4'>
                                    <LessonStepper
                                        lessonsDetail={courseData.lessonsDetail}
                                        lessonId={lessonId}
                                    />
                                </div>
                            }
                        </div>
                        <div className='pb-9 pl-24'>
                            <h2>簡介</h2>
                            <p className='pr-12 mr-6 max-h-48 overflow-scroll'>{lessonData.lessonDescription}</p>
                        </div>
                    </div>

                </>
            )
            }
            <List
                className={`${classes.list}`}
            >
                {
                    courseData && [...courseData.lessonsDetail, ...courseData.lessonsDetail, ...courseData.lessonsDetail].map((lesson, ind) => {
                        return (
                            <>
                                <ListItem
                                    key={ind}
                                    className={classes.item}
                                >

                                    <ListItemText
                                        primary={
                                            <>
                                                <div className='flex'>
                                                    <div style={{ background: 'rgba(81,54,84,1)' }} className='flex items-center px-4 text-white text-xl rounded-lg font-semibold'>
                                                        {ind + 1}
                                                    </div>
                                                    <div className='flex flex-col pl-4'>
                                                        <span className='text-lg'>
                                                            <Link to={`/lesson/${lesson.id}`}>
                                                                {lesson.title}
                                                            </Link>
                                                        </span>
                                                        <span className='text-gray-400 text-sm'>
                                                            05:00
                                            </span>
                                                    </div>
                                                </div>

                                            </>
                                        }
                                    />
                                    <ListItemIcon>
                                        <Checkbox
                                            color='default'
                                            edge="end"
                                            checked={lesson.finished}
                                            disableRipple
                                            onChange={handleClick}
                                            id={lesson.id}
                                        />
                                    </ListItemIcon>
                                </ListItem>
                                <Divider
                                    classes={{
                                        root: classes.divider
                                    }}
                                />
                            </>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default withRouter(Lesson);
