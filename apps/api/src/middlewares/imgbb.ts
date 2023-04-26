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
  Promise.all(filesArr.map((file) => uploadToImgBB(file))).then((responses) => {
    req.links = responses.map((res) => res.data.data.url)
    next()
  })
}

export function imageUploadBuilder(
  config: UploadSingle | UploadArray,
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

  if (config.type === 'single') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return [upload.single(config.fieldName), imageUploader]
  } else if (config.type === 'array') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return [upload.array(config.fieldName, config.maxCount), imageUploader]
  } else {
    throw new Error('Invalid config')
  }
}
