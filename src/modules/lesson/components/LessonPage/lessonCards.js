import React, { useState } from 'react';

const LessonCards = ({ lessonsDetail, progressHandler }) => {
  const [lessons, setLessons] = useState(lessonsDetail);

  const handleClick = async (event) => {

    await progressHandler(event.target.id, event.target.checked);
    const newState = lessons.map((lesson) => {
      if (lesson.id == event.target.id) {
        lesson.finished = event.target.checked;
      }
      return lesson
    });
    setLessons(newState);
  }

  return (
    <>
      {lessonsDetail.map((lesson, keyId) =>
        <div key={`lesson-${lesson.id}`}>
          <div>{lesson.title}</div>
          <label className="inline-flex items-center mt-3">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked={lessons[keyId].finished} onChange={handleClick} id={lesson.id} />
          </label>
        </div>
      )}
    </>
  )
}

export default LessonCards;