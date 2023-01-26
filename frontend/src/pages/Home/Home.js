import React from 'react';
import MetaData from '../../components/MetaData';
import './Home.scss';
import logo from '../../assets/logow.png';
import heroImg from '../../assets/inv-img.png';
import { Link } from 'react-router-dom';
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HddenLink';

const Home = () => {
  const NumberText = ({ num, text }) => {
    return (
      <div className='--mr'>
        <h3 className='--color-white'>{num}</h3>
        <p className='--color-white'>{text}</p>
      </div>
    );
  };

  return (
    <>
      <MetaData title='Home Page' />
      <div className='home'>
        <nav className='container --flex-between'>
          <div className='logo'>
            <Link to='/'>
              <img
                src={logo}
                alt='M-I logo'
                style={{
                  width: '100px',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Link>
          </div>
          <ul className='home-links'>
            <ShowOnLogout>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li>
                <button className='--btn --btn-primary'>
                  <Link to='/login'>Login</Link>
                </button>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <button className='--btn --btn-primary'>
                  <Link to='/dashboard'>Dashboard</Link>
                </button>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>
        {/* Hero Section */}
        <section className='container hero'>
          <div className='hero-text'>
            <h2>Inventory & Stock Management Solution</h2>
            <p>
              Inventory system to control and manage products in the warehouse
              in real time and integrated to make it easier to develop your
              business.
            </p>
            <div className='hero-buttons'>
              <button className='--btn --btn-secondary'>
                <Link to='/dashboard'>Free Trail 1 Month</Link>
              </button>
            </div>
            <div className='--flex-start'>
              <NumberText num='09K' text='Brand Owners' />
              <NumberText num='03K' text='Active Users' />
              <NumberText num='60+' text='Partners' />
            </div>
          </div>
          <div className='hero-image'>
            <img src={heroImg} alt='Hero' />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
