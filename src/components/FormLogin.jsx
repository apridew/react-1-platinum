import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as requestAPI from '../helpers/apis.js';

const FormLogin = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSubmit, setisSubmit] = useState(false);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUserName(e.target.value);
    setSuccess('');
    setError('');
    setIsBackgroundVisible(false);
    // console.log(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSuccess('');
    setError('');
    setIsBackgroundVisible(false);
    // console.log(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!username && !password) {
      setError('Username and Password harus diisi');
      setIsBackgroundVisible(true);
    } else {
      const bodyPayload = {
        username: username,
        password: password,
      };

      try {
        const res = await requestAPI.loginAPI(bodyPayload);
        // console.log(res.data.data.token);

        localStorage.setItem('accessToken', res.data.data.token);
        setSuccess(res.data.message);
        setisSubmit(true);

        setTimeout(() => {
          navigate('/');
        }, 1000);

        setIsBackgroundVisible(true);
      } catch (err) {
        // console.log(err.response.data.message);

        setError(err.response.data.message);

        setIsBackgroundVisible(true);
      }
    }
  };

  return (
    <>
      <div className="form">
        <h1>Log In</h1>
        <label>Username</label>
        <input
          onKeyDown={handleKeyPress}
          onChange={handleUsername}
          type="text"
          placeholder="input your username"
        />
        <label>
          Password
          <i
            onClick={() => setIsPasswordShow(!isPasswordShow)}
            className={!isPasswordShow ? 'bi bi-eye' : 'bi bi-eye-slash'}
          ></i>
        </label>
        <input
          onKeyDown={handleKeyPress}
          onChange={handlePassword}
          type={!isPasswordShow ? 'password' : 'text'}
          placeholder="input your password"
        />
        <button disabled={!(username && password)} onClick={handleSubmit}>
          {isSubmit ? <div className="loader"></div> : 'Submit'}
        </button>
      </div>
      {success ? (
        <p className={isBackgroundVisible ? 'success bg-visible' : 'success '}>{success}</p>
      ) : (
        <p className={isBackgroundVisible ? 'error bg-visible' : 'error '}>{error}</p>
      )}
    </>
  );
};

export default FormLogin;
