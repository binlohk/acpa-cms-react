import { getUser, storeUser } from '../../services/authService';
import axios from 'axios'
import { useState } from 'react';
import PublicEnrollFormPromotion from './publicEnrollFormPromotion';
import PublicEnrollReferral from './publicEnrollReferral';
import PublicEnrollFormLessonSelection from './publicEnrollFormLessonSelection';
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

    const [isLoggedIn, login] = useState(false);
    const [isShowLoginDialog, showLoginDialog] = useState(false);

    const [selectedLessonId, selectLessonWithId] = useState(null);

    const handleLogin = () => {
        const token = localStorage.getItem('accessToken')
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(loginUser => {
            storeUser(loginUser.data)
        })
    }

    return (
        <div className="p-5 grid grid-cols-1 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/2 divide-y">
                <PublicEnrollFormPromotion
                    promoTitle={tempPromoTitle}
                    promoContent={tempPromoText} />
                <PublicEnrollReferral
                    isLoggedIn={isLoggedIn}
                    showLoginDialog={showLoginDialog}
                    enrollFormId={props.match.params.enrollFormId}
                    referrerToken={referrerToken}
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/2">
                <PublicEnrollFormPromotion
                    promoTitle={
                        tempLessonTitle
                    }
                    promoContent={tempLessonText} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/2">
                <img src={poster}></img>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-1/2 grid grid-cols-1 gap-5">
                <PublicEnrollFormLessonSelection lessons={tempLessons} lessonSelectionCallback={selectLessonWithId} />
                {
                    !isLoggedIn && (
                        <>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    姓名
                                </label>
                                <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    電話號碼
                                </label>
                                <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    電郵地址
                                </label>
                                <input className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" required />
                            </div>
                        </>
                    )
                }
                <button className="bg-indigo-700 text-white rounded-md py-2" onClick={showLoginDialog}>報名</button>
            </div>
            <PublicEnrollFormLoginDialog showLoginDialog={showLoginDialog} isShowLoginDialog={isShowLoginDialog} loginCallback={login} />
        </div>
    )
}

export default PublicEnrollForm
