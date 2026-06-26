const express = require('express');
const cors = require('cors');
require('dotenv').config();

const translateRoute = require('./routes/translate');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api', translateRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});