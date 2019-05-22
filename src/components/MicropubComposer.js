import React, { useState } from 'react';

import { ComposerWrap, Btn, Form } from '../styled_parts';
import MessageBar from './MessageBar';
import Title from './Title';
import Body from './Body';
import Tags from './Tags';
import Output from './Output';

import { post, display } from '../funcs';
import { defaultTag } from '../config';

const MicropubComposer = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [arrayOfTags, setArrayOfTags] = useState([]);
  const [message, setMessage] = useState('');

  const handlePost = e => {
    e.preventDefault();
    // add a default tag TODO: make this configurable?
    if (!arrayOfTags.includes(defaultTag)) {
      setArrayOfTags(arrayOfTags.concat([defaultTag]));
    }
    post({ title, body, arrayOfTags })
      .then(response => {
        if (response.status === 200) {
          let { url } = response.data;
          const urlLink = `<a target="_blank" rel="noopener noreferrer" href="${url}">Success!</a>`;
          display(setMessage, urlLink, 30000);
          [setTitle, setBody, setTags].forEach(func => func(''));
          setArrayOfTags([]);
        } else {
          const { error } = response.data;
          display(setMessage, error, 15000);
          console.log(error);
        }
      })
      .catch(err => {
        console.log(err);
        display(setMessage, err, 5000);
      });
  };

  return (
    <React.Fragment>
      <MessageBar message={message} />
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
    </React.Fragment>
  );
};

export default MicropubComposer;
