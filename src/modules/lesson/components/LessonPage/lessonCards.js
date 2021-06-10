import React, { useContext, useState } from 'react';
import Lesson from './Lesson'
import { UserContext } from '../../../../contexts/UserContext';
import CheckIcon from '@material-ui/icons/Check';
import ForwardIcon from '@material-ui/icons/Forward';
import { Link } from 'react-router-dom';
const LessonCards = ({ lessonsDetail, progressHandler, purchased }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const [button, setButton] = useState({})

  const handleClick = async (event) => {
    // event.target.disabled = true;
    // event.target.disabled = false;
    setButton({ ...button })
    await progressHandler(event.target.value, button);
    console.log(event.target.value, 'event.target.value', event.target.name, 'event.target.name', button, 'button')
  }

  return (
    <>
      {/* {lessonsDetail.map((lesson) =>
        <div key={`lesson-${lesson.id}`}>
          <div>
            {(user.id && user.id != "" && purchased) &&
              <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked={lesson.finished} onChange={handleClick} id={lesson.id} />
              </label>
            }
            {lesson.title}
          </div>
        </div>
      )} */}

      {/*  */}
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
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 border-blueGray-100"
                  }
                >
                  課程名稱
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
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
              {
                lessonsDetail.map((lesson, ind) =>
                  <tr key={ind}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      {/* course input */}
                      {(user.id && user.id != "" && purchased) &&
                        <button type='button' className='w-10 h-10 rounded-full border-2 border-blueGray-50 shadow' onClick={handleClick} value={lesson.id} >
                          {lesson.finished && <CheckIcon />}
                        </button>
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
                        <div>
                          <p className='max-w-xl'>
                            {lesson.text}
                          </p>
                        </div>
                      </div>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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