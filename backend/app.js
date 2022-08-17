const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = require('./routes');
const handleErrors = require('./errors/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 3000, NODE_ENV, LOCALHOST = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());

app.use(cors({
  origin: [
    'https://mesto.kamelianov.nomoredomains.sbs',
    'https://backend.mesto.nomoredomains.sbs',
    'http://localhost:3000/']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
router.use(errors());
app.use(handleErrors);

async function main() {
  await mongoose.connect((NODE_ENV === 'production' ? MONGODB_ADDRESS: LOCALHOST), {
    useNewUrlParser: true,
  });
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
