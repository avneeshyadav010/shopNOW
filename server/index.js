const express = require('express');
const app = express();
const PORT = 8001;
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Products = require('./model/product');
const cookieParser = require('cookie-parser');
const cartRouter = require('./router/cartRouter')
const wishRouter = require('./router/wishRouter')
const authRouter = require('./router/authRouter')





mongoose.connect('mongodb+srv://avneeshyadav0101:XQOUPKq5tRIRQhjg@node-cluster0.sasqaxu.mongodb.net/?retryWrites=true&w=majority&appName=Node-Cluster0')
.then((e)=> console.log("Database is connected"))
.catch((error)=> console.log("Unable to connect Database", error));


app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve('./public')))
var corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'POST, DELETE'
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));




app.use('/', authRouter);

app.use('/cart', cartRouter)

app.use('/wish', wishRouter)


app.get('/products', async (req, res) => {
    const products = await Products.find({});
    console.log("product from server", products)
    res.status(200).json(products);
});

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));