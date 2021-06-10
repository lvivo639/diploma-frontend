import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Muli', 'sans-serif'].join(','),
  },
  palette: {
    error: {
      main: '#e63946',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
});
export default theme;
