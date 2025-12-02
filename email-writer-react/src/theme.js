import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8257E6', 
    },
    secondary: {
      main: '#9747FF',
    },
    background: {
      default: '#121214', 
      paper: '#202024', 
    },
    text: {
      primary: '#E1E1E6',
      secondary: '#C4C4CC',
    },
    border: '#323238',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: {
      fontWeight: 700,
      color: '#E1E1E6',
    },
    h6: {
      fontWeight: 600,
      color: '#E1E1E6',
    },
    body1: {
      color: '#C4C4CC',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            fontWeight: 500,
            color: '#C4C4CC',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#121214',
            '& fieldset': {
              borderColor: '#323238',
            },
            '&:hover fieldset': {
              borderColor: '#8257E6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8257E6',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#121214',
          '& fieldset': {
            borderColor: '#323238',
          },
          '&:hover fieldset': {
            borderColor: '#8257E6',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#8257E6',
          },
        },
        icon: {
          color: '#8257E6',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', 
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
