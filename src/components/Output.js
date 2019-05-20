import React from 'react';
import marked from 'marked';

import { OutputWrap, InputLabel } from '../styled_parts';

const Output = ({ body }) => {
  return (
    <OutputWrap>
      <InputLabel id="preview-id" htmlFor="preview">
        Preview
      </InputLabel>
      <div
        id="preview"
        aria-labelledby="preview-id"
        dangerouslySetInnerHTML={{ __html: marked(body) }}
      />
    </OutputWrap>
  );
};

export default Output;
