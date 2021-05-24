import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LessonCard from '../../../lesson/components/LessonPage/lessonCard'
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
                <p>{courseData.title}</p>
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
