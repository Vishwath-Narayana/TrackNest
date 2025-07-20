require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectdb');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount all API routes under a common prefix
const routes = require('./routes');
app.use('/api', routes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('TrackNest backend is running');
});

// Global error handler (for unhandled errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
