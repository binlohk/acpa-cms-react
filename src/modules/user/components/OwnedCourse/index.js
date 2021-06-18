import React from 'react'
import SchoolIcon from '@material-ui/icons/School';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    schoolIcon: {
        width: theme.spacing(5),
        height: 'auto',
        margin: theme.spacing(0, 2, 0, 0),
        color: '#A5924B'
    },
    dateIcon: {
        width: theme.spacing(2),
        height: 'auto',
        margin: theme.spacing(0, 1, 0, 1),
    }
}));

export default function OwnedCourse({ purchasedCourses }) {
    const classes = useStyles();
    return (
        <>
            {
                purchasedCourses ?
                    <div>
                        <div className='text-white font-semibold'>你擁有的課程 </div>
                        {
                            purchasedCourses.map((course, index) =>
                                <>
                                    <div className='flex items-center justify-start bg-white rounded-lg my-4 p-4 pr-6 w-156' key={`courseName-${index}`}>
                                        <SchoolIcon className={classes.schoolIcon} />
                                        <div>
                                            <div className='text-black font-semibold py-2'><Link to={`/course/${course.id}`}>課程名稱: {course.title}</Link></div>
                                            <div className='flex items-center justify-start'><DateRangeIcon className={classes.dateIcon} />購買日期: {course.published_at.substring(0, 10)}</div>
                                        </div>
                                    </div>

                                </>
                            )
                        }
                    </div>
                    :
                    <div>你尚未購買任何課程</div>
            }
        </>
    )
}
