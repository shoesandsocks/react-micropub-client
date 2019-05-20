import React from 'react';
import marked from 'marked';

import { OutputWrap } from '../styled_parts';

const Output = ({ body }) => {
  return (
    <OutputWrap>
      <div dangerouslySetInnerHTML={{ __html: marked(body) }} />
    </OutputWrap>
  );
};

export default Output;
