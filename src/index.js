const http = require('http');
const { URL } = require('url');
const SDK = require('@virtonetwork/sdk').default;
require('dotenv').config();

// Implementación de almacenamiento en memoria para reemplazar localStorage
global.localStorage = {
  _data: {},
  setItem: function(id, val) {
    this._data[id] = String(val);
  },
  getItem: function(id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : null;
  },
  removeItem: function(id) {
    delete this._data[id];
  },
  clear: function() {
    this._data = {};
  }
};

// Configuración del SDK de Virto
const sdk = new SDK({
  federate_server: 'http://virto-dev:3000/api',
  provider_url: 'ws://virto-dev:12281',
  config: {
    wallet: 'polkadotjs'
  }
}, () => {}, () => {});

const server = http.createServer(async (req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.writeHead(204);
    res.end();
    return;
  }

  // Parsear la URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  console.log(`Processing request for path: ${pathname}`);

  // Función para manejar el body del request
  const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          console.log('Request body:', parsed);
          resolve(parsed);
        } catch (error) {
          console.error('Error parsing request body:', error);
          reject(error);
        }
      });
      req.on('error', (error) => {
        console.error('Request error:', error);
        reject(error);
      });
    });
  };

  // Endpoint para verificar si un usuario está registrado
  if (req.method === 'POST' && pathname === '/virto/check-user') {
    try {
      console.log('Checking user registration...');
      const { userId } = await getRequestBody(req);
      
      if (!userId) {
        console.log('No userId provided');
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false,
          error: 'Se requiere un ID de usuario',
          isRegistered: false
        }));
        return;
      }

      console.log(`Checking registration for user: ${userId}`);
      const isRegistered = await sdk.auth.isRegistered(userId);
      console.log(`User ${userId} is registered: ${isRegistered}`);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true,
        isRegistered,
        message: isRegistered ? 'Usuario registrado' : 'Usuario no registrado'
      }));
    } catch (error) {
      console.error('Error checking user:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: false,
        error: 'Error al verificar el usuario',
        isRegistered: false
      }));
    }
  }
  // Endpoint para registrar un nuevo usuario
  else if (req.method === 'POST' && pathname === '/virto/register') {
    try {
      console.log('Processing registration...');
      const { userId, name } = await getRequestBody(req);
      
      if (!userId || !name) {
        console.log('Missing required fields:', { userId, name });
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false,
          error: 'Se requieren userId y name'
        }));
        return;
      }

      console.log(`Registering user: ${userId} (${name})`);
      const result = await sdk.auth.register({
        profile: {
          id: userId,
          name: name
        }
      });
      console.log('Registration successful:', result);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Usuario registrado exitosamente',
        address: result.address
      }));
    } catch (error) {
      console.error('Error registering user:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: false,
        error: 'Error al registrar el usuario'
      }));
    }
  }
  // Endpoint para conectar un usuario existente
  else if (req.method === 'POST' && pathname === '/virto/connect') {
    try {
      console.log('Processing connection...');
      const { userId } = await getRequestBody(req);
      
      if (!userId) {
        console.log('No userId provided for connection');
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false,
          error: 'Se requiere un ID de usuario'
        }));
        return;
      }

      console.log(`Connecting user: ${userId}`);
      const session = await sdk.auth.connect(userId);
      console.log('Connection successful:', session);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Usuario conectado exitosamente',
        session: {
          userId: session.userId,
          address: session.address
        }
      }));
    } catch (error) {
      console.error('Error connecting user:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: false,
        error: 'Error al conectar el usuario'
      }));
    }
  }
  else {
    console.log(`Route not found: ${pathname}`);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      success: false,
      error: 'Ruta no encontrada'
    }));
  }
});

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
}); 