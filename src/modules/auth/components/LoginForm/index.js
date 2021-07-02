import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext'
import { useFormik } from "formik";
import * as Yup from "yup";
import { storeToken, storeUser } from '../../../../services/authService'
import Button from '../../../utilComponents/Button'

function LoginForm() {
    const [loginError, setLoginError] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("請輸入正確的電郵格式")
                .required("請輸入電郵"),
            password: Yup.string()
                .min(8, "請輸入至少8個字母")
                .required("請輸入密碼"),
        }),
        validateOnBlur: false,
        onSubmit: async () => {
            const { email, password } = formik.values
            try {
                if (Object.keys(formik.errors).length === 0) {
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/local`, {
                        identifier: email,
                        password: password
                    })
                    storeUser(response.data.user)
                    storeToken(response.data.jwt)
                    window.location.href = `/user/${response.data.user.id}`
                    // console.log('data posted')
                }
            } catch (e) {
                setLoginError(true)
                console.log(e)
            }
        }
    });
    return (
        <div>
            <form
                style={{ background: 'rgba(81,58,84, 0.75)' }}
                className='flex flex-col w-full min-h-screen bg-grey-lighter'>
                <div className='container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto'>
                    <div className='w-full px-6 py-8 text-black bg-white rounded shadow-md'>
                        {loginError && <p class="text-center text-red-500 text-xs italic">電郵或名稱不正確，請重新輸入</p>}
                        <h1 className='mb-8 text-3xl text-center text-gray-700'>歡迎回來</h1>
                        <input
                            type='text'
                            className='w-full h-12 px-3 py-2 mb-2 leading-tight border rounded shadow appearance-none text-grey-darker focus:outline-none focus:shadow-outline'
                            name='email'
                            placeholder='電郵'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && <p class="text-red-500 mb-4 text-xs italic">{formik.errors.email}</p>}
                        <input
                            type='password'
                            className='w-full h-12 px-3 py-2 mb-2 leading-tight border rounded shadow appearance-none text-grey-darker focus:outline-none focus:shadow-outline'
                            name='password'
                            placeholder='密碼'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && <p class="text-red-500 mb-4 text-xs italic">{formik.errors.password}</p>}
                        <Button
                            onClickMethod={formik.handleSubmit}
                            color={'bg-indigo-700'}
                            hoverColor={'bg-blue-dark'}
                            textColor={'text-white'}
                        >
                            登入
                                </Button>
                        <div className='flex justify-center w-full h-auto pt-8'>
                            <Link to='/forgot-password'>
                                忘記密碼
                            </Link>
                        </div>
                    </div>
                    <div className='mt-6 text-white'>
                        尚未註冊?
                    <Link className='ml-2 no-underline border-b-4s' to='./signup'>
                            按此
                    </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm
