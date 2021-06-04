import axios from 'axios'
import { httpClient } from '../../../../services/api/axiosHelper'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken';
import { storeUser, storeToken, getToken, removeToken } from '../../../../services/authService'
import { Button, TextField, InputAdornment, Input, InputLabel, FormControl, makeStyles } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    copyableLink: {
        backgroundColor: 'gray'
    },
    textColor:{
        color: 'gray',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    hoverEffect:{
        "&:hover": {
            cursor: 'pointer'
        }
    },
    copyButton:{
        "&:hover": {
            transform: 'scale(1.2)',
            color: 'white',
            cursor: 'pointer'
        }
    },
  }));

function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
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
                    // console.log(user.data, 'user', response.data, 'data')
                }
                const user = await httpClient.get(`/users/me`)
                setUserProfile(user.data);
                console.log(user.data, 'user')

            } catch (e) {
                console.log(e)
            }
        }
        fetchUserData()
    }, [])

    const referralURL = userProfile ? `${process.env.REACT_APP_FRONTEND_SERVER}/signup/${userProfile.referralToken}` : '';
    const classes = useStyles();

    return (
        <div className='m-6'>
            <div className='max-w-5xl' onClick={() => {navigator.clipboard.writeText(referralURL)}}>
                <FormControl fullWidth className={classes.hoverEffect}>
                    <InputLabel htmlFor="input-with-icon-adornment" className={classes.textColor}>注冊連結</InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    endAdornment={
                        <InputAdornment position="start">
                        <FileCopy className={classes.copyButton}/>
                        </InputAdornment>
                    }
                    value={referralURL}
                    className={classes.textColor}
                    />
                </FormControl>
            </div>
           
        </div>
    )
}

export default UserProfile
