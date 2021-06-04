import React, { useState, useEffect } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import AllCourseCard from './AllCourseCard'
import CourseTitle from './CourseTitle'
import AllCoursesIntro from './AllCoursesIntro'
import RecommendedCourseCard from './RecommendedCourseCard'
import Pagination from './Pagination'
import SearchBar from '../../../utilComponents/SearchBar'
import RecommendedCourseCardCarousel from './RecommendedCourseCardCarousel'
import { Swiper, SwiperSlide } from 'swiper/react'

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

    /**pagination */
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPageData, setCurrentPageData] = useState([])

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }
    useEffect(() => {
        console.log(courses.length, 'courses.length')
        const PER_PAGE = 12;
        const offset = currentPage * PER_PAGE;
        const pageData = courses.slice(offset, offset + PER_PAGE)
        setCurrentPageData(pageData)
        setPageCount(Math.ceil(courses.length / PER_PAGE));
    }, [courses, currentPage])


    return (
        <div>

            <AllCoursesIntro
                numberOfCourses={filteredCourses && filteredCourses.length}
                onSearchChange={onSearchChange}
            />
            {
                filteredCourses !== undefined && filteredCourses.length !== 0 ?
                    (
                        <>
                            <CourseTitle>搜尋結果</CourseTitle>
                            <div class="flex flex-wrap items-start justify-start max-w-full px-4">
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

                        </>
                    ) :
                    (
                        <>
                            <CourseTitle>推介課程</CourseTitle>
                            <div class="flex flex-wrap px-9">
                                <RecommendedCourseCardCarousel>
                                    {
                                        featuredCourses.map((item, ind) => {
                                            return (
                                                <>
                                                    <SwiperSlide>
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
                                                    </SwiperSlide>
                                                </>
                                            )
                                        })
                                    }
                                </RecommendedCourseCardCarousel>
                            </div>
                            <CourseTitle>所有課程</CourseTitle>
                            <div class="flex flex-wrap items-start justify-start max-w-full">
                                {
                                    currentPageData.length > 0 && currentPageData.map((item, ind) => {
                                        return (
                                            <>
                                                <AllCourseCard
                                                    key-={ind}
                                                    title={item.title}
                                                    price={item.price}
                                                    courseId={item.id}
                                                    image={item.image && `http://localhost:1337${item.image.url}`}
                                                    featured={item.featured}
                                                />

                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className='flex justify-center items-center z-0 rounded-md shadow-sm -space-x-px'>
                                <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    pageCount={pageCount}
                                    handlePageClick={handlePageClick}
                                />
                            </div>
                        </>
                    )
            }
            <RecommendedCourseCardCarousel />

        </div>
    )
}

export default AllCourses
