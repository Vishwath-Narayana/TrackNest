const Client = require('../models/Client');

// Create Client
exports.createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const client = await newClient.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get Clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
