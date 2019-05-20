import React, { useState, useEffect } from 'react';

import { Wrap, Btn, Form } from '../styled_parts';
import Title from './Title';
import Body from './Body';
import Tags from './Tags';

import { post, processTags } from '../funcs';

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

  useEffect(() => {
    processTags(tags, setTags, arrayOfTags, setArrayOfTags);
  }, [tags, arrayOfTags]);

  return (
    <Wrap blue>
      <Form onSubmit={handlePost}>
        <Title text={title} change={setTitle} />
        <Body text={body} change={setBody} />
        <Tags text={tags} arrayOfTags={arrayOfTags} change={setTags} />
        <Btn
          type="button"
          onClick={handlePost}
          value="Submit"
          disabled={body.length < 1}
        >
          Submit
        </Btn>
      </Form>
    </Wrap>
  );
};

export default MicropubComposer;
