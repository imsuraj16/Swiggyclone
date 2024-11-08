"use client"
import React, { useState } from 'react'
import { visibilityContext } from '../ContexAPI/Context'
const Visibilityprovider = ({children}) => {
    const [visible, setVisible] = useState(false)
  return (
    <div>
        <visibilityContext.Provider value={{visible, setVisible}}>
        {children}
        </visibilityContext.Provider>
     
    </div>
  )
}

export default Visibilityprovider
