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
import { trackPromise } from 'react-promise-tracker'
import LoadingSpinner from '../../../utilComponents/LoadingSpinner'
import axios from 'axios'

function AllCourses() {
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
            const filtered = courses.filter((course) => {
                return course.title
                    .toLowerCase()
                    .includes(searchfield.toLowerCase())
            })
            setFilteredCourses([...filtered])
        }
    }, [searchfield])

    useEffect(() => {
        const fetchUserCourses = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_SERVER}/courses`
            )
            const data = response.data
            console.log(response.data)
            setCourses([...data])
            const featured = data.filter((item) => item.featured !== false)
            setFeaturedCourses([...featured])
            console.log(filteredCourses, 'console.log(filteredCourses')
        }
        trackPromise(fetchUserCourses())
    }, [])

    /**pagination */
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPageData, setCurrentPageData] = useState([])

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage)
    }
    useEffect(() => {
        console.log(courses.length, 'courses.length')
        const PER_PAGE = 12
        const offset = currentPage * PER_PAGE
        const pageData = courses.slice(offset, offset + PER_PAGE)
        setCurrentPageData(pageData)
        setPageCount(Math.ceil(courses.length / PER_PAGE))
    }, [courses, currentPage])

    /**pagination for filtered results*/
    const [currentFilteredPage, setCurrentFilteredPage] = useState(0)
    const [pageFilteredCount, setFilteredPageCount] = useState(0)
    const [currentFilteredPageData, setFilteredCurrentPageData] = useState([])
    const handleFilteredPageClick = ({ selected: selectedPage }) => {
        setCurrentFilteredPage(selectedPage)
    }

    useEffect(() => {
        const PER_PAGE = 12
        const offset = currentFilteredPage * PER_PAGE
        const pageData = filteredCourses.slice(offset, offset + PER_PAGE)
        setFilteredCurrentPageData(pageData)
        setFilteredPageCount(Math.ceil(filteredCourses.length / PER_PAGE))
    }, [filteredCourses, currentFilteredPage])

    return (
        <>
            <div>
                <AllCoursesIntro
                    numberOfCourses={filteredCourses && filteredCourses.length}
                    onSearchChange={onSearchChange}
                />
                {currentFilteredPageData.length !== 0 && (
                    <>
                        <CourseTitle>搜尋結果</CourseTitle>
                        <div class="flex flex-wrap px-12">
                            {currentFilteredPageData.length > 0 &&
                                currentFilteredPageData.map((item, ind) => {
                                    return (
                                        <>
                                            <RecommendedCourseCard
                                                key={ind}
                                                title={item.title}
                                                price={item.price}
                                                description={item.description}
                                                courseId={item.id}
                                                image={
                                                    item.image &&
                                                    `${process.env.REACT_APP_BACKEND_SERVER}${item.image.url}`
                                                }
                                                filteredCourseLength={
                                                    filteredCourses.length
                                                }
                                            />
                                        </>
                                    )
                                })}
                        </div>
                        <div className="z-0 flex items-center justify-center rounded-md shadow-sm">
                            <Pagination
                                currentPage={currentFilteredPage}
                                setCurrentPage={setCurrentFilteredPage}
                                pageCount={pageFilteredCount}
                                handlePageClick={handleFilteredPageClick}
                            />
                        </div>
                    </>
                )}
                {currentFilteredPageData.length === 0 && searchfield !== '' && (
                    <h1 className="min-h-screen text-3xl text-center text-white">
                        沒有搜尋結果
                    </h1>
                )}
                {searchfield === '' && (
                    <>
                        <CourseTitle> 推介課程</CourseTitle>
                        <LoadingSpinner />
                        <RecommendedCourseCardCarousel
                            slidesPerView={4}
                            slidesPerGroup={4}
                        >
                            <div class="flex flex-wrap px-12">
                                {featuredCourses.map((item, ind) => {
                                    return (
                                        <>
                                            <SwiperSlide>
                                                <RecommendedCourseCard
                                                    key-={ind}
                                                    index={ind}
                                                    title={item.title}
                                                    price={item.price}
                                                    description={
                                                        item.description
                                                    }
                                                    courseId={item.id}
                                                    image={
                                                        item.image &&
                                                        `${process.env.REACT_APP_BACKEND_SERVER}${item.image.url}`
                                                    }
                                                />
                                            </SwiperSlide>
                                        </>
                                    )
                                })}
                            </div>
                        </RecommendedCourseCardCarousel>
                        <CourseTitle>所有課程</CourseTitle>
                        <div class="flex flex-wrap items-start justify-start max-w-full">
                            {currentPageData.length > 0 &&
                                currentPageData.map((item, ind) => {
                                    return (
                                        <>
                                            <AllCourseCard
                                                key-={ind}
                                                title={item.title}
                                                price={item.price}
                                                courseId={item.id}
                                                image={
                                                    item.image &&
                                                    `${process.env.REACT_APP_BACKEND_SERVER}${item.image.url}`
                                                }
                                                featured={item.featured}
                                            />
                                        </>
                                    )
                                })}
                        </div>
                        <div className="z-0 flex items-center justify-center -space-x-px rounded-md shadow-sm">
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                pageCount={pageCount}
                                handlePageClick={handlePageClick}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default AllCourses
