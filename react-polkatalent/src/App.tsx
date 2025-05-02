import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import './App.css';
import VirtoLoginButton from './components/VirtoLoginButton';

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#8A2BE2',
    },
    background: {
      default: '#1a1a1a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {!isConnected ? (
        <LoginPage onConnect={() => setIsConnected(true)} />
      ) : (
        <RegistrationPage />
      )}
      <div className="App">
        <header className="App-header">
          <h1>Bienvenido a Kunveno</h1>
          <VirtoLoginButton />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
