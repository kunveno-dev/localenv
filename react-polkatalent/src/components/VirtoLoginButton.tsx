import React, { useState } from 'react';
import './VirtoLoginButton.css';

interface UserData {
  userId: string;
  name: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  isRegistered?: boolean;
  session?: {
    userId: string;
    address: string;
  };
}

const VirtoLoginButton: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({ userId: '', name: '' });
  const [isRegistration, setIsRegistration] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckUser = async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3001/virto/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al verificar el usuario');
      }
      
      return data.isRegistered || false;
    } catch (error) {
      console.error('Error checking user:', error);
      throw error;
    }
  };

  const handleRegister = async (userData: UserData): Promise<ApiResponse> => {
    try {
      const response = await fetch('http://localhost:3001/virto/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data: ApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al registrar el usuario');
      }
      
      return data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const handleConnect = async (userId: string): Promise<ApiResponse> => {
    try {
      const response = await fetch('http://localhost:3001/virto/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      const data: ApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al conectar el usuario');
      }
      
      return data;
    } catch (error) {
      console.error('Error connecting user:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!userData.userId) {
      setError('Por favor, ingresa un ID de usuario');
      return;
    }

    if (isRegistration && !userData.name) {
      setError('Por favor, ingresa tu nombre completo');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const isRegistered = await handleCheckUser(userData.userId);
      
      if (!isRegistered && !isRegistration) {
        setIsRegistration(true);
        setIsLoading(false);
        return;
      }

      let response;
      if (isRegistration) {
        response = await handleRegister(userData);
      } else {
        response = await handleConnect(userData.userId);
      }

      alert(response.message);
      if (response.success) {
        setIsPopupOpen(false);
        setUserData({ userId: '', name: '' });
        setIsRegistration(false);
        // Aquí podrías manejar el estado de la sesión
        console.log('Session:', response.session);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el proceso de autenticación');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="virto-login-container">
      <button 
        className="virto-login-button"
        onClick={() => setIsPopupOpen(true)}
        disabled={isLoading}
      >
        {isLoading ? 'Cargando...' : 'Login with Virto'}
      </button>

      {isPopupOpen && (
        <div className="virto-login-popup">
          <div className="virto-login-popup-content">
            <h2>{isRegistration ? 'Registro con Virto' : 'Iniciar sesión con Virto'}</h2>
            
            {error && <div className="virto-login-error">{error}</div>}
            
            <div className="virto-login-form">
              <input
                type="text"
                placeholder="ID de usuario"
                value={userData.userId}
                onChange={(e) => setUserData({ ...userData, userId: e.target.value })}
                disabled={isLoading}
              />
              
              {isRegistration && (
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  disabled={isLoading}
                />
              )}
            </div>

            <div className="virto-login-popup-buttons">
              <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Procesando...' : (isRegistration ? 'Registrar' : 'Continuar')}
              </button>
              <button onClick={() => {
                setIsPopupOpen(false);
                setIsRegistration(false);
                setUserData({ userId: '', name: '' });
                setError(null);
              }} disabled={isLoading}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtoLoginButton; 