import React from 'react';
import axios from 'axios';

// TODO: configurable?
const url = 'https://www.porknachos.com/notifier';

export const post = obj => {
  // const keys = Object.keys(obj);
  // const neededKeys = ['title', 'arrayOfTags', 'body'];
  // const all = neededKeys.every(key => keys.includes(key));
  // if (!all) return false;

  // TODO: the notifier server is only handling "text"for short-posts right now
  const temporaryTransform = {
    text: obj.body,
  };
  return axios.post(`${url}/create`, temporaryTransform);
};

export const processTags = (tags, setTags, arrayOfTags, setArrayOfTags) => {
  if (tags.indexOf(',') > -1) {
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
  const redirectUri = 'http://localhost:3000/';
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

export const checkForCode = (params, setIsAuthed) => {
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
        return undefined;
      } else {
        setIsAuthed(true);
        window.history.pushState(null, document.title, '/');
      }
    });
  } else {
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
  return arr.map(tag => <span>{tag}, </span>);
};
