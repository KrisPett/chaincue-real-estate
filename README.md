docker run --rm -it --network host -v ${PWD}:/workdir -w /workdir node:18 bash

.env.local

```
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=

KEYCLOAK_ID=
KEYCLOAK_SECRET=
KEYCLOAK_ISSUER=
```
