import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { storeToken, storeUser } from "../../../../services/authService";
import Button from "../../../utilComponents/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ReactMarkdown from "react-markdown";

function LoginForm(props) {
  const [loginError, setLoginError] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState(null);
  const { referralToken } = props.match.params;

  const [api, ApiReply] = React.useState("");

  useEffect(() => {
    var requestOptions = {
      method: "GET",
    };
    fetch(
      `api/latest-news`,
      requestOptions
    ).then(apiResponse => {
      ApiReply(JSON.stringify(apiResponse[0]));
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
      const { email, password } = formik.values;
      try {
        if (Object.keys(formik.errors).length === 0) {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_SERVER}/auth/local`,
            {
              identifier: email,
              password: password,
            }
          );
          storeUser(response.data.user);
          storeToken(response.data.jwt);
          window.location.href = `/user/${response.data.user.id}`;
          // console.log('data posted')
        }
      } catch (e) {
        setLoginError(true);
        console.log(e);
      }
    },
  });

  const checkReferrer = async () => {
    try {
      if (referralToken) {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}/users-referrer/${referralToken}`
        );
        setSnackbarContent(
          `歡迎加入！您成功被${result.data.referrerData.email}推薦`
        );
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    checkReferrer();
  }, [referralToken]);

  return (
    <div>
      <form
        style={{ background: "rgba(81,58,84, 0.75)", minHeight: "90vh" }}
        className="flex flex-col w-full min-h-screen bg-grey-lighter"
      >
        <div className="container flex flex-row items-center justify-center flex-1 max-w-sm px-2 mx-auto">
          <div
            className="w-full px-6 py-8 text-black bg-gray-200 rounded-l-lg shadow-md"
            style={{
              color: "rgba(81,54,84,1)",
              maxHeight: 600,
              overflow: "scroll",
              minHeight: 600,
              minWidth: 370,
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
                  <ReactMarkdown>
                    {api.description.replaceAll("\n", "  \n")}
                  </ReactMarkdown>
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
            {loginError && (
              <p class="text-center text-red-500 text-xs italic">
                電郵或名稱不正確，請重新輸入
              </p>
            )}
            {snackbarContent && (
              <div className="mb-2">
                <SnackbarContent message={snackbarContent} />
              </div>
            )}
            <h1 className="mt-5 mb-8 text-3xl text-center text-gray-700">
              歡迎回來
            </h1>
            <input
              type="text"
              className="w-full h-12 px-3 py-2 mt-5 mb-2 leading-tight border rounded shadow appearance-none text-grey-darker focus:outline-none focus:shadow-outline"
              name="email"
              placeholder="電郵"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <p class="text-red-500 mb-4 text-xs italic">
                {formik.errors.email}
              </p>
            )}
            <input
              type="password"
              className="w-full h-12 px-3 py-2 mt-2 mb-2 leading-tight border rounded shadow appearance-none text-grey-darker focus:outline-none focus:shadow-outline"
              name="password"
              placeholder="密碼"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p class="text-red-500 mb-4 text-xs italic">
                {formik.errors.password}
              </p>
            )}
            <Button
              onClickMethod={formik.handleSubmit}
              color={"bg-indigo-700"}
              hoverColor={"bg-blue-dark"}
              textColor={"text-white"}
            >
              登入
            </Button>
            <div className="flex justify-center w-full h-auto pt-8 mt-3">
              <Link to="/forgot-password">忘記密碼</Link>
            </div>
            <div className="mt-6 text-center text-black">
              尚未註冊?
              <Link className="ml-2 no-underline border-b-4s" to="./signup">
                按此
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
