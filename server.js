require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const gamesRoutes = require('./routes/games');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes=require('./routes/users')
const app = express();
connectDB();
const statsRoutes = require("./routes/stats");

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/games', gamesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/users',usersRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
