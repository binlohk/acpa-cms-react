import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Parser } from "html-to-react";
import DOMPurify from "dompurify";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ReactMarkdown from "react-markdown";

function SignupForm(props) {
  const { referralToken } = props.match.params;

  const [signupError, setSignupError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [api, ApiReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("isloading", isLoading);
    var requestOptions = {
      method: "GET",
    };
    fetch(
      `api/latest-news`,
      requestOptions
    ).then(apiResponse => {
      apiResponse.text().then(resTxt => {
        try {
          ApiReply(JSON.parse(resTxt)[0]);
        } catch {
          
        }
      })
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("請輸入正確的電郵格式").required("請輸入電郵"),
      password: Yup.string().min(8, "請輸入至少8個字母").required("請輸入密碼"),
    }),
    validateOnBlur: false,
    onSubmit: async () => {
      setIsLoading(true);
      const {  email, password } = formik.values;
      try {
        if (Object.keys(formik.errors).length === 0) {
          let result = null;
          if (referralToken) {
            result = await axios.post(
              `${process.env.REACT_APP_BACKEND_SERVER}/auth/local/register/${referralToken}`,
              {
                username: email,
                email: email,
                password: password,
              }
            );
          } else {
            result = await axios.post(
              `${process.env.REACT_APP_BACKEND_SERVER}/auth/local/register`,
              {
                username: email,
                email: email,
                password: password,
              }
            );
          }
          console.log("data posted");
         
          if (result) {
            // setIsLoading(false);
            //notification for email sent
            setSignupError(false);
            setOpenSnackbar(true);
            
          }
          setIsLoading(false);
        }
      } catch (e) {
        setSignupError(true);
        console.log(e);
      }
      finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <form
        style={{ background: "rgba(81,58,84, 0.75)", minHeight: "90vh" }}
        className="flex flex-col min-h-screen bg-grey-lighter"
      >
        <div className="container flex flex-col md:flex-row items-center justify-center flex-1 max-w-sm px-2 mx-auto">
          <div
            className="w-full px-6 py-8 text-black bg-gray-200 rounded-l-lg shadow-md"
            style={{
              color: "rgba(81,54,84,1)",
              maxHeight: 600,
              overflow: "scroll",
              minHeight: 600,
              minWidth: 370,
              display: window.innerWidth <= 1280 ? 'none' : 'block'
            }}
          >
            {api ? (
              <div>
                <div>
                  <h1 className="mt-5 mb-8 text-3xl text-center">
                    {api.title}
                  </h1>
                </div>
                <div>
                  <div>
                    {Parser().parse(DOMPurify.sanitize(api.description))}
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <div
            className="w-full px-6 py-8 text-black bg-white rounded-r-lg shadow-md"
            style={{ minHeight: 600, minWidth: 350 }}
          >
            <h1 className="mt-5 mb-8 text-3xl text-center">用戶注冊</h1>
            {openSnackbar && (
              <div className="mb-2">
                <SnackbarContent
                  message={`我們已經發送了到以下電郵地址，請查看您的電子郵件箱。`}
                />
              </div>
            )}
            {signupError && (
              <p class="text-red-500 text-xs italic">
                用戶名稱或電郵已經被注冊
              </p>
            )}
            <input
              type="text"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="email"
              placeholder="電郵"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p class="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            )}
            <input
              type="password"
              className="block w-full p-3 mb-4 border rounded border-grey-light"
              name="password"
              placeholder="密碼"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <button
              onClick={formik.handleSubmit}
              type="submit"
              className={`w-full h-12 px-4 pt-2 font-bold  rounded hover:bg-blue-dark focus:outline-none focus:shadow-outline text-white ${isLoading ?  "bg-gray-600" : "bg-indigo-700"}`}
              disabled={isLoading}
            >
              {isLoading ? '稍等' : '開戶'}
            </button>
            <div className="mt-8 text-sm text-center text-grey-dark">
              By signing up, you agree to the
              <Link
                className="no-underline border-b border-grey-dark text-grey-dark"
                to="#"
              >
                <span> Terms of Service</span>
              </Link>{" "}
              and
              <Link
                className="no-underline border-b border-grey-dark text-grey-dark"
                to="#"
              >
                <span> Privacy Policy </span>
              </Link>
            </div>
            <div className="mt-6 text-center text-purple">
              我已經有帳戶
              <Link className="ml-2 border-b-4s" to="./login">
                (按此登入)
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
