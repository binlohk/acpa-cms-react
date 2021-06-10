import React, { useContext, useState } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import ForwardIcon from '@material-ui/icons/Forward';
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';


const LessonCards = ({ lessonsDetail, progressHandler, purchased }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  // const handleClick = async (event) => {
  //   event.target.disabled = true;
  //   await progressHandler(event.target.id, event.target.checked);
  //   event.target.disabled = false;
  // }

  return (
    <>
      <div>
        <div className="rounded-t mb-0 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg "
                }
              >
                課堂內容
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* start of table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "pl-4 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 border-blueGray-100"
                  }
                >
                  <span>課程進度</span>
                  <span className='pl-4'>課程名稱</span>
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 border-blueGray-100"
                  }
                >
                </th>
                {
                  [1, 2, 3].map((_, ind) => {
                    return (
                      <>
                        <th
                          key={ind}
                          className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                          }
                        >
                        </th>
                      </>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {lessonsDetail.length === 0 && <p className='ml-4 mt-6 text-xs'>此課程暫時沒有資料</p>}
              {
                lessonsDetail.map((lesson, ind) =>
                  <tr key={ind}>
                    <th className="border-t-0 px-6 py-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left flex items-center">
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left flex items-center">
                      {/* course status */}
                      {(user.id && user.id != "") &&
                        <div type='button' className='w-10 h-10 rounded-full border-2 border-blueGray-50 shadow flex justify-center items-center'>
                          {lesson.finished && <CheckIcon />}
                        </div>
                      }
                      {/* course name */}
                      <div className='flex flex-col ml-3 max-w-6xl'>
                        <span
                          className={
                            "font-bold text-lg"
                          }
                        >
                          {lesson.title}
                        </span>
                        <div className='w-12 max-w-full'>
                          <p className='w-12 max-w-full'>
                            {lesson.text}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <Link to={`/lesson/${lesson.id}`}>
                        <ForwardIcon />
                      </Link>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default LessonCards;