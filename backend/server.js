const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/customerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Customer Schema
const customerSchema = new mongoose.Schema({
  customerId: String,
  name: String,
  contact: String,
  // Add other fields as needed
});

const Customer = mongoose.model('Customer', customerSchema);

// API Endpoints
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/customers', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Implement update, delete, and other endpoints as needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});