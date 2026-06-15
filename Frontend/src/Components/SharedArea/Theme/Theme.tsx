import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  direction: 'rtl',

  typography: {
    fontFamily: [
      'Assistant',
      'Heebo',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});