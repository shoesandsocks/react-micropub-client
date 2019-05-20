import React from 'react';
import ReactDOM from 'react-dom';
import { render, act, waitForElement } from 'react-testing-library';
import mockAxios from 'jest-mock-axios';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('converts a param code and toggles isAuthed', async () => {
  window.history.pushState(
    {},
    'Test Title',
    `${window.location}?code=123&me=rich&state=Bort!`,
  );
  const { getByLabelText } = render(<App />);
  expect(mockAxios.get).toHaveBeenCalledWith(
    'https://www.porknachos.com/notifier/auth/callback?code=123',
  );
  act(() =>
    mockAxios.mockResponse({ data: { err: null, msg: 'ok' }, response: 200 }),
  );
  const title = await waitForElement(() => getByLabelText('Post title'));
  expect(title).toBeInTheDocument();
});
