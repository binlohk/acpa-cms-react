import React, { useState, useEffect, useContext } from 'react';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import LessonCards from '../../../lesson/components/LessonPage/lessonCards';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactMarkdown from 'react-markdown';
import { Parser } from 'html-to-react';
import CourseMaterials from '../courseMaterials';
import BuyButton from '../../../utilComponents/BuyButton';
import axios from 'axios';
import DOMPurify from 'dompurify';
import sanitizeHtml from 'sanitize-html';
var currencyFormatter = require('currency-formatter');

function extractUrlValue(key, url) {
    if (typeof url === 'undefined') url = window.location.href;
    var match = url.match(key + '="([^&]+)">');
    return match ? match[1] : null;
}
function GetyouTubeVideoToken(YoutubeVideoUrl) {
    var p =
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return YoutubeVideoUrl.match(p) ? RegExp.$1 : false;
}
const stringToHTML = function (str) {
    const domContainer = document.createElement('span');
    domContainer.innerHTML = str;
    return domContainer;
};
function RemoveBaseUrl(url) {
    var baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/;
    var result = "";
    var match = baseUrlPattern.exec(url);
    if (match != null) {
        result = match[0];
    }
    if (result.length > 0) {
        url = url.replace(result, "");
    }
    return url;
}
const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        background: 'transparent',
        padding: theme.spacing(5, 0, 2, 0)
    },
    tab: {
        padding: theme.spacing(1, 0, 1, 0)
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'center',
        gap: theme.spacing(1)
    },
    container: {
        border: '2px solid #D1D5DB',
        borderRadius: theme.spacing(0.5)
    },
    indicator: {
        backgroundColor: 'black'
    },
    selected: {
        background: '#76abde',
        color: '#235789',
        fontWeight: '700',
        border: '#235789'
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const Course = (props) => {
    const classes = useStyles();
    const { getUser } = useContext(UserContext);
    const user = getUser();
    const courseId = props.match.params.courseId;

    const [courseData, setCourseData] = useState(null);
    const [value, setValue] = useState(0);
    const [Videotoken, setVideotoken] = useState('');
    const [RenderedHTML, setRenderedHTML] = useState('');
    const [isLoading, setIsLoading] = useState();

    const fetchCourseData = async (courseId) => {
        try {
            var result;
            if (user.id !== "" && user.id != null) {
                result = await httpClient.get(
                    `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}`
                );
            } else {
                result = await axios.get(
                    `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courseId}`
                );
            }
            const parentEmbed = stringToHTML(result.data.description);
            let oldIframe = parentEmbed.querySelectorAll("oembed");
            let GetImgSrc = parentEmbed.querySelectorAll("img");
            console.log("GetImgSrc", result.data.description);
            console.log("GetImgSrc GetImgSrc",GetImgSrc);
            GetImgSrc = Array.from(GetImgSrc);
            for (const j in GetImgSrc) {
                let src = GetImgSrc[j].getAttribute("src");
                src = RemoveBaseUrl(src); // remove base url if exist 
                // http://localhost:8000/upload/abc.jpg" ==> "/upload/abc.jpg"
                const NewImg = document.createElement("img");

                if (src) {
                    NewImg.setAttribute(
                        "src",
                        `${process.env.REACT_APP_BACKEND_SERVER}${src}`
                    );
                }
                GetImgSrc[j].parentNode.replaceChild(NewImg, GetImgSrc[j]);
            }
            oldIframe = Array.from(oldIframe);
            for (const i in oldIframe) {
                let url = oldIframe[i].getAttribute("url");
                const newIframe = document.createElement("iframe");
                newIframe.setAttribute("width", "900");
                newIframe.setAttribute("height", "500");
                newIframe.setAttribute(
                    "allow",
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                );
                newIframe.setAttribute("allowFullScreen", "");
                newIframe.setAttribute("frameBorder", 0);
                if (url) {
                    newIframe.setAttribute(
                        "src",
                        "https://www.youtube.com/embed/" + GetyouTubeVideoToken(url)
                    );
                }
                oldIframe[i].parentNode.replaceChild(newIframe, oldIframe[i]);
            }
            const contentToRender = parentEmbed.outerHTML;
            
            const clean = sanitizeHtml(contentToRender, {
                allowedTags: [
                    "b",
                    "i",
                    "em",
                    "strong",
                    "a",
                    "iframe",
                    "p",
                    "h1",
                    "h2",
                    "h3",
                    "img",
                ],
                allowedAttributes: {
                    a: ["href"],
                    iframe: [
                        "src",
                        "width",
                        "height",
                        "allow",
                        "allowfullscreen",
                        "frameborder",
                    ],
                    img: ["src"],
                },
                allowedIframeHostnames: ["www.youtube.com"],
            });
            setRenderedHTML(clean);
            setCourseData(result.data);
            if (result.data.description !== "") {
                var value = extractUrlValue("url", result.data.description);
                if (value) {
                    var ViToken = GetyouTubeVideoToken(value);
                    setVideotoken(ViToken);
                }
            }
            setCourseData(result.data);
            if (result.data.description !== '') {
                var value = extractUrlValue('url', result.data.description);
                if (value) {
                    var ViToken = GetyouTubeVideoToken(value);
                    setVideotoken(ViToken);
                }
            }
        } catch (e) {
            props.history.push('/');
            console.log(e);
        }
    };

    const updateLessonProgress = async (lessonId, isFinished) => {
        let result;
        try {
            if (user.id !== '' && user.id != null) {
                const route = `user-progresses/${lessonId}/${user.id}`;
                if (isFinished) {
                    result = await httpClient.post(route);
                } else {
                    result = await httpClient.delete(route);
                }
                await fetchCourseData(courseId);
                console.log('checked ok');
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCourseData(courseId);
    }, [isLoading]);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="relative flex flex-col w-full items-center min-w-0 text-gray-600 bg-gray-100 rounded shadow-lg">
            <div
                className="flex flex-col items-center"
                style={{ maxWidth: '1024px' }}
            >
                {courseData && (
                    <>
                        <h1 className="py-12 text-3xl">{courseData.title}</h1>
                        <div className="flex flex-col items-center w-40 p-2 bg-gray-400 rounded">
                            {courseData.purchased ? (
                                <>
                                    {courseData.lessonsDetail.length > 0 ? (
                                        <>
                                            <span className="font-bold text-gray-700">
                                                你已擁有此課程
                                            </span>
                                            <Link
                                                to={`/lesson/${courseData.lessonsDetail[0].id}`}
                                                style={{
                                                    background: '#235789'
                                                }}
                                                className="inline-flex items-center justify-center px-3 py-2 my-2 text-xs font-bold text-white border border-transparent shadow-sm whitespace-nowrap rounded-3xl"
                                            >
                                                開始課程
                                            </Link>
                                        </>
                                    ) : (
                                        <span className="font-bold text-gray-700">
                                            你已擁有此課程
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                    <span className="font-bold text-gray-700">
                                        {courseData.price == 0
                                            ? '你尚未報讀此課程'
                                            : '你尚未擁有此課程'}
                                        </span>
                                        {isLoading ?
                                            (<>
                                                 <BuyButton
                                        courseId={courseId}
                                            coursePrice={courseData.price}
                                                setIsLoading={setIsLoading}
                                                isDisabled={isLoading}>
                                        稍等 
                                    </BuyButton>
                                            </>)
                                            : <BuyButton
                                        courseId={courseId}
                                            coursePrice={courseData.price}
                                                setIsLoading={setIsLoading}
                                                isDisabled={isLoading}
                                                
                                    >
                                        {courseData.price == 0
                                            ? '報名'
                                            : '購買課程'}
                                    </BuyButton>}
                                    
                                </>
                            )}
                        </div>

                        <div
                            className="overflow-x-scroll"
                            style={{ minWidth: 650 }}
                        >
                            <div className="min-w-full">
                                <div className={classes.paper}>
                                    <Tabs
                                        value={value}
                                        onChange={handleTabChange}
                                        aria-label="simple tabs example"
                                        indicatorColor="primary"
                                        textColor="white"
                                        className={classes.tab}
                                        classes={{
                                            flexContainer: classes.container
                                        }}
                                        TabIndicatorProps={{
                                            style: {
                                                background: '#235789',
                                                height: '3px'
                                            }
                                        }}
                                    >
                                        <Tab
                                            classes={{
                                                wrapper: classes.wrapper,
                                                selected: classes.selected
                                            }}
                                            icon={<LibraryBooksIcon />}
                                            label="課堂概覽"
                                            {...a11yProps(0)}
                                        />
                                        <Tab
                                            classes={{
                                                wrapper: classes.wrapper,
                                                selected: classes.selected
                                            }}
                                            icon={<PermMediaIcon />}
                                            label="課堂材料"
                                            {...a11yProps(1)}
                                        />
                                    </Tabs>
                                </div>
                                <TabPanel value={value} index={0}>
                                    <div className="py-3 border-b-2 rounded-t">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                                                <h3
                                                    className={
                                                        'font-semibold text-lg'
                                                    }
                                                >
                                                    課程概覽
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-6 pl-4">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: RenderedHTML
                                            }}
                                        />
                                    </div>
                                    <div className="py-3 border-b-2 rounded-t">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                                                <h3
                                                    className={
                                                        'font-semibold text-lg '
                                                    }
                                                >
                                                    課程價錢
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {courseData.price == 0 ? (
                                            <>
                                                <p className="py-6 pl-4">
                                                    Free
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="py-6 pl-4">
                                                    {currencyFormatter.format(
                                                        courseData.price,
                                                        { code: 'HKD' }
                                                    )}
                                                </p>
                                                {/* <p className='py-6 pl-4'>{courseData.price}</p> */}
                                            </>
                                        )}
                                    </div>
                                    <LessonCards
                                        lessonsDetail={courseData.lessonsDetail}
                                        progressHandler={updateLessonProgress}
                                        purchased={courseData.purchased}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <CourseMaterials
                                        courseMaterials={
                                            courseData.courseMaterials
                                        }
                                        purchased={courseData.purchased}
                                    />
                                </TabPanel>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Course;