const express = require('express');
const router = express.Router();
const { getCartPtoducts, addProduct, deleteProduct } = require('../controller/cart')

router.get('/', getCartPtoducts);
router.post('/', addProduct);
router.delete('/', deleteProduct);

module.exports = router;