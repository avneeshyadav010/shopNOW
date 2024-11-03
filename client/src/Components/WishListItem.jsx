import { useDispatch } from 'react-redux';
import { removeFromWishList} from '../store/assyncWishList';
import { Link } from 'react-router-dom';
import { addToCart,getCartList } from '../store/asyncCart';
import { getEmail } from '../store/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const WishListItem = ({ items }) => {
    const dispatch = useDispatch();

    const email = getEmail();

    const RemoveFromWishList = (id) => {
        const data = {
            id, email
        }
        dispatch(removeFromWishList(data))
    }
    const handleAddCartAsync = async (productData) => {
        const itemId = productData.id;
        await dispatch(removeFromWishList({id: itemId, email}))
        await dispatch(addToCart({productdata: productData, email}))
    }

    const cart = useSelector(store => store.asynccart);
   const wish = useSelector(store => store.asyncwish);


    useEffect(() => {
        if(cart.status === 'added' ) {
            dispatch(getCartList(email));
        }
    },[dispatch, cart.status, email])

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
                    <button onClick={() => RemoveFromWishList(items.id)} className="btn btn-light rounded-pill px-3 removefromwishList" type="button">Remove</button>
                </div>
                <div className="cart_icon">
                    <div >
                        <img src="../public/cartIcon.png" alt="Image"></img>
                    </div>
                    <button onClick={() => handleAddCartAsync(items)} className="btn btn-light rounded-pill px-3 removefromwishList" type="button">Move To Cart</button>
                </div>
            </div>

        </>
    )
}
export default WishListItem;