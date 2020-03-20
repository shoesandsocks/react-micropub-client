import React from 'react';
import axios from 'axios';

// const transport = axios.create({
//   withCredentials: true,
// });
axios.defaults.withCredentials = true;

// TODO: configurable?
const url = 'https://www.porknachos.com/node';

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
  if (
    !hasTheseKeys(['title', 'arrayOfTags', 'body', 'fileURL', 'altText'], obj)
  ) {
    return { error: 'Missing key(s)' };
  }
  const { body, arrayOfTags, title, fileURL, altText } = obj;

  const postObject = {
    text: body,
    tags: arrayOfTags || [],
    fileURL,
    altText,
  };
  if (title !== '') {
    postObject.title = title;
  }
  return axios.post(`${url}/create`, postObject);
  // const formData = new FormData();
  // for (const key in obj) {
  //   formData.append(key, obj[key]);
  // }
  // return axios.post(`${url}/create/`, formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // });
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
  // console.log('before needed.every: ', params);
  if (needed.every(param => urlParams.has(param))) {
    // console.log('inside needed.every')
    const code = urlParams.get('code');
    const me = urlParams.get('me');
    const state = urlParams.get('state');
    const authServerCb = 'https://www.porknachos.com/node/auth/callback';
    return axios
      .get(`${authServerCb}?code=${code}&me=${me}&state=${state}`)
      .then(res => {
        const { err, msg } = res.data;
        if (err) {
          console.log(msg);
          setCheckingAuth(false);
          return undefined;
        } else {
          setMe(me);
          setIsAuthed(true);
          setCheckingAuth(false);
          return window.history.pushState(null, document.title, '/');
        }
      });
  } else {
    return cookieCheck(setIsAuthed, setCheckingAuth, setMe);
  }
};

const cookieCheck = (setIsAuthed, setCheckingAuth, setMe) => {
  axios
    .get(`${url}/auth/cookie`)
    .then(response => {
      // console.log(response.data);
      const { me, error } = response.data;
      if (me) {
        setMe(me);
        setCheckingAuth(false);
        setIsAuthed(true);
      } else {
        console.log(error);
        setCheckingAuth(false);
        return undefined;
      }
    })
    .catch(e => console.log(e));
};

export const renderTags = arr => {
  if (!arr || arr.length < 1) {
    return null;
  }
  return arr.map(tag => <span key={tag}>{tag}, </span>);
};
