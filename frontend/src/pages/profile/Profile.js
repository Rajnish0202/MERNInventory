import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import { SpinnerImg } from '../../components/loader/Loader';
import './Profile.scss';

const Profile = () => {
  const { loading, user, error } = useSelector((state) => state.user);

  return (
    <div className='profile --my2'>
      {loading && <SpinnerImg />}
      <>
        {loading && user === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={`card --flex-dir-column`}>
            <span className='profile-photo'>
              <img
                src={user?.photo}
                alt='profilepic'
                style={{
                  width: '15rem',
                  height: '15rem',
                  objectFit: 'contain',
                }}
              />
            </span>
            <span className='profile-data'>
              <p>
                <b>Name : </b> {user?.name}
              </p>
              <p
                style={{
                  color: 'var(--color-danger)',
                  fontWeight: 500,
                  letterSpacing: '1px',
                }}
              >
                <b style={{ color: 'initial', letterSpacing: '0' }}>Email : </b>{' '}
                {user?.email}
              </p>
              <p>
                <b>Phone : </b> {user?.phone}
              </p>
              <p>
                <b>Bio : </b> {user?.bio}
              </p>
              <div>
                <Link to='/edit-profile'>
                  <button className='--btn --btn-primary'>Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
