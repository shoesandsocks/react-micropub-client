import React from 'react';
import PropTypes from 'prop-types';

import { InputTextarea, InputLabel } from './styled_parts';

const Body = ({ text, change }) => {
  const handleChange = e => change(e.target.value);
  return (
    <React.Fragment>
      <InputLabel htmlFor="body">Post content</InputLabel>
      <InputTextarea
        data-lpignore="true"
        type="text"
        name="body"
        value={text}
        onChange={handleChange}
        rows={20}
      />
    </React.Fragment>
  );
};

Body.propTypes = {
  text: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default Body;
