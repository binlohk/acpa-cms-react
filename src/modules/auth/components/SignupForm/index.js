import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from "yup";

function SignupForm(props) {
    const { referralToken } = props.match.params;

    const [signupError, setSignupError] = useState(false)
    const formik = useFormik({
        initialValues: {
            username: 'winnie',
            email: 'wongw859@gmail.com',
            password: 'strapiPassword',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("username is required!"),
            email: Yup.string()
                .email("請輸入正確的電郵格式")
                .required("請輸入電郵"),
            password: Yup.string()
                .min(8, "請輸入至少8個字母")
                .required("請輸入密碼"),
        }),
        validateOnBlur: false,
        onSubmit: async () => {
            const { username, email, password } = formik.values
            try {
                if (Object.keys(formik.errors).length === 0) {
                    let result = null;
                    if(referralToken){
                        result = await axios.post(`http://localhost:1337/auth/local/register/${referralToken}`, {
                            username: username,
                            email: email,
                            password: password
                        });
                    } else {
                        result = await axios.post(`http://localhost:1337/auth/local/register`, {
                            username: username,
                            email: email,
                            password: password
                        });
                    }
                    console.log('data posted')
                    if (result) {
                        window.location.href = '/login'
                    }
                }
            } catch (e) {
                setSignupError(true)
                console.log(e)
            }
        }
    });

    return (
        <div>
            <form
                style={{ background: 'rgba(81,58,84, 0.75)' }}
                className='bg-grey-lighter min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        <h1 className='mb-8 text-3xl text-center'>用戶注冊</h1>
                        {signupError && <p class="text-red-500 text-xs italic">Email is taken, please try again.</p>}
                        {formik.errors.username && formik.touched.username && <p class="text-red-500 text-xs italic">{formik.errors.username}</p>}
                        <input
                            type='text'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='username'
                            placeholder='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && <p class="text-red-500 text-xs italic">{formik.errors.email}</p>}
                        <input
                            type='text'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='email'
                            placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && <p class="text-red-500 text-xs italic">{formik.errors.password}</p>}
                        <input
                            type='password'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='password'
                            placeholder='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <button
                            onClick={formik.handleSubmit}
                            type='submit'
                            className='bg-indigo-700 hover:bg-blue-dark text-white font-bold w-full h-12 pt-2 px-4  rounded focus:outline-none focus:shadow-outline'
                        >開戶</button>
                        <div className='text-center text-sm text-grey-dark mt-8'>
                            By signing up, you agree to the
                        <Link className='no-underline border-b border-grey-dark text-grey-dark' to='#'>
                                <span> Terms of Service</span>
                            </Link> and
                        <Link className='no-underline border-b border-grey-dark text-grey-dark' to='#'>
                                <span> Privacy Policy </span>
                            </Link>
                        </div>
                    </div>

                    <div className='text-white mt-6'>
                        我已經有帳戶
                    <Link className='ml-2 border-b-4s' to='./login'>
                            (按此登入)
                    </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignupForm