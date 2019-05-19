import React from 'react';
import PropTypes from 'prop-types';

import { InputWrap, InputLabel, TagSpan, TagBar } from './styled_parts';

const Tags = ({ text, change, arrayOfTags }) => {
  const handleChange = e => change(e.target.value);
  return (
    <React.Fragment>
      <InputLabel htmlFor="tags">Tags</InputLabel>
      <InputWrap
        data-lpignore="true"
        input
        type="text"
        name="tags"
        value={text}
        onChange={handleChange}
      />
      <TagBar>
        {arrayOfTags &&
          arrayOfTags.map(t => <TagSpan key={t}>{`${t}`}</TagSpan>)}
      </TagBar>
    </React.Fragment>
  );
};

Tags.propTypes = {
  text: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  arrayOfTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
