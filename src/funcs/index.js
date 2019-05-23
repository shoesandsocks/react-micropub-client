import React from 'react';
import axios from 'axios';

// TODO: configurable?
const url = 'https://www.porknachos.com/notifier';

export const display = (set, message, seconds) => {
  setTimeout(() => {
    set('');
  }, seconds);
  return set(message);
};

export const post = obj => {
  const keys = Object.keys(obj);
  const neededKeys = ['title', 'arrayOfTags', 'body'];
  const all = neededKeys.every(key => keys.includes(key));
  if (!all) return false;

  const textOnly = {
    text: obj.body,
    tags: obj.arrayOfTags || [],
  };

  const networkObject = {
    text: obj.body,
    tags: obj.arrayOfTags,
    title: obj.title,
  };
  if (obj.title === '') return axios.post(`${url}/create`, textOnly);
  return axios.post(`${url}/create`, networkObject);
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

export const checkForCode = (params, setIsAuthed, setCheckingAuth) => {
  const needed = ['code', 'me', 'state'];
  const urlParams = new URLSearchParams(params);
  if (needed.every(param => urlParams.has(param))) {
    const code = urlParams.get('code');
    // TODO: what am i supposed to do with state & me?
    // const me = urlParams.get('me');
    // const state = urlParams.get('state');
    const authServerCb = 'https://www.porknachos.com/notifier/auth/callback';
    axios.get(`${authServerCb}?code=${code}`).then(res => {
      const { err } = res.data;
      if (err) {
        //
        setCheckingAuth(false);
        //
        return undefined;
      } else {
        setIsAuthed(true);
        //
        setCheckingAuth(false);
        //
        window.history.pushState(null, document.title, '/');
      }
    });
  } else {
    //
    setCheckingAuth(false);
    //
    return undefined;
  }
};

export const renderTags = arr => {
  if (!arr) {
    return null;
  }
  if (arr.length < 1) {
    return null;
  }
  return arr.map(tag => <span key={tag}>{tag}, </span>);
};
