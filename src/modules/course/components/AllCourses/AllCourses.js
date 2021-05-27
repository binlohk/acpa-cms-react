import React, { useState, useEffect, useContext } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import CourseCard from './CourseCard'
import { UserContext } from '../../../../contexts/UserContext'

function AllCourses() {
    const { getUser } = useContext(UserContext);
    const user = getUser();
    const [courses, setCourses] = useState([])
    const [purchasedCourses, setPurchasedCourses] = useState([])
    const [featuredCourses, setFeaturedCourses] = useState([])
    useEffect(() => {
        const fetchUserCourses = async () => {
            const response = await httpClient.get(`http://localhost:1337/courses`)
            const data = response.data
            // console.log(response.data)
            setCourses([...data])
            const featured = data.filter(item => item.featured !== false)
            setFeaturedCourses([...featured])
            const purchased = data.filter(item => item.purchased !== false)
            setPurchasedCourses([...purchased])
        }
        fetchUserCourses()
    }, [])

    return (
        <div>
            {
                user.id !== null &&
                (
                    <>
                        <div>My courses</div>
                        <div class="flex flex-wrap items-center justify-start max-w-full">
                            {purchasedCourses.map((item, ind) => {
                                return (
                                    <CourseCard
                                        key-={ind}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                        courseId={item.id}
                                    />
                                )
                            })}
                        </div>
                    </>
                )
            }
            <div>All courses</div>
            <div class="flex flex-wrap items-center justify-start max-w-full">
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
                                />

                            </>
                        )
                    })
                }
            </div>
            <div>Featured courses</div>
            <div class="flex items-center justify-start">
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
                                />

                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllCourses
