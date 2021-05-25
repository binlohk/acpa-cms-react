import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext'

import { useFormik } from "formik";
import * as Yup from "yup";
import { storeToken } from '../../../../services/api/authHelper'

function LoginForm() {
    const [loginError, setLoginError] = useState(false)

    const { user, setUser } = useContext(UserContext);
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
                    setUser({
                        id: response.data.user.id,
                        email: response.data.user.email,
                        username: response.data.username
                    })
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = formik.values
        console.log(email, password)
        try {
            if (Object.keys(formik.errors).length === 0) {
                const response = await axios.post(`http://localhost:1337/auth/local`, {
                    identifier: email,
                    password: password
                })
                setUser({
                    id: response.data.user.id,
                    email: response.data.user.email,
                    username: response.data.username
                })
                storeToken(response.data.jwt)
                history.push(`/user/${response.data.user.id}`);
                console.log('data posted')
            }
        } catch (e) {
            setLoginError(true)
            console.log(e)
        }
    }

    return (
        <div className='mt-8 mb-6'>
            <form className='bg-grey-lighter min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        {loginError && <p class="text-red-500 text-xs italic">Invalid email or password please login again</p>}
                        <h1 className='mb-8 text-3xl text-center'>Login</h1>
                        <form
                            onClick={formik.handleSubmit}
                        >
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
                                value={formik.values.password}
                                placeholder='Password'
                                onChange={formik.handleChange}
                            />
                            <div className='w-12 h-auto'>
                                <input type="checkbox" class="checked:bg-blue-600 checked:border-transparent ..." />
                            </div>
                            <button
                                type='submit'
                                className='w-full text-center py-3 rounded bg-green text-gray-800 hover:bg-green-dark focus:outline-none my-1'
                            // onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                    <div className='text-grey-dark mt-6'>
                        Not yet registered?
                    <Link className='no-underline border-b border-blue text-blue' to='./signup'>
                            Sign up
                    </Link>.
                </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm
