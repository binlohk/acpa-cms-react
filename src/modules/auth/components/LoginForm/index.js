import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext'
import isEmail from 'validator/lib/isEmail';
import { storeToken } from '../../../../services/api/authHelper'

function LoginForm() {
    const [formData, setFormData] = useState({ email: 'wongw859@gmail.com', password: 'strapiPassword' })
    const [emailError, setEmailError] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [formErrors, setFormErrors] = useState([{ email: '', password: '' }])

    const { user, setUser } = useContext(UserContext);
    const history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = formData
        try {
            if (isEmail(email)) {
                const response = await axios.post(`http://localhost:1337/auth/local`, {
                    identifier: email,
                    password: password
                })
                setUser(({
                    id: response.data.user.id,
                    email: response.data.user.email,
                    username: response.data.username
                }))
                storeToken(response.data.jwt)
                history.push(`/user/${response.data.user.id}`);
                console.log('data posted')
            } else {
                setEmailValid(true)
            }
        } catch (e) {
            setLoginError(true)
            console.log(e)
        }
    }


    const handleChange = async (e) => {
        setLoginError(false)
        if (e.target.name === 'email') {
            isEmail(e.target.value) ? setFormData({ ...formData, [e.target.name]: e.target.value }) && setEmailValid(false) : setEmailValid(true)
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleBlur = () => {
        setEmailValid(false)
    }

    return (
        <div className='mt-8 mb-6'>
            <form className='bg-grey-lighter min-h-screen flex flex-col'>
                <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
                    <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                        {loginError && <p class="text-red-500 text-xs italic">Invalid email or password please login again</p>}
                        <h1 className='mb-8 text-3xl text-center'>Login</h1>
                        {emailValid && <p class="text-red-500 text-xs italic">Please enter valid email.</p>}
                        <input
                            type='text'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <input
                            type='password'
                            className='block border border-grey-light w-full p-3 rounded mb-4'
                            name='password'
                            value={formData.password}
                            placeholder='Password'
                            onChange={handleChange}
                        />
                        <button
                            className='w-full text-center py-3 rounded bg-green text-gray-800 hover:bg-green-dark focus:outline-none my-1'
                            onClick={(handleSubmit)}
                        >Login</button>
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
