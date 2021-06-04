import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import './RecommendedCourseCardCarousel.css'
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

// import Swiper core and required modules
import SwiperCore, {
    Pagination, Navigation
} from 'swiper/core';

SwiperCore.use([Pagination, Navigation]);

function RecommendedCourseCardCarousel({ children, slidesPerView, slidesPerGroup }) {
    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={0}
                slidesPerGroup={slidesPerGroup}
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
