import React from 'react';
import Navbar from '../components/Navbar';
import FormLogin from '../components/FormLogin';

const Login = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <FormLogin />
      </div>
    </>
  );
};

export default Login;
