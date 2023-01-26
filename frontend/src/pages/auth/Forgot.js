import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import MetaData from '../../components/MetaData';
import styles from './auth.module.scss';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  clearErrors,
  forgotPassword,
  validateEmail,
} from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.forgotPassword);

  const forgotSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Please enter an email.');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a vaild email.');
    }

    const myForm = new FormData();

    myForm.set('email', email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title='Forgot Password' />
      <div className={`container ${styles.auth}`}>
        {loading && <Loader />}
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <AiOutlineMail size={35} color='#999' />
            </div>
            <h2>Forgot Password</h2>

            <form onSubmit={forgotSubmit}>
              <input
                type='email'
                placeholder='Email'
                required
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type='submit' className='--btn --btn-primary --btn-block'>
                Get Reset Email
              </button>
              <div className={styles.links}>
                <p>
                  <Link to='/'> - Home</Link>
                </p>
                <p>
                  <Link to='/login'> - Login</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Forgot;
