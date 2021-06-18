import axios from 'axios'
import { httpClient } from '../../../../services/api/axiosHelper'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken';
import { storeUser, storeToken, getToken, removeToken } from '../../../../services/authService'
import { Button, TextField, InputAdornment, Input, InputLabel, FormControl, makeStyles, Divider } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import PublishIcon from '@material-ui/icons/Publish';
import SettingsIcon from '@material-ui/icons/Settings';
import ReferralList from './referralList';
import OwnedCourse from '../OwnedCourse';

const useStyles = makeStyles((theme) => ({
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

    const referralURL = userProfile ? `${process.env.REACT_APP_FRONTEND_SERVER}/signup/${userProfile.referralToken}` : '';
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
        const response = await httpClient.get(`http://localhost:1337/courses`)
        const data = response.data
        const purchased = data.filter(item => item.purchased !== false)
        setPurchasedCourses([...purchased])
    }
    useEffect(() => { fetchUserCourses() }, []);

    const handleCopyLink = async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(referralURL);
    }

    return (
        <div className=' text-gray-600'>
            {/* user info */}
            <div>
                {userProfile &&
                    /** user icon */
                    <div className='flex flex-col items-center'>
                        {userProfile.profilePicture &&
                            <>
                                <div className={`${classes.imgDiv} group rounded-full border-2 border-yellow-700 bg-white p-4 absolute top-36 left-50`}>
                                    <img className={`z-50 w-24 h-24 object-contain opacity-100 group-hover:opacity-0`} src={`${process.env.REACT_APP_BACKEND_SERVER}${userProfile.profilePicture.url}`} />
                                    <input
                                        accept="image/*"
                                        className={`upload-image text-sm absolute top-10 z-50 w-24 h-24 object-scale-down opacity-0 focus:outline-none group-hover:opacity-100`}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={handlePicSelect}
                                    />
                                </div>
                            </>
                        }
                        {/* username */}
                        <div className='pt-48 flex flex-col items-center '>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-4xl text-white font-semibold'>
                                    {userProfile.username}
                                </h1>
                                <p className='text-sm text-gray-300'>
                                    會員名稱
                                </p>
                            </div>
                            <div className='flex gap-x-24 py-12'>
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-semibold text-white text-lg'>{userProfile.created_at.substring(0, 10)}</h1>
                                    <p className='text-sm text-gray-300'>
                                        註冊日期
                                 </p>
                                </div>
                                <Divider style={{ width: '3px', background: 'white' }} flexItem orientation='vertical' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-semibold text-white text-lg'> {userProfile.point || 0}</h1>
                                    <p className='text-sm text-gray-300'>
                                        獎賞分數
                                 </p>
                                </div>
                                <Divider style={{ width: '3px', background: 'white' }} flexItem orientation='vertical' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-semibold text-white text-lg'> {userProfile.Membership}</h1>
                                    <p className='text-sm text-gray-300'>
                                        會員階級
                                 </p>
                                </div>
                            </div>
                        </div>


                        {/* referral link */}
                        <FormControl className={`${classes.hoverEffect} ${classes.registerLink}`}>
                            <p className='text-white font-semibold'>注冊連結</p>
                            <div className='flex items-center justify-between bg-white rounded-md mt-2 p-2 w-192'>
                                {/* icon */}
                                <div className='flex items-center justify-center'>
                                    <div className='flex items-center justify-center border-r-2 border-gray-400 px-2 '>
                                        <FileCopy
                                            className={classes.copyButton} />
                                    </div>
                                    {/* link */}
                                    <p className='text-gray-400 max-w-sm overflow-hidden p-2'>
                                        {referralURL}
                                    </p>
                                </div>
                                {/* copy btn */}
                                <button className='bg-blue-500 text-white rounded-xl p-2' onClick={handleCopyLink}>
                                    複製連結
                                </button>
                            </div>
                        </FormControl>
                    </div>
                }
            </div>
            <Divider
                className={classes.divider}
            />
            <div className='flex items-start justify-center gap-x-8 pb-48'>
                <OwnedCourse
                    purchasedCourses={purchasedCourses}
                />
                <ReferralList />
            </div>
        </div>
    )
}

export default UserProfile

