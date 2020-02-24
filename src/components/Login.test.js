import React from 'react';
import {
  cleanup,
  act,
  render,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

import Login from './Login';
import App from '../App';

afterEach(cleanup);
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it('POST a login correctly', async () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  // get past initial checkingAuth (see App.test.js), but FAIL on purpose ("no user")
  act(() => {
    mockAxios.mockResponse({ err: 'No user', me: null });
  });
  //address must be there if 'Login' component has properly loaded at start of workflow
  const address = await waitForElement(() =>
    getByPlaceholderText('your website'),
  );
  fireEvent.change(address, { target: { value: 'https://www.rich-text.net' } });
  expect(address.value).toEqual('https://www.rich-text.net');

  fireEvent.click(getByText('log me in'));
  act(() => {
    mockAxios.mockResponse({ data: { url: 'https://www.rich-text.net/' } });
  });

  // mock response
  expect(mockAxios.post).toHaveBeenCalledWith(
    'https://www.porknachos.com/node/auth',
    {
      clientId: 'https://www.rich-text.net',
      redirectUri: 'https://post.porknachos.com/',
      me: 'https://www.rich-text.net',
      state: 'Bort!',
    },
  );
});

it('stays on Login if server refuses code', async () => {
  window.history.pushState({}, 'Test Title', `?code=456&me=bort&state=Bort!`);
  const { getByText } = render(<App />);
  act(() => {
    mockAxios.mockResponse({
      data: { err: 'Token superfail on callback', msg: null },
    });
  });
  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://www.porknachos.com/node/auth/callback?code=456&me=bort&state=Bort!',
  );
  const website = await waitForElement(() => getByText('Website'));
  expect(website).toBeInTheDocument();
});
