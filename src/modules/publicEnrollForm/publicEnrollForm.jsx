import { getUser, storeUser } from '../../services/authService';
import axios from 'axios'
import { useEffect, useState } from 'react';
import PublicEnrollFormPromotion from './publicEnrollFormPromotion';
import PublicEnrollReferral from './publicEnrollReferral';
import PublicEnrollFormLessonSelection from './publicEnrollFormLessonSelection';
import PublicEnrollFormContact from './publicEnrollFormContact';
import PublicEnrollFormLoginDialog from './publicEnrollFormLoginDialog';

const ContentLoader = () => {
    return (
        <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-blue-400 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
                <div class="h-4 bg-blue-400 rounded w-3/4"></div>
                <div class="space-y-2">
                    <div class="h-4 bg-blue-400 rounded"></div>
                    <div class="h-4 bg-blue-400 rounded w-5/6"></div>
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

    const [enrollFormData, setEnrollFormData] = useState(null);

    const handleLogin = () => {
        const token = localStorage.getItem('accessToken')
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(loginUser => {
            storeUser(loginUser.data)
            // Get referr token from API
        })
    }

    useEffect(() => {
        const { enrollFormId } = props.match.params;
        axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER}/enroll-forms/${enrollFormId}`
        ).then((res) => {
            if (res) {
                setEnrollFormData(res.data)
            } else {
                // Redirect to 404
            }
        });
    }, [])

    const handleEnrollment = () => {
        try {
            const { name, email, phone } = enteredUserInfo;
        } catch (e) {
            alert("請輸入所需資料或登入")
        }
        // Call the all in one API
        // Pass in: Name, Email, Phone, Referral Token
        console.log(selectedLessonId)
        console.log(enteredUserInfo)
    }

    return (
        <div className="p-5 grid grid-cols-1 gap-4 justify-items-center">

            {/* Card 1 */}
            <div className={`${basicCardTailWindClasses} divide-y`}>
                {
                    enrollFormData ? <>
                        <PublicEnrollFormPromotion
                            promoTitle={enrollFormData.promoTitle}
                            promoContent={enrollFormData.promoContent} />
                        <PublicEnrollReferral
                            isLoggedIn={getUser()?.id}
                            showLoginDialog={showLoginDialog}
                            enrollFormId={props.match.params.enrollFormId}
                            referrerToken={""}
                        />
                    </> : <ContentLoader />
                }
            </div>

            {/* Card 2 */}
            <div className={basicCardTailWindClasses}>
                {
                    enrollFormData ? <PublicEnrollFormPromotion
                        promoTitle={enrollFormData.lessonTitle}
                        promoContent={enrollFormData.lessonContent} /> : <ContentLoader />
                }
            </div>

            {/* Card 3 */}
            {
                enrollFormData && <div className={basicCardTailWindClasses}>
                    <img src={`${process.env.REACT_APP_BACKEND_SERVER}${enrollFormData.poster.url}`}></img>
                </div>
            }

            {/* Card 4 */}
            <div className={`${basicCardTailWindClasses}`}>
                <form className="grid grid-cols-1 gap-6" onSubmit={(e) => { e.preventDefault() }}>
                    {enrollFormData ? <PublicEnrollFormLessonSelection lessons={enrollFormData.courses} lessonSelectionCallback={selectLessonWithId} /> : <ContentLoader />}
                    <PublicEnrollFormContact isLoggedIn={getUser()?.id} updateUserInfo={updateUserInfo} />
                    <input type="submit" className="bg-indigo-700 text-white rounded-md py-2" onClick={handleEnrollment} value="報名" />
                </form>
            </div>
            {/* Login Dialog */}
            <PublicEnrollFormLoginDialog showLoginDialog={showLoginDialog} isShowLoginDialog={isShowLoginDialog} storeUser={storeUser} />
        </div >
    )
}

export default PublicEnrollForm
