import { createClient } from '@supabase/supabase-js'
import { getEnv } from '../utils/index.js'
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
    return next(new Error('Please upload a file'))
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
    ;(async () => {
      try {
        const resArr = await Promise.all(
          filesArr.map(file => {
            return supabase.storage
              .from('images')
              .upload(
                `${file.fieldname.replaceAll('[]', '')}-${Date.now()}${path.extname(
                  file.originalname,
                )}`,
                file.buffer,
                {
                  upsert: false,
                  contentType: file.mimetype,
                },
              )
          }),
        )
        console.log(resArr)
        const linksRes = await Promise.all(
          resArr.map(res => {
            const { data, error } = res
            if (error) {
              throw error
            }
            return supabase.storage.from('images').getPublicUrl(data.path)
          }),
        )
        const links = linksRes.map(linkres => linkres.data.publicUrl)
        req.links = links
        next()
      } catch (e) {
        next(e)
      }
    })()
  }
}

export function imageUploadBuilder(
  config: (UploadSingle | UploadArray) & { required?: boolean },
): RequestHandler[] {
  const upload = multer({
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

  const middlewares = []

  if (config.type === 'single') {
    middlewares.push(upload.single(config.fieldName))
  } else if (config.type === 'array') {
    middlewares.push(upload.array(config.fieldName, config.maxCount))
  } else {
    throw new Error('Invalid config')
  }
  //
  // if (config.required) {
  //   middlewares.push(imageRequiredGuard)
  // }
  middlewares.push(imageUploader)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return middlewares
}
