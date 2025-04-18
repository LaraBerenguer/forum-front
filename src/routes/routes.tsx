import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import Layout from '../layout/layout';

const Home = lazy(() => import('../pages/Home'));
const Signup = lazy(() => import('../auth/Signup'));
const Login = lazy(() => import('../auth/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
 


const RoutesComponent = () => {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    )
};

export default RoutesComponent;