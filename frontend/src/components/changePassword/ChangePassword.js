import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  clearErrors,
  userPasswordUpdate,
} from '../../redux/actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstant';
import Card from '../card/Card';
import { SpinnerImg } from '../loader/Loader';
import './ChangePassword.scss';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, isUpdated, loading } = useSelector(
    (state) => state.userUpdate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('New and Confirm password must be match.');
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      return toast.error('Password must be 6 characters.');
    }

    const passwords = { oldPassword, password };

    dispatch(userPasswordUpdate(passwords));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate('/profile');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, isUpdated, dispatch, navigate]);

  return (
    <div className='change-password'>
      {loading && <SpinnerImg />}
      <Card cardClass={'password-card'}>
        <h3>Change Password</h3>
        <form className='--form-control' onSubmit={updatePasswordSubmit}>
          <input
            type='password'
            placeholder='Old Password'
            required
            name='oldPassword'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
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
          <button type='submit' className='--btn --btn-primary'>
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
