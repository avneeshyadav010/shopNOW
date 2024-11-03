import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { removeFromCartList, getCartList } from '../store/asyncCart';
import { getEmail } from '../store/auth';
import { addToWishList, getWishList } from '../store/assyncWishList';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Cart = ({ items }) => {
  const email = getEmail()
  const dispatch = useDispatch();
  const handleAddWishAsync = async (productData) => {
    const itemId = productData.id;

    // First, remove the item from the cart
    await dispatch(removeFromCartList({ id: itemId, email }));
    
    // Then, add the item to the wishlist
    await dispatch(addToWishList({ productdata: productData, email }));

  };
  const handleRemoveFromCart = (id) => {
    const data = {
      id, email
    }
    dispatch(removeFromCartList(data))
  }


  const cart = useSelector(store => store.asynccart);
   const wish = useSelector(store => store.asyncwish);


    useEffect(() => {
        if(wish.status === 'added') {
            dispatch(getWishList(email));
        }
    },[dispatch, wish.status, email])


  return (
    <>
      <div className='cart_main'>
        <div className="cart_image">
          <img src={items.images[0]} alt="Image"></img>
        </div>
        <div className='cart_desc'>
          <div className="title">
            <p><b>{items.title}</b></p>
          </div>
          <div className="mb-1 text-body-secondary">${items.price}</div>
          <p className="card-text mb-auto">Discount: {items.discountPercentage}%</p>
          <Link to={`/product/${items.category}/${items.id}`}>View Prodict Details</Link>
          <button onClick={() => handleRemoveFromCart(items.id)} className="btn btn-light rounded-pill px-3 removefromwishList" type="button">Remove</button>
        </div>
        <div className="cart_icon">
          <div >
            <img src="../public/wish12.jpg" alt="Image"></img>
          </div>
          <button onClick={() => handleAddWishAsync(items)} className="btn btn-light rounded-pill px-3 removefromwishList" type="button">Move To Wishlist</button>
        </div>
      </div>


    </>
  )
}
export default Cart;