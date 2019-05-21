import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: #2d2d2d;
  &:hover,
  :visited {
    color: #999;
  }
`;

const P = styled.p`
  position: sticky;
  float: right;
  font-size: 12px;
  padding: ${({ padString }) => padString || '0 4px 0 0'};
`;

const Pineandvine = ({ padString }) => (
  <P padString={padString}>
    made with{' '}
    <span role="img" aria-label="Dog">
      🐶
    </span>{' '}
    by <Link href="https://www.pineandvine.com">pineandvine.com</Link>
  </P>
);

export default Pineandvine;
