import React from 'react'
import SearchBar from '../../../utilComponents/SearchBar'

function AllCoursesIntro({ numberOfCourses, onSearchChange }) {
    return (
        <div className="flex justify-center items-start py-48 mx-4 md:mx-2">
            <div className="focus:animate-moveSideways">
                <div className="text-white text-4xl pb-4">
                    我們致力提供優質的金融課程
                </div>
                <SearchBar onSearchChange={onSearchChange} />
            </div>
            <span>
                {numberOfCourses > 0 && (
                    <div className="flex flex-col justify-between items-center pl-4">
                        <div className="text-white text-xl  pb-2">課程數目</div>
                        <div
                            style={{ borderColor: '#A5924B' }}
                            className="text-gray-200 text-4xl font-bold border-4 rounded-full h-24 w-24 xs:h-10 xs:w-10 flex items-center justify-center"
                        >
                            {numberOfCourses}
                        </div>
                    </div>
                )}
            </span>
        </div>
    )
}

export default AllCoursesIntro
