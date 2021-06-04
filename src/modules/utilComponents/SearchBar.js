import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ onSearchChange }) {
    return (
        <div className='flex justify-end items-center'>
            <div className="w-full flex flex-wrap">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <SearchIcon />
                </span>
                <input
                    onChange={onSearchChange}
                    type="text"
                    placeholder="搜尋課程"
                    className="px-3 py-3 placeholder-blueGray-300 relative rounded-3xl text-sm border-0 shadow outline-none focus:outline-none focus:ring focus:ring-gray-600 w-full pl-10" />
            </div>
        </div>
    )
}

export default SearchBar
