import bcrypt from 'bcrypt'
import type { Env } from '../global-types'
import { config } from 'dotenv'

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}

export function getEnv() {
  config()
  return process.env as Env
}
