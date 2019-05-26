import React, { useRef } from 'react';
// import PropTypes from 'prop-types';

import { InputWrap, InputLabel } from '../styled_parts';

const Upload = ({ setFile }) => {
  const fileRef = useRef();
  const handleChange = () => {
    if (fileRef.current.files && fileRef.current.files.length > 0) {
      setFile(fileRef.current.files[0]);
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
