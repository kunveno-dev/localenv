#!/bin/bash

# Crear el directorio public si no existe
mkdir -p public

# Descargar el script de Virto Connect
curl -o public/virto-connect.minimal.js https://raw.githubusercontent.com/virto-network/virto-connect/main/packages/web-connect/dist/virto-connect.minimal.js 