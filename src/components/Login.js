import React, { useState } from 'react';

import { Wrap } from '../styled_parts';

import { getAuthed } from '../funcs';

function Login() {
  const [address, setAddress] = useState('');
  const handleChange = e => setAddress(e.target.value);

  const handleAuth = () => {
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
    <Wrap>
      <form onSubmit={handleAuth}>
        <label id="me-label" htmlFor="me">
          Website
        </label>
        <input
          aria-labelledby="me-label"
          id="me"
          name="me"
          type="text"
          value={address}
          onChange={handleChange}
        />
        {/* <input name="clientId" readOnly type="text" className="hidden" value="https://www.rich-text.net"></input>
        <input name="redirectUri" readOnly type="text" className="hidden" value="http://localhost:4004/auth/callback" ></input> */}
        <button type="button" onClick={handleAuth} value="Submit">
          log me in
        </button>
      </form>
    </Wrap>
  );
}

export default Login;
