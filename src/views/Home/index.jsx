import React, { useCallback } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'

import * as types from '@/store/action-types.js'

const Home = () => {
  const store = useStore()
  const dispatch = useDispatch()
  const counter = useSelector((state) => state.test.num)
  const addAcFn = useCallback(
    (num) => dispatch({ type: types.ADD_NUMBER, data: num }),
    [dispatch]
  )
  const reduceAcFn = useCallback(
    (num) => dispatch({ type: types.REDUCE_NUMBER, data: num }),
    [dispatch]
  )
  const resetAcFn = useCallback(() => dispatch({ type: types.RESET_ACTION }), [
    dispatch,
  ])

  return (
    <div>
      这是home页面
      <h1>{store.getState().test.num}</h1>
      <h1>{counter}</h1>
      <div>
        <button onClick={() => addAcFn(1)}>add</button>
        <button onClick={() => reduceAcFn(1)}>reduce</button>
        <button onClick={resetAcFn}>reset</button>
      </div>
    </div>
  )
}
export default Home
