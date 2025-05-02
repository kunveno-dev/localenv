import React, { useState, forwardRef, useImperativeHandle } from 'react';

interface VirtoConnectProps {
  onConnected: (detail: any) => void;
  onError: (detail: any) => void;
}

export interface VirtoConnectRef {
  open: () => void;
}

const VirtoConnect = forwardRef<VirtoConnectRef, VirtoConnectProps>(({ onConnected, onError }, ref) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const checkUserRegistration = async () => {
    try {
      const response = await fetch('http://localhost:3001/virto/check-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();
      return data.isRegistered;
    } catch (error) {
      throw new Error('Error al verificar el registro del usuario');
    }
  };

  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/virto/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, name })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Error al registrar el usuario');
      }
    } catch (error) {
      throw error;
    }
  };

  const connectUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/virto/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();
      if (data.success) {
        onConnected(data.session);
      } else {
        throw new Error(data.error || 'Error al conectar el usuario');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      
      // Primero verificamos si el usuario está registrado
      const isRegistered = await checkUserRegistration();
      
      // Si no está registrado, lo registramos
      if (!isRegistered) {
        await registerUser();
      }
      
      // Finalmente conectamos al usuario
      await connectUser();
      
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      handleLogin();
    }
  }));

  return (
    <div className="virto-connect-container">
      <div className="virto-connect-form">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Ingresa tu ID de usuario"
          className="virto-input"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa tu nombre"
          className="virto-input"
        />
        <button
          onClick={handleLogin}
          disabled={loading || !userId || !name}
          className="virto-button"
        >
          {loading ? 'Conectando...' : 'Conectar'}
        </button>
      </div>
      <style>
        {`
          .virto-connect-container {
            padding: 24px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          }
          .virto-connect-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .virto-input {
            padding: 12px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            font-size: 16px;
          }
          .virto-button {
            background-color: #8A2BE2;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .virto-button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          .virto-button:hover:not(:disabled) {
            background-color: #7B1FA2;
          }
        `}
      </style>
    </div>
  );
});

export default VirtoConnect; 