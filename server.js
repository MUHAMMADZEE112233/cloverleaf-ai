const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const { connectDB } = require('./db/connect');
const blogRoutes = require('./routes/blogRoutes');

app.use('/posts', blogRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`Server is Running at PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

console.clear();
start();
