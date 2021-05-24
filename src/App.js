import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './services/PrivateRoute'
import { UserContext } from './contexts/UserContext'
import useAuth from './hooks/useAuth'
import { storeToken } from './services/authService'
import Header from './modules/layout/header'
import LoginForm from './modules/auth/components/LoginForm'
import SignupForm from './modules/auth/components/SignupForm'
import Home from './modules/landingPage/components/Home'
import CourseOverview from './modules/course/components/CourseOverview'
import LessonPage from './modules/lesson/components/LessonPage'
import UserProfile from './modules/user/components/UserProfile'

function App() {

  const {
    user,
    setUser
  } = useAuth();



  return (
    <div>
      <Header />
      <Router>
        <UserContext.Provider value={{ storeToken, user, setUser }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LoginForm} />
            <Route path='/signup' component={SignupForm} />
            <Route exact path='/course/:courseId' component={CourseOverview} />
            <PrivateRoute exact path='/lesson/:lessonId' component={LessonPage} />
            <PrivateRoute exact path='/user/:userId' user={user} component={UserProfile} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
