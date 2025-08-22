// This file runs before all tests.

// This polyfill adds browser APIs like TextEncoder to the Jest environment,
// which can prevent errors with some libraries.
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});