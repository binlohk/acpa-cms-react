import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link, withRouter } from "react-router-dom";
import Video from '../../../utilComponents/video';
import { httpClient } from '../../../../services/api/axiosHelper';
import axios from 'axios';
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
    itemRed: {
        width: '15vw',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem 0 1.5rem 1.5rem',
        color: 'white',
        background: '#A5924B',
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
                console.log(result.data, 'huiiiii')
            } catch (e) {
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
        await updateLessonProgress(event.target.id);
        event.target.disabled = false;
    }

    const updateLessonProgress = async (lessonId) => {
        try {
            if (user.id != "" && user.id != null) {
                const route = `/user-progresses/${lessonId}/${user.id}`;
                const { data: dbIsLessonFinished } = await httpClient.get(route);
                console.log(dbIsLessonFinished, 'dataaaa')
                if (!dbIsLessonFinished) {
                    console.log('post progress')
                    await httpClient.post(route);
                } else {
                    console.log('del progress')
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
        <div className='flex justify-center w-full pb-6'>
            {lessonData && (
                <>
                    <div className='w-4/5 mx-6 bg-white rounded-xl'>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-col items-center justify-center w-full bg-black justify-items-stetch rounded-t-xl'>
                                <h1 className='py-12 text-3xl text-white'>{courseData && courseData.title}</h1>
                                {
                                    lessonData.videoUrl !== '' ? (
                                        <Vimeo
                                            video={lessonData.videoUrl}
                                            playerOptions
                                            autoplay
                                            style={{ display: 'flex', flexBasis: '100%' }}
                                            width='1500'
                                            height='800'
                                            onEnd={handleEnd}
                                        />
                                    ) : (
                                        <div>
                                            <h1 className="mb-10 text-3xl font-black text-yellow-500 lg:text-5xl">暫無影片資料</h1>
                                        </div>
                                    )
                                }
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
                        <div className='pl-24 pb-9'>
                            <h2>簡介</h2>
                            <p className='pr-12 mr-6 overflow-scroll max-h-48'>{lessonData.lessonDescription}</p>
                        </div>
                    </div>

                </>
            )
            }
            <List
                className={`${classes.list}`}
            >
                {
                    courseData && courseData.lessonsDetail.map((lesson, ind) => {
                        return (
                            <>
                                <ListItem
                                    key={ind}
                                    className={lessonId == lesson.id ? classes.itemRed : classes.item}
                                >

                                    <ListItemText
                                        className={lessonId == lesson.id ? classes.listActive : null}
                                        primary={
                                            <>
                                                <div className='flex'>
                                                    <div style={{ background: 'rgba(81,54,84,1)' }} className='flex items-center px-4 text-xl font-semibold text-white rounded-lg'>
                                                        {ind + 1}
                                                    </div>
                                                    <div className='flex flex-col pl-4'>
                                                        <span className={`text-lg`}>
                                                            <Link to={`/lesson/${lesson.id}`}>
                                                                {lesson.title}
                                                            </Link>
                                                        </span>
                                                        <span
                                                            className={lessonId == lesson.id ? 'text-sm text-white' : 'text-sm text-gray-400'}
                                                        >
                                                            {lesson.videoDuration}
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
