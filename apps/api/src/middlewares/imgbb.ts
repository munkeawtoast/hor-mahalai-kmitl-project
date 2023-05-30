import axios, { AxiosResponse } from 'axios'
import { config } from 'dotenv'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import multer from 'multer'
import { Express } from 'express'
import FormData from 'form-data'
import { Env, RequestWithMulter, RequestWithUpload } from 'global-types'
import { MulterFile } from 'global-types'

export type UploadSingle = {
  type: 'single'
  fieldName: string
}

export type UploadArray = {
  type: 'array'
  fieldName: string
  maxCount?: number
}

export type ImgBBResponse = {
  data: {
    data: {
      url: string
      width: number
      height: number
    }
  }
}

async function uploadToImgBB(file: MulterFile) {
  config()
  const env = process.env as Env
  const formData = new FormData()
  formData.append('image', file.buffer, file.originalname || 'file')
  formData.append('key', env.IMGBB_KEY)

  return axios.post('https://api.imgbb.com/1/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

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

function imageUploader(
  req: Request & RequestWithMulter & RequestWithUpload,
  _res: Response,
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
    next()
  } else {
    Promise.all(filesArr.map(file => uploadToImgBB(file))).then(responses => {
      req.links = responses.map((res: ImgBBResponse) => res.data.data.url)
      next()
    })
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
