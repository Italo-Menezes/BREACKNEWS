

import userServices from '../services/user.service.js';

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      return res.status(400).json({ message: 'Missing data' })
    }


    const user = await userServices.createService(req.body)

    if (!user) {
      return res.status(400).json({ message: 'Erro creating user' })
    }


    res.status(201).json({ message: `bem vindo ${name}` })
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
}
const findAll = async (req, res) => {
  try {
    const users = await userServices.findAllService();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' })
    }

    res.status(200).json(users)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  };
}
const findbyid = async (req, res) => {
  try {
    const id = req.id;

    const user = req.user;

    res.status(200).json(user)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }

}
const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      return res.status(400).json({ message: 'submit at least one field for update' })
    }

    const { id, user } = req;


    await userServices.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );


    res.status(200).json({ message: 'User updated' })
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }

}


export default { create, findAll, findbyid, update }