import React, { useState, useEffect, useContext } from 'react';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext'

const ReferralList = () => {
    const { getUser } = useContext(UserContext);
    const user = getUser();

    const [referreeData, setReferreeData] = useState(null);
    const [referrerData, setReferrerData] = useState(null);

    const fetchReferralData = async () => {
        try {
            const result = await httpClient.get(`http://localhost:1337/user-referrals`);
            const referrees = result.data.filter(data=>data.referral_referree.id!=user.id);
            setReferreeData(referrees);
            const referrers = result.data.filter(data=>data.referral_referree.id==user.id);
            if(referrers){
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
        <div className='m-6 text-white'>
            {referrerData &&
                referrerData.map((referral, key)=>{
                    return (<div key={`referree-${key}`}>
                        <div>你的邀請人</div>
                        <div>用戶名稱: {referral.referral_referrer.username}</div>
                        <div>用戶電郵: {referral.referral_referrer.email}</div>
                        <div>邀請日期: {referral.referral_referrer.updated_at}</div>
                    </div>)
                })
            }
            <br/>
            {referreeData ? 
                <><div>被你邀請的用戶</div>
                {referreeData.map((referral, key)=>{
                    return (<div key={`referree-${key}`}>
                        
                        <div>用戶名稱: {referral.referral_referree.username}</div>
                        <div>用戶電郵: {referral.referral_referree.email}</div>
                        <div>日期: {referral.referral_referree.updated_at}</div>
                    </div>)
                })}</>
                :
                '你尚未邀請任何用戶加入。'
            }
        </div>
    )
}

export default ReferralList
