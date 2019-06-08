import React from 'react';
import PropTypes from 'prop-types';

import { InputWrap, InputLabel } from '../styled_parts';

const AltText = ({ altText, change }) => {
  const handleChange = e => change(e.target.value);
  return (
    <React.Fragment>
      <InputLabel id="alt-text-label" htmlFor="title">
        Image alt text
      </InputLabel>
      <InputWrap
        aria-labelledby="alt-text-label"
        data-lpignore="true"
        type="text"
        name="alt-text"
        id="alt-text"
        placeholder="alt text"
        value={altText}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

AltText.propTypes = {
  altText: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default AltText;
