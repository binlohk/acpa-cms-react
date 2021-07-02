import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from "yup";

import SnackbarContent from '@material-ui/core/SnackbarContent';

function SignupForm(props) {
    const { referralToken } = props.match.params;

    const [signupError, setSignupError] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
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
                    if (referralToken) {
                        result = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/local/register/${referralToken}`, {
                            username: username,
                            email: email,
                            password: password
                        });
                    } else {
                        result = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/local/register`, {
                            username: username,
                            email: email,
                            password: password
                        });
                    }
                    console.log('data posted')
                    if (result) {
                        //notification for email sent
                        setSignupError(false)
                        setOpenSnackbar(true);
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
                className='flex flex-col min-h-screen bg-grey-lighter'>
                <div className='container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto'>
                    <div className='w-full px-6 py-8 text-black bg-white rounded shadow-md'>
                        <h1 className='mb-8 text-3xl text-center'>用戶注冊</h1>
                        {openSnackbar &&
                            <div className='mb-2'>
                                <SnackbarContent
                                    message={
                                        `我們已經發送了到以下電郵地址，請查看您的電子郵件箱。`
                                    }
                                />
                            </div>
                        }
                        {signupError && <p class="text-red-500 text-xs italic">用戶名稱或電郵已經被注冊</p>}
                        {formik.errors.username && formik.touched.username && <p class="text-red-500 text-xs italic">{formik.errors.username}</p>}
                        <input
                            type='text'
                            className='block w-full p-3 mb-4 border rounded border-grey-light'
                            name='username'
                            placeholder='用戶名稱'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && <p class="text-red-500 text-xs italic">{formik.errors.email}</p>}
                        <input
                            type='text'
                            className='block w-full p-3 mb-4 border rounded border-grey-light'
                            name='email'
                            placeholder='電郵'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && <p class="text-red-500 text-xs italic">{formik.errors.password}</p>}
                        <input
                            type='password'
                            className='block w-full p-3 mb-4 border rounded border-grey-light'
                            name='password'
                            placeholder='密碼'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <button
                            onClick={formik.handleSubmit}
                            type='submit'
                            className='w-full h-12 px-4 pt-2 font-bold text-white bg-indigo-700 rounded hover:bg-blue-dark focus:outline-none focus:shadow-outline'
                        >開戶</button>
                        <div className='mt-8 text-sm text-center text-grey-dark'>
                            By signing up, you agree to the
                        <Link className='no-underline border-b border-grey-dark text-grey-dark' to='#'>
                                <span> Terms of Service</span>
                            </Link> and
                        <Link className='no-underline border-b border-grey-dark text-grey-dark' to='#'>
                                <span> Privacy Policy </span>
                            </Link>
                        </div>
                    </div>

                    <div className='mt-6 text-white'>
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