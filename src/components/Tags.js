import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { processTags } from '../funcs';

import { InputWrap, InputLabel, TagSpan, TagBar } from '../styled_parts';

const Tags = ({ tags, setTags, arrayOfTags, setArrayOfTags }) => {
  useEffect(() => {
    processTags(tags, setTags, arrayOfTags, setArrayOfTags);
  }, [arrayOfTags, setArrayOfTags, setTags, tags]);

  const handleChange = e => {
    return setTags(e.target.value);
  };
  const lookForEnter = e => {
    const { which } = e;
    if (which !== 13) {
      return;
    }
    const enterWasPressed = true;
    console.log(enterWasPressed);
    return processTags(
      tags,
      setTags,
      arrayOfTags,
      setArrayOfTags,
      enterWasPressed,
    );
  };
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
        value={tags}
        onChange={handleChange}
        onKeyPress={lookForEnter}
      />
      <InputLabel id="tag-bar-label" htmlFor="tag-bar">
        Saved Tags&nbsp;&nbsp;&nbsp;
        <span style={{ fontSize: '.825rem' }}>(click to remove)</span>
      </InputLabel>
      <TagBar className="tag-bar" id="tag-bar" aria-labelledby="tag-bar-label">
        {arrayOfTags &&
          arrayOfTags.map(t => <TagSpan key={t}> {`${t}`}</TagSpan>)}
      </TagBar>
    </React.Fragment>
  );
};

Tags.propTypes = {
  tags: PropTypes.string.isRequired,
  setTags: PropTypes.func.isRequired,
  arrayOfTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
