import React, { useRef } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import VirtoConnect from './VirtoConnect';

interface LoginPageProps {
  onConnect: () => void;
}

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const LoginPage: React.FC<LoginPageProps> = ({ onConnect }) => {
  const virtoConnectRef = useRef<any>(null);

  const handleConnect = () => {
    if (virtoConnectRef.current) {
      virtoConnectRef.current.open();
    }
  };

  const handleConnected = (detail: any) => {
    console.log('Connected successfully:', detail);
    onConnect();
  };

  const handleError = (detail: any) => {
    console.error('Connection error:', detail);
  };

  return (
    <StyledContainer>
      <Typography variant="h2" component="h1" color="primary" gutterBottom>
        PolkaTalent
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6, opacity: 0.8 }}>
        Build, Coordinate, or Hire in Web3. Without Intermediaries.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <LoginButton onClick={handleConnect}>
          Login with Virto
        </LoginButton>
      </Box>
      <VirtoConnect
        ref={virtoConnectRef}
        onConnected={handleConnected}
        onError={handleError}
      />
    </StyledContainer>
  );
};

export default LoginPage; 