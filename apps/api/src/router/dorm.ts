import { NextFunction, Request, Response, Router } from 'express'
import { getDormsByName } from 'handlers/dorms/dorms.js'
import { getDormsByLankMark } from 'handlers/dorms/dorms.js'
import { getDorms } from 'handlers/dorms/dorms.js'

const dormRouter = Router()

dormRouter.get('/dorm/:name', getDormsByName)
dormRouter.get('/dorm/:landmark', getDormsByLankMark)
dormRouter.get('/dorm/', getDorms)

export default dormRouter
