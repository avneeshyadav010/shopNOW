const User = require('../model/user');

const getCartPtoducts = async (req, res) => {
    const email = req.query.email;
    const currUser = await User.findOne({email})
    if(currUser)
        res.status(200).json(currUser.cart)
    else
    console.log("Cart err")
   
};

const addProduct = async (req, res) => {
    const {productdata, email} = req.body;
    const currUser = await User.findOne({email})
    currUser.cart.push(productdata);
    await currUser.save()
    res.status(200).json(currUser.cart);
};

const deleteProduct = async (req, res) => {
    try {
    const {id, email}= req.query.data;
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Remove the item from the cart
    user.cart = user.cart.filter(item => item.id != id );
    
    // Save the updated user
    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = { getCartPtoducts, addProduct, deleteProduct }