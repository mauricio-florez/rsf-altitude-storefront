import React from 'react'
import { designTokens } from 'altitude-designsystem'

const ThemeContext = React.createContext()

function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={{ ...designTokens }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
