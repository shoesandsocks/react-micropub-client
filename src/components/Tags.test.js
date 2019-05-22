import React from 'react';

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  wait,
} from 'react-testing-library';

import Tags from './Tags';

afterEach(cleanup);

const taginstance = 'coffee';
let arrayOfTags = ['biscuit', 'gravy'];
const setTags = jest.fn();
const setArrayOfTags = jest.fn();
setArrayOfTags.mockReturnValueOnce(['biscuit', 'darma']);

it('removes tag when cloud-icon clicked', async () => {
  const { container, getByText, debug, queryByText } = render(
    <Tags
      tags={taginstance}
      arrayOfTags={arrayOfTags}
      setTags={setTags}
      setArrayOfTags={setArrayOfTags}
    />,
  );

  const gravyEle = await waitForElement(() => getByText('gravy'));
  const savedTagsDiv = container.getElementsByClassName('tag-bar')[0];
  expect(savedTagsDiv.lastChild).toEqual(gravyEle);
  fireEvent.click(gravyEle);
  await wait(() => {
    debug();
    expect(setArrayOfTags).toHaveBeenCalledTimes(1);
    expect(queryByText('gravy')).not.toBeInTheDocument();
  });
});
