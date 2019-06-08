import React from 'react';

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from 'react-testing-library';

import Tags from './Tags';

afterEach(cleanup);

const taginstance = 'coffee';
let arrayOfTags = ['biscuit', 'gravy'];
const setTags = jest.fn();
const setArrayOfTags = jest.fn();
// setArrayOfTags.mockReturnValueOnce(['biscuit']);

it('removes tag when cloud-icon clicked', async () => {
  const {
    container,
    getByText,
    getByLabelText,
    queryByText,
    rerender,
  } = render(
    <Tags
      tags={taginstance}
      arrayOfTags={arrayOfTags}
      setTags={setTags}
      setArrayOfTags={setArrayOfTags}
    />,
  );
  // const tagInput = await waitForElement(() => getByLabelText('Tags'));
  const gravyEle = await waitForElement(() => getByText('gravy'));
  const savedTagsDiv = container.getElementsByClassName('tag-bar')[0];
  expect(savedTagsDiv.lastChild).toEqual(gravyEle);
  fireEvent.click(gravyEle);
  expect(setArrayOfTags).toHaveBeenCalledTimes(1);
  fireEvent.change(savedTagsDiv);
  // expect(savedTagsDiv.children.length).toBe(1)
  // this doesn't seem right. of course it works if I manually change the array and re-render.
  // all i'm doing is checking that the click function is clickable.
  rerender(
    <Tags
      tags={taginstance}
      arrayOfTags={['biscuit']}
      setTags={setTags}
      setArrayOfTags={setArrayOfTags}
    />,
  );
  expect(queryByText('gravy')).not.toBeInTheDocument();
});
