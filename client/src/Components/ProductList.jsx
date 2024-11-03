import { useEffect, useState } from "react";
import Product from "./Product";
import LoadingSpinner from "./LoadingSpinner";
import { BsSearch } from 'react-icons/bs';
import HeaderSlider from './HeaderSlider';
import { Link } from "react-router-dom";
import { useRef } from "react";
import { getEmail } from "../store/auth";

const ProductList = () => {
    const [items, setInitialItems] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [searchIconClick, searchIconClickSet] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const [products, setProducts] = useState([]);
    const secondDivRef = useRef(null);
    const [perPage, setperPage] = useState(6);
    const [currPage, setCurrPage] = useState(1);

    const email = getEmail();

    const totalPage = Math.ceil(items.length / perPage);
    const pages = [...Array(totalPage + 1).keys()].slice(1);

    const lastIndex = currPage * perPage;
    const fisrtIndex = lastIndex - perPage;

    const visbleProduct = items.slice(fisrtIndex, lastIndex);

    const handleViewProdduct = () => {
        if (secondDivRef.current) {
            secondDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleSearch = () => {
        if (searchValue == "") {
            alert("Plear enter the item name to search")
            return;
        }
        const filteredItems = items.filter(item => {
            if (item.title.toLowerCase()
                .includes(searchValue.toLowerCase()))
                return item;
        })
        if (filteredItems.length > 0)
            setProducts(filteredItems);
        else
            setProducts([])
        searchIconClickSet(true);
        setSearchValue("");
        const element =  document.getElementsByClassName('pagination_div')[0].style.display = 'none'
        if (element) {
            element.style.display = 'none';
        }
       
    }

    useEffect(() => {
        setFetching(true)
        fetch('https://dummyjson.com/products')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setInitialItems(data.products);
                setFetching(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    return (
        <>
            <div className="productlist_top">
                <div className="child">
                    <h1>The <span>multipurpose</span> eCommerce shop</h1>
                    <div className="btn_div">
                        <button onClick={handleViewProdduct} className="btn-style2">View products</button>
                        {!email && <Link className="btn-style3" to="/login">Login</Link>}
                    </div>
                </div>
                <HeaderSlider></HeaderSlider>
            </div>
            <div className="search-box">
                <input placeholder="Please enter product name" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}>
                </input>
                <span><BsSearch className="search-icon" onClick={() => handleSearch()}></BsSearch></span>
            </div>
            {fetching && <LoadingSpinner />}
            <div className="products-container" ref={secondDivRef}>
                {products.map((item) => <Product key={item.id} items={item}></Product>)}
                {/* {!fetching && !searchIconClick && items.map((item) => <Product key={item.id} items={item}></Product>)} */}
                {!fetching && !searchIconClick && visbleProduct.map((item) => <Product key={item.id} items={item}></Product>)}
            </div>
            <div className="pagination_div">
                {pages.map((pages) => <span key={pages} onClick={() => setCurrPage(pages)} className={`dot ${currPage === pages ? "active" : ""}`}>{pages}</span>)}
            </div>
        </>
    )
}
export default ProductList;