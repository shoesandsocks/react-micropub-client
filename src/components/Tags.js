import React from 'react';
import PropTypes from 'prop-types';

import { InputWrap, InputLabel, TagSpan, TagBar } from '../styled_parts';

const Tags = ({ text, change, arrayOfTags }) => {
  const handleChange = e => change(e.target.value);
  return (
    <React.Fragment>
      <InputLabel id="tags-label" htmlFor="tags">
        Tags
      </InputLabel>
      <InputWrap
        aria-labelledby="tags-label"
        data-lpignore="true"
        type="text"
        name="tags"
        id="tags"
        value={text}
        onChange={handleChange}
      />
      <InputLabel id="tag-bar-label" htmlFor="tag-bar">
        Saved Tags
      </InputLabel>
      <TagBar className="tag-bar" id="tag-bar" aria-labelledby="tag-bar-label">
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
