import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [isLogout, setIsLogout] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);

  const handleLogout = () => {
    setIsLogout(true);
    setIsBackgroundVisible(true);

    setTimeout(() => {
      localStorage.removeItem('accessToken');

      navigate('/login');
    }, 1000);
  };

  return (
    <>
      <nav>
        <Link to={'/'}>
          <p>Home</p>
        </Link>

        {accessToken ? (
          <a onClick={handleLogout}>Log Out</a>
        ) : (
          <Link to={'/login'}>
            <p>Log In</p>
          </Link>
        )}
      </nav>
      {isLogout ? (
        <p className={isBackgroundVisible ? 'success bg-visible' : 'success '}>Logout success.</p>
      ) : (
        ''
      )}
    </>
  );
};

export default Navbar;
