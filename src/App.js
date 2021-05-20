import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Home from './components/Home'
import CourseOverview from './components/CourseOverview'
import LessonPage from './components/LessonPage'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/course/:courseId' component={CourseOverview} />
          <Route exact path='/course/:courseId/lesson/:lessonId' component={LessonPage} />
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' component={SignupForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
