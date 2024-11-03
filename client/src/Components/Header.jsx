import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { getToken, removeUser } from '../store/auth';



const Header = () => {

  const navigate = useNavigate();
  const token = getToken();
  const logoutHandle = ()=> {
      removeUser();
      navigate('/')
  }

    return (
        <>
        <header className="p-3 text-bg-dark header_z_index">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
          <li><a href="/cart" className="nav-link px-2 text-white">Cart</a></li>
          <li><a href="/wishlist" className="nav-link px-2 text-white">Wishlist</a></li>
        </ul>

      

        <div className="text-end">
          <Link to='/login' className={`btn btn-outline-light me-2 ${token ? "hidden":""}`} >Login</Link>
          <Link to='/signup' className={`btn btn-outline-light me-2 ${token ? "hidden":""}`} >Sign up</Link>
          <Link to='/profile' className={`btn btn-outline-light me-2 ${token ? "":"hidden"}`} >Profile</Link>
          <button type="button" onClick={logoutHandle} className={`btn btn-warning ${token ? "" :"hidden"}`}>Logout</button>
        </div>
      </div>
    </div>
  </header>
        </>
    )
}
export default Header