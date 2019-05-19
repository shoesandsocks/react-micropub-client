export const post = str => {
  console.log(str);
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
    setTags(remainder.join());
  }
};
