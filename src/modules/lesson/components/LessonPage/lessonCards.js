import React, { useState } from 'react';

const LessonCards = ({ lessonsDetail }) => {

  const initialState = lessonsDetail.map(lesson => lesson.finished);
  const [progresses, setProgresses] = useState(initialState);

  const handleClick = (event) => {
    let newState = [...progresses];
    newState = newState.map((progress, key) => {
      if (key == event.target.id) {
        return event.target.checked;
      }
      return progress
    });
    setProgresses(newState);
  }

  return (
    <>
      {lessonsDetail.map((lesson, id) =>
        <div key={`lesson-${id}`}>
          <div>{lesson.title}</div>
          <label className="inline-flex items-center mt-3">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked={progresses[id]} onChange={handleClick} id={id} />
          </label>
        </div>
      )}
    </>
  )
}

export default LessonCards;