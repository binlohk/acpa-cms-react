import axios from 'axios'
import { httpClient } from '../../../../services/api/axiosHelper'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken';
import { storeUser, storeToken, getToken, removeToken } from '../../../../services/authService'
import { Button, TextField, InputAdornment, Input, InputLabel, FormControl, makeStyles, Divider } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import ReferralList from './referralList';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    copyableLink: {
        backgroundColor: 'gray'
    },
    textColor: {
        color: 'gray',
        width: '50%',
        "&:hover": {
            cursor: 'pointer'
        }
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
}));

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [currentFormData, setFormData] = useState(null);
    const [purchasedCourses, setPurchasedCourses] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
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

    const handlePicSelect = async (event) => {
        const formData = new FormData();
        formData.append('files', event.target.files[0]);
        formData.append('ref', 'user');
        formData.append('source', 'users-permissions');
        formData.append('refId', userProfile.id);
        formData.append('field', 'profilePicture');
        setFormData(formData);
    }
    const uploadPic = async (event) => {
        if (!currentFormData) {
            return alert('你尚未選擇一張相片!');
        }
        if (!currentFormData.get('files').name.match(/.(jpg|jpeg|png|gif)$/i)) {
            alert('請選擇一張相片!');
        }
        try {
            await httpClient.post('/upload', currentFormData);
            setFormData(null);
            return alert('上載成功!');
        } catch (e) {
            return alert('上載系統出現錯誤!');
        }
    }

    const fetchUserCourses = async () => {
        const response = await httpClient.get(`http://localhost:1337/courses`)
        const data = response.data
        const purchased = data.filter(item => item.purchased !== false)
        setPurchasedCourses([...purchased])
    }
    useEffect(() => { fetchUserCourses() }, []);

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(referralURL);
    }

    return (
        <div className='m-6 h-screen bg-gray-200 text-gray-600'>
            {/* user info */}
            <div>
                {userProfile &&
                    /** user icon */
                    <div className='flex flex-col items-center'>
                        {userProfile.profilePicture &&
                            <div className='rounded-full border-2 border-yellow-700 bg-white p-4 absolute top-20'>
                                <img className='w-24 h-24 object-contain' src={`${process.env.REACT_APP_BACKEND_SERVER}${userProfile.profilePicture.url}`} />
                            </div>
                        }
                        <div className='pt-28 flex flex-col items-center'>
                            <div className='flex items-center justify-center gap-x-4 ml-16'>
                                <div className='flex flex-col items-center'>
                                    <h1 className='text-4xl font-semibold'>
                                        {userProfile.username}
                                    </h1>
                                    <p className='text-sm text-gray-500'>
                                        會員名稱
                                </p>
                                </div>
                                <button>
                                    <SettingsIcon />
                                    {/* upload user icons */}
                                </button>
                                <FormControl fullWidth className={`${classes.hoverEffect}`}>
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={handlePicSelect}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span">
                                            Select
                        </Button>
                                    </label>
                                    <label>
                                        <Button variant="contained" color="primary" component="span" onClick={uploadPic}>
                                            Upload
                        </Button>
                                    </label>
                                </FormControl>
                            </div>
                            <div className='flex gap-x-24 py-12'>
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-semibold text-gray-700 text-lg'>{userProfile.created_at.substring(0, 10)}</h1>
                                    <p className='text-sm text-gray-500'>
                                        註冊日期
                                 </p>
                                </div>
                                <Divider style={{ width: '3px' }} flexItem orientation='vertical' />
                                {/*  */}
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-semibold text-gray-700 text-lg'> {userProfile.point || 0}</h1>
                                    <p className='text-sm text-gray-500'>
                                        獎賞分數
                                 </p>
                                </div>
                                <Divider style={{ width: '3px' }} flexItem orientation='vertical' />
                                <div className='flex flex-col items-center'>
                                    <h1 className='font-semibold text-gray-700 text-lg'> {userProfile.Membership}</h1>
                                    <p className='text-sm text-gray-500'>
                                        會員階級
                                 </p>
                                </div>
                            </div>
                        </div>
                        {/* referral link */}
                        <FormControl fullWidth className={`${classes.hoverEffect} ${classes.registerLink}`}>
                            <p className={classes.textColor}>注冊連結</p>
                            <Input
                                id="input-with-icon-adornment"
                                endAdornment={
                                    <InputAdornment position="start">
                                        <FileCopy
                                            onClick={handleCopyLink}
                                            className={classes.copyButton} />
                                    </InputAdornment>
                                }
                                value={referralURL}
                                className={classes.textColor}
                            />
                        </FormControl>
                    </div>
                }

            </div>
            <div className='max-w-5xl' onClick={() => { navigator.clipboard.writeText(referralURL) }}>
                {currentFormData &&
                    <div>
                        <div>{currentFormData.get('files').name}</div>
                        <img src={URL.createObjectURL(currentFormData.get('files'))} />
                    </div>
                }

            </div>
            <br />
            <div className='flex'>
                <ReferralList />
                {
                    purchasedCourses ?
                        <div>
                            <div>你擁有的課程: </div>
                            {
                                purchasedCourses.map((course, index) => <div key={`courseName-${index}`}>
                                    <div>課程名稱: {course.title}</div>
                                    <div>購買日期: {course.published_at}</div>
                                </div>)
                            }
                        </div>
                        :
                        <div>你尚未購買任何課程</div>
                }
            </div>
        </div>
    )
}

export default UserProfile

