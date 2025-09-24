import React, { useReducer, useRef } from 'react'

function reducer(currentstate,action) {
  console.log(action);
  
}
function Counter(e) {

  const[state,dispatch] =useReducer(reducer,0)
  const inputref = useRef();
  function run(e) {
    e.preventDefault()
    let value = Number(inputref.current.value)
    dispatch(value)
  }
  return (
    <>
    <form action="">
      <h1>{state}</h1>
      <input type="number" ref={inputref} />
      <button type="submit" onClick={run()}>ok</button>
    </form>
    </>
  )
}
export default Counter
