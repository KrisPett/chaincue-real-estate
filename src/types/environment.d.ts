declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CLIENT_URL: string
    BACKEND_URL_ENDPOINT: string
    CLIENT_DOMAIN: string
    NEXT_PUBLIC_AWS_GATEWAY_URL_CHATBOT: string
    NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT: string
    NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT_FILTER_IMAGES: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    KEYCLOAK_ID: string
    KEYCLOAK_SECRET: string
    KEYCLOAK_ISSUER: string
    NETWORK: string
    INFURA_API_KEY: string
    WALLET_PRIVATE_KEY: string
    NEXT_PUBLIC_CONTRACT_ADDRESS: string
    NEXT_PUBLIC_WALLET_CONNECT_ID: string
    NEXT_PUBLIC_ABI: string
  }
}
