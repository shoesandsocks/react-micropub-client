import React from 'react';
import ReactDOM from 'react-dom';
import mockAxios from 'jest-mock-axios';

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  act,
} from 'react-testing-library';

import MicropubComposer from './MicropubComposer';

afterEach(cleanup);
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MicropubComposer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders all 3 labels/inputs', () => {
  const { getByLabelText } = render(<MicropubComposer />);
  expect(getByLabelText('Post title')).toBeInTheDocument();
  expect(getByLabelText('Post content')).toBeInTheDocument();
  expect(getByLabelText('Tags')).toBeInTheDocument();
});

it('receives splits from tag component', async () => {
  const { container, getByLabelText, getByText } = render(<MicropubComposer />);
  const tags = getByLabelText('Tags');
  fireEvent.change(tags, {
    target: { value: 'hashbrown, eggs, forks, banana, juice, waffles' },
  });
  const juiceEle = await waitForElement(() => getByText('juice'));
  const savedTagsDiv = container.getElementsByClassName('tag-bar')[0];
  expect(savedTagsDiv.lastChild).toEqual(juiceEle);
});

it('renders markdown from input to output', () => {
  const firstMarkdownSample = `
![a dog](https://puppyrey.online/static/2019-05-18-60975-igla-teh5-d48d71ada59dd27af6518e685b66a52f-2d27f.jpg)
`;
  const secondMarkdownSample = `
![a cat](https://puppyrey.online/static/2019-05-18-60975-igla-teh5-d48d71ada59dd27af6518e685b66a52f-2d27f.jpg)
`;
  const { getByAltText, getByLabelText } = render(<MicropubComposer />);
  const body = getByLabelText('Post content');
  fireEvent.change(body, {
    target: { value: firstMarkdownSample },
  });
  expect(getByAltText('a dog')).toBeInTheDocument();
  fireEvent.change(body, {
    target: { value: secondMarkdownSample },
  });
  expect(getByAltText('a cat')).toBeInTheDocument();
});

it('clears fields and displays URL on successful Submit', async () => {
  const { getByPlaceholderText, getByLabelText, getByText } = render(
    <MicropubComposer />,
  );
  // define our inputs
  const title = getByPlaceholderText('post title');
  const body = getByLabelText('Post content');
  const tags = getByLabelText('Tags');
  // give the inputs some text (and make sure it takes)
  fireEvent.change(title, { target: { value: 'my awesome post' } });
  fireEvent.change(body, { target: { value: 'some great content here' } });
  fireEvent.change(tags, { target: { value: 'hashbrown,' } }); // NOTE that comma! pushes it into array!

  // hit Submit and see if fields are again empty
  fireEvent.click(getByText('Submit'));

  // mock response
  expect(mockAxios.post).toHaveBeenCalledWith(
    'https://www.porknachos.com/notifier/create',
    {
      text: 'some great content here',
      tags: ['hashbrown'],
      title: 'my awesome post',
    },
  );
  act(() =>
    mockAxios.mockResponse({
      data: { error: null, url: 'https://www.example.com/content' },
      status: 200,
    }),
  );

  expect(title.value).toEqual('');
  expect(body.value).toEqual('');
  expect(tags.value).toEqual('');

  const successMsg = await waitForElement(() => getByText('Success!'));
  expect(successMsg).toBeInTheDocument();
});

// it('adds the default tag to array, if not present', async () => {
//   const { getByLabelText, getByText } = render(<MicropubComposer />);
//   const body = getByLabelText('Post content');
//   const tags = getByLabelText('Tags');
//   fireEvent.change(body, { target: { value: 'some great content here' } });
//   fireEvent.change(tags, { target: { value: 'hashbrown, sandwich' } });

//   fireEvent.click(getByText('Submit'));
//   const defaultTag = await waitForElement(() => getByText('micro.blog'));
//   expect(defaultTag).toBeInTheDocument();
// });

// it('doesn"t add the default tag to array, if already present', async () => {
//   const { getByLabelText, getAllByText, getByText } = render(
//     <MicropubComposer />,
//   );
//   const body = getByLabelText('Post content');
//   const tags = getByLabelText('Tags');
//   fireEvent.change(body, { target: { value: 'some great content here' } });
//   fireEvent.change(tags, {
//     target: { value: 'hashbrown, micro.blog, hotdog, sandwich' },
//   });

//   fireEvent.click(getByText('Submit'));
//   const mbs = getAllByText('micro.blog');
//   expect(mbs.length).toEqual(1);
// });

it('displays an error in the message field when Submit fails', async () => {
  const { getByPlaceholderText, getByLabelText, getByText } = render(
    <MicropubComposer />,
  );
  // define our inputs
  const title = getByPlaceholderText('post title');
  const body = getByLabelText('Post content');
  const tags = getByLabelText('Tags');
  // give the inputs some text (and make sure it takes)
  fireEvent.change(title, { target: { value: 'my awesome post' } });
  fireEvent.change(body, { target: { value: 'some great content here' } });
  fireEvent.change(tags, { target: { value: 'hashbrown' } });
  expect(title.value).toEqual('my awesome post');
  expect(body.value).toEqual('some great content here');
  expect(tags.value).toEqual('hashbrown');

  // hit Submit and see if fields are again empty
  fireEvent.click(getByText('Submit'));

  // mock response
  expect(mockAxios.post).toHaveBeenCalledWith(
    'https://www.porknachos.com/notifier/create',
    { text: 'some great content here', tags: [], title: 'my awesome post' },
  );
  act(() =>
    mockAxios.mockResponse({
      data: { error: '400 Unauthorized or Bad Request', url: null },
      status: 400,
    }),
  );

  expect(title.value).toEqual('my awesome post');
  expect(body.value).toEqual('some great content here');
  expect(tags.value).toEqual('hashbrown');

  const errorMsg = await waitForElement(() =>
    getByText('400 Unauthorized or Bad Request'),
  );
  expect(errorMsg).toBeInTheDocument();
});

it('displays an error in the message field when Network is down', async () => {
  const { getByLabelText, getByText } = render(<MicropubComposer />);
  const body = getByLabelText('Post content');
  fireEvent.change(body, { target: { value: 'some great content here' } });
  fireEvent.click(getByText('Submit'));
  expect(mockAxios.post).toHaveBeenCalledWith(
    'https://www.porknachos.com/notifier/create',
    { text: 'some great content here', tags: [] },
  );
  act(() => mockAxios.mockError({ error: '503 Network Unavailable' }));
  // act(() => mockAxios.mockError());
  expect(body.value).toEqual('some great content here');
  const errorMsg = await waitForElement(
    () => getByText('503 Network Unavailable'),
    // getByText('Something went wrong'),
  );
  expect(errorMsg).toBeInTheDocument();
});

it('displays an error in the message field when unknown network error', async () => {
  const { getByLabelText, getByText } = render(<MicropubComposer />);
  const body = getByLabelText('Post content');
  fireEvent.change(body, { target: { value: 'some great content here' } });
  fireEvent.click(getByText('Submit'));
  expect(mockAxios.post).toHaveBeenCalledWith(
    'https://www.porknachos.com/notifier/create',
    { text: 'some great content here', tags: [] },
  );
  act(() => mockAxios.mockError());
  expect(body.value).toEqual('some great content here');
  const errorMsg = await waitForElement(() =>
    getByText('Something went wrong'),
  );
  expect(errorMsg).toBeInTheDocument();
});
