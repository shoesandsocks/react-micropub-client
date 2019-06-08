import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Msg = styled.div`
  color: #2d2d2d;
  position: fixed;
  height: 3rem;
  width: 100%;
  background: #eee;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  & a {
    color: seagreen;
  }
`;

const MessageBar = ({ message, me }) => {
  return message ? (
    <Msg dangerouslySetInnerHTML={{ __html: message }} />
  ) : (
    <Msg>posting to ${me}</Msg>
  );
};

MessageBar.propTypes = {
  me: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageBar;
