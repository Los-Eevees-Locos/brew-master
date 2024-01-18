// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [user]);

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/signin', {
        username,
        password,
      });
      setUser(response.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="sign-in-page">
      <h2>{'Sign in'}</h2>

      <div className="login-box">
        <div>
          <label>
            Username
            <br></br>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <br></br>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button id="login-button" onClick={handleClick}>
          Sign in
        </button>
      </div>

      <div>
        {'No Beer?'}
        <a href="/signup">Create an account</a>
      </div>
    </div>
  );
};

export default LoginPage;
