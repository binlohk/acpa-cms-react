import { getUser, storeToken, storeUser } from '../../services/authService';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PublicEnrollFormPromotion from './publicEnrollFormPromotion';
import PublicEnrollReferral from './publicEnrollReferral';
import PublicEnrollFormLessonSelection from './publicEnrollFormLessonSelection';
import PublicEnrollFormContact from './publicEnrollFormContact';
import PublicEnrollFormLoginDialog from './publicEnrollFormLoginDialog';
import { httpClient } from '../../services/api/axiosHelper';
import { loadStripe } from '@stripe/stripe-js';
const ContentLoader = () => {
    return (
        <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-blue-400 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-blue-400 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-blue-400 rounded"></div>
                    <div className="h-4 bg-blue-400 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
};

const PublicEnrollForm = ({
    match: {
        params: { referrerToken }
    }
}) => {
    const basicCardTailWindClasses =
        'bg-white p-6 rounded-lg shadow-lg md:max-w-screen-sm w-full';
    const [isLoading, setIsLoading] = useState(false);
    const [isShowLoginDialog, showLoginDialog] = useState(false);
    const [enteredUserInfo, updateUserInfo] = useState();
    const [selectedLessonId, selectLessonWithId] = useState(null);
    const [referralToken, setReferralToken] = useState('');
    const [isLoggedIn, login] = useState(getUser()?.id != null);
    const [enrollFormData, setEnrollFormData] = useState(null);
    const [lessonData, setLessonData] = useState([]);
    const updateLessonProgress = async () => {
        try {
            const user = getUser();
            const route = `/user-progresses/${selectedLessonId}/${user.id}`;
            const { data: dbIsLessonFinished } = httpClient.get(route);
            if (!dbIsLessonFinished) {
                httpClient.post(route);
            } else {
                httpClient.delete(route);
            }
        } catch (error) {
            alert(error.message);
        }
    };
    const handleEnrollment = () => {
        setIsLoading(true);
        try {
            // 1. Check if lesson is selected.
            // 2. Check if user is logged In.
            // 3. Check if new user filled in contact.
            // 4.

            // updateLessonProgress();
            if (!selectedLessonId) throw new Error('請選擇課程。');
            if (isLoggedIn) {
                // Enroll the course
                const user = getUser();
                if (user.id != '' && user.id != null) {
                    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/sessions`).then((sessionRes) => {
                        
                        let sessions = sessionRes?.data;
                        sessions?.map(async(session) => {
                                if (session?.id == selectedLessonId) {
                                    const reqObj = {
                                        courseId: session?.course?.id,
                                        courseSession:selectedLessonId
                                    };
                                    // if already purchased
                                    const puchasedCourse = await httpClient.get(`${process.env.REACT_APP_BACKEND_SERVER}/courses?id=${session?.course?.id}`);
                                    if (!puchasedCourse.data[0].purchased) {
                                        httpClient
                                        .post('/user-payments', reqObj)
                                        .then(async (session) => {
                                            if (session.data.course.price > 0) {

                                                const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK);
                                                const result = await stripe.redirectToCheckout({ sessionId: session.data.sessionID });    
                                            }
                                            else {
                                                let userSessionData = {
                                                    enrolledDate: new Date(),
                                                    session: selectedLessonId,
                                                    user:user.id
                                                  }
                                                await httpClient.post('/user-sessions', userSessionData);
                                                alert('成功報名。');
                                            }
                                            
                                        })
                                        .catch((err) => {
                                            alert('已經報名。1');
                                            console.log("err", err);
                                        })
                                        .finally(() => setIsLoading(false));
                                    }
                                    else {
                                        let userSessionData = {
                                            enrolledDate: new Date(),
                                            session: selectedLessonId,
                                            user:user.id
                                          }
                                          console.log("userSessionData",userSessionData);
                                        await httpClient.post('/user-sessions', userSessionData);
                                        alert('成功報名。');
                                    }
                                }            
                            })
                        }).catch((lessonErr) => {
                            alert("Course not found for lesson");
                        });
                }
            } else {
                if (!enteredUserInfo) throw new Error('請輸入個人信息或登錄。');
                // Create account
                axios
                    .post(
                        `${
                            process.env.REACT_APP_BACKEND_SERVER
                        }/registerAndEnroll/${referrerToken ?? ''}`,
                        {
                            username: enteredUserInfo.email,
                            email: enteredUserInfo.email,
                            password: enteredUserInfo.phone,
                            phone: enteredUserInfo.phone
                        }
                    )
                    .then((response) => {
                        storeUser(response.data.user);
                        storeToken(response.data.jwt);

                        // Enroll the course
                        const user = getUser();
                        if (user.id != '' && user.id != null) {
                            axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/sessions`).then((sessionRes) => {
                                let sessions = sessionRes?.data;
                                sessions?.map(async(session) => {
                                    if (session?.id == selectedLessonId) {
                                        const reqObj = {
                                            courseId: session?.course?.id
                                        };
                                        const puchasedCourse = await httpClient.get(`${process.env.REACT_APP_BACKEND_SERVER}/courses?id=${session?.course?.id}`);
                                        if (!puchasedCourse.data[0].purchased) {
                                            httpClient
                                            .post('/user-payments', reqObj)
                                            .then(async (sessions) => {
                                                if (sessions?.data?.course?.price > 0) {
                                                    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PK);
                                                    const result = await stripe.redirectToCheckout({ sessionId: sessions.data.sessionID });    
                                                } else {
                                                       let userSessionData = {
                                                    enrolledDate: new Date(),
                                                    session: selectedLessonId,
                                                    user:user.id
                                                  }
                                                    await httpClient.post('/user-sessions', userSessionData);
                                                }
                                                alert(
                                                    '成功報名以及註冊，你的密碼將是你的電話號碼。'
                                                );
                                                await updateLessonProgress();
                                            })
                                            .catch((err) => {
                                                alert(err.message);
                                                setIsLoading(false);
                                            });    
                                        }
                                        else {
                                            let userSessionData = {
                                                enrolledDate: new Date(),
                                                session: selectedLessonId,
                                                user:user.id
                                              }
                                            await httpClient.post('/user-sessions', userSessionData);
                                                alert(
                                                    '成功報名以及註冊，你的密碼將是你的電話號碼。'
                                            );
                                            await updateLessonProgress();
                                        }
                                    }            
                                })
                            }).catch((lessonErr) => {
                                alert("Course not found for lesson");
                            });
                        }
                    })
                    .catch((err) => {
                        alert('已經報名。3');
                        setIsLoading(false);
                    });
            }

            // Show success message.
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchEnrollFormData = async () => {
            axios
            .get(`${process.env.REACT_APP_BACKEND_SERVER}/enroll-forms`)
            .then(async (res) => {
                setEnrollFormData(res?.data[0]);
                
                var userSessions = await httpClient.get(`${process.env.REACT_APP_BACKEND_SERVER}/user-sessions?user=${getUser()?.id}`);    
                let userSessionsData = userSessions?.data
                let courses = res?.data[0]?.course;
                let lessonList = [];

                    var courseDetails = await axios.get(
                        `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courses.id}`
                    );
                    
                    courseDetails?.data?.sessions.map((session) => {
                    
                        const userEnrollerFound = userSessionsData?.some(sessions => sessions.session.id == session.id);
                    
                        if (userEnrollerFound) {
                            lessonList.push({
                                lessonId: session.id,
                                date: session.SessionDate,
                                isEnrolled:true
                            })    
                        }
                        else {
                            lessonList.push({
                                lessonId: session.id,
                                date: session.SessionDate,
                                isEnrolled:false
                            })    
                        }
                        
                    });
                setLessonData(lessonList);
            })
            .catch((err) => {
                console.log(err);
            });
      }

        if (getUser().id) {
            fetchEnrollFormData()
            httpClient
                .get(`${process.env.REACT_APP_BACKEND_SERVER}/users/me`)
                .then((user) => {
                    setReferralToken(user.data.referralToken);
                });
        }
        else {
            axios
            .get(`${process.env.REACT_APP_BACKEND_SERVER}/enroll-forms`)
            .then(async (res) => {
                
                setEnrollFormData(res?.data[0]);

                let courses = res?.data[0]?.course;
                let lessonList = [];

                    var courseDetails = await axios.get(
                        `${process.env.REACT_APP_BACKEND_SERVER}/courses/${courses.id}`
                    );
                    
                    courseDetails?.data?.sessions.map((session) => {
                            lessonList.push({
                                lessonId: session.id,
                                date: session.SessionDate,
                                isEnrolled:false
                            })
                    });
                setLessonData(lessonList);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [isLoggedIn]);
    useEffect(() => {
        login(!!getUser()?.id)
      }, [getUser()?.id])
    return (
        <div className="p-5 grid grid-cols-1 gap-4 justify-items-center">
            {enrollFormData?.poster && (
                <div className={basicCardTailWindClasses}>
                    <img
                        alt={`${process.env.REACT_APP_BACKEND_SERVER}${enrollFormData.poster.alternativeText}`}
                        src={`${process.env.REACT_APP_BACKEND_SERVER}${enrollFormData.poster.url}`}
                    ></img>
                </div>
            )}

            <div className={`${basicCardTailWindClasses} divide-y`}>
                {enrollFormData ? (
                    <>
                        <PublicEnrollFormPromotion
                            promoTitle={enrollFormData.promoTitle}
                            promoContent={enrollFormData.promoContent}
                        />
                        <PublicEnrollReferral
                            isLoggedIn={isLoggedIn}
                            showLoginDialog={showLoginDialog}
                            referralToken={referralToken}
                        />
                    </>
                ) : (
                    <ContentLoader />
                )}
            </div>

            <div className={basicCardTailWindClasses}>
                {enrollFormData ? (
                    <PublicEnrollFormPromotion
                        promoTitle={enrollFormData.lessonTitle}
                        promoContent={enrollFormData.lessonContent}
                    />
                ) : (
                    <ContentLoader />
                )}
            </div>

            <div className={`${basicCardTailWindClasses}`}>
                <form
                    className="grid grid-cols-1 gap-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    {enrollFormData ? (
                        <PublicEnrollFormLessonSelection
                            lessons={lessonData}
                            lessonSelectionCallback={selectLessonWithId}
                        />
                    ) : (
                        <ContentLoader />
                    )}
                    <PublicEnrollFormContact
                        isLoggedIn={getUser()?.id}
                        updateUserInfo={updateUserInfo}
                    />
                    <input
                        type="submit"
                        className={`bg-indigo-700 text-white rounded-md py-2 ${
                            isLoading ? 'opacity-50' : ''
                        }`}
                        onClick={handleEnrollment}
                        value="報名"
                        disabled={isLoading}
                    />
                </form>
            </div>
            {/* Login Dialog */}
            <PublicEnrollFormLoginDialog
                showLoginDialog={showLoginDialog}
                isShowLoginDialog={isShowLoginDialog}
                login={login}
                setReferralToken={setReferralToken}
            />
        </div>
    );
};

export default PublicEnrollForm;
