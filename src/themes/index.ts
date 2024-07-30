import { alpha, createTheme, responsiveFontSizes } from "@mui/material";

export const Colors = {
  primary: "#1F3340",
  secondary: "#FA5B7B",
  white: "#FAFAFA",
  veryLightGrey: "#F2F2F2",
  lightGrey: "#E4E6EB",
  grey: "#333333",
  darkGrey: "#2C2C2C",
  dark: "#121212",
  black: "#000000",
};

export default responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary, //"#6291A8",
      },
      text: {
        primary: Colors.primary,
        secondary: Colors.white,
      },
    },
    typography: {
      fontFamily: "Open Sans, sans-serif",
      h1: {
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 800,
        fontSize: "3rem",
      },
      h2: {
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      h3: {
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 600,
        fontSize: "2rem",
      },
      h4: {
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 400,
        fontSize: "1.5rem",
      },
      body1: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 400,
        fontSize: "1rem",
      },
      body2: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 300,
        fontSize: "0.875rem",
      },
      button: {
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: "0.875rem",
      },
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            padding: 8,
            minWidth: '0px', 
            '@media (min-width:600px)': {
              minWidth: '480px',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: Colors.primary,
            color: Colors.white,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: Colors.primary,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: Colors.primary,
            color: Colors.white,
          },
        },
      },
      /* MuiButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: alpha(Colors.primary, 0.4),
            },
          },
        },
      }, 
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: alpha(Colors.primary, 0.4), 
            },
          },
        },
      }, */
    },
  }),
);
