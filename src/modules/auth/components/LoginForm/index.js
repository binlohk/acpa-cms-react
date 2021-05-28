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
            email: 'wongw859@gmail.com',
            password: 'strapiPassword',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("email is required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters are needed")
                .required("password is required!"),
        }),
        validateOnBlur: false,
        onSubmit: async () => {
            const { email, password } = formik.values
            try {
                if (Object.keys(formik.errors).length === 0) {
                    const response = await axios.post(`http://localhost:1337/auth/local`, {
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
        <div
            style={{
                backgroundImage: `url("/law-firm-18.jpg")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <form
                style={{ background: 'rgba(81,58,84, 0.75)' }}
                className='bg-grey-lighter w-full min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        {loginError && <p class="text-red-500 text-xs italic">Invalid email or password please login again</p>}
                        <h1 className='mb-8 text-gray-700 text-3xl text-center'>歡迎回來</h1>
                        {formik.errors.email && formik.touched.email && <p class="text-red-500 text-xs italic">{formik.errors.email}</p>}
                        <input
                            type='text'
                            className='shadow appearance-none border rounded w-full h-12 py-2 mb-4 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline'
                            name='email'
                            placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && <p class="text-red-500 text-xs italic">{formik.errors.password}</p>}
                        <input
                            type='password'
                            className='shadow appearance-none border rounded w-full h-12 py-2 mb-4 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline'
                            name='password'
                            value={formik.values.password}
                            placeholder='Password'
                            onChange={formik.handleChange}
                        />
                        <Button
                            onClickMethod={formik.handleSubmit}
                            color={'bg-indigo-700'}
                            hoverColor={'bg-blue-dark'}
                            textColor={'text-white'}
                        >
                            登入
                                </Button>
                        <div className='flex justify-center w-full h-auto pt-8'>
                            忘記密碼
                            </div>
                    </div>
                    <div className='text-white mt-6'>
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
