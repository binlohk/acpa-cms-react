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
    console.log(purchasedCourses.map(item => item.description), 'purchasedCourses')
    useEffect(() => {
        const fetchUserCourses = async () => {
            const response = await httpClient.get(`http://localhost:1337/courses`)
            const data = response.data
            // console.log(response.data)
            for (let item of data) {
                setCourses([...courses, item])
            }
            const featured = data.filter(item => item.featured !== false)
            // console.log(featured)
            // console.log(response.data)
            for (let item of featured) {
                setFeaturedCourses([...featuredCourses, item])
            }
            const purchased = data.filter(item => item.purchased !== false)
            for (let item of purchased) {
                setPurchasedCourses([...purchasedCourses, item])
            }
            // console.log(purchased)
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
                        <div class="flex flexx-wrap items-center justify-start max-w-full">
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
            <div class="flex items-center justify-start">
                {
                    courses.map((item, ind) => {
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
