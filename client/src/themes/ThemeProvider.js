import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import lightTheme from './Lightmode';
import darkTheme from './Darkmode';

const ThemeProvider = ({ children, themeMode = 'light' }) => {
  const selectedTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={selectedTheme}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
