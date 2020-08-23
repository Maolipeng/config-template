import * as types from '../action-types.js'

export const reduceAction = (data) => {
  return {
    type: types.REDUCE_NUMBER,
    data,
  }
}
export const addAction = (data) => {
  return {
    type: types.ADD_NUMBER,
    data,
  }
}
export const resetAction = (data) => {
  return {
    type: types.RESET_ACTION,
    data,
  }
}
