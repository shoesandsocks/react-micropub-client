import React, { useState, useEffect } from 'react';

import { ComposerWrap, Btn, Form } from '../styled_parts';
import Title from './Title';
import Body from './Body';
import Tags from './Tags';
import Output from './Output';

import { post } from '../funcs';

const MicropubComposer = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [arrayOfTags, setArrayOfTags] = useState([]);

  const handlePost = e => {
    e.preventDefault();
    // add a default tag TODO: make this configurable?
    if (arrayOfTags.length < 1) {
      setArrayOfTags(['micro.blog']);
    }
    // send to server so it can post to the endpoint it already knows about
    post({ title, body, arrayOfTags })
      .then(response => {
        // TODO: extract to a sep func?

        if (response.status === 200) {
          // TODO: get URL from msg to message div
          [setTitle, setBody, setTags].forEach(func => func(''));
          setArrayOfTags([]);
        } else {
          const { error } = response.data || { error: 'Auth error' };
          // TODO: pass message to some sort of message div
          console.log(error);
        }
      })
      .catch(err => {
        console.log(err);
        //  const error = 'Serious error';
      });
  };

  return (
    <ComposerWrap>
      <Form onSubmit={handlePost}>
        <Title text={title} change={setTitle} />
        <Body text={body} change={setBody} />
        <Tags
          tags={tags}
          arrayOfTags={arrayOfTags}
          setTags={setTags}
          setArrayOfTags={setArrayOfTags}
        />
        <Btn
          type="button"
          onClick={handlePost}
          value="Submit"
          disabled={body.length < 1}
        >
          Submit
        </Btn>
      </Form>
      <Output body={body} title={title} arrayOfTags={arrayOfTags} />
    </ComposerWrap>
  );
};

export default MicropubComposer;
