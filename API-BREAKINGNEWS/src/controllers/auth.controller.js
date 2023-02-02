import bcrypt from 'bcrypt'
import { loginService ,  generateToken} from '../services/auth.service.js'

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await loginService(email);

    
    if (!user) {
      return res.status(404).send({
        message: "user or password is invalid"
      });
    }

    const isPasswordIsValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordIsValid ) {
      return res.status(401).send({
        message: "user or password is invalid"
      });
    }
    const token = generateToken(user.id)
    res.status(200).json({token}) 
  }
  catch (err) {
    console.log(err)
  }

}

export default {
  login
}
