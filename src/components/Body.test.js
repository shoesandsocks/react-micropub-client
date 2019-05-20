import React from 'react';
// import ReactDOM from 'react-dom';
import { render, cleanup } from 'react-testing-library';

import Body from './Body';

afterEach(cleanup);

const sampleMarkdown = `
#This is the post content.

1. It's quite interesting.
2. I like it.

This is a new **paragraph**.

Bort 🐊

Everyone loves [porknachos.com](https://www.porknachos.com), right?

_This is a dog._

![a dog](https://puppyrey.online/static/2019-05-18-60975-igla-teh5-d48d71ada59dd27af6518e685b66a52f-2d27f.jpg)
`;

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

it('renders markdown', () => {
  const { getByAltText, rerender } = render(
    <Body text={sampleMarkdown} change={mockFn} />,
  );
  // alt text of 'a dog' must be coming from marked, since it's not in the literal string
  expect(getByAltText('a dog')).toBeInTheDocument();
  // changing to secondMarkdown should prove that marked is changing the alt-text
  rerender(<Body text={secondMarkdown} change={mockFn} />);
  expect(getByAltText('a cat')).toBeInTheDocument();
});
