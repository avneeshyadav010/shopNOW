import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import RatingComponent from "./Rating";
import Modal from './Modal'
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { addToCart } from "../store/asyncCart";
import { getCartList } from "../store/asyncCart";
import { getEmail } from '../store/auth';
import { addToWishList, getWishList } from "../store/assyncWishList";

const ProductDetails = () => {
   const [index, setIndex] = useState(0);
   const [modelCheck, setModelCheck] = useState(false)
   const productRef = useRef(null)
   const openModel = () => {
        setModelCheck(true);
   }
   const closeModel = () => {
        setModelCheck(false)
   }
   const dispatch = useDispatch();

   const email = getEmail();

   const cart = useSelector(store => store.asynccart);
   const wish = useSelector(store => store.asyncwish);


    useEffect(() => {
        if(cart.status === 'added' || wish.status === 'added') {
            dispatch(getCartList(email));
            dispatch(getWishList(email));
        }
    },[dispatch, cart, wish])

    const handleAddCartAsync = (productdata) => {
        const data = {
            productdata, email
        }
        dispatch(addToCart(data))
    }
    const handleAddWishAsync = (productdata) => {
        const data = {
            productdata, email
        }
        dispatch(addToWishList(data))
    }

    const navigate = useNavigate();

    const handleProductDetails = (id, category) => {
        navigate(`/product/${category}/${id}`)
        if (productRef.current) {
            productRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const Data = useLoaderData();
    const productdata = Data.productData;
    const crouselProducts = Data.categorydata;
    
    return (
        <>
            <div >
                <div className="product_main" ref={productRef}>
                    <div className="product_img">
                        <img src={productdata.images[0]} alt="Image" onClick={openModel}></img>
                        <div>
                           {  modelCheck && <Modal srcProps={productdata.images[0]} imgTitle={productdata.title} onClose={closeModel} />  } 
                        </div>
                    </div>
                    <div className="product_desc">
                        <p><b>{productdata.title}</b></p>
                        <p >Price: ${productdata.price}</p>
                        <p >{productdata.description}</p>
                        <button onClick={() => handleAddCartAsync(productdata)} className="btn btn-light rounded-pill px-3" type="button">Add To Cart</button>
                        <button onClick={() => handleAddWishAsync(productdata)} className="btn btn-light rounded-pill px-3" type="button">Add To Wishlist</button>
                    </div>
                </div>
                <div className="product_details">
                    <div className="rating">
                        <RatingComponent />
                    </div>
                    <div>
                        <div className="product-des">
                            <table className="table table-dark table-striped" style={{ width: "70%", margin: "2rem 1rem" }}>
                                <tbody>
                                    <tr>
                                        <th scope="row">Brand</th>
                                        <td>{productdata.brand}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Category</th>
                                        <td>{productdata.category}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Discount Percentage</th>
                                        <td>{productdata.discountPercentage}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Rating</th>
                                        <td>{productdata.rating}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Stock</th>
                                        <td>{productdata.stock}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div  className="products-container">
                <div>
                    <div className="product-container">
                        <div className="title">
                            <h2>{crouselProducts[index].title}</h2>
                        </div>
                        <div className="product-img">
                            <img src={crouselProducts[index].images[0]} alt="Image"></img>
                        </div>
                        <p className="price">Price: ${crouselProducts[index].price}</p>
                        <button onClick={() => handleProductDetails(crouselProducts[index].id, crouselProducts[index].category)} className="btn btn-light rounded-pill px-3" type="button">View Product Details</button>
                    </div>
                </div>
                <div>
                    <div className="product-container">
                        <div className="title">
                            <h2>{crouselProducts[index+1].title}</h2>
                        </div>
                        <div className="product-img">
                            <img src={crouselProducts[index+1].images[0]} alt="Image"></img>
                        </div>
                        <p className="price">Price: ${crouselProducts[index+1].price}</p>
                        <button onClick={() => handleProductDetails(crouselProducts[index+1].id, crouselProducts[index].category)} className="btn btn-light rounded-pill px-3" type="button">View Product Details</button>
                    </div>
                </div>
                <div>
                    <div className="product-container">
                        <div className="title">
                            <h2>{crouselProducts[index+2].title}</h2>
                        </div>
                        <div className="product-img">
                            <img src={crouselProducts[index+2].images[0]} alt="Image"></img>
                        </div>
                        <p className="price">Price: ${crouselProducts[index+2].price}</p>
                        <button onClick={() => handleProductDetails(crouselProducts[index+2].id, crouselProducts[index].category)} className="btn btn-light rounded-pill px-3" type="button">View Product Details</button>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export const ProductDetailsLoader = async ({ params }) => {
    const product = await fetch(`https://dummyjson.com/products/${params.id}`);
    const productData = await product.json();
    const products = await fetch('https://dummyjson.com/products');
    const productsData = await products.json();
    const categorydata = productsData.products.filter((item) => item.category === params.category)
    return {productData, categorydata}
}


export default ProductDetails;