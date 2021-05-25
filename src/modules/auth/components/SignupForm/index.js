import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from "yup";

function SignupForm() {
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
                .email("Invalid email format")
                .required("email is required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters are needed")
                .required("password is required!"),
        }),
        validateOnBlur: false,
        onSubmit: async () => {
            const { username, email, password } = formik.values
            try {
                if (Object.keys(formik.errors).length === 0) {
                    const result = await axios.post(`http://localhost:1337/auth/local/register`, {
                        username: username,
                        email: email,
                        password: password
                    })
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
        <div className='mt-8 mb-6'>
            <form className='bg-grey-lighter min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
                        {signupError && <p class="text-red-500 text-xs italic">Email is taken, please try again.</p>}
                        <form
                            onClick={formik.handleSubmit}
                        >
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
                                type='submit'
                                className='w-full text-center py-3 rounded bg-green text-gray-800 hover:bg-green-dark focus:outline-none my-1'
                            >Create Account</button>
                        </form>
                        <div className='text-center text-sm text-grey-dark mt-4'>
                            By signing up, you agree to the
                        <Link className='no-underline border-b border-grey-dark text-grey-dark' to='#'>
                                Terms of Service
                        </Link> and
                        <Link className='no-underline border-b border-grey-dark text-grey-dark' to='#'>
                                Privacy Policy
                        </Link>
                        </div>
                    </div>

                    <div className='text-grey-dark mt-6'>
                        Already have an account?
                    <Link className='no-underline border-b border-blue text-blue' to='./login'>
                            Log in
                    </Link>.
                </div>
                </div>
            </form>
        </div>
    );
}

export default SignupForm