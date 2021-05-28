import React, { useState, useEffect, useContext } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import CourseCard from './CourseCard'
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
        <div style={{ background: 'linear-gradient(0deg, rgba(81,54,84,1) 0%, rgba(2,0,36,1) 43%, rgba(81,54,84,1) 100%)' }}>
            {
                user.id !== null &&
                (
                    <>
                        <CourseTitle>我的課程</CourseTitle>
                        <div class="flex flex-wrap items-start justify-start max-w-full">
                            {purchasedCourses.map((item, ind) => {
                                return (
                                    <CourseCard
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
        </div>
    )
}

export default MyCourses
