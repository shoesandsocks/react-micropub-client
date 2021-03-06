import React, { useState } from 'react';

import { LoginWrap, LoginLabel, LoginForm } from '../styled_parts';

import { getAuthed } from '../funcs';

function Login() {
  const [address, setAddress] = useState('');
  const handleChange = e => setAddress(e.target.value);

  const handleAuth = e => {
    e.preventDefault();
    getAuthed(address)
      .then(response => {
        // console.log(response);
        if (response.data.url) {
          window.location.assign(response.data.url);
        } else {
          // TODO: message failure somehow
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <LoginWrap>
      <LoginForm onSubmit={handleAuth}>
        <LoginLabel id="me-label" htmlFor="me">
          Website
          <span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://indielogin.com/setup"
            >
              what's this?
            </a>
          </span>
        </LoginLabel>
        <input
          aria-labelledby="me-label"
          id="me"
          name="me"
          type="text"
          value={address}
          onChange={handleChange}
          placeholder="your website"
        />
        <button type="button" onClick={handleAuth} value="Submit">
          log me in
        </button>
      </LoginForm>
    </LoginWrap>
  );
}

export default Login;
