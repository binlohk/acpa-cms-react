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
                // 你尚未購買任何課程
                (purchasedCourses && Object.keys(purchasedCourses).length !== 0) ?
                    // <div>你尚未購買任何課程123
                    //         <div className='flex items-center justify-start p-4 pr-6 my-4 bg-white rounded-lg w-156'>
                    //         <SchoolIcon className={classes.schoolIcon} />
                    //         <div>
                    //             <div className='py-2 font-semibold text-black'><Link >課程名稱: </Link></div>
                    //             <div className='flex items-center justify-start -ml-2'><DateRangeIcon className={classes.dateIcon} />購買日期: </div>
                    //         </div>
                    //     </div>
                    // </div>
                    <div>
                        <div className='font-semibold text-white'>你擁有的課程 </div>
                        {
                            purchasedCourses.map((course, index) =>
                                <>
                                    <div className='flex items-center justify-start p-4 pr-6 my-4 bg-white rounded-lg w-156' key={`courseName-${index}`}>
                                        <SchoolIcon className={classes.schoolIcon} />
                                        <div>
                                            <div className='py-2 font-semibold text-black'><Link to={`/course/${course.id}`}>課程名稱: {course.title}</Link></div>
                                            <div className='flex items-center justify-start -ml-2'><DateRangeIcon className={classes.dateIcon} />購買日期: {course.published_at.substring(0, 10)}</div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    :
                    <div>
                        <div className='font-semibold text-white'>你擁有的課程 </div>
                        <div className='flex items-center justify-start p-4 pr-6 my-4 bg-white rounded-lg w-156'>
                            <SchoolIcon className={classes.schoolIcon} />
                            <div>
                                <div className='py-2 font-semibold text-black'>你尚未購買任何課程</div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
