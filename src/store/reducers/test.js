import * as types from '../action-types.js'

const initState = {
  msg: '123',
  bol: false,
}
export default (state = initState, { type, data }) => {
  switch (type) {
    case types.ADD_NUMBER:
      return {
        ...state,
        msg: data,
      }
    case types.ADD_NUMBER:
      return {
        ...state,
        msg: data,
      }
    default:
      return state
  }
}
