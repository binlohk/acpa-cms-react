import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import Logo from '../../../../assets/images/KL-logo.png'

const LessonCards = ({ lessonsDetail }) => {

  const initialState = lessonsDetail.map(lesson=>lesson.finished);
  const [progresses, setProgresses] = useState([false,false]);

  const handleClick = (event) => {
    event.preventDefault();
    let newState = [...progresses];
    newState = newState.map((progress,key)=>{
      if(key==event.target.name){
        return event.target.checked;
      }
      return progress
    });
    setProgresses(newState);
  }

  return (
    <>
      <div>
        0: {progresses[0]?'true':'false'}
      </div>
      <div>
        1: {progresses[1]?'true':'false'}
      </div>
      <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked={progresses[0]} onChange={handleClick} name={0}/>
      <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked={progresses[1]} onChange={handleClick} name={1}/>
    {lessonsDetail.map((lesson, id)=>
      <div key={`lesson-${id}`}>
          <div>{lesson.title}</div>
          
          {/* <label className="inline-flex items-center mt-3">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" checked={progresses[id]} onChange={handleClick} name={id}/>
          </label> */}
      </div>
    )}
    </>
  )
}

export default LessonCards;