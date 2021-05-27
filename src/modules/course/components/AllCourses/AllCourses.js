import React, { useEffect } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import CourseCard from './CourseCard'

function AllCourses() {
    useEffect(() => {
        const fetchUserCourses = async () => {
            // const response = await 
        }
        fetchUserCourses()
    }, [])

    return (
        <div>
            <CourseCard />
        </div>
    )
}

export default AllCourses
