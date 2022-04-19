import React, { useState, useEffect, useContext } from 'react';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    accountCircleIcon: {
        width: theme.spacing(5),
        height: 'auto',
        margin: theme.spacing(0, 2, 0, 0),
        color: '#A5924B'
    },
    dateIcon: {
        width: theme.spacing(2),
        height: 'auto',
        margin: theme.spacing(0, 1, 0, 1),
    }
}));

const ReferralList = () => {
    const classes = useStyles();
    const { getUser } = useContext(UserContext);
    const user = getUser();

    const [referreeData, setReferreeData] = useState([]);
    const [referrerData, setReferrerData] = useState([]);

    const fetchReferralData = async () => {
        try {
            const result = await httpClient.get(`${process.env.REACT_APP_BACKEND_SERVER}/user-referrals`);
            const referrees = result.data.filter(data => data.referral_referrer.id == user.id);
            setReferreeData(referrees);
            const referrers = result.data.filter(data => data.referral_referree.id == user.id);
            if (referrers) {
                setReferrerData(referrers);
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        fetchReferralData();
    }, []);

    return (
        <div>
            {referrerData.length > 0 ?
                <><div className='font-semibold text-white'>你的邀請人</div>
                    {
                        referrerData.map((referral, key) => {
                            return (
                                <div className='flex items-center justify-start p-4 pr-6 my-4 bg-white rounded-lg gap-x-2 w-156' key={`referree-${key}`}>
                                    <AccountCircleIcon className={classes.accountCircleIcon} />
                                    <div>
                                        <div>用戶名稱: {referral.referral_referrer.username}</div>
                                        <div>邀請日期: {referral.referral_referrer.updated_at.substring(0, 10)}</div>
                                    </div>
                                </div>
                            )
                        })
                    }</>
                :
                null
            }
            {referreeData.length > 0 ?
                <><div className='font-semibold text-white'>被你邀請的用戶</div>
                    {referreeData.map((referral, key) => {
                        return (<div className='flex items-center justify-start p-4 pr-6 my-4 bg-white rounded-lg gap-x-2 w-156' key={`referree-${key}`}>
                            <AccountCircleIcon className={classes.accountCircleIcon} />
                            <div>
                                <div className='py-2 font-semibold text-black'>用戶名稱: {referral.referral_referree.username}</div>
                                <div className='flex items-center justify-start -ml-2'><DateRangeIcon className={classes.dateIcon} />日期: {referral.referral_referree.updated_at.substring(0, 10)}</div>
                            </div>
                        </div>)
                    })}</>
                :
                <>
                    <div className='font-semibold text-white ml-7 md:ml-0'>被你邀請的用戶</div>
                    <div className='flex items-center justify-start p-4 pr-6 my-4 bg-white rounded-lg gap-x-2 w-80 md:w-156 ml-7 md:ml-0'>
                        <AccountCircleIcon className={classes.accountCircleIcon} />
                        <div>
                            <div className='py-2 font-semibold text-black'>你尚未邀請任何用戶加入</div>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}

export default ReferralList
