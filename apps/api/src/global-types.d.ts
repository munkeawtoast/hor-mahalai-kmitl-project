import { Stream } from 'form-data'
import { Request, Response, NextFunction } from 'express'
export declare type Env = {
  S3_ACCESS_KEY_ID: string
  S3_SECRET_ACCESS_KEY: string
  S3_SESSION_TOKEN: string
  SUPABASE_PROJECT_URL: string
  SUPABASE_API_KEY: string
  POSTGRES_HOST: string
  POSTGRES_PORT: string
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  JWT_SECRET: string
  API_PORT: string
  GOOGLE_MAPS_API_KEY: string
  IMGBB_KEY: string
  NODE_ENV: 'development' | 'production'
}

export type RequestWithAuth = Request & {
  user?: {
    id: string
    role: 'user' | 'admin'
  }
}

export type MulterFile = {
  /** Name of the form field associated with this file. */
  fieldname: string
  /** Name of the file on the uploader's computer. */
  originalname: string
  /**
   * Value of the `Content-Transfer-Encoding` header for this file.
   * @deprecated since July 2015
   * @see RFC 7578, Section 4.7
   */
  encoding: string
  stream: Stream & NodeJS.ReadableStream
  /** Value of the `Content-Type` header for this file. */
  mimetype: string
  /** Size of the file in bytes. */
  size: number
  /** `MemoryStorage` only: A Buffer containing the entire file. */
  buffer: Buffer
}

export type RequestWithMulter = Request & {
  files?: MulterFile[]
  file: MulterFile
}

export type RequestWithUpload = Request & {
  links?: string[]
}
