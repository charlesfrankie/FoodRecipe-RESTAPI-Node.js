const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

//Router
const CategoriesRouter = require('./routers/categories');
const FoodsRouter = require('./routers/Food');

// mongoDB connect
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database connection is ready');
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({ message: 'Server is running...' });
});

app.use(`/${api}/categories`, CategoriesRouter);
app.use(`/${api}/foods`, FoodsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log('Server is running on PORT ' + PORT);
});
