export declare type Env = {
  [key: string]: string
  POSTGRES_HOST: string
  POSTGRES_PORT: string
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  JWT_SECRET: string
  API_PORT: string
  GOOGLE_MAPS_API_KEY: string
  NODE_ENV: 'development' | 'production'
}

export declare type RequestWithAuth = Request & {
  user?: {
    id: string
    role: 'user' | 'admin'
  }
}
