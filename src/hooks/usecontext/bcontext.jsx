import React, { useContext } from 'react'
import { cc } from './usecontext'


function Bcontext() {
    let uc = useContext(cc)
  return (
    <div>{uc}</div>
  )
}

export default Bcontext