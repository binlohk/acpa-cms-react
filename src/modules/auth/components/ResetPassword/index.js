import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import ErrorAlert from '../../../utilComponents/ErrorAlert'

function ResetPassword(props) {
    const { resetPasswordToken } = props.match.params;
    console.log(props.match.params, 'props.match.params')
    const [backendError, setBackendError] = useState(false)
    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "請輸入至少8個字母")
                .required("請輸入密碼"),
        }),
        validateOnBlur: false,
        onSubmit: async () => {
            const { password } = formik.values
            try {
                if (Object.keys(formik.errors).length === 0) {
                    const result = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/reset-password`, {
                        password,
                        code: resetPasswordToken,
                    });
                    console.log(result, 'result')
                    console.log('data posted')
                }
            } catch (e) {
                const message = e.response.data.message[0].messages[0].message
                if (message === '確認碼已經過期') {
                    setBackendError(true)
                }
                console.log(e)
            }
        }
    });

    const handleFocus = () => {
        setBackendError(false)
    }

    return (
        <div>
            <div className="relative z-10 flex-auto flex items-center justify-center text-lg text-center text-white py-16 px-4 sm:px-6 lg:px-8" >
                <div className="w-full max-w-lg">
                    <h1 className="text-center mb-2 text-gray-300 text-xl font-semibold">請輸入新密碼</h1>
                    <form>
                        <div className="relative">
                            <input
                                type='password'
                                className='text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none'
                                name='password'
                                placeholder='Password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onFocus={handleFocus}
                            />
                        </div>
                        {formik.errors.password && formik.touched.password && <ErrorAlert class="text-red-500 text-xs italic">{formik.errors.password}</ErrorAlert>}
                        {backendError && <ErrorAlert>此要求已經過期，請<Link to='/forgot-password' className='font-bold'>按此</Link>再發送要求</ErrorAlert>}
                        <button onClick={formik.handleSubmit} class="lock w-full py-2 px-3 border border-transparent rounded-md font-medium bg-gray-700 shadow-sm sm:text-sm mt-4 hover:bg-gray-600 focus:outline-none">
                            按此重設
                         </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
