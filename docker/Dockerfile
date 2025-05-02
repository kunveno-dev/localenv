FROM node:18-alpine

WORKDIR /app

# Instalar git y dependencias necesarias para la construcción
RUN apk add --no-cache git python3 make g++

# Clonar y construir el SDK de Virto
RUN if [ ! -d "virto-sdk" ]; then \
        git clone https://github.com/virto-network/virto-sdk.git && \
        cd virto-sdk/sdk/js && \
        npm install && \
        npm run build && \
        npm pack && \
        mv virtonetwork-sdk-*.tgz /app/; \
    else \
        cd virto-sdk/sdk/js && \
        npm install && \
        npm run build && \
        npm pack && \
        mv virtonetwork-sdk-*.tgz /app/; \
    fi

# Copiar los archivos de configuración del proyecto
COPY src/package*.json ./

# Instalar dependencias incluyendo el SDK local
RUN npm install --omit=dev && \
    npm install ./virtonetwork-sdk-*.tgz

# Copiar el resto del código
COPY src/ .

EXPOSE 3001

CMD ["node", "index.js"] 