import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PublicRoute from './services/PublicRoute'
import PrivateRoute from './services/PrivateRoute'
import AuthRoute from './services/AuthRoute'
import { UserContext } from './contexts/UserContext'
import { storeToken, getUser } from './services/authService'
import Header from './modules/layout/header'
import LoginForm from './modules/auth/components/LoginForm'
import SignupForm from './modules/auth/components/SignupForm'
import Home from './modules/landingPage/components/Home'
import Course from './modules/course/components/CourseOverview/course'
import AllCourses from './modules/course/components/AllCourses/AllCourses'
import MyCourses from './modules/course/components/AllCourses/MyCourses'
import Lesson from './modules/lesson/components/LessonPage/Lesson'
import UserProfile from './modules/user/components/UserProfile'
import UserLayout from './modules/layout/UserLayout'
import PaymentSuccess from './modules/course/components/Payment/PaymentSuccess'
import PaymentFailure from './modules/course/components/Payment/PaymentFailure'
import PageNotFound from './modules/404/components/404page'
import ResetPassword from './modules/auth/components/ResetPassword'
import ForgotPassword from './modules/auth/components/ForgotPassword'
import PublicEnrollForm from './modules/publicEnrollForm/publicEnrollForm'

function App() {
    return (
        <div>
            <Router>
                <UserContext.Provider value={{ storeToken, getUser }}>
                    <UserLayout>
                        <Switch>
                            <Route exact path="/" component={AllCourses} />
                            <AuthRoute
                                exact
                                path="/login"
                                component={LoginForm}
                            />
                            <AuthRoute
                                exact
                                path="/login/:referralToken"
                                component={LoginForm}
                            />
                            <AuthRoute
                                exact
                                path="/signup"
                                component={SignupForm}
                            />
                            <AuthRoute
                                exact
                                path="/signup/:referralToken"
                                component={SignupForm}
                            />
                            <Route
                                exact
                                path="/course/:courseId"
                                component={Course}
                            />
                            <Route
                                exact
                                path="/forgot-password"
                                component={ForgotPassword}
                            />
                            <Route
                                exact
                                path="/reset-password/:resetPasswordToken"
                                component={ResetPassword}
                            />
                            <Route
                                exact
                                path="/publicEnroll/:enrollFormId/:referrerToken?"
                                component={PublicEnrollForm}
                            />
                            <PrivateRoute
                                exact
                                path="/my-courses"
                                component={MyCourses}
                            />
                            <PrivateRoute
                                exact
                                path="/lesson/:lessonId"
                                render={(props) => (
                                    <Lesson key={props.match.params.lessonId} />
                                )}
                            />
                            <PrivateRoute
                                exact
                                path="/user/:userId"
                                component={UserProfile}
                            />
                            <PrivateRoute
                                exact
                                path="/payment-success/:courseId"
                                component={PaymentSuccess}
                            />
                            <PrivateRoute
                                exact
                                path="/payment-failure/:courseId"
                                component={PaymentFailure}
                            />
                            <Route component={PageNotFound} />
                        </Switch>
                    </UserLayout>
                </UserContext.Provider>
            </Router>
        </div>
    )
}

export default App
