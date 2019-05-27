import React, { useState } from 'react';

import { ComposerWrap, Btn, Form } from '../styled_parts';
import MessageBar from './MessageBar';
import Title from './Title';
import Body from './Body';
import Tags from './Tags';
import Upload from './Upload';
import Output from './Output';

import { post, display, imagePost } from '../funcs';

const MicropubComposer = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [arrayOfTags, setArrayOfTags] = useState([]);
  const [message, setMessage] = useState('');

  const handlePost = e => {
    e.preventDefault();
    // TODO: de-dupe these, which are identical but for func name and extra key (`file`)
    if (file && typeof file.name === 'string') {
      // there's a File
      imagePost({ title, body, arrayOfTags, file })
        .then(response => {
          if (response.status === 200) {
            let { url } = response.data;
            const urlLink = `<a target="_blank" rel="noopener noreferrer" href="${url}">Success!</a>`;
            display(setMessage, urlLink, 30000);
            [setTitle, setBody, setTags].forEach(func => func(''));
            setArrayOfTags([]);
            setFile(null);
          } else {
            const { error } = response.data;
            display(setMessage, error, 15000);
          }
        })
        .catch(err => {
          const msg = err.error ? err.error : 'Something went wrong';
          display(setMessage, msg, 5000);
        });
    } else {
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
          }
        })
        .catch(err => {
          const msg = err.error ? err.error : 'Something went wrong';
          display(setMessage, msg, 5000);
        });
    }
  };

  return (
    <React.Fragment>
      <MessageBar message={message} />
      <ComposerWrap>
        <Form onSubmit={handlePost}>
          <Title text={title} change={setTitle} />
          <Body text={body} change={setBody} />
          <Upload setFile={setFile} />
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
        <Output
          body={body}
          title={title}
          arrayOfTags={arrayOfTags}
          file={file}
        />
      </ComposerWrap>
    </React.Fragment>
  );
};

export default MicropubComposer;
