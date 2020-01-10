import Client from '../models/Client';

class ClientController {
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
