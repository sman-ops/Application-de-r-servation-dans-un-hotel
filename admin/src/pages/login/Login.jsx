import axios from 'axios';
import React, { useContext } from 'react';
import { Children } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// import { AuthContext } from '../../context/AuthContext';
import './login.scss';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((current) => ({
      ...current,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/login',
        credentials
      );

      if (res.data.isAdmin) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
        navigate('/');
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: { message: 'You are not allowed ' },
        });
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  const { user, loading, error, dispatch } = useContext(AuthContext);

  //   console.log(user);
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} className="lButton" onClick={handleClick}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
