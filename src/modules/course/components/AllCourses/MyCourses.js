import React, { useState, useEffect, useContext } from 'react'
import { httpClient } from '../../../../services/api/axiosHelper'
import MyCourseCard from './MyCourseCard'
import CourseTitle from './CourseTitle'
import { UserContext } from '../../../../contexts/UserContext'
import Pagination from './Pagination'

function MyCourses() {
    const { getUser } = useContext(UserContext);
    const user = getUser();
    const [purchasedCourses, setPurchasedCourses] = useState([])

    useEffect(() => {
        const fetchUserCourses = async () => {
            const response = await httpClient.get(`${process.env.REACT_APP_BACKEND_SERVER}/courses`)
            const data = response.data
            console.log(response.data)
            const purchased = data.filter(item => item.purchased !== false)
            setPurchasedCourses([...purchased])
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
        const PER_PAGE = 12;
        const offset = currentPage * PER_PAGE;
        const pageData = purchasedCourses.slice(offset, offset + PER_PAGE)
        setCurrentPageData(pageData)
        setPageCount(Math.ceil(purchasedCourses.length / PER_PAGE));
    }, [purchasedCourses, currentPage])

    return (
        <>
            {
                user.id !== null &&
                (
                    <>
                        <CourseTitle>我的課程</CourseTitle>
                        <div class="flex flex-wrap items-start justify-start max-w-full">
                            {currentPageData.map((item, ind) => {
                                return (
                                    <MyCourseCard
                                        key-={ind}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                        courseId={item.id}
                                        image={item.image && `${process.env.REACT_APP_BACKEND_SERVER}${item.image.url}`}
                                    />
                                )
                            })}
                        </div>
                    </>
                )
            }
            <div className='z-0 flex items-center justify-center -space-x-px rounded-md shadow-sm'>
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

export default MyCourses
