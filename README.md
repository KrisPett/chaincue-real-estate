docker run --rm -it --network host -v ${PWD}:/workdir -w /workdir node:18 bash

.env.local

```
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000

NEXTAUTH_URL=http://localhost:3000
CLIENT_DOMAIN=http://localhost:3000
BACKEND_URL_ENDPOINT=http://localhost:8080

NEXTAUTH_SECRET=
KEYCLOAK_ID=
KEYCLOAK_SECRET=
KEYCLOAK_ISSUER=

NETWORK=""
INFURA_API_KEY=""

WALLET_PRIVATE_KEY=

NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_WALLET_CONNECT_ID=
NEXT_PUBLIC_ABI=
```
