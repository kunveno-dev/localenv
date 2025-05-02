import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    alias: '',
    githubUsername: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <StyledContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" component="h1">
          Your personal information
        </Typography>
      </Box>

      <FormContainer>
        <LeftSection>
          <Box sx={{ mb: 2 }}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload
              <VisuallyHiddenInput type="file" accept="image/*" />
            </Button>
          </Box>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Alias (optional)"
            name="alias"
            value={formData.alias}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Github Username"
            name="githubUsername"
            value={formData.githubUsername}
            onChange={handleInputChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Next
          </Button>
        </LeftSection>

        <RightSection>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            We are a few steps away from creating your
          </Typography>
          <Typography variant="h4" component="h2" align="center" fontWeight="bold">
            unfungible NFT professional identity
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              p: 2,
              borderRadius: 2,
              mt: 4
            }}
          >
            <Avatar sx={{ width: 40, height: 40 }} />
            <Typography variant="h6">
              {formData.name || 'John'} {formData.surname || 'Doe'}
            </Typography>
          </Box>
        </RightSection>
      </FormContainer>
    </StyledContainer>
  );
};

export default RegistrationPage; 