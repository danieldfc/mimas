import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const checkUser = await User.findOne({ where: { email } });

    if (checkUser) {
      return res.status(400).json({ error: { message: 'User already exist' } });
    }

    const { id, name } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
