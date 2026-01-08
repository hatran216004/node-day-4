require('dotenv').config();
require('module-alias/register');
const express = require('express');
const cors = require('cors');

const routes = require('./src/routes');
const responseFormat = require('@/middlewares/responseFormat');
const notFound = require('./src/middlewares/notFoundHandler');
const exceptionHandler = require('@/middlewares/exceptionHandler');
require('@/config/database');

const app = express();

const whitelist = ['http://localhost:5173', process.env.CLIENT_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(responseFormat);

app.use('/api', routes);

app.use(notFound);
app.use(exceptionHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
