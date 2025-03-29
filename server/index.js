const express = require('express');
const { connectToDatabase } = require('./db/db.connect');
const cors = require("cors");
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.router')
const productRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');
const cartRouter = require('./routes/cart.router');
const bodyParser = require('body-parser')
const wishlistRouter = require('./routes/wishlist.router');
const { verifyAuth } = require('./middlewares/verifyAuth');
const {addProductsToCollection} = require('./models/products.model');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
dotenv.config()
app.use(bodyParser.json())
app.use(cors())
const PORT = 5001;
connectToDatabase()
// addProductsToCollection()

app.get('/',(req, res) => {
    res.send('Hello get api here')
})

app.use('/api/auth', authRouter)
app.use('/products', productRouter)

app.use(verifyAuth)
app.use('/cart', cartRouter);
app.use('/user', userRouter);
app.use('/wishlist', wishlistRouter);

process.on('uncaughtException', (err, origin) => {
    console.log(err);
});

app.use((req, res) =>{
    res.status(404).json({message:"Route doesn't exist!"})
})    

app.use((err,req,res) => {
    res.status(500).json({message:"Error occured on server side!", errorMessage:err.message}) 
})

app.listen(PORT, () => console.log(PORT, 'listingingtopoirii'))