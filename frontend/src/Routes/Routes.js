import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login.js';
import Sign_up from '../Pages/SignUp/SignUp.js';
import Protected_routes from '../Components/ProtectedRoutes.js';
import Home from '../Pages/Home/Home.js';
import NotFound from '../Components/NotFound.js';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Protected_routes isProtected={true}><Home /></Protected_routes>
    },
    { path: '/login', element: <Protected_routes isProtected={false}><Login /></Protected_routes> },
    { path: '/sign-up', element: <Protected_routes isProtected={false}><Sign_up /></Protected_routes> },
    { path: '*', element: <NotFound /> }
]);

export default Routes;