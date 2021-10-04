import { getUser, storeUser } from '../../services/authService';
import axios from 'axios'
import { useEffect, useState } from 'react';
import PublicEnrollFormPromotion from './publicEnrollFormPromotion';
import PublicEnrollReferral from './publicEnrollReferral';
import PublicEnrollFormLessonSelection from './publicEnrollFormLessonSelection';
import PublicEnrollFormContact from './publicEnrollFormContact';
import PublicEnrollFormLoginDialog from './publicEnrollFormLoginDialog';
import { Route } from 'react-router-dom';
import PageNotFound from '../404/components/404page';

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
    )
}

const PublicEnrollForm = (props) => {

    const basicCardTailWindClasses = "bg-white p-6 rounded-lg shadow-lg md:max-w-screen-sm w-full";
    const [isShowLoginDialog, showLoginDialog] = useState(false);
    const [enteredUserInfo, updateUserInfo] = useState();
    const [selectedLessonId, selectLessonWithId] = useState(null);

    const [isLoggedIn, login] = useState(getUser()?.id != null);

    const [enrollFormData, setEnrollFormData] = useState(null);

    const handleEnrollment = () => {
        try {
            const { name, email, phone } = enteredUserInfo;
            const lessonId = selectedLessonId;
        } catch (e) {
            alert("請輸入所需資料或登入")
        }
        // Call the all in one API
        // Pass in: Name, Email, Phone, Referral Token
        console.log(selectedLessonId)
        console.log(enteredUserInfo)
    }

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER ?? "http://localhost:1337"}/enroll-forms`
        ).then((res) => {
            setEnrollFormData(res.data[0])
        }).catch((err) => {
            <Route component={PageNotFound} />
            console.log(err);
        });
    }, [])

    return (
        <div className="p-5 grid grid-cols-1 gap-4 justify-items-center">
            {
                enrollFormData?.poster && <div className={basicCardTailWindClasses}>
                    <img src={`${process.env.REACT_APP_BACKEND_SERVER ?? "http://localhost:1337"}${enrollFormData.poster.url}`}></img>
                </div>
            }

            <div className={`${basicCardTailWindClasses} divide-y`}>
                {
                    enrollFormData ? <>
                        <PublicEnrollFormPromotion
                            promoTitle={enrollFormData.promoTitle}
                            promoContent={enrollFormData.promoContent} />
                        <PublicEnrollReferral
                            isLoggedIn={isLoggedIn}
                            showLoginDialog={showLoginDialog}
                        />
                    </> : <ContentLoader />
                }
            </div>

            <div className={basicCardTailWindClasses}>
                {
                    enrollFormData ? <PublicEnrollFormPromotion
                        promoTitle={enrollFormData.lessonTitle}
                        promoContent={enrollFormData.lessonContent} /> : <ContentLoader />
                }
            </div>

            <div className={`${basicCardTailWindClasses}`}>
                <form className="grid grid-cols-1 gap-6" onSubmit={(e) => { e.preventDefault() }}>
                    {enrollFormData ? <PublicEnrollFormLessonSelection lessons={enrollFormData.courses} lessonSelectionCallback={selectLessonWithId} /> : <ContentLoader />}
                    <PublicEnrollFormContact isLoggedIn={getUser()?.id} updateUserInfo={updateUserInfo} />
                    <input type="submit" className="bg-indigo-700 text-white rounded-md py-2" onClick={handleEnrollment} value="報名" />
                </form>
            </div>
            {/* Login Dialog */}
            <PublicEnrollFormLoginDialog showLoginDialog={showLoginDialog} isShowLoginDialog={isShowLoginDialog} login={login} />
        </div >
    )
}

export default PublicEnrollForm
