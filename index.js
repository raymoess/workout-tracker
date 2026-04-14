const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoute');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');

require('dotenv').config();

const PORT = process.env.PORT

app.use(bodyParser.json());

app.use('/todos', todoRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
} )