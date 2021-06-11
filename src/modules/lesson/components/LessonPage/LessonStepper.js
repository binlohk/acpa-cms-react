import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
}));

const LessonStepper = ({lessonsDetail, lessonId }) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const activeStep = lessonsDetail.findIndex((lesson)=>{return lesson.id == lessonId});
  console.log(activeStep)
  const maxSteps = lessonsDetail.length;

  const handleNext = () => {
    const oneIndexedStep = activeStep + 1;
    history.push(`/lesson/${oneIndexedStep + 1}`);
  };

  const handleBack = () => {
    const oneIndexedStep = activeStep + 1;
    history.push(`/lesson/${oneIndexedStep - 1}`);
  };

  return (
    <div className={classes.root}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default LessonStepper;