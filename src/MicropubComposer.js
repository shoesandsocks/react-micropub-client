import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

import { Wrap, Btn, Form } from './styled_parts';
import Title from './Title';
import Body from './Body';
import Tags from './Tags';

import { post, processTags } from './funcs';

const MicropubComposer = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [arrayOfTags, setArrayOfTags] = useState([]);

  const handlePost = e => {
    e.preventDefault();
    [title, body, arrayOfTags].forEach(str => post(str));
    [setTitle, setBody, setTags].forEach(func => func(''));
    setArrayOfTags([]);
  };

  useEffect(() => {
    processTags(tags, setTags, arrayOfTags, setArrayOfTags);
  }, [tags, arrayOfTags]);

  return (
    <Wrap blue>
      <Form onSubmit={handlePost}>
        <Title text={title} change={setTitle} />
        <Body text={body} change={setBody} />
        <Tags text={tags} arrayOfTags={arrayOfTags} change={setTags} />
        <Btn type="button" onClick={handlePost}>
          submit
        </Btn>
      </Form>
    </Wrap>
  );
};

export default MicropubComposer;
