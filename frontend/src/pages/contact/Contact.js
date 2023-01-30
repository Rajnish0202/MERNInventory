/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { GoLocation, GoLogoGithub } from 'react-icons/go';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import './Contact.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, contactSupport } from '../../redux/actions/contactAction';
import Loader from '../../components/loader/Loader';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.contact);
  const navigate = useNavigate();

  const messageSubmitHandler = (e) => {
    e.preventDefault();

    if (!subject || !message) {
      return toast.error('Please provid all fields.');
    }

    const contactData = { subject, message };
    dispatch(contactSupport(contactData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate('/contact-us');
    }
  }, [error, dispatch, navigate, success]);

  return (
    <div className='contact'>
      <h3 className='--mt'>Contact Us</h3>
      <div className='section'>
        {loading && <Loader />}
        <form onSubmit={messageSubmitHandler}>
          <Card cardClass='card'>
            <label>Subject</label>
            <input
              type='text'
              name='subject'
              placeholder='Subject'
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <label>Message</label>
            <textarea
              name='message'
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              cols='30'
              rows='10'
              placeholder='Message...'
            ></textarea>
            <button className='--btn --btn-primary'>Send Message</button>
          </Card>
        </form>

        <div className='details'>
          <Card cardClass={'card2'}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className='icons'>
              <span>
                <FaPhoneAlt />
                <p>8960395782</p>
              </span>
              <span>
                <FaEnvelope />
                <p>rajnish.0202kumar@gmail.com</p>
              </span>
              <span>
                <GoLocation />
                <p>Lucknow, U.P, India</p>
              </span>
              <span>
                <GoLogoGithub />
                <p>
                  <a
                    href='https://github.com/Rajnish0202/MERNInventory'
                    target='_blank'
                  >
                    https://github.com/Rajnish0202/MERNInventory
                  </a>
                </p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
