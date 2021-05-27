import React, { useState, useContext } from 'react';
import { UserContext } from '../../../../contexts/UserContext';

const LessonCards = ({ lessonsDetail, progressHandler, purchased }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const handleClick = async (event) => {
    event.target.disabled = true;
    await progressHandler(event.target.id, event.target.checked);
    event.target.disabled = false;
  }

  return (
    <>
      {lessonsDetail.map((lesson) =>
        <div key={`lesson-${lesson.id}`}>
          <div>
            {(user.id && user.id!="" && purchased) &&
            <label className="inline-flex items-center mt-3">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked={lesson.finished} onChange={handleClick} id={lesson.id} />
            </label>
            }
            {lesson.title}
          </div>
        </div>
      )}
    </>
  )
}

export default LessonCards;