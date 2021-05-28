import React, { useState, useEffect } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import AllCourseCard from './AllCourseCard'
import CourseTitle from './CourseTitle'
import AllCoursesIntro from './AllCoursesIntro'
import RecommendedCourseCard from './RecommendedCourseCard'
import SearchBar from '../../../utilComponents/SearchBar'

function AllCourses() {
    const indexChecking = (index) => { return index !== 0 && index !== 5 }
    const [courses, setCourses] = useState([])
    const [featuredCourses, setFeaturedCourses] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [filteredCourses, setFilteredCourses] = useState([])

    const onSearchChange = (e) => {
        setSearchfield(e.target.value)
    }

    useEffect(() => {
        if (searchfield === '') {
            setFilteredCourses([])
        } else {
            const filtered = courses.filter(course => {
                return course.title.toLowerCase().includes(searchfield.toLowerCase())
            })
            setFilteredCourses([...filtered])
        }
    }, [searchfield])

    useEffect(() => {
        const fetchUserCourses = async () => {
            const response = await httpClient.get(`http://localhost:1337/courses`)
            const data = response.data
            // console.log(response.data)
            setCourses([...data])
            const featured = data.filter(item => item.featured !== false)
            setFeaturedCourses([...featured])
            // console.log(filteredCourses, 'console.log(filteredCourses')
        }
        fetchUserCourses()
    }, [])

    return (
        <>
            <SearchBar onSearchChange={onSearchChange} />
            <AllCoursesIntro
                numberOfCourses={filteredCourses && filteredCourses.length}
            />

            {
                filteredCourses !== undefined && filteredCourses.length !== 0 ?
                    (
                        <div class="flex flex-wrap items-start justify-start max-w-full">
                            {
                                filteredCourses.map((item, ind) => {
                                    return (
                                        <>
                                            <AllCourseCard
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
                    ) :
                    (
                        <>
                            <CourseTitle>推介課程</CourseTitle>
                            <div class="flex flex-wrap px-9">
                                {
                                    featuredCourses.map((item, ind) => {
                                        return (
                                            <>

                                                <RecommendedCourseCard
                                                    key-={ind}
                                                    index={ind}
                                                    indexChecking={indexChecking}
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
                            <CourseTitle>所有課程</CourseTitle>
                            <div class="flex flex-wrap items-start justify-start max-w-full">
                                {
                                    courses.length > 0 && courses.map((item, ind) => {
                                        return (
                                            <>
                                                <AllCourseCard
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


        </>
    )
}

export default AllCourses
