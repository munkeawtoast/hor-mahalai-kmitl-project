import { RequestHandler } from 'express'

export const postUser: RequestHandler = (req, res) => {}

export const deleteUser: RequestHandler<{ userId: string }> = (req, res) => {}

export const patchUser: RequestHandler<{ userId: string }> = (req, res) => {}
