import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import ChangePassword from '../../components/changePassword/ChangePassword';
import './Profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState();

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
    setBio(user.bio);
  }, [user]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('phone', phone);
    myForm.set('bio', bio);
    myForm.set('image', image);

    console.log(...myForm);
  };

  return (
    <div className='profile --my2'>
      <Card cardClass={'card --flex-dir-column'}>
        <span className='profile-photo'>
          <img src='' alt='' />
        </span>
        <form className='--form-control --m' onSubmit={updateProfileSubmit}>
          <span className='profile-data'>
            <p>
              <label>Name:</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type='email' name='email' value={user.email} readOnly />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type='number'
                name='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name='bio'
                cols='30'
                rows='10'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input
                type='file'
                name='image'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </p>
            <div>
              <button className='--btn --btn-primary' type='submit'>
                Edit Profile
              </button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
