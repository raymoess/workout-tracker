
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const workoutRoutes = require('./routes/workoutRoute');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/errorMiddleware');

require('dotenv').config();

const PORT = process.env.PORT

app.use(bodyParser.json());

app.use('/workouts', workoutRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
} )