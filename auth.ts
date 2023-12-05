import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const payload = { username, password }
  const secret = 'secret'
  const options = { expiresIn: '1h' }

  res.send({ token: jwt.sign(payload, secret, options) })
}
