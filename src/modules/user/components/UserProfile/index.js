import axios from 'axios'
import { httpClient } from '../../../../services/api/axiosHelper'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken';
import { storeUser, storeToken, getToken, removeToken } from '../../../../services/authService'
import { Button, TextField, InputAdornment, Input, InputLabel, FormControl, makeStyles } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
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
        "&:hover": {
            cursor: 'pointer'
        }
    },
    hoverEffect: {
        "&:hover": {
            cursor: 'pointer'
        }
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
                const token = getToken()
                const decodedPayload = jwt.decode(token);
                const currentTime = Date.now() / 1000
                if (decodedPayload.exp === currentTime) {
                    const response = await axios.post(`http://localhost:1337/users-permissions/refreshToken`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    storeToken(response)
                    const loginUser = await axios.get(`http://localhost:1337/users/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    storeUser(loginUser.data)
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
        if(!currentFormData){
            return alert('你尚未選擇一張相片!');
        }
        if (!currentFormData.get('files').name.match(/.(jpg|jpeg|png|gif)$/i)){
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
    useEffect(()=>{fetchUserCourses()},[]);

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(referralURL);
    }

    return (
        <div className='m-6 text-white'>
            <div className='max-w-5xl' onClick={() => { navigator.clipboard.writeText(referralURL) }}>
            {currentFormData &&
                <div>
                    <div>{currentFormData.get('files').name}</div>
                    <img src={URL.createObjectURL(currentFormData.get('files'))}/>
                </div>
            }
                <FormControl fullWidth className={classes.hoverEffect}>
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
            <br/>
            {userProfile&&
                <div >
                        {userProfile.profilePicture && 
                            <img src={`${process.env.REACT_APP_BACKEND_SERVER}${userProfile.profilePicture.url}`}/>
                        }
                        <div>用戶名稱: {userProfile.username}</div>
                        <div>注冊日期: {userProfile.created_at}</div>
                        <div>獎賞分數: {userProfile.point}</div>
                        <div>會員階級: {userProfile.Membership}</div>
                        <FormControl fullWidth className={classes.hoverEffect} >
                            <InputLabel htmlFor="input-with-icon-adornment" className={classes.textColor}>注冊連結</InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                endAdornment={
                                    <InputAdornment position="start">
                                        <FileCopy className={classes.copyButton} 
                                        onClick={handleCopyLink}/>
                                    </InputAdornment>
                                }
                                value={referralURL}
                                className={classes.textColor}
                            />
                        </FormControl>
                </div>
            }
            <ReferralList/>
            {
            purchasedCourses ?
            <div>
                <div>你擁有的課程: </div>
                {
                    purchasedCourses.map((course,index)=><div key={`courseName-${index}`}>
                        <div>課程名稱: {course.title}</div>
                        <div>購買日期: {course.published_at}</div>
                    </div>)
                }
            </div>
            :
            <div>你尚未購買任何課程</div>
            }
        </div>
    )
}

export default UserProfile

