import bcrypt from 'bcrypt'
import type { Env } from '../global-types'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import multer from 'multer'

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

// TODO: not done yet just copied from doc
export async function uploadFile(file: File) {
  const supabase = createClient(
    getEnv().SUPABASE_PROJECT_URL,
    getEnv().SUPABASE_API_KEY,
  )
  const { data, error } = await supabase.storage
    .from('bucket_name')
    .upload('file_path', file)
  if (error) {
    // Handle error
  } else {
    // Handle success
  }
}
