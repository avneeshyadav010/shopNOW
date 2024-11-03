const express = require('express');
const router = express.Router();
const { getWishList, addProduct, deleteProduct } = require('../controller/wish')

router.get('/', getWishList);
router.post('/', addProduct);
router.delete('/', deleteProduct);

module.exports = router;