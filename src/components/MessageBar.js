import React from 'react';
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

export default ({ message }) => (
  <Msg dangerouslySetInnerHTML={{ __html: message }} />
);
