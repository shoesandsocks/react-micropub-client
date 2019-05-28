import React from 'react';
import axios from 'axios';

const transport = axios.create({
  withCredentials: true,
});

// TODO: configurable?
const url = 'https://www.porknachos.com/notifier';

const hasTheseKeys = (array, obj) => {
  const keys = Object.keys(obj);
  return array.every(key => keys.includes(key));
};

export const display = (set, message, seconds) => {
  setTimeout(() => {
    set('');
  }, seconds);
  return set(message);
};

export const imagePost = obj => {
  if (!hasTheseKeys(['title', 'arrayOfTags', 'body', 'file', 'altText'], obj)) {
    return { error: 'Missing key(s)' };
  }
  const formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return transport.post(`${url}/create/form`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const post = obj => {
  if (!hasTheseKeys(['title', 'arrayOfTags', 'body'], obj)) {
    return { error: 'Missing key(s)' };
  }
  const { body, arrayOfTags, title } = obj;
  const postObject = {
    text: body,
    tags: arrayOfTags || [],
  };
  if (title !== '') {
    postObject.title = title;
  }
  return transport.post(`${url}/create`, postObject);
};

export const processTags = (
  tags,
  setTags,
  arrayOfTags,
  setArrayOfTags,
  enterWasPressed = false,
) => {
  if (enterWasPressed) {
    const newTagToSave = tags.trim();
    const currentSavedTags = [...arrayOfTags];
    const alreadyExists = currentSavedTags.indexOf(newTagToSave) > -1;
    if (newTagToSave !== '' && !alreadyExists) {
      setArrayOfTags(currentSavedTags.concat([newTagToSave]));
    }
    return setTags('');
  } else if (tags.indexOf(',') > -1) {
    const currentSavedTags = [...arrayOfTags];
    const [newTagToSave, ...remainder] = tags.split(',');

    const newTag = newTagToSave.trim();
    const alreadyExists = currentSavedTags.indexOf(newTag) > -1;

    if (newTag !== '' && !alreadyExists) {
      setArrayOfTags(currentSavedTags.concat([newTag]));
    }
    setTags(remainder.join(','));
  }
};

export const getAuthed = address => {
  // TODO: do these *need* to come from the form? b/c different for others?
  const clientId = 'https://www.rich-text.net';

  // const redirectUri = 'http://localhost:3000/';
  const redirectUri = 'https://post.porknachos.com/';
  return new Promise(function(resolve, reject) {
    transport
      .post(`${url}/auth`, {
        clientId,
        redirectUri,
        me: address,
        state: 'Bort!',
      })
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};

export const checkForCode = (params, setIsAuthed, setCheckingAuth) => {
  const needed = ['code', 'me', 'state'];
  const urlParams = new URLSearchParams(params);
  if (needed.every(param => urlParams.has(param))) {
    const code = urlParams.get('code');
    const me = urlParams.get('me');
    const state = urlParams.get('state');
    const authServerCb = 'https://www.porknachos.com/notifier/auth/callback';
    transport
      .get(`${authServerCb}?code=${code}&me=${me}&state=${state}`)
      .then(res => {
        const { err } = res.data;
        if (err) {
          setCheckingAuth(false);
          return undefined;
        } else {
          setIsAuthed(true);
          setCheckingAuth(false);
          window.history.pushState(null, document.title, '/');
        }
      });
  } else {
    setCheckingAuth(false);
    return undefined;
  }
};

export const renderTags = arr => {
  if (!arr || arr.length < 1) {
    return null;
  }
  return arr.map(tag => <span key={tag}>{tag}, </span>);
};

export const checkForCookie = (setIsAuthed, setMe) =>
  transport.get(`${url}/auth/amihere`).then(res => {
    console.log(res);
    if (res.data.cookie && res.data.me) {
      setMe(res.data.me);
      return setIsAuthed(true);
    }
    return setIsAuthed(false);
  });
