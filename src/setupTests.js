// https://facebook.github.io/create-react-app/docs/running-tests#src-setuptestsjs

// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each';
// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';

afterEach(cleanup);
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});
