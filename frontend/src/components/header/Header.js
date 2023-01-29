import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { capitalizeName } from '../../utils/capitalizeName';
import { clearErrors, logout } from '../../redux/actions/userAction';
import { shortenText } from '../../utils/shortenText';

const Header = () => {
  const { error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('User Logout Successfully.');
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
          <span className='--fw-thin'>Welcome, </span>
          <span className='--color-danger'>
            {window.innerWidth <= 600
              ? shortenText(capitalizeName(user.name), 10)
              : capitalizeName(user.name)}
          </span>
        </h3>
        <button className='--btn --btn-danger' onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
