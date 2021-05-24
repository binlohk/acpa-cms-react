import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LessonCard from '../../../lesson/components/LessonPage/lessonCard'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


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
            <Typography>{children}</Typography>
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

const Course = ( props ) => {
    const courseId = props.match.params.courseId;

    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const fetchCourseData = async (courseId) => {
            try {
                const result = await axios.get(`http://localhost:1337/courses/${courseId}`)
                console.log(result.data)
                setCourseData(result.data);
            } catch (e) {
                console.log(e)
            }
        };
        fetchCourseData(courseId);
    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            {courseData &&
            <>
                <div className="p-2 text-xl">{courseData.title}</div>
                <div className="rounded m-2 p-2 w-40 bg-gray-400 flex flex-col items-center">
                    {courseData.purchased? 
                    <>
                        <span>你已擁有此課程</span>
                        <Link
                        to="/login"
                        className="whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                        開始課程
                        </Link>
                        
                    </>
                    :
                    <>
                        <span>你尚未擁有此課程</span>
                        <Link
                        to="/login"
                        className="whitespace-nowrap inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                        購買課程
                        </Link>
                    </>}
                </div>

                <div className='m-6'>
                    <AppBar position="static" >
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab icon={<LibraryBooksIcon />} label="課堂概覽" {...a11yProps(0)} wrapped/>
                        <Tab icon={<PermMediaIcon/>} label="課堂材料" {...a11yProps(1)} wrapped/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div className="p-2 text-sm">課程概覽</div>
                        <p>{courseData.description}</p>
                        <p>${courseData.price}</p>
                        <div>課程內容</div>
                        {courseData.lessonsDetail.map(lesson=><LessonCard/>)}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                </div>
            </>
            }
        </div>
    )
}

export default Course
