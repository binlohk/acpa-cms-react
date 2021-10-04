import { ClickAwayListener, Tooltip } from "@material-ui/core";
import { useState } from "react";
import { getToken } from "../../services/authService";

export default function PublicEnrollReferral({ isLoggedIn, showLoginDialog }) {

    const referralLink = `https://app.acpa.training/publicEnroll/${getToken()}`

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };
    
    const handleCopyLink = async (e) => {
        e.preventDefault();
        setOpen(true);
        await navigator.clipboard.writeText(referralLink);
    }

    return (
        <>
            {
                isLoggedIn ? (
                    <div className="pt-4 grid grid-cols-1 gap-2">
                        <p className="text-sm text-gray-600">點擊分享以下連結成為推薦人：</p>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                title="已複製"
                                placement="top"
                            >
                                <button className="truncate rounded-full border-2 border-gray-700 bg-gray-700 text-white" onClick={handleCopyLink}>
                                    <div className="inline-flex item-center gap-2 p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                                            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                                        </svg>
                                        <p className="text-sm text-white" href={referralLink}>{referralLink}</p>
                                    </div>
                                </button>
                            </Tooltip>
                        </ClickAwayListener>

                    </div >
                ) : (
                    <div className="pt-4 grid grid-cols-1 justify-items-center">
                        <p className="text-sm text-gray-600">會員請<button className="text-blue-800 font-bold underline" onClick={showLoginDialog}>按此</button>登入，以取得推薦人連結並跳過輸入個人資料。</p>
                    </div>
                )
            }
        </>
    )
}