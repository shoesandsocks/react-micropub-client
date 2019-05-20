import React from 'react';
import PropTypes from 'prop-types';

import { InputWrap, InputLabel } from '../styled_parts';

const Title = ({ text, change }) => {
  const handleChange = e => change(e.target.value);
  return (
    <React.Fragment>
      <InputLabel id="title-label" htmlFor="title">
        Post title
      </InputLabel>
      <InputWrap
        aria-labelledby="title-label"
        data-lpignore="true"
        type="text"
        name="title"
        id="title"
        placeholder="post title"
        value={text}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default Title;
