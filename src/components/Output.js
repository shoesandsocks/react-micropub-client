import React from 'react';
import marked from 'marked';

import {
  OutputWrap,
  InputLabel,
  PreviewBody,
  PreviewTitle,
  PreviewTags,
} from '../styled_parts';

import { renderTags } from '../funcs';

const Output = ({ body, title, arrayOfTags, file }) => {
  let src;
  try {
    src = URL.createObjectURL(file);
  } catch {
    src = '';
  }
  return (
    <OutputWrap>
      <InputLabel id="preview-id" htmlFor="preview">
        Preview
      </InputLabel>
      <div>
        <PreviewTitle>{title}</PreviewTitle>
        <img src={src} alt="" style={{ maxWidth: '100%' }} />
        <PreviewBody
          id="preview"
          aria-labelledby="preview-id"
          dangerouslySetInnerHTML={{ __html: marked(body) }}
        />
        <PreviewTags>{renderTags(arrayOfTags)}</PreviewTags>
      </div>
    </OutputWrap>
  );
};

export default Output;
