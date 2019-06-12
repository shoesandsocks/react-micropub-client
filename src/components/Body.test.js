import React from 'react';
// import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';

import Body from './Body';

afterEach(cleanup);

const secondMarkdown = `
  ![a cat](https://puppyrey.online/static/2019-05-18-60975-igla-teh5-d48d71ada59dd27af6518e685b66a52f-2d27f.jpg)
`;

const textareaMd = `## Test`;

let mockFn = jest.fn(() => secondMarkdown);

it('renders the textarea', () => {
  const { getByDisplayValue } = render(
    <Body text={textareaMd} change={mockFn} />,
  );
  expect(getByDisplayValue('## Test')).toBeInTheDocument();
});
