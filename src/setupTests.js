// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Need to this at the start of each test, since otherwise they brake
// when importing Link from 'react-router'.
// See https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;