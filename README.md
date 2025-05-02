# w3spaces local environment :construction:

[![Project Status](https://img.shields.io/badge/status-in%20development-yellow.svg)](https://github.com/yourusername/w3spaces-local-environment)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/yourusername/w3spaces-local-environment)
[![Last Updated](https://img.shields.io/github/last-commit/yourusername/w3spaces-local-environment.svg)](https://github.com/yourusername/w3spaces-local-environment)
[![Dependencies](https://img.shields.io/david/yourusername/w3spaces-local-environment.svg)](https://david-dm.org/yourusername/w3spaces-local-environment)

## Description
A local development environment for w3spaces, providing a backend server and frontend application for testing and development purposes. This setup includes Docker configuration for easy deployment and development.

## Requirements
- Node.js v18.0.0 or higher
- Docker v24.0.0 or higher
- Docker Compose v2.0.0 or higher
- npm v9.0.0 or higher

> Use nvm for versionning

## Technologies Used
- Backend:
  - Node.js
  - Express
  - Virto Network SDK
- Frontend:
  - React
  - TypeScript
- Containerization:
  - Docker
  - Docker Compose

## Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd w3spaces-local-environment
git clone https://github.com/virto-network/virto-sdk.git
cp virto-sdk ./docker
```
2. You need to build the docker image for backend. We provide a Dockerfile in `./docker`, but you can directly try to run the environment and the image will automatically built:

```bash
./start.sh
```

3. Install frontend dependencies:
```bash
**Install frontend dependencies**
cd ../react-polkatalent
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
SEED=eternal loyal question bunker behind kind future police illegal stumble weapon tenant
WS_PROVIDER_URL=ws://localhost:12281
SIGNING_SERVICE_URL=http://localhost:4000/sign
KREIVO_PROVIDER=ws://localhost:12281
KREIVO_ENDPOINT=wss://kreivo.io
KUSAMA_ENDPOINT=wss://ksm-rpc.stakeworld.io
```

4. Start the development environment:
```bash
**Using Docker Compose**
docker-compose up -d

OR

./start.sh

**Start frontend**
cd ../react-polkatalent
npm start
```

## Usage
1. The backend server will run on `http://localhost:3001`
2. The frontend application will run on `http://localhost:3002`
3. Access the application through your web browser at `http://localhost:3002`
4. Try to login and check the logs

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.