// adapted from https://codepen.io/wiiiiilllllll/pen/Cjtcd
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Pineandvine from './Pineandvine';
import { blueGradient } from '../styled_parts';
const Page = styled.div`
  height: 95vh;
  width: 100%;
  background: ${blueGradient};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font: 3rem Courier;
  color: #eee;
`;

const clockwise = keyframes`
  0%  { transform: rotate(0deg) }
  100%{ transform: rotate(360deg) }
`;

const counterClockwise = keyframes`
  0%  { transform: rotate(360deg) }
  100%{ transform: rotate(0deg) }
`;

const Spinner = styled.div`
  /* background: white; */
  animation: ${clockwise} 1.5s linear infinite;
  display: block;
  height: 2em;
  position: relative;
  width: 2em;
  border: 0.2em solid transparent;
  border-radius: 50%;
  border-top-color: darkkhaki;
  margin: auto;
  &::before,
  &::after {
    border: 0.2em solid transparent;
    border-radius: 50%;
    border-top-color: darkkhaki;
    margin: auto;
    content: '';
    position: absolute;
  }
  &::before {
    animation: ${counterClockwise} 1s linear infinite;
    top: -0.6em;
    right: -0.6em;
    bottom: -0.6em;
    left: -0.6em;
  }
  &::after {
    animation: ${counterClockwise} 0.5s linear infinite;
    top: 0.3em;
    right: 0.3em;
    bottom: 0.3em;
    left: 0.3em;
  }
`;

const Loading = ({ text }) => {
  return (
    <React.Fragment>
      <Page>
        <Spinner />
        {text}
      </Page>
      <Pineandvine />
    </React.Fragment>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: 'Loading',
};

export default Loading;
