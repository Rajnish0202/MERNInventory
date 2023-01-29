import React from 'react';
import Card from '../card/Card';
import './ChangePassword.scss';

const ChangePassword = () => {
  return (
    <div className='change-password'>
      <Card cardClass={'password-card'}>
        <h3>Change Password</h3>
        <form className='--form-control'>
          <input
            type='password'
            placeholder='Old Password'
            required
            name='oldPassword'
          />
          <input
            type='password'
            placeholder='New Password'
            required
            name='password'
          />
          <input
            type='password'
            placeholder='Confirm New Password'
            required
            name='confirmPassword'
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
