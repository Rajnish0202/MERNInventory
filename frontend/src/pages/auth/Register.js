import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import MetaData from '../../components/MetaData';
import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  clearErrors,
  register,
  validateEmail,
} from '../../redux/actions/userAction';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loader from '../../components/loader/Loader';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { error, loading, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = user;

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('All fileds are required.');
    }

    if (password.length < 6) {
      return toast.error('Password must be upto 6 characters.');
    }

    if (password !== confirmPassword) {
      return toast.error('Password do not match.');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a vaild email.');
    }

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [error, dispatch, isLoggedIn, navigate]);

  return (
    <>
      <MetaData title='Register User' />

      <div className={`container ${styles.auth}`}>
        {loading && <Loader />}
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <TiUserAddOutline size={35} color='#999' />
            </div>
            <h2>Register</h2>

            <form onSubmit={registerSubmit}>
              <input
                type='text'
                placeholder='Name'
                required
                name='name'
                value={name}
                onChange={registerDataChange}
              />
              <input
                type='email'
                placeholder='Email'
                required
                name='email'
                value={email}
                onChange={registerDataChange}
              />
              <input
                type='password'
                placeholder='Password'
                required
                name='password'
                value={password}
                onChange={registerDataChange}
              />
              <input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={confirmPassword}
                required
                onChange={registerDataChange}
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>
                Register
              </button>
            </form>
            <span className={styles.register}>
              <Link to='/'>Home</Link>
              <p> &nbsp; Already have an account? &nbsp;</p>
              <Link to='/login'>Login</Link>
            </span>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
