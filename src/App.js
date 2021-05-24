import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './services/PrivateRoute'
import { UserContext } from './contexts/UserContext'
import useAuth from './hooks/useAuth'

import Header from './modules/layout/header'
import LoginForm from './modules/auth/components/LoginForm'
import SignupForm from './modules/auth/components/SignupForm'
import Home from './modules/landingPage/components/Home'
import Course from './modules/course/components/CourseOverview/course'
import LessonPage from './modules/lesson/components/LessonPage'
import UserProfile from './modules/user/components/UserProfile'

function App() {

  const {
    storeToken,
    user,
    setUser
  } = useAuth();


  return (
    <div>
      <Router>
        <UserContext.Provider value={{ storeToken, user, setUser }}>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/signup' component={SignupForm} />
            <Route exact path='/course/:courseId' component={Course} />
            <PrivateRoute exact path='/lesson/:lessonId' component={LessonPage} />
            <PrivateRoute exact path='/user/:userId' user={user} component={UserProfile} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
