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
import AddProduct from './pages/addProduct/AddProduct';
import ProductDetails from './components/product/productDetails/ProductDetails';
import EditProduct from './pages/editProduct/EditProduct';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Contact from './pages/contact/Contact';

axios.defaults.withCredentials = true;

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStatus());
  }, [dispatch]);

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
          path='/profile'
          element={
            isLoggedIn ? (
              <Sidebar title={`User Profile : ${user.name}`}>
                <Layout childern={<Profile />} />
              </Sidebar>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/edit-profile'
          element={
            isLoggedIn ? (
              <Sidebar title={`Edit Profile : ${user.name}`}>
                <Layout childern={<EditProfile />} />
              </Sidebar>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/dashboard'
          element={
            isLoggedIn ? (
              <Sidebar title='Dashboard'>
                <Layout childern={<Dashboard />} />
              </Sidebar>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/add-product'
          element={
            isLoggedIn ? (
              <Sidebar title='Add Product'>
                <Layout childern={<AddProduct />} />
              </Sidebar>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/product-detail/:id'
          element={
            isLoggedIn ? (
              <Sidebar title='Product Detail'>
                <Layout childern={<ProductDetails />} />
              </Sidebar>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/edit-product/:id'
          element={
            isLoggedIn ? (
              <Sidebar title='Update Product'>
                <Layout childern={<EditProduct />} />
              </Sidebar>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/contact-us'
          element={
            isLoggedIn ? (
              <Sidebar title='Contact Us'>
                <Layout childern={<Contact />} />
              </Sidebar>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
