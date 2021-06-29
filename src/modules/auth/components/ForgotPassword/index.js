import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";

function ForgotPassword() {
    const [emailAlert, setEmailAlert] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("請輸入正確的電郵格式")
                .required("請輸入電郵"),
        }),
        validateOnBlur: false,
        onSubmit: async () => {
            const { email } = formik.values
            try {
                if (Object.keys(formik.errors).length === 0) {
                    const result = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/auth/forgot-password`, {
                        email,
                    });
                    console.log(result, 'result')
                    if (result.status === 200) {
                        setEmailAlert(true)
                    }
                }
                console.log('data posted')

            } catch (e) {
                console.log(e)
            }
        }
    });

    const handleFocus = () => {
        setEmailAlert(false)
    }

    return (
        <div>
            <div className="relative z-10 flex-auto flex items-center justify-center text-lg text-center text-white py-16 px-4 sm:px-6 lg:px-8" >
                <div className="w-full max-w-lg">
                    <h1 className="text-center mb-2 text-gray-300 text-xl font-semibold">重新設定密碼</h1>
                    <p className="text-center text-xl mb-10">請輸入您的電郵，我們將會發送一個連結到您的電郵。</p>

                    <form>
                        <div className="relative">
                            <input
                                type='text'
                                name='email'
                                placeholder='Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onFocus={handleFocus}
                                className="text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none"
                                placeholder="Email address" />
                            {
                                emailAlert && <div className="mt-4 flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert" >
                                    <p>我們發送了電郵到以上地址，請檢查您的郵件</p>
                                </div>
                            }
                        </div>
                        <button onClick={formik.handleSubmit} class="lock w-full py-2 px-3 border border-transparent rounded-md font-medium bg-gray-700 shadow-sm sm:text-sm mt-4 hover:bg-gray-600 focus:outline-none">
                            按此重設
                         </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
