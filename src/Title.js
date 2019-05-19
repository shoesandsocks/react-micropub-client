import React from 'react';
import PropTypes from 'prop-types';

import { InputWrap, InputLabel } from './styled_parts';

const Title = ({ text, change }) => {
  const handleChange = e => change(e.target.value);
  return (
    <React.Fragment>
      <InputLabel htmlFor="title">Post title</InputLabel>
      <InputWrap
        data-lpignore="true"
        type="text"
        name="title"
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
