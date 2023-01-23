import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import MetaData from '../../components/MetaData';
import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';

const Register = () => {
  return (
    <>
      <MetaData title='Register User' />
      <div className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <div className='--flex-center'>
              <TiUserAddOutline size={35} color='#999' />
            </div>
            <h2>Register</h2>

            <form>
              <input type='text' placeholder='Name' required name='name' />
              <input type='email' placeholder='Email' required name='email' />
              <input
                type='password'
                placeholder='Password'
                required
                name='password'
              />
              <input
                type='password'
                placeholder='Confirm Password'
                required
                name='password'
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
