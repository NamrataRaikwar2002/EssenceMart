const {
    Cart
} = require('../models/cart.model');

const getAllProductsInCart = async (req, res) => {
    try {

        const {
            userId
        } = req.user;
        const cart = await Cart.findById(userId)
        const cartProducts = cart.products.map((productItem) => {
            return productItem
        })
        const finalCart = {
            _id: cart._id,
            cart: cartProducts
        };
        res.status(200).json({
            cart: finalCart
        })
    } catch (error) {
        res.status(500).json({
            message: "Couldn't get cart items. Please try again later.",
            errorMessage: error.message
        })
    }
}

const addProductsInCart = async (req, res) => {
    try {
        const {
            userId
        } = req.user;
        const {
            product
        } = req.body;

        const user = await Cart.findById(userId);

        if (!user) {
            const newCart = new Cart({
                _id: userId,
                cart: product
            })
            await newCart.save();
            res.status(200).json({
                message: "new cart created and product added",
                cart: newCart
            })
        } else {
            const newProduct = product
            user.products.push(newProduct);
            await user.save();
            res.status(200).json({
                message: "Product added to exisitng cart",
                user
            })
        }

    } catch (error) {
        res.json({
            message: "Error adding product to cart",
            errorMessage: error.message
        })
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const {
            userId
        } = req.user;
        const {
            productId
        } = req.params;
        const user = await Cart.findById(userId);
        await user.products.remove(productId);
        await user.save();
        res.status(200).json({
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product form cart",
            errorMessage: error.message
        })
    }
}

const updateProductInCart = async (req, res) => {
    try {
        let {
            quantity
        } = req.body;
        const {
            userId
        } = req.user;
        const {
            productId
        } = req.params;

        const user = await Cart.findById(userId);
        const updatedproducts = user.products.map((product) => {
            if (product._id.toString() === productId) {
               product.quantity = quantity
            }
            return product;
        })
        await user.save();
        // res.status(200).json({
        //     user
        // })
        console.log(updatedproducts,'hereisthere')
        res.status(200).json({
            updatedproducts
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating product",
            errorMessage: error.message
        })
    }
}

module.exports = {
    getAllProductsInCart,
    addProductsInCart,
    deleteProductFromCart,
    updateProductInCart
}