import { getUser, storeUser } from '../../services/authService';
import axios from 'axios'
import { useState } from 'react';
import PublicEnrollFormPromotion from './publicEnrollFormPromotion';
import PublicEnrollReferral from './publicEnrollReferral';
import PublicEnrollFormLessonSelection from './publicEnrollFormLessonSelection';
import PublicEnrollFormContact from './publicEnrollFormContact';
import {
    tempPromoTitle,
    tempPromoText,
    tempLessonTitle,
    tempLessonText,
    poster,
    tempLessons,
    referrerToken,
} from './mockData'
import PublicEnrollFormLoginDialog from './publicEnrollFormLoginDialog';

const PublicEnrollForm = (props) => {

    const basicCardTailWindClasses = "bg-white p-6 rounded-lg shadow-lg lg:w-1/2";
    const [isShowLoginDialog, showLoginDialog] = useState(false);
    const [enteredUserInfo, updateUserInfo] = useState();
    const [selectedLessonId, selectLessonWithId] = useState(null);

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
        <div className="p-5 grid grid-cols-1 gap-4">

            {/* Card 1 */}
            <div className={`${basicCardTailWindClasses} divide-y`}>
                <PublicEnrollFormPromotion
                    promoTitle={tempPromoTitle}
                    promoContent={tempPromoText} />
                <PublicEnrollReferral
                    isLoggedIn={getUser()?.id}
                    showLoginDialog={showLoginDialog}
                    enrollFormId={props.match.params.enrollFormId}
                    referrerToken={referrerToken}
                />
            </div>

            {/* Card 2 */}
            <div className={basicCardTailWindClasses}>
                <PublicEnrollFormPromotion
                    promoTitle={tempLessonTitle}
                    promoContent={tempLessonText} />
            </div>

            {/* Card 3 */}
            <div className={basicCardTailWindClasses}>
                <img src={poster}></img>
            </div>

            {/* Card 4 */}
            <form className={`${basicCardTailWindClasses} grid grid-cols-1 gap-5`} onSubmit={(e) => { e.preventDefault() }}>
                <PublicEnrollFormLessonSelection lessons={tempLessons} lessonSelectionCallback={selectLessonWithId} />
                <PublicEnrollFormContact isLoggedIn={getUser()?.id} updateUserInfo={updateUserInfo} />
                <input type="submit" className="bg-indigo-700 text-white rounded-md py-2" onClick={handleEnrollment} value="報名" />
            </form>

            {/* Login Dialog */}
            <PublicEnrollFormLoginDialog showLoginDialog={showLoginDialog} isShowLoginDialog={isShowLoginDialog} storeUser={storeUser} />
        </div>
    )
}

export default PublicEnrollForm
