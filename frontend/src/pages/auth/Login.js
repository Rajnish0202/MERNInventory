import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import MetaData from '../../components/MetaData';
import styles from './auth.module.scss';
import { BiLogIn } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import {
  login,
  clearErrors,
  validateEmail,
} from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const { loading, isLoggedIn, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      return toast.error('All fields are required');
    }

    if (loginPassword.length < 6) {
      return toast.error('Password must be upto 6 characters.');
    }

    if (!validateEmail(loginEmail)) {
      return toast.error('Please enter a vaild email.');
    }

    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, isLoggedIn, dispatch, navigate]);

  return (
    <>
      <MetaData title='Login' />
      {loading && <Loader />}
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <BiLogIn size={35} color='#999' />
            </div>
            <h2>Login</h2>

            <form onSubmit={loginSubmit}>
              <input
                type='email'
                placeholder='Email'
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>
                Login
              </button>
            </form>
            <Link to='/forgot'>Forget Password</Link>
            <span className={styles.register}>
              <Link to='/'>Home</Link>
              <p> &nbsp; Don't have an account? &nbsp;</p>
              <Link to='/register'>Register</Link>
            </span>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
