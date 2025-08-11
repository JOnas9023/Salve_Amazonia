import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Paleta de cores suaves e acessível
  palette: {
    mode: 'light',
    primary: {
      main: '#4CAF50', // Verde suave principal
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF9800', // Laranja suave para destaque
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FAFAFA', // Fundo muito suave
      paper: '#FFFFFF',
      secondary: '#F5F5F5',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#D32F2F',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    // Cores personalizadas para o contexto de pets
    petColors: {
      dog: '#8D6E63', // Marrom suave para cães
      cat: '#9C27B0', // Roxo suave para gatos
      urgent: '#FF5722', // Vermelho para urgência
      rescued: '#4CAF50', // Verde para resgatados
      adopted: '#2196F3', // Azul para adotados
    },
  },
  
  // Tipografia
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: '#212121',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#212121',
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#212121',
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: '#212121',
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      color: '#212121',
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
      color: '#212121',
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#212121',
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#757575',
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  
  // Espaçamento
  spacing: 8,
  
  // Forma dos componentes
  shape: {
    borderRadius: 12, // Cantos mais suaves
  },
  
  // Configurações dos componentes
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#212121',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    // Melhorias de acessibilidade
    MuiFab: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: '2px solid #4CAF50',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
  
  // Breakpoints responsivos
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  
  // Transições suaves
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

export default theme;
