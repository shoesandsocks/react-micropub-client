import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { InputWrap, InputLabel } from '../styled_parts';

// TODO: configurable?
const url = 'https://www.porknachos.com/node';

const Upload = ({ setFile, setFileURL }) => {
  const fileRef = useRef();
  const handleChange = () => {
    if (fileRef.current.files && fileRef.current.files.length > 0) {
      // send it to server immediately
      const formData = new FormData();
      formData.append('file', fileRef.current.files[0]);
      axios
        .post(`${url}/micropub/media/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(r => {
          if (r && r.data && r.data.url) {
            setFile(fileRef.current.files[0]);
            setFileURL(r.data.url);
          } else {
            console.log(
              'somthing went wrong uploading that file to pn filestorage',
            );
          }
        })
        .catch(e => {
          console.log(JSON.stringify(e, null, 4));
        });
      // set it into page
    }
  };
  return (
    <React.Fragment>
      <InputLabel id="upload-label" htmlFor="upload">
        Upload
      </InputLabel>
      <InputWrap
        aria-labelledby="upload-label"
        data-lpignore="true"
        type="file"
        name="upload"
        id="upload"
        ref={fileRef}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

// Upload.propTypes = {
//   uploadRef: PropTypes.func.isRequired,
// };

export default Upload;
