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
                    const result = await axios.post(`http://localhost:1337/auth/reset-password`, {
                        password,
                        code: resetPasswordToken,
                    });
                    console.log(result, 'result')
                    console.log('data posted')
                }
            } catch (e) {
                const message = e.response.data.message[0].messages[0].message
                if (message === 'Incorrect code provided.') {
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
            {formik.errors.password && formik.touched.password && <p class="text-red-500 text-xs italic">{formik.errors.password}</p>}
            {backendError && <ErrorAlert>此要求已經過期，請<Link to='/forgot-password'>按此</Link>再發送要求</ErrorAlert>}
            <input
                type='password'
                className='block border border-grey-light w-full p-3 rounded mb-4'
                name='password'
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onFocus={handleFocus}
            />
            <button onClick={formik.handleSubmit}>
                提交
            </button>
        </div>
    )
}

export default ResetPassword
