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

import CourseMaterials from '../courseMaterials'
import BuyButton from '../../../utilComponents/BuyButton'

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
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
            const result = await httpClient.get(`http://localhost:1337/courses/${courseId}`)
            setCourseData(result.data);
        } catch (e) {
            props.history.push('/courses')
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
        <div className='flex flex-col items-center text-white'>
            {courseData &&
                <>
                    <h1 className="py-12 text-5xl text-gray-200">{courseData.title}</h1>
                    <img src={`http://localhost:1337${courseData.image.url}`}></img>
                    <div className="rounded m-6 p-2 w-40 bg-gray-400 flex flex-col items-center">
                        {courseData.purchased ?
                            <>
                                <span className='text-gray-700 font-bold'>你已擁有此課程</span>
                                <Link
                                    to="/login"
                                    style={{ background: '#235789' }}
                                    className="whitespace-nowrap inline-flex items-center justify-center my-2 px-3 py-2 border border-transparent rounded-3xl shadow-sm text-xs font-bold text-white"
                                >
                                    開始課程
                        </Link>

                            </>
                            :
                            <>
                                <span className='text-gray-700 font-bold'>你尚未擁有此課程</span>
                                <BuyButton courseId={courseId}>購買課程</BuyButton>
                            </>}
                    </div>

                    <div className='w-1/2'>
                        <Paper elevation={3} className={classes.paper}>
                            <Tabs value={value}
                                onChange={handleTabChange}
                                aria-label="simple tabs example"
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab icon={<LibraryBooksIcon />} label="課堂概覽" {...a11yProps(0)} />
                                <Tab icon={<PermMediaIcon />} label="課堂材料" {...a11yProps(1)} />
                            </Tabs>
                        </Paper>
                        <TabPanel value={value} index={0}>
                            <div className="text-2xl mt-12 border-b-4 ">課程概覽</div>
                            <p className='py-6'>{courseData.description}</p>
                            <div className="text-2xl  mt-12 border-b-4">課程價錢</div>
                            <p className='py-6'>${courseData.price}</p>
                            <div className="text-2xl  mt-12 border-b-4">課程內容</div>
                            <LessonCards lessonsDetail={courseData.lessonsDetail} progressHandler={updateLessonProgress} purchased={courseData.purchased} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <CourseMaterials courseMaterials={courseData.courseMaterials} purchased={courseData.purchased} />
                        </TabPanel>
                    </div>
                </>
            }
        </div>
    )
}

export default Course
