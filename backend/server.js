require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bookRoute = require('./routes/book');
const userRoute = require('./routes/user');
const collectionRoute = require('./routes/collection')
const { logger } = require('./libs/logger');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use('/auth', userRoute);
app.use('/book', bookRoute);
app.use('/collection', collectionRoute);

app.listen(process.env.DEV_PORT, ()=>{
	logger.info(`Server is running on port ${process.env.DEV_PORT}`);
})
