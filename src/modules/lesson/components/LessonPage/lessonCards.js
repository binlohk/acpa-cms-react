import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import ForwardIcon from '@material-ui/icons/Forward';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import { Button } from '@material-ui/core';


const LessonCards = ({ lessonsDetail, progressHandler, purchased }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  return (
    <>
      <div>
        <div className="rounded-t mb-0 py-3 border-b-2">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg "
                }
              >
                {'課堂內容(✓為已經完成之課程)'}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div>
            {lessonsDetail.length === 0 && <p className='ml-4 mt-6 text-xs'>此課程暫時沒有資料</p>}
            {
              lessonsDetail.map((lesson, ind) =>
                <div className='border-gray-300 border-2 rounded-md m-4' key={ind}>
                  <div className="px-6 py-4 text-xs whitespace-nowrap text-left flex items-center justify-between">
                    <div className='flex'>
                      {/* lesson status */}
                      {(user.id && user.id != "") &&
                        <div type='button' className='w-10 h-10 rounded-full border-2 border-blueGray-50 shadow flex justify-center items-center'>
                          {lesson.finished && <CheckIcon />}
                        </div>
                      }
                      {/* lesson name */}
                      <div className='flex flex-col ml-3 w-24'>
                        <span
                          className="font-bold text-lg">
                          {lesson.title}
                        </span>
                        {/* lesson text */}
                        <div className='overflow-visible'>
                          {lesson.text}
                        </div>
                      </div>
                    </div>
                    {/* start lesson btn */}
                    <Link to={`/lesson/${lesson.id}`}>
                      <button className='my-2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs py-2 px-2 rounded inline-flex items-center'>
                        <span>
                          前往課程
                      </span>
                      </button>
                    </Link>
                  </div>

                </div>
              )
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default LessonCards;