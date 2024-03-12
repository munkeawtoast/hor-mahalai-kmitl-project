import { getEnv } from '../utils/index.js'
import multer from 'multer'
import path from 'node:path'
import crypto from 'node:crypto'
import { MulterFile, RequestWithMulter, RequestWithUpload } from 'global-types'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { S3 } from '@aws-sdk/client-s3'
import { NodeHttpHandler } from '@smithy/node-http-handler'

// import AWS from 'aws-sdk'
// const { S3 } = AWS

export type UploadSingle = {
  type: 'single'
  fieldName: string
}

export type UploadArray = {
  type: 'array'
  fieldName: string
  maxCount?: number
}

// const s3Client = new S3({
//   credentials: {
//     accessKeyId: getEnv().S3_ACCESS_KEY_ID,
//     secretAccessKey: getEnv().S3_SECRET_ACCESS_KEY,
//   },

//   region: 'us-east-1',
// })

const s3Client = new S3({
  credentials: {
    accessKeyId: getEnv().S3_ACCESS_KEY_ID,
    secretAccessKey: getEnv().S3_SECRET_ACCESS_KEY,
    sessionToken: getEnv().S3_SESSION_TOKEN,
  },

  region: 'us-east-1',
  requestHandler: new NodeHttpHandler({
    requestTimeout: 10 * 1000,
    connectionTimeout: 10 * 1000,
  }),
})

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
        const linkArr = await Promise.all(
          filesArr.map(async file => {
            const fileName = `${file.fieldname.replaceAll(
              '[]',
              '',
            )}_${crypto.randomUUID()}${path.extname(file.originalname)}`
            // s3Client.putObject(
            //   {
            //     Bucket: 'hormahalai',
            //     Key: fileName,
            //     ACL: 'public-read',
            //     ContentType: file.mimetype,
            //     Body: file.buffer,
            //   },
            //   err => {
            //     if (err) {
            //       throw new Error('bad ')
            //     }
            //   },
            // )
            const output = await s3Client.putObject({
              Bucket: 'hormahalai',
              Key: fileName,
              ACL: 'public-read',
              ContentType: file.mimetype,
              Body: file.buffer,
            })
            return Promise.resolve(
              `https://hormahalai.s3.us-east-1.amazonaws.com/${fileName}`,
            )
          }),
        )
        req.links = linkArr
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
