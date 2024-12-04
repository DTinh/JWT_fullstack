import { Route, Switch, } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from './PrivateRoutes';


const AppRoutes = (props) => {
    const Projects = () => {
        return (
            <span>Hello projects</span>
        )
    }
    return (
        <>
            <Switch>
                <PrivateRoutes path='/users' component={Users} />
                <PrivateRoutes path='/projects' component={Projects} />

                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path='/'>
                    Home
                </Route>
                <Route path="*" exact>
                    404 not found
                </Route>
            </Switch>
        </>
    )
}
export default AppRoutes;