import { createTheme } from '@mui/material/styles';

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

export default appTheme;