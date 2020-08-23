import * as types from '../action-types.js';

export const testAction = (data) => {
  return {
    type: types.TEST_ACTION,
    data,
  }
}