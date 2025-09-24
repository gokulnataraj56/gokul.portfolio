import React, { createContext } from 'react'
import Acontext from './acontext'

export let cc = createContext() 
function Context() {
    let a = 'vanakam';
  return (
    <cc.Provider value={a}>
    <p>Context</p>
            <Acontext/>   
    </cc.Provider>
  )
}
export default Context