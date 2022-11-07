import axios from 'axios';
import React, { useContext } from 'react';
import { Children } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './register.css';

const Register = () => {
  const [register, setRegister] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setRegister((current) => ({
      ...current,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/register',
        register
      );

      navigate('/login');
    } catch (err) {
      console.log(err);
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
          placeholder="email"
          id="email"
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
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
