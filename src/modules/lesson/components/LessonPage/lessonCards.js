import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import ForwardIcon from '@material-ui/icons/Forward';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import { Parser } from "html-to-react";
import DOMPurify from 'dompurify';
const useStyles = makeStyles(theme => ({
  lessonTextContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  lessonText: {
    display: 'flex',
  },
}));

const LessonCards = ({ purchased, lessonsDetail }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();
  const classes = useStyles();

  console.log(purchased)

  return (
    <>
      <div>
        <div className="py-3 mb-0 border-b-2 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
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
            {lessonsDetail.length === 0 && <p className='mt-6 ml-4 text-xs'>此課程暫時沒有資料</p>}
            {
              lessonsDetail.map((lesson, ind) =>
                <div className='m-4 border-2 border-gray-300 rounded-md' key={ind}>
                  <div className="flex items-center justify-between px-6 py-4 text-xs text-left whitespace-nowrap">
                    <div className='flex flex-grow'>
                      {/* lesson status */}
                      {(user.id && user.id != "") &&
                        <div type='button' className='flex items-center justify-center w-10 h-10 border-2 rounded-full shadow border-blueGray-50'>
                          {lesson.finished && <CheckIcon />}
                        </div>
                      }
                      {/* lesson name */}
                      <div className='flex flex-col flex-grow ml-3 w-96'>
                        <span
                          className="text-lg font-bold">
                          {lesson.title}
                        </span>
                        {/* lesson text */}
                        <div className='overflow-y-auto'>
                          {Parser().parse(DOMPurify.sanitize(lesson.text))}
                        </div>
                      </div>
                    </div>
                    {/* start lesson btn */}
                    { purchased && <Link to={`/lesson/${lesson.id}`}>
                      <button className='inline-flex items-center px-2 py-2 my-2 text-xs text-gray-800 bg-gray-300 rounded hover:bg-gray-400'>
                        <span>
                          前往課程
                      </span>
                      </button>
                    </Link>}
                    
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