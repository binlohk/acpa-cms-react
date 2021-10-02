import { useState } from 'react';
import { getUser, storeUser } from '../../services/authService';
import axios from 'axios'

const PublicEnrollForm = (props) => {

    const [isLoggedIn, login] = useState(false);
    const referrerToken = "ey/cws98h3489fhjseoijfseesfse";

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
        <div class="p-5 grid grid-cols-1 gap-4">
            <div class="bg-white p-6 rounded-lg shadow-lg lg:w-1/2 divide-y">
                <div>
                    <h2 class="text-xl font-bold mb-2 text-gray-800 p-2">零成本 人脈變錢脈 免費公開課</h2>
                    <p class="text-gray-700 text-sm p-2">
                        🌎人脈都可以賺錢⁉️🌎<br />
                        📚免費公開課為你揭秘<br />
                        <br />
                        🎙各位企業家，<br />
                        多年來做生意、<br />
                        跑商會認識好多人👤<br />
                        但大多數同你嘅生意冇咩關係🤷‍♂️<br />
                        更莫講將人脈變錢脈💰<br />
                        呢個係咪你嘅處境❓<br />
                        <br />
                        🌎 新時代、新環境，<br />
                        當然有新賺錢方式<br />
                        活化人脈👤<br />
                        過去一個路人甲乙丙🚶‍♂<br />
                        今日都可以成為你嘅財神爺💰<br />
                        <br />
                        🌐法商助力人脈變現🌐<br />
                        📚免費公開課<br />
                        <br />
                        ✅教你將人脈變錢脈<br />
                        ✅法商助力，團隊支援，免尷尬麻煩<br />
                        ✅創造長期穩定人脈被動收入<br />
                    </p>
                </div>
                <div class="p-4 grid grid-cols-1 gap-2">
                    {
                        getUser?.id ? (
                            <>
                                <p class="text-sm text-gray-600">分享以下連結成為推薦人：</p>
                                <button class="truncate">
                                    <div class="inline-flex item-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                        </svg>
                                        <p class="text-sm text-gray-600" href={`https://app.acpa.training/publicEnroll/${props.match.params.enrollFormId}/${referrerToken}`}>https://app.acpa.training/publicEnroll/${props.match.params.enrollFormId}/${referrerToken}</p>
                                    </div>
                                </button>
                            </>
                        ) : (
                            <>
                                <p class="text-sm text-gray-600">是會員嗎？</p>
                                <button class="bg-indigo-700 text-white rounded-md py-2" onClick={handleLogin}>
                                    登入
                                </button>
                                <p class="text-xs text-gray-600">登入後可取得推薦連結</p>
                            </>
                        )
                    }
                </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-lg lg:w-1/2">
                <h2 class="text-xl font-bold mb-2 text-gray-800 p-2">📚免費公開課</h2>
                <p class="text-gray-700 text-sm p-2">
                    📅日期：9月9日星期四 及 9月11日星期六<br />
                    ⏰時間：15:00 - 17:00<br />
                    🏢地點：尖沙咀廣東道28號太陽廣場306室(海港城Gucci對面，DFS免稅店樓上)<br />
                </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-lg lg:w-1/2">
                <img src="https://lh6.googleusercontent.com/hHHAaqtFDa2jl1_dPIx2ACsqhEgIJXZETqfYfC1Zd_qD4e87FYQU8KLjHL_AB6nbQl_ksRrTp1TciUUH8K2E2Guvto7EaQc0nx4-Ox2oXqALqeJ_kVG9G2jhEoNLrBDdAA=w1080"></img>
            </div>
            <form class="bg-white p-6 rounded-lg shadow-lg lg:w-1/2 grid grid-cols-1 gap-5">
                <div>
                    <h2 class="text-xl font-bold mb-2 text-gray-800 p-2">選擇參加場次：</h2>
                    <div class="grid grid-cols-1 gap-4 text-sm">
                        <label class="inline-flex items-center gap-2">
                            <input type="radio" class="form-radio" name="accountType" value="personal" />
                            <span>9月9日星期四 14:30-17:00</span>
                        </label>
                        <label class="inline-flex items-center gap-2">
                            <input type="radio" class="form-radio" name="accountType" value="busines" />
                            <span>9月11日星期六 14:30-17:00</span>
                        </label>
                    </div>
                </div>
                {
                    true && (
                        <>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    姓名
                                </label>
                                <input class="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" aria-label="Full name" required />
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    電話號碼
                                </label>
                                <input class="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" aria-label="Full name" required />
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                    電郵地址
                                </label>
                                <input class="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-grey-900" type="text" aria-label="Full name" required />
                            </div>
                        </>
                    )
                }
                <button class="bg-indigo-700 text-white rounded-md py-2" onClick={handleLogin}>
                    報名
                </button>

            </form>
        </div>
    )
}

export default PublicEnrollForm
