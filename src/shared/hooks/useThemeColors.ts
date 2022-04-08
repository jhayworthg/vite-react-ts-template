import { MantineColor, useMantineTheme } from "@mantine/core"
import { useContext, useEffect, useState } from "react";
import { ThemeContextInfo } from "../theme/context";
import { Colors } from "../types/setup";

export const useThemeColors = () => {
  const theme = useMantineTheme();
  const context = useContext(ThemeContextInfo);
  const [colors, setColors] = useState<Colors>({
    error: '#ffffff',
    info: '#ffffff',
    primary: '#ffffff',
    secondary: '#ffffff',
    success: '#ffffff',
    warn: '#ffffff',
  });

  useEffect(() => {
    populateColors();
  }, [])

  useEffect(() => {
    populateColors();
  }, [theme.colorScheme, context.colors])

  const populateColors = () => {
    if (!context && !theme) return;
    const index: number = theme.colorScheme === 'dark' ? 5 : 7;

    if (context && theme) {
      setColors({
        error: getMantineColor(context.colors.error, index),
        info: getMantineColor(context.colors.info, index),
        primary: getMantineColor(context.colors.primary, index),
        secondary: getMantineColor(context.colors.secondary, index),
        success: getMantineColor(context.colors.success, index),
        warn: getMantineColor(context.colors.warn, index),
      })
    } else if (theme) {
      setColors({ 
        error: theme.colors.red[index],
        info: theme.colors.violet[index],
        primary: theme.colors.blue[index],
        secondary: theme.colors.pink[index],
        success: theme.colors.teal[index],
        warn: theme.colors.yellow[index],
      })
    }
  }

  const getMantineColor = (themeColor: MantineColor, index: number): MantineColor => {
    let returnColor: MantineColor | undefined = undefined;

    for (const [key, value] of Object.entries(theme.colors)) {
      if (key === themeColor) {
        returnColor = value[index];
      }
    }

    return returnColor ?? theme.colors.blue[index];
  }

  if(context === undefined) {
    throw new Error('useThemeColors must be within a ThemeProvider');
  }

  return colors;
}