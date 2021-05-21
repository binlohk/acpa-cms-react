import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

function SignupForm() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const [emailError, setEmailError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email, password } = formData
        try {
            if (isEmail(email)) {
                await axios.post(`http://localhost:1337/auth/local/register`, {
                    username: username,
                    email: email,
                    password: password
                })
                console.log('data posted')
            } else {
                setEmailError(true)
            }
        } catch (e) {
            console.log(e)
        }
    }


    const handleChange = async (e) => {
        setEmailError(false)
        if (e.target.name === 'email') {
            isEmail(e.target.value) ? setFormData({ ...formData, [e.target.name]: e.target.value }) : setEmailError(true)
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleBlur = () => {
        setEmailError(false)
    }

    return (
        <div className='mt-8 mb-6'>
            <form className='bg-grey-lighter min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
                        <input
                            type='text'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='username'
                            placeholder='username'
                            onChange={handleChange}
                        />

                        <input
                            type='text'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='email'
                            placeholder='Email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {emailError && <p class="text-red-500 text-xs italic">Please enter valid email.</p>}

                        <input
                            type='password'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                        />

                        <button
                            className='w-full text-center py-3 rounded bg-green text-gray-800 hover:bg-green-dark focus:outline-none my-1'
                            onClick={handleSubmit}
                        >Create Account</button>

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