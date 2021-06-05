import { createMuiTheme } from '@material-ui/core/styles';

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF3666',
  grey: '#7B8383',
  primaryRedColor: '#DD2025',
  primaryGreenColor: '#48B8B8',
  primaryGreyBackgroundColor: '#F4F4F4',
  secondaryGreyBackgroundColor: '#E8E8E8',
  primaryGreenGradient: 'linear-gradient(90deg, #48A2B8 0%, #45CEB4 101.93%)',
  primaryGreyBorderColor: '#E7E7EA',
};

const primaryFontFamily = 'Lato, sans-serif';

const theme = createMuiTheme({
  palette: {
    common: {
      black: colors.black,
      white: colors.white,
    },
    primary: {
      main: colors.primaryGreenColor,
    },
    grey: {
      400: colors.secondaryGreyBackgroundColor,
      500: colors.primaryGreyBackgroundColor,
      600: colors.grey,
      700: colors.primaryGreyBorderColor,
    },
    error: {
      main: colors.red,
      400: colors.primaryRedColor,
    },
  },
  typography: {
    fontFamily: primaryFontFamily,
  },
  overrides: {
    MuiTypography: {
      root: {
        fontFamily: primaryFontFamily,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      h1: {
        fontSize: 25,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: 25,
        fontWeight: 400,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.165,
      },
      h4: {
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 1.235,
        whiteSpace: 'normal',
      },
      h5: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 1.334,
        overflow: 'none',
        textOverflow: 'none',
        whiteSpace: 'normal',
      },
      h6: {
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: 1.6,
        overflow: 'none',
        textOverflow: 'none',
        whiteSpace: 'normal',
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.75,
      },
      subtitle2: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.55,
      },
      caption: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.2,
      },
      overline: {
        fontSize: 35,
        fontWeight: 700,
        lineHeight: 1.165,
      },
      body1: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1,
      },
      body2: {
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1.2,
      },
    },
  },
});

export default theme;
