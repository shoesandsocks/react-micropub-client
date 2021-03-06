import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ComposerWrap, Btn, Form } from '../styled_parts';
import MessageBar from './MessageBar';
import Title from './Title';
import Body from './Body';
import AltText from './AltText';
import Tags from './Tags';
import Upload from './Upload';
import Output from './Output';

import { post, display, imagePost } from '../funcs';

const MicropubComposer = ({ me }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [altText, setAltText] = useState('');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState('');
  const [arrayOfTags, setArrayOfTags] = useState([]);
  const [message, setMessage] = useState('');

  const handlePost = async e => {
    e.preventDefault();
    // TODO: de-dupe these, which are identical but for func name and extra key (`file`)
    if (file && typeof file.name === 'string') {
      // there's a File
      const response = await imagePost({
        title,
        body,
        arrayOfTags,
        fileURL,
        altText,
      });
      if (response.status === 201) {
        let { url } = response.data;
        const urlLink = `<a target="_blank" rel="noopener noreferrer" href="${url}">Success!</a>`;
        display(setMessage, urlLink, 30000);
        [setTitle, setBody, setTags, setAltText, setFileURL].forEach(func =>
          func(''),
        );
        setArrayOfTags([]);
        setFile(null);
      } else {
        display(setMessage, 'not created! uh oh.', 15000);
      }
    } else {
      post({ title, body, arrayOfTags })
        .then(response => {
          if (response.status === 201) {
            let { url } = response.data;
            const urlLink = `<a target="_blank" rel="noopener noreferrer" href="${url}">Success!</a>`;
            display(setMessage, urlLink, 30000);
            [setTitle, setBody, setTags, setAltText].forEach(func => func(''));
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
      <MessageBar message={message} me={me} />
      <ComposerWrap>
        <Form onSubmit={handlePost}>
          <Title text={title} change={setTitle} />
          <Body text={body} change={setBody} />
          <Upload setFile={setFile} setFileURL={setFileURL} />
          <AltText altText={altText} change={setAltText} />
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

MicropubComposer.propTypes = {
  me: PropTypes.string.isRequired,
};

export default MicropubComposer;
