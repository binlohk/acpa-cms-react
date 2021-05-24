import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LessonCard from '../../../lesson/components/LessonPage/lessonCard'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            {courseData &&
            <>
                <div class="p-2 text-xl">{courseData.title}</div>
                <div class="rounded m-2 p-2 w-40 bg-gray-400 flex flex-col items-center">
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
                <div class="p-2 text-sm">課程概覽</div>
                <p>{courseData.description}</p>
                <p>${courseData.price}</p>
                <div>課程內容</div>
                {courseData.lessonsDetail.map(lesson=><LessonCard/>)}
            </>
            }
        </div>
    )
}

export default Course
