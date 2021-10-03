export default function PublicEnrollReferral({ isLoggedIn, showLoginDialog, enrollFormId, referrerToken }) {

    const referralLink = `https://app.acpa.training/publicEnroll/${enrollFormId}/${referrerToken}`

    return (
        <div className="pt-4 grid grid-cols-1 gap-2">
            {
                isLoggedIn ? (
                    <>
                        <p className="text-sm text-gray-600">分享以下連結成為推薦人：</p>
                        <button className="truncate rounded-full border-2 border-gray-700 bg-gray-700 text-white">
                            <div className="inline-flex item-center gap-2 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                </svg>
                                <p className="text-sm text-white" href={referralLink}>{referralLink}</p>
                            </div>
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-gray-600">是會員嗎？</p>
                        <button className="bg-indigo-700 text-white rounded-md py-2" onClick={showLoginDialog}>
                            登入
                        </button>
                        <p className="text-xs text-gray-600">登入後可取得推薦連結</p>
                    </>
                )
            }
        </div>
    )
}