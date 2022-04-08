import React from "react";
import { ThemeContextInfo } from "../theme/context"

export const useThemeContext = () => {
  const context = React.useContext(ThemeContextInfo);

  if (context === undefined) {
    throw new Error('useThemeContext must be within a ThemeProvider');
  }

  return context;
}