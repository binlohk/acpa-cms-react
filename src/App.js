import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './services/PrivateRoute'
import AuthRoute from './services/AuthRoute'
import { UserContext } from './contexts/UserContext'
import useAuth from './hooks/useAuth'
import { storeToken, getUser } from './services/authService'
import Header from './modules/layout/header'
import LoginForm from './modules/auth/components/LoginForm'
import SignupForm from './modules/auth/components/SignupForm'
import Home from './modules/landingPage/components/Home'
import Course from './modules/course/components/CourseOverview/course'
import LessonPage from './modules/lesson/components/LessonPage'
import UserProfile from './modules/user/components/UserProfile'

function App() {
  const { id, username, email } = getUser()

  return (
    <div>
      <UserContext.Provider value={{ storeToken, getUser, id, username, email }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={LoginForm} />
            <AuthRoute exact path='/signup' component={SignupForm} />
            <Route exact path='/course/:courseId' component={Course} />
            <PrivateRoute exact path='/lesson/:lessonId' component={LessonPage} />
            <PrivateRoute exact path='/user/:userId' component={UserProfile} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
