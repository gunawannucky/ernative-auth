import * as React from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {PaperProvider, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import RootNavigator from '@routes/root-navigator';
import {ToastComponent} from '@iqorlobanov/react-native-toast';
import fonts from '@configs/font-config';
import AuthProvider from '@modules/auth/auth-provider';

interface IThemeContext {
  themeType: ColorSchemeName;
  setThemeType: Function;
}

export const ThemeContext = React.createContext<IThemeContext>({
  themeType: 'light',
  setThemeType: () => {},
});

export default function Main() {
  const colorScheme = useColorScheme();

  const [themeType, setThemeType] = React.useState(colorScheme);
  const themeTypeContext: IThemeContext = React.useMemo(
    () => ({themeType, setThemeType}),
    [themeType],
  );

  const theme =
    themeType === 'dark' ? {...MD3DarkTheme, fonts} : {...MD3LightTheme, fonts};

  return (
    <>
      <ThemeContext.Provider value={themeTypeContext}>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </PaperProvider>
      </ThemeContext.Provider>
      <ToastComponent />
    </>
  );
}
