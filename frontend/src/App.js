import './App.scss';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Login from '../src/components/Login/Login';

function App() {
  return (
    <Router>
      <div className='app-container'>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/new">
            new
          </Route>
          <Route exact path="/about">
            about
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            home
          </Route>
          <Route path="*" exact>
            404 not found
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;

