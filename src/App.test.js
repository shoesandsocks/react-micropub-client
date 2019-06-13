import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render, act, waitForElement } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

import App from './App';

afterEach(cleanup);
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
});

it('converts a param code and toggles isAuthed', async () => {
  const urlPs = `?code=123&me=rich&state=Bort!`;
  window.history.pushState({}, 'Test Title', urlPs);
  const { getByLabelText } = render(<App />);
  act(() => {
    mockAxios.mockResponse({ err: null, me: 'rich' });
  });
  const title = await waitForElement(() => getByLabelText('Post title'));
  expect(title).toBeInTheDocument();
  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://www.porknachos.com/notifier/auth/callback?code=123&me=rich&state=Bort!',
  );
});
