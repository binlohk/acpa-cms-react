import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import LessonCards from '../../../lesson/components/LessonPage/lessonCards';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactMarkdown from 'react-markdown'

import CourseMaterials from '../courseMaterials'
import BuyButton from '../../../utilComponents/BuyButton'
import axios from 'axios';

var currencyFormatter = require('currency-formatter');

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        background: 'transparent',
        padding: theme.spacing(5, 0, 2, 0),
    },
    tab: {
        padding: theme.spacing(1, 0, 1, 0),
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'center',
        gap: theme.spacing(1),
    },
    container: {
        border: '2px solid #D1D5DB',
        borderRadius: theme.spacing(0.5),
    },
    indicator: {
        backgroundColor: 'black'
    },
    selected: {
        background: '#76abde',
        color: '#235789',
        fontWeight: '700',
        border: '#235789'
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Course = (props) => {

    const classes = useStyles();
    const { getUser } = useContext(UserContext);
    const user = getUser();
    const courseId = props.match.params.courseId;

    const [courseData, setCourseData] = useState(null);
    const [value, setValue] = useState(0);

    const fetchCourseData = async (courseId) => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}`)
            setCourseData(result.data);
        } catch (e) {
            props.history.push('/')
            console.log(e)
        }
    };

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
                await fetchCourseData(courseId);
                console.log('checked ok')
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCourseData(courseId);
    }, []);


    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className='relative flex flex-col w-full min-w-0 text-gray-600 bg-gray-100 rounded shadow-lg'>
            <div className='flex flex-col items-center'>
                {courseData &&
                    <>
                        <h1 className="py-12 text-3xl">{courseData.title}</h1>
                        <div className="flex flex-col items-center w-40 p-2 bg-gray-400 rounded">
                            {courseData.purchased ?
                                <>
                                    {
                                        courseData.lessonsDetail.length > 0 ?
                                            <>
                                                <span className='font-bold text-gray-700'>你已擁有此課程</span>
                                                <Link
                                                    to={`/lesson/${courseData.lessonsDetail[0].id}`}
                                                    style={{ background: '#235789' }}
                                                    className="inline-flex items-center justify-center px-3 py-2 my-2 text-xs font-bold text-white border border-transparent shadow-sm whitespace-nowrap rounded-3xl"
                                                >
                                                    開始課程
                                            </Link>
                                            </>
                                            :
                                            <span className='font-bold text-gray-700'>你已擁有此課程</span>

                                    }

                                </>
                                :
                                <>
                                    {/* <span className='font-bold text-gray-700'>你尚未擁有此課程</span> */}
                                    <span className='font-bold text-gray-700'>{(courseData.price == 0) ? '你尚未報讀此課程' : "你尚未擁有此課程"}</span>
                                    {/* <BuyButton courseId={courseId}>購買課程</BuyButton> */}
                                    <BuyButton courseId={courseId}>{(courseData.price == 0) ? "報名" : '購買課程'}</BuyButton>
                                </>}
                        </div>

                        <div className='w-1/2'>
                            <div>
                                <div className={classes.paper}>
                                    <Tabs value={value}
                                        onChange={handleTabChange}
                                        aria-label="simple tabs example"
                                        indicatorColor="primary"
                                        textColor="white"
                                        className={classes.tab}
                                        classes={{
                                            flexContainer: classes.container
                                        }}
                                        TabIndicatorProps={{
                                            style: {
                                                background: '#235789',
                                                height: '3px'
                                            }
                                        }}
                                    >
                                        <Tab classes={{ wrapper: classes.wrapper, selected: classes.selected }} icon={<LibraryBooksIcon />} label="課堂概覽" {...a11yProps(0)} />
                                        <Tab classes={{ wrapper: classes.wrapper, selected: classes.selected }} icon={<PermMediaIcon />} label="課堂材料" {...a11yProps(1)} />
                                    </Tabs>
                                </div>
                                <TabPanel value={value} index={0}>
                                    <div className="py-3 border-b-2 rounded-t">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                                                <h3
                                                    className={
                                                        "font-semibold text-lg"
                                                    }
                                                >
                                                    課程概覽
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-6 pl-4'>
                                        <ReactMarkdown>{courseData.description.replaceAll("\n", "  \n")}</ReactMarkdown>
                                    </div>
                                    <div className="py-3 border-b-2 rounded-t">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                                                <h3
                                                    className={
                                                        "font-semibold text-lg "
                                                    }
                                                >
                                                    課程價錢
                                    </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {courseData.price == 0 ?
                                            <>
                                                <p className='py-6 pl-4'>Free</p>
                                            </>
                                            :
                                            <>
                                                <p className='py-6 pl-4'>{currencyFormatter.format(courseData.price, { code: 'HKD' })}</p>
                                                {/* <p className='py-6 pl-4'>{courseData.price}</p> */}
                                            </>
                                        }
                                    </div>
                                    <LessonCards lessonsDetail={courseData.lessonsDetail} progressHandler={updateLessonProgress} purchased={courseData.purchased} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <CourseMaterials courseMaterials={courseData.courseMaterials} purchased={courseData.purchased} />
                                </TabPanel>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Course
