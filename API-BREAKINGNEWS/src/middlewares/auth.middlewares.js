import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';
dotenv.config();

export const authMIddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    const parts = authorization.split(' ');

    if (!parts.length === 2) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    const [scheme, token] = parts;

    if (scheme !== 'Bearer') {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    jwt.verify(token, process.env.SECRET_JWT, async (err, decod) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' + err.message })
      }
      const user = await userService.findByIdUserService(decod.id);
      if (!user || !user.id) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      req.userId = user._id;


      return next();
    })


  }
  catch (err) {
    return res.status(401).send({ message: 'Unauthorized' + err.message })
  }

}