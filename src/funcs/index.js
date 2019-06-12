import React from 'react';
import axios from 'axios';

// const transport = axios.create({
//   withCredentials: true,
// });
axios.defaults.withCredentials = true;

require('dotenv').config();
const defaultTag = process.env.REACT_APP_DEFAULT_TAG;

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
  return axios.post(`${url}/create/form`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const post = obj => {
  if (!hasTheseKeys(['title', 'arrayOfTags', 'body'], obj)) {
    return { error: 'Missing key(s)' };
  }
  const { body, arrayOfTags, title } = obj;
  if (!arrayOfTags.includes(defaultTag)) {
    arrayOfTags.push(defaultTag);
  }
  const postObject = {
    text: body,
    tags: arrayOfTags || [],
  };
  if (title !== '') {
    postObject.title = title;
  }
  return axios.post(`${url}/create`, postObject);
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
    axios
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

export const checkForCode = (params, setIsAuthed, setCheckingAuth, setMe) => {
  const needed = ['code', 'me', 'state'];
  const urlParams = new URLSearchParams(params);
  if (needed.every(param => urlParams.has(param))) {
    const code = urlParams.get('code');
    const me = urlParams.get('me');
    const state = urlParams.get('state');
    const authServerCb = 'https://www.porknachos.com/notifier/auth/callback';
    axios
      .get(`${authServerCb}?code=${code}&me=${me}&state=${state}`)
      .then(res => {
        const { err } = res.data;
        if (err) {
          setCheckingAuth(false);
          return undefined;
        } else {
          setMe(me);
          setIsAuthed(true);
          setCheckingAuth(false);
          window.history.pushState(null, document.title, '/');
        }
      });
  } else {
    return cookieCheck(setIsAuthed, setCheckingAuth, setMe);
  }
};

const cookieCheck = (setIsAuthed, setCheckingAuth, setMe) => {
  axios.get(`${url}/auth/cookie`).then(response => {
    // console.log(response.data);
    const { me, error } = response.data;
    if (me) {
      setMe(me);
      setCheckingAuth(false);
      setIsAuthed(true);
    } else {
      // console.log(error);
      setCheckingAuth(false);
      return undefined;
    }
  });
};

export const renderTags = arr => {
  if (!arr || arr.length < 1) {
    return null;
  }
  return arr.map(tag => <span key={tag}>{tag}, </span>);
};
