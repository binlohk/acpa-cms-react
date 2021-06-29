import React, { useState, useEffect, useContext } from 'react';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ReferralList = () => {
    const { getUser } = useContext(UserContext);
    const user = getUser();

    const [referreeData, setReferreeData] = useState([]);
    const [referrerData, setReferrerData] = useState([]);

    const fetchReferralData = async () => {
        try {
            const result = await httpClient.get(`process.env.REACT_APP_BACKEND/user-referrals`);
            const referrees = result.data.filter(data => data.referral_referree.id != user.id);
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
                <><div className='text-white font-semibold'>你的邀請人</div>
                    {
                        referrerData.map((referral, key) => {
                            return (
                                <div className='flex items-center justify-start gap-x-2 bg-white rounded-lg my-4 p-4 pr-6 w-156' key={`referree-${key}`}>
                                    <Avatar alt="U">
                                        <AccountCircleIcon />
                                    </Avatar>
                                    <div>
                                        <div>用戶名稱: {referral.referral_referrer.username}</div>
                                        <div>用戶電郵: {referral.referral_referrer.email}</div>
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
                <><div className='text-white font-semibold'>被你邀請的用戶</div>
                    {referreeData.map((referral, key) => {
                        return (<div className='flex items-center justify-start gap-x-2 bg-white rounded-lg my-4 p-4 pr-6 w-156' key={`referree-${key}`}>
                            <Avatar alt="U">
                                <AccountCircleIcon />
                            </Avatar>
                            <div>
                                <div>用戶名稱: {referral.referral_referree.username}</div>
                                <div>用戶電郵: {referral.referral_referree.email}</div>
                                <div>日期: {referral.referral_referree.updated_at.substring(0, 10)}</div>
                            </div>
                        </div>)
                    })}</>
                :
                '你尚未邀請任何用戶加入。'
            }
        </div>
    )
}

export default ReferralList
