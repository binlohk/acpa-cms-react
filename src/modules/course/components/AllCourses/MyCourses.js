import React, { useState, useEffect, useContext } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import MyCourseCard from './MyCourseCard'
import CourseTitle from './CourseTitle'
import { UserContext } from '../../../../contexts/UserContext'

function MyCourses() {
    const { getUser } = useContext(UserContext);
    const user = getUser();
    const [purchasedCourses, setPurchasedCourses] = useState([])

    useEffect(() => {
        const fetchUserCourses = async () => {
            const response = await httpClient.get(`http://localhost:1337/courses`)
            const data = response.data
            console.log(response.data)
            const purchased = data.filter(item => item.purchased !== false)
            setPurchasedCourses([...purchased])
        }
        fetchUserCourses()
    }, [])

    return (
        <>
            {
                user.id !== null &&
                (
                    <>
                        <CourseTitle>我的課程</CourseTitle>
                        <div class="flex flex-wrap items-start justify-start max-w-full">
                            {purchasedCourses.map((item, ind) => {
                                return (
                                    <MyCourseCard
                                        key-={ind}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                        courseId={item.id}
                                        image={item.image && `http://localhost:1337${item.image.url}`}
                                    />
                                )
                            })}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default MyCourses
