import React from 'react'
import { ThemeContextInfo } from '../theme/context'

export const useToggleTheme = () => {
  const context = React.useContext(ThemeContextInfo);

  if (context === undefined) {
    throw new Error('useToggleTheme must be within a ThemeProvider');
  }

  return context.toggleColorScheme;
}