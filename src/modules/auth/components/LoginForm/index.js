import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext'

import { useFormik } from "formik";
import * as Yup from "yup";
import { storeToken, storeUser } from '../../../../services/authService'

function LoginForm() {
    const [loginError, setLoginError] = useState(false)
    const history = useHistory()

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
                    history.push(`/user/${response.data.user.id}`);
                    console.log('data posted')
                }
            } catch (e) {
                setLoginError(true)
                console.log(e)
            }
        }
    });

    return (
        <div className='mt-8 mb-6'>
            <form className='bg-grey-lighter min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        {loginError && <p class="text-red-500 text-xs italic">Invalid email or password please login again</p>}
                        <h1 className='mb-8 text-gray-700 text-3xl text-center'>登入</h1>
                        <form
                            className='mb-4'
                        >
                            {formik.errors.email && formik.touched.email && <p class="text-red-500 text-xs italic">{formik.errors.email}</p>}
                            <input
                                type='text'
                                className='shadow appearance-none border rounded w-full h-12 py-2 mb-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline'
                                name='email'
                                placeholder='Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && formik.touched.password && <p class="text-red-500 text-xs italic">{formik.errors.password}</p>}
                            <input
                                type='password'
                                className='shadow appearance-none border rounded w-full h-12 py-2 mb-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline'
                                name='password'
                                value={formik.values.password}
                                placeholder='Password'
                                onChange={formik.handleChange}
                            />
                            <div className='w-12 h-auto'>
                                <input type="checkbox" class="checked:bg-blue-600 checked:border-transparent ..." />
                            </div>
                            <div class="flex items-center justify-between">
                                <button onClick={formik.handleSubmit} class="bg-indigo-700 hover:bg-blue-dark text-white font-bold w-full h-12 py-2 px-4  rounded focus:outline-none focus:shadow-outline" type="submit">
                                    按此登入
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='text-grey-dark mt-6'>
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
