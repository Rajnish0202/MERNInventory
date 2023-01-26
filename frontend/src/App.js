import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Home from './pages/Home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userStatus } from './redux/actions/userAction';
import { getAllProduct } from './redux/actions/productAction';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStatus());
  }, []);

  return (
    <Router>
      <ToastContainer style={{ fontSize: '16px' }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/resetpassword/:resetToken' element={<Reset />} />
        <Route
          path='/dashboard'
          element={
            <Sidebar title='Dashboard'>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
