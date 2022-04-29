import React, { useState, useEffect, useContext } from 'react'
import { useHistory, Link, withRouter } from 'react-router-dom'
import Video from '../../../utilComponents/video'
import { httpClient } from '../../../../services/api/axiosHelper'
import axios from 'axios'
import { UserContext } from '../../../../contexts/UserContext'
import { Drawer, List, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import { Divider } from '@material-ui/core'
import Vimeo from '@u-wave/react-vimeo'
import LessonStepper from './LessonStepper'
import { Parser } from 'html-to-react'
import DOMPurify from 'dompurify'
import ReactPlayer from 'react-player'
function extractUrlValue(key, url) {
    if (typeof url === 'undefined') url = window.location.href
    var match = url.match(key + '="([^&]+)">')
    return match ? match[1] : null
}
function GetyouTubeVideoToken(YoutubeVideoUrl) {
    var p =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    return YoutubeVideoUrl.match(p) ? RegExp.$1 : false
}
const useStyles = makeStyles((theme) => ({
    list: {
        background: '#fff',
        color: '#4B5563',
        marginRight: '3rem',
        borderRadius: '0.75rem',
        height: '1200px',
        overflow: 'scroll',
    },
    item: {
        width: '15vw',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem 0 1.5rem 1.5rem',
        background: 'transparent',
    },
    itemRed: {
        width: '15vw',
        fontWeight: '700',
        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem 0 1.5rem 1.5rem',
        color: 'white',
        background: '#A5924B',
    },
    divider: {
        width: '90%',
        margin: '0 5%',
    },
}))

const Lesson = ({ match }) => {
    const { getUser } = useContext(UserContext)
    const user = getUser()

    const [lessonData, setLessonData] = useState(null)
    const [courseData, setCourseData] = useState(null)
    const [VideoToken, setVideoToken] = useState('')

    const { lessonId } = match.params

    const fetchLessonData = async (lessonId) => {
        if (user && user.id !== '' && user.id !== null) {
            try {
                const result = await httpClient.get(
                    `${process.env.REACT_APP_BACKEND_SERVER}/lessons/${lessonId}`
                )

                let regex =
                    /(?:http:|https:|)\/\/(?:player.|www.)?vimeo\.com\/(?:video\/|embed\/|watch\?\S*v=|v\/)?(\d*)/g
                let checkVimeoValidvideoUrl = result.data.videoUrl.match(regex)
                if (checkVimeoValidvideoUrl == null) {
                    result.data.videoUrl = ''
                }

                setLessonData(result.data)
                if (result?.data?.lessonDescription) {
                    var value = extractUrlValue(
                        'url',
                        result.data.lessonDescription
                    )
                    if (value) {
                        var ViToken = GetyouTubeVideoToken(value)
                        setVideoToken(ViToken)
                    }
                }
                const courseResult = await httpClient.get(
                    `${process.env.REACT_APP_BACKEND_SERVER}/courses/${result.data.course.id}`
                )
                console.log('courseResult', courseResult)
                setCourseData(courseResult.data)
                console.log(result.data, 'huiiiii')
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchLessonData(lessonId)
    }, [])

    /**events for lessons progress bar */
    const handleClick = async (event) => {
        event.target.disabled = true
        await updateLessonProgress(event.target.id)
        event.target.disabled = false
    }

    const updateLessonProgress = async (lessonId) => {
        try {
            if (user.id != '' && user.id != null) {
                const route = `/user-progresses/${lessonId}/${user.id}`
                const { data: dbIsLessonFinished } = await httpClient.get(route)
                console.log(dbIsLessonFinished, 'dataaaa')
                if (!dbIsLessonFinished) {
                    console.log('post progress')
                    await httpClient.post(route)
                } else {
                    console.log('del progress')
                    await httpClient.delete(route)
                }
                await fetchLessonData(lessonId)
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**on video end */
    const handleEnd = async () => {
        if (!lessonData.finished) {
            await updateLessonProgress(lessonId)
        }
    }
    // console.log('lesson data', lessonData?.title)
    return (
        <>
            {lessonData && (
                <>
                    <div className="bg-lesson-bg">
                        <div className="pt-6">
                            <nav aria-label="Breadcrumb">
                                <ol
                                    role="list"
                                    className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
                                >
                                    <li>
                                        <div className="flex items-center">
                                            <a className="mr-2 text-sm font-medium text-gray-900">
                                                Course
                                            </a>
                                            <svg
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                className="w-4 h-5 text-gray-300"
                                            >
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="text-sm">
                                        <div className="flex items-center">
                                            <Link
                                                to={`/course/${courseData?.id}`}
                                            >
                                                <a
                                                    aria-current="page"
                                                    className="font-medium text-gray-500 hover:text-gray-600"
                                                >
                                                    {courseData &&
                                                        courseData.title}
                                                </a>
                                            </Link>
                                            <svg
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                className="w-4 h-5 text-gray-300"
                                            >
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                            <a
                                                aria-current="page"
                                                className="font-medium text-gray-500 hover:text-gray-600"
                                            >
                                                {lessonData?.title}
                                            </a>
                                        </div>
                                    </li>
                                </ol>
                            </nav>

                            <div className="flex flex-col lg:flex-none max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16  lg:px-7 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-5">
                                <div className="order-1 lg:order-none   lg:col-span-2 border-b-2 border-gray-300">
                                    <div className="mx-0 my-0 px-0 py-0 flex flex-col">
                                        <div className="bg-black">
                                            {lessonData.videoUrl !== '' ? (
                                                <>
                                                    <ReactPlayer
                                                        url={
                                                            lessonData.videoUrl
                                                        }
                                                        onEnded={handleEnd}
                                                        width="100%"
                                                        height="450px"
                                                        controls
                                                    />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className="text-2xl line-clamp-2 my-9">
                                            {lessonData?.title}
                                        </div>
                                    </div>
                                </div>

                                <div className="order-3 lg:order-none  mt-4 lg:mt-0 lg:row-span-3 bg-lessons-card shadow-lg  rounded-lg overflow-y-auto max-h-screen">
                                    {courseData &&
                                        courseData.lessonsDetail.map(
                                            (lesson, ind) => {
                                                console.log('lesson', lesson)
                                                return (
                                                    <Link
                                                        to={`/lesson/${lesson.id}`}
                                                    >
                                                        <div className="group">
                                                            <article
                                                                className={
                                                                    lessonData?.id ==
                                                                    lesson.id
                                                                        ? `flex items-start space-x-6 p-6  mb-3 w-auto border-b-2 bg-acpa-color opacity-100`
                                                                        : 'flex items-start space-x-6 p-6  mb-3 w-auto border-b-2 group-hover:bg-acpa-color group-hover:opacity-95'
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        lessonData?.id ==
                                                                        lesson.id
                                                                            ? 'font-bold text-black rounded-full bg-white flex items-center justify-center font-mono px-6 py-3 w-12 text-base'
                                                                            : 'font-bold group-hover:text-black  text-white rounded-full group-hover:bg-white   bg-acpa-color group-hover:opacity-100 flex items-center justify-center font-mono px-6 py-3 w-12 text-base'
                                                                    }
                                                                >
                                                                    {ind + 1}
                                                                </div>
                                                                <div className="min-w-80 relative flex-auto">
                                                                    <p
                                                                        className={
                                                                            lessonData?.id ==
                                                                            lesson.id
                                                                                ? 'font-semibold text-white  pr-10 line-clamp-2'
                                                                                : 'font-semibold group-hover:text-white text-slate-900   pr-10 line-clamp-2'
                                                                        }
                                                                    >
                                                                        {
                                                                            lesson.title
                                                                        }
                                                                    </p>
                                                                    <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                                                                        <div className="absolute top-0 right-0 flex items-center space-x-1">
                                                                            <dt className="text-sky-500">
                                                                                {lesson.finished && (
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="24"
                                                                                        height="24"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill={
                                                                                            lessonData?.id ==
                                                                                            lesson.id
                                                                                                ? '#FFFFFF'
                                                                                                : '"#513654"'
                                                                                        }
                                                                                    >
                                                                                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                                                                    </svg>
                                                                                )}
                                                                            </dt>
                                                                        </div>

                                                                        <div className="flex-none w-full mt-2 font-normal">
                                                                            <dd
                                                                                className={
                                                                                    lessonData?.id ==
                                                                                    lesson.id
                                                                                        ? 'text-white'
                                                                                        : 'text-slate-400 group-hover:text-white'
                                                                                }
                                                                            >
                                                                                {
                                                                                    lesson.videoDuration
                                                                                }
                                                                            </dd>
                                                                        </div>
                                                                    </dl>
                                                                </div>
                                                            </article>
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                        )}
                                </div>
                                <div className="order-2 lg:order-none  py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2  lg:pr-8 mb-12 ">
                                    <div>
                                        <h3 className="">Description</h3>

                                        <div className="space-y-6">
                                            <p className="text-base text-gray-900">
                                                {Parser().parse(
                                                    DOMPurify.sanitize(
                                                        lessonData.lessonDescription
                                                    )
                                                )}
                                                {VideoToken ? (
                                                    <>
                                                        <div className="aspect-w-16 aspect-h-9 mt-3 w-full h-full">
                                                            <iframe
                                                                src={`https://www.youtube.com/embed/${VideoToken}`}
                                                                frameBorder="0"
                                                                width={800}
                                                                height={400}
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                title=""
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    ''
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default withRouter(Lesson)
