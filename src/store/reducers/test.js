import * as types from '../action-types.js'

const initState = {
  num: 0,
  bol: false,
}
export default (state = initState, { type, data }) => {
  switch (type) {
    case types.ADD_NUMBER:
      return {
        ...state,
        num: state.num + data,
      }
    case types.REDUCE_NUMBER:
      return {
        ...state,
        num: state.num - data,
      }
    case types.RESET_ACTION:
      return {
        ...state,
        num: initState.num,
      }
    default:
      return state
  }
}
