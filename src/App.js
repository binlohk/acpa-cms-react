import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './services/PrivateRoute'
import { UserContext } from './contexts/UserContext'
import useAuth from './hooks/useAuth'

import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Home from './components/Home'
import CourseOverview from './components/CourseOverview'
import LessonPage from './components/LessonPage'
import UserProfile from './components/UserProfile'

function App() {

  const {
    user,
    setUser
  } = useAuth();


  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LoginForm} />
            <Route path='/signup' component={SignupForm} />
            <PrivateRoute exact path='/course/:courseId' component={CourseOverview} />
            <PrivateRoute exact path='/lesson/:lessonId' component={LessonPage} />
            <PrivateRoute exact path='/user/:userId' user={user} component={UserProfile} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
