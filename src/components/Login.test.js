import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';
import mockAxios from 'jest-mock-axios';

import Login from './Login';

it('POST a login correctly', async () => {
  const { getByLabelText, getByText } = render(<Login />);

  //address must be there if 'Login' component has properly loaded at start of workflow
  const address = getByLabelText('Website');
  fireEvent.change(address, { target: { value: 'https://www.rich-text.net' } });
  expect(address.value).toEqual('https://www.rich-text.net');

  fireEvent.click(getByText('log me in'));

  // mock response
  expect(mockAxios.post).toHaveBeenCalledWith(
    'https://www.porknachos.com/notifier/auth',
    {
      clientId: 'https://www.rich-text.net',
      redirectUri: 'http://localhost:3000/',
      me: 'https://www.rich-text.net',
      state: 'Bort!',
    },
  );
  act(() =>
    mockAxios.mockResponse({ data: { err: null, msg: 'ok' }, response: 200 }),
  );
});
