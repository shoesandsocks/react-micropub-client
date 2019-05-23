import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
// import mockAxios from 'jest-mock-axios';

import Login from './Login';
import App from '../App';

it('POST a login correctly', async () => {
  const { getByPlaceholderText, getByText } = render(<App />);

  //address must be there if 'Login' component has properly loaded at start of workflow

  const address = await waitForElement(() =>
    getByPlaceholderText('your website'),
  );
  fireEvent.change(address, { target: { value: 'https://www.rich-text.net' } });
  expect(address.value).toEqual('https://www.rich-text.net');

  fireEvent.click(getByText('log me in'));

  // // mock response
  // expect(mockAxios.post).toHaveBeenCalledWith(
  //   'https://www.porknachos.com/notifier/auth',
  //   {
  //     clientId: 'https://www.rich-text.net',
  //     redirectUri: 'http://localhost:3000/', // https://post.porknachos.com/
  //     me: 'https://www.rich-text.net',
  //     state: 'Bort!',
  //   },
  // );
  // act(() => { mockAxios.mockResponse({ data: { url: 'https://www.rich-text.net/' } })});
});

it('stays on Login if server refuses code', async () => {
  window.history.pushState(
    {},
    'Test Title',
    `${window.location}?code=456&me=rich&state=Bort!`,
  );
  const { getByText } = render(<Login />);
  // expect(mockAxios.get).toHaveBeenCalledWith(
  //   'https://www.porknachos.com/notifier/auth/callback?code=456',
  // );
  // act(() =>
  //   mockAxios.mockResponse(undefined),
  // );
  // i can't seem to mock the 'fail' response because it's just a fn
  // that returns undefined.
  const website = await waitForElement(() => getByText('Website'));
  expect(website).toBeInTheDocument();
});
