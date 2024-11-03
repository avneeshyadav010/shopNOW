const User = require('../model/user');


const getWishList = async (req, res) => {
    const email = req.query.email;
    const currUser = await User.findOne({email})
    if(currUser)
        res.status(200).json(currUser.wishList)
    else
    console.log("Wish err")
   
};

const addProduct =  async (req, res) => {
    const {productdata, email} = req.body;
    const currUser = await User.findOne({email})
    currUser.wishList.push(productdata);
    await currUser.save()
    res.status(200).json(currUser.wishList);
};

const deleteProduct = async (req, res) => {
    try {
    const {id, email}= req.query.data;
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Remove the item from the cart
    user.wishList = user.wishList.filter(item => item.id != id );
    
    // Save the updated user
    await user.save();

    res.status(200).json(user.wishList);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

module.exports = { getWishList, addProduct, deleteProduct }