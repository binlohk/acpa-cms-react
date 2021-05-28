import React, { useState, useEffect, useContext } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import CourseCard from './CourseCard'
import CourseTitle from './CourseTitle'
import { UserContext } from '../../../../contexts/UserContext'

function AllCourses() {

    const [courses, setCourses] = useState([])
    const [featuredCourses, setFeaturedCourses] = useState([])
    useEffect(() => {
        const fetchUserCourses = async () => {
            console.log('run')
            const response = await httpClient.get(`http://localhost:1337/courses`)
            const data = response.data
            // console.log(response.data)
            setCourses([...data])
            const featured = data.filter(item => item.featured !== false)
            setFeaturedCourses([...featured])
        }
        fetchUserCourses()
    }, [])

    return (
        <>
            <CourseTitle>所有課程</CourseTitle>
            <div class="flex flex-wrap items-start justify-start max-w-full">
                {
                    courses.length > 0 && courses.map((item, ind) => {
                        return (
                            <>
                                <CourseCard
                                    key-={ind}
                                    title={item.title}
                                    price={item.price}
                                    description={item.description}
                                    courseId={item.id}
                                    image={item.image && `http://localhost:1337${item.image.url}`}
                                />

                            </>
                        )
                    })
                }
            </div>
            <CourseTitle>推介課程</CourseTitle>
            <div class="flex items-start justify-start">
                {
                    featuredCourses.map((item, ind) => {
                        return (
                            <>
                                <CourseCard
                                    key-={ind}
                                    title={item.title}
                                    price={item.price}
                                    description={item.description}
                                    courseId={item.id}
                                    image={item.image && `http://localhost:1337${item.image.url}`}
                                />

                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllCourses
