import { createClient } from '@supabase/supabase-js'
import { getEnv } from '../utils'
import multer from 'multer'
import path from 'node:path'
import { MulterFile, RequestWithMulter, RequestWithUpload } from 'global-types'
import { NextFunction, Request, RequestHandler, Response } from 'express'

export type UploadSingle = {
  type: 'single'
  fieldName: string
}

export type UploadArray = {
  type: 'array'
  fieldName: string
  maxCount?: number
}

const supabase = createClient(
  getEnv().SUPABASE_PROJECT_URL,
  getEnv().SUPABASE_API_KEY,
)

export const multerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file) {
      cb(new Error('No Files'))
    }
    if (!file.mimetype.startsWith('image')) {
      cb(new Error('Wrong File Type.'))
    }

    cb(null, true)
  },
})

// const { data } = supabase.storage
//   .from('public-bucket')
//   .getPublicUrl('folder/avatar1.png')

function imageRequiredGuard(
  req: RequestWithMulter,
  res: Response,
  next: NextFunction,
) {
  let filesArr: MulterFile[]
  const { files } = req
  if (files) {
    filesArr = [...files]
  } else {
    filesArr = [req.file]
  }
  if (filesArr.length === 0) {
    next(new Error('Please upload a file'))
    // res.status(400).json({
    //   error: {
    //     message: 'please upload a file',
    //   },
    // })
    return
  } else {
    next()
  }
}

const imageUploader = (
  req: Request & RequestWithMulter & RequestWithUpload,
  _res: Response,
  next: NextFunction,
) => {
  let filesArr: MulterFile[]
  const { files } = req
  if (files) {
    filesArr = [...files]
  } else {
    filesArr = [req.file]
  }
  if (filesArr.length === 0) {
    next()
  } else {
    const links = Promise.all(
      filesArr.map(file =>
        supabase.storage
          .from('images')
          .upload(
            `${file.fieldname}-${Date.now()}.${path.extname(
              file.originalname,
            )}`,
            file.buffer,
            {
              cacheControl: '3600',
              upsert: false,
            },
          ),
      ),
    )
      .then(resArr =>
        Promise.all(
          resArr.map(res => {
            const { data, error } = res
            if (error) {
              throw error
            }
            return supabase.storage.from('images').getPublicUrl(data.path)
          }),
        ),
      )
      .then(resArray => resArray.map(res => res.data.publicUrl))
  }
}

export function imageUploadBuilder(
  config: (UploadSingle | UploadArray) & { required?: boolean },
): RequestHandler[] {
  const memoryStorage = multer.memoryStorage()
  const upload = multer({
    storage: memoryStorage,
    fileFilter: (req, file, cb) => {
      if (!file) {
        cb(new Error('No Files'))
      }
      if (!file.mimetype.startsWith('image')) {
        cb(new Error('Wrong File Type.'))
      }

      cb(null, true)
    },
  })

  const middlewares = []

  if (config.type === 'single') {
    middlewares.push(upload.single(config.fieldName))
  } else if (config.type === 'array') {
    middlewares.push(upload.array(config.fieldName, config.maxCount))
  } else {
    throw new Error('Invalid config')
  }

  if (config.required) {
    middlewares.push(imageRequiredGuard)
  }
  middlewares.push(imageUploader)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return middlewares
}
