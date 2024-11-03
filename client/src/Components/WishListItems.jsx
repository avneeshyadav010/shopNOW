import { useDispatch, useSelector } from "react-redux"
import WishListItem from "./WishListItem";
import { getEmail, getToken } from '../store/auth';
import { getWishList } from "../store/assyncWishList";
import { useEffect } from "react"

const WishList = () => {
    const token = getToken();
    const email = getEmail();
    const items = useSelector(store => store.asyncwish);
    const dispatch = useDispatch();
    useEffect(()=> {
        if(email && token && items.status === 'idle'){
            dispatch(getWishList(email))
        }
    },[dispatch, items.status])
   
    return (
        <>
        <div className="cartList">
        { items.wish.length > 0 ? items.wish.map((item, index)=> <WishListItem key={index} items={item}></WishListItem>): 
            <div >
               <div className="wish_img"> <img src="../public/wish12.jpg" alt="Image"></img></div> 
                <h3>No items in wishList</h3>
            </div>
       }
        </div> 
        </>
    )
}

export default WishList;