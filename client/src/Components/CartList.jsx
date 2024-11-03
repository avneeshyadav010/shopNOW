import { useDispatch, useSelector } from "react-redux"
import Cart from "./Cart"
import { useEffect } from "react"
import { getEmail, getToken } from "../store/auth";
import { getCartList } from "../store/asyncCart";


const CartList = () => {

    const token = getToken();
    const email = getEmail();
    const items = useSelector(store => store.asynccart);
    const dispatch = useDispatch();

    useEffect(() => {
        if ( items.status === 'idle' ) {
            dispatch(getCartList(email)) 
        }
    }, [dispatch, items])

    

    return (
        <>
            <div className="cartList">
                {/* <h1>Total Amount: ${items.cart.reduce((total,item)=> total + item.price,0)}</h1> */}
                {items.cart.length > 0  ? items.cart.map((item, index) => <Cart key={index} items={item}></Cart>) : <div>
                    <div >
                        <img src="../public/cartIcon.png" className="cartIcon" alt="Image"></img>
                        <h3>Your cart is empty</h3>
                    </div>
                </div>}
            </div>

        </>
    )
}



export default CartList;