import React from 'react';
import PropTypes from 'prop-types';

import { InputTextarea, InputLabel, BodyWrap } from '../styled_parts';

const Body = ({ text, change }) => {
  const handleChange = e => change(e.target.value);
  return (
    <BodyWrap>
      <InputLabel id="body-label" htmlFor="body">
        Post content
      </InputLabel>
      <InputTextarea
        aria-labelledby="body-label"
        data-lpignore="true"
        type="text"
        name="body"
        id="body"
        value={text}
        onChange={handleChange}
        rows={10}
        placeholder="markdown?"
      />
    </BodyWrap>
  );
};

Body.propTypes = {
  text: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default Body;
