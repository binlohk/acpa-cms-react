import { httpClient } from '../../../../services/api/axiosHelper'
import React, { useEffect, useState } from 'react'
import { FormControl, makeStyles, Divider, ClickAwayListener, Tooltip  } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import PublishIcon from '@material-ui/icons/Publish';
import ReferralList from './referralList';
import OwnedCourse from '../OwnedCourse';

const useStyles = makeStyles((theme) => ({
    publishIcon: {
        color: "#513654",
        marginTop: -5,
        marginRight: -3
    },

    margin: {
        margin: theme.spacing(1),
    },
    copyableLink: {
        backgroundColor: 'gray'
    },
    hoverEffect: {
        "&:hover": {
            cursor: 'pointer'
        },
    },
    registerLink: {
    },
    copyButton: {
        "&:hover": {
            transform: 'scale(1.2)',
            color: 'white',
            cursor: 'pointer'
        }
    },
    input: {
        display: 'none',
    },
    // divider
    divider: {
        margin: theme.spacing(3, 0, 3, 0),
        height: theme.spacing(0.5)
    }
}));

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [currentFormData, setFormData] = useState(null);
    const [purchasedCourses, setPurchasedCourses] = useState(null);
    const [open, setOpen] = useState(false);
    const referralURL = userProfile ? `${process.env.REACT_APP_FRONTEND_SERVER}/signup/${userProfile.referralToken}` : '';
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleCopyLink = async (e) => {
        e.preventDefault();
        setOpen(true);
        await navigator.clipboard.writeText(referralURL);
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentFormData) {
                    await httpClient.post('/upload', currentFormData);
                    setFormData(null);
                }
                const user = await httpClient.get(`/users/me`)
                setUserProfile(user.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchUserData()
    }, [currentFormData])

    
    const classes = useStyles();

    console.log(userProfile);

    // user icon
    const handlePicSelect = async (event) => {
        const formData = new FormData();
        formData.append('files', event.target.files[0]);
        formData.append('ref', 'user');
        formData.append('source', 'users-permissions');
        formData.append('refId', userProfile.id);
        formData.append('field', 'profilePicture');
        setFormData(formData);
    }

    // courses
    const fetchUserCourses = async () => {
        const response = await httpClient.get(`${process.env.REACT_APP_BACKEND_SERVER}/courses`)
        const data = response.data
        const purchased = data.filter(item => item.purchased !== false)
        setPurchasedCourses([...purchased])
    }
    useEffect(() => { fetchUserCourses() }, []);

 

    return (
        <div className='text-gray-600 '>
            {/* user info */}
            <div>
                {userProfile &&
                    /** user icon */
                    <div className='flex flex-col items-center'>
                        {userProfile.profilePicture ? (
                            <>
                                <div className={`${classes.imgDiv} -mr-10 w-32 h-32 group justify-center rounded-full border-2 border-white bg-white absolute overflow-hidden top-36 left-50`}>
                                    <img className={`-mt-2 opacity-100 group-hover:opacity-0`} style={{ height: '110%', width: '100%' }} src={`${process.env.REACT_APP_BACKEND_SERVER}${userProfile.profilePicture.url}`} />
                                    <div className={`ml-4 mt-2 upload-image text-sm absolute top-12 z-50 w-24 object-scale-down opacity-0 focus:outline-none group-hover:opacity-100`}>
                                        <label
                                            htmlFor="contained-button-file"
                                            style={{
                                                paddingTop: 6,
                                                paddingBottom: 6,
                                                paddingLeft: 3,
                                                paddingRight: 3,
                                                borderWidth: 2,
                                                borderColor: "#A5924B",
                                                cursor: "pointer",
                                                marginLeft: -3
                                            }}>
                                            <PublishIcon className={classes.publishIcon} /> <span style={{ color: "#513654" }}>上載圖片</span>
                                        </label>
                                        <input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handlePicSelect}
                                            style={{
                                                position: "absolute",
                                                width: "1px",
                                                height: "1px",
                                                padding: 0,
                                                margin: "-1px",
                                                overflow: "hidden",
                                                clip: "rect(0, 0, 0, 0)",
                                                border: 0
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`${classes.imgDiv} -mr-10 w-32 h-32 group justify-center rounded-full border-2 border-white bg-white absolute overflow-hidden top-36 left-50`}>
                                    <div className={`w-24 h-24 justify-center items-center object-contain`}>
                                        <p className={'z-50 top-12 absolute self-center opacity-100 group-hover:opacity-0'}>上載圖片</p>
                                    </div>
                                    <div className={`ml-4 mt-2 upload-image text-sm absolute top-12 z-50 w-24 object-scale-down opacity-0 focus:outline-none group-hover:opacity-100`}>
                                        <label
                                            htmlFor="contained-button-file"
                                            style={{
                                                paddingTop: 6,
                                                paddingBottom: 6,
                                                paddingLeft: 3,
                                                paddingRight: 3,
                                                borderWidth: 2,
                                                borderColor: "#A5924B",
                                                cursor: "pointer"
                                            }}>
                                            <PublishIcon className={classes.publishIcon} /> <span style={{ color: "#513654" }}>上載圖片</span>
                                        </label>
                                        <input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handlePicSelect}
                                            style={{
                                                position: "absolute",
                                                width: "1px",
                                                height: "1px",
                                                padding: 0,
                                                margin: "-1px",
                                                overflow: "hidden",
                                                clip: "rect(0, 0, 0, 0)",
                                                border: 0
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )
                        }
                        {/* username */}
                        <div className='flex flex-col pt-48 '>
                            <div className='flex flex-col items-center'>
                                <h1  className='-mr-10  font-semibold text-white break-normal block text-2xl leading-6 w-72 break-words'>
                                    {userProfile.username}
                                </h1>
                                <p className='-mr-10 text-sm text-gray-300'>
                                    會員名稱
                                </p>
                            </div>
                            <div className='flex py-12 md:gap-x-24 gap-x-6'>
                                <div className='flex flex-col items-center'>
                                    <h1 className='text-lg font-semibold text-white'>{userProfile.created_at.substring(0, 10)}</h1>
                                    <p className='text-sm text-gray-300'>
                                        註冊日期
                                 </p>
                                </div>
                                <Divider style={{ width: '3px', background: 'white' }} flexItem orientation='vertical' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='text-lg font-semibold text-white'> {userProfile.point || 0}</h1>
                                    <p className='text-sm text-gray-300'>
                                        獎賞分數
                                 </p>
                                </div>
                                <Divider style={{ width: '3px', background: 'white' }} flexItem orientation='vertical' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='text-lg font-semibold text-white'> {userProfile.Membership}</h1>
                                    <p className='text-sm text-gray-300'>
                                        會員階級
                                 </p>
                                </div>
                            </div>
                        </div>


                        <div className="pt-4 grid grid-cols-1 gap-2  max-w-screen-sm">
                        <p className="text-sm text-gray-600 ml-7 md:ml-0">點擊分享以下連結成為推薦人：</p>
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
                                        <span className="text-sm text-white" href={referralURL}>{referralURL}</span>
                                    </div>
                                </button>
                            </Tooltip>
                        </ClickAwayListener>
                    </div >
                    </div>
                }
            </div>
            <Divider
                className={classes.divider}
            />
            <div className='flex flex-col lg:flex-row items-start  md:pl-20 justify-center pb-20  gap-x-8 '>
                <OwnedCourse
                    purchasedCourses={purchasedCourses}
                />
                <ReferralList />
            </div>
        </div >
    )
}

export default UserProfile

