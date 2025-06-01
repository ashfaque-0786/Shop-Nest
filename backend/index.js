const express = require('express');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');
const reviewRouter = require('./routers/reviewRouter');
require('dotenv').config();
require('./connection');

const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

// middlew
app.use(cors ({ origin : ["http://localhost:3000"]} ));
app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productRouter);



// route or endpoint
app.get('/', (req, res) => {
    res.send('response from express');
});

app.get('/add', (req, res) => {
    res.send('response from add');
});

// getall
// delete

app.listen(port, () => {
    console.log('server started');
});