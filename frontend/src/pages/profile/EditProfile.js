import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import ChangePassword from '../../components/changePassword/ChangePassword';
import './Profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import {
  clearErrors,
  userProfile,
  userStatus,
} from '../../redux/actions/userAction';
import { UPDATE_USER_RESET } from '../../redux/constants/userConstant';

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector(
    (state) => state.userUpdate
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState('');

  const { email } = user;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const updateProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/webp' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', 'dukdn1bpp');
        image.append('upload_preset', 'gxivqxul');

        // First save image to cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dukdn1bpp/image/upload',
          {
            method: 'post',
            body: image,
          }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // Save Profile
      }
      const formData = {
        name: profile.name,
        bio: profile.bio,
        phone: profile.phone,
        photo: profileImage ? imageURL : profile.photo,
      };
      dispatch(userProfile(formData));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (!email) {
      navigate('/profile');
    }
    if (isUpdated) {
      navigate('/profile');
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(userStatus());
    }
  }, [user, navigate, dispatch, email, isUpdated, error]);

  return (
    <div className='profile --my2'>
      {loading && <Loader />}
      <Card cardClass={'card --flex-dir-column'}>
        <span className='profile-photo'>
          <img src={user?.photo} alt={user?.name} />
        </span>
        <form
          className='--form-control --m'
          onSubmit={updateProfileSubmit}
          encType='multipart/form-data'
        >
          <span className='profile-data'>
            <p>
              <label>Name:</label>
              <input
                type='text'
                name='name'
                value={profile?.name}
                onChange={inputChangeHandler}
              />
            </p>
            <p>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                value={profile?.email}
                disabled
              />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type='number'
                name='phone'
                value={profile?.phone}
                required
                onChange={inputChangeHandler}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                style={{ display: 'block' }}
                name='bio'
                cols='30'
                rows='10'
                value={profile?.bio}
                onChange={inputChangeHandler}
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type='file' name='image' onChange={handleImageChange} />
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
