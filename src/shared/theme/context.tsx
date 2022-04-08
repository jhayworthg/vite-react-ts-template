import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import { createContext, useEffect, useState } from "react";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { ColorConfig, GradientConfig, NotifyConfig, ThemeContext, ThemeProviderProps } from "../types/setup";
import { defaultColors, defaultGradients, defaultNotify } from "./defaults";

export const ThemeContextInfo = createContext<ThemeContext>({
  applyGradients: false,
  colors: {...defaultColors},
  colorScheme: 'dark',
  gradients: {...defaultGradients},
  notify: {...defaultNotify},
  schemeOverrides: {} as Record<string, MantineThemeOverride>,
  toggleColorScheme: () => {},
});

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [shouldUseGradients, setShouldUseGradients] = useState<boolean>(false);
  const [colors, setColors] = useState<ColorConfig>({...defaultColors});
  const [gradients, setGradients] = useState<GradientConfig>({...defaultGradients});
  const [notify, setNotify] = useState<NotifyConfig>({...defaultNotify});
  const [scheme, setScheme] = useState<ColorScheme>('dark');
  const [overrides, setOverrides] = useState<Record<string, MantineThemeOverride>>({});
  const { deviceSize } = useBreakpoints();
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  
  const setColorScheme = (colorScheme: ColorScheme) => setScheme(colorScheme);
  
  const toggleColorScheme = () => {
    setColorScheme(scheme === 'dark' ? 'light' : 'dark');
    window.localStorage.setItem(props.appThemeName, scheme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    setShouldUseGradients(props.applyGradients === true ? true : false);
    if (props.colors) setColors({...defaultColors, ...props.colors});
    if (props.gradients) setGradients({...defaultGradients, ...props.gradients});
    if (props.notify) setNotify({...defaultNotify, ...props.notify});
    setOverrides(props.schemeOverrides ? {...props.schemeOverrides} : {});

    if (!hasChanged) {
      let preference: string | null = window.localStorage.getItem(props.appThemeName);

      if (!preference) {
        preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        window.localStorage.setItem(props.appThemeName, preference);
      }

      setScheme(preference === 'light' ? 'light' : 'dark');
      setHasChanged(true);
    }
  }, [props])

  return (
    <ThemeContextInfo.Provider
      value={{
        applyGradients: shouldUseGradients,
        colors: colors,
        colorScheme: scheme,
        gradients: gradients,
        notify: notify,
        schemeOverrides: overrides,
        toggleColorScheme: toggleColorScheme,
      }}
    >
      <ColorSchemeProvider colorScheme={scheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme: scheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider
            autoClose={notify.autoClose}
            limit={notify.limit}
            position={notify.position}
            containerWidth={['xs', 'sm'].includes(deviceSize) ? 300 : 440}
          >
            <ModalsProvider>
              {hasChanged && (
                <>
                {props.children}
                </>
              )}
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ThemeContextInfo.Provider>
  )
}