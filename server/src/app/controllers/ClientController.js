import { Op } from 'sequelize';

import Client from '../models/Client';

class ClientController {
  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const clients = await Client.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ['id', 'name', 'email', 'phone', 'address'],
      limit: 20,
      offset: (page - 1) * 20,
      order: ['name'],
    });

    return res.json(clients);
  }

  async store(req, res) {
    const { email } = req.body;

    const checkClient = await Client.findOne({ where: { email } });

    if (checkClient) {
      return res
        .status(400)
        .json({ error: { message: 'Client already exist' } });
    }

    const { id, name, phone, address } = await Client.create(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
      address,
    });
  }
}

export default new ClientController();
