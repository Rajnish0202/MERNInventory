import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import MetaData from '../../components/MetaData';
import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../redux/actions/userAction';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Reset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loading, error } = useSelector((state) => state.forgotPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error('Please enter a password.');
    }

    if (password.length < 6) {
      return toast.error('Password must be upto 6 characters.');
    }

    if (password !== confirmPassword) {
      return toast.error('Password must be match.');
    }

    const myFrom = new FormData();

    myFrom.set('password', password);
    myFrom.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(resetToken, myFrom));
    navigate('/login');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title='Reset Password' />
      <div className={`container ${styles.auth}`}>
        {loading && <Loader />}
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <MdPassword size={35} color='#999' />
            </div>
            <h2>Reset Password</h2>

            <form onSubmit={resetPasswordSubmit}>
              <input
                type='password'
                placeholder='New Password'
                required
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='password'
                placeholder='Confirm New Password'
                required
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>
                Reset Password
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

export default Reset;
