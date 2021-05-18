import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = formData
        try {
            const response = await axios.post(`http://localhost:1337/auth/local`, {
                identifier: email,
                password: password
            })
            console.log('data posted', response.data)
        } catch (e) {
            console.log(e)
        }
    }


    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div classNameName='mt-8 mb-6'>
            <form className='bg-grey-lighter min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        <h1 className='mb-8 text-3xl text-center'>Login</h1>

                        <input
                            type='text'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='email'
                            placeholder='Email'
                            onChange={handleChange}
                        />

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
                        >Login</button>
                    </div>
                    <div className='text-grey-dark mt-6'>
                        Not yet registered?
                    <Link className='no-underline border-b border-blue text-blue' to='./login'>
                            Sign up
                    </Link>.
                </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm
