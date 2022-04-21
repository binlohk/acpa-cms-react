import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import './RecommendedCourseCardCarousel.css'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper/core'

SwiperCore.use([Pagination, Navigation])

function RecommendedCourseCardCarousel({
    children,
    slidesPerView,
    slidesPerGroup,
    spacebetween
}) {
    return (
        <>
            <Swiper
 slidesPerView={1}
 spaceBetween={10}
 pagination={{
   clickable: true,
 }}
 breakpoints={{
   "@0.00": {
     slidesPerView: 1,
     spaceBetween: 10,
   },
   "@0.75": {
     slidesPerView: 2,
     spaceBetween: 20,
   },
   "@1.00": {
     slidesPerView: 3,
     spaceBetween: 40,
   },
   "@1.50": {
     slidesPerView: 4,
     spaceBetween: 50,
   },
 }}

            modules={[Pagination]}
                loop={true}
                loopFillGroupWithBlank={true}
                navigation={true}
            >
                {children}
            </Swiper>
        </>
    )
}

export default RecommendedCourseCardCarousel


