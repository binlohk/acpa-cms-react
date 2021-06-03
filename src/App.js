import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
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
import LessonPage from './modules/lesson/components/LessonPage'
import UserProfile from './modules/user/components/UserProfile'
import UserLayout from './modules/layout/UserLayout'
import PaymentSuccess from './modules/course/components/Payment/PaymentSuccess'

function App() {
  return (
    <div>
      <Router>
        <UserContext.Provider value={{ storeToken, getUser }}>
          <UserLayout>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute exact path='/login' component={LoginForm} />
              <AuthRoute exact path='/signup' component={SignupForm} />
              <PublicRoute exact path='/courses' component={AllCourses} />
              <Route exact path='/course/:courseId' component={Course} />
              <PrivateRoute exact path='/my-courses' component={MyCourses} />
              <PrivateRoute exact path='/lesson/:lessonId' component={LessonPage} />
              <PrivateRoute exact path='/user/:userId' component={UserProfile} />
              <PrivateRoute exact path='/payment-success/:courseId' component={PaymentSuccess} />
            </Switch>
          </UserLayout>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
