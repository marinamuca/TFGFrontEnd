import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
interface Props {
    children: React.ReactNode;
}

const MuiThemeProvider: React.FC<Props> = ({children }) => {
    const appTheme = createTheme({
        palette: {
              primary: {
                  main: '#b36af3',
      
              },
              secondary: {
                  main: '#8f2ae5',
                  contrastText: "#ffffff"
              },
              info: {
                  main: '#f775b6'
              },
              success: {
                  main: '#9dda63',
                  contrastText: "#ffffff"
              },
          },
      });
      return (
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme/>
          {children}
        </ThemeProvider>
      );
}

export default MuiThemeProvider;