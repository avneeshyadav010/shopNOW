import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from "./Components/Login.jsx"
import ProductDetails, { ProductDetailsLoader } from './Components/ProductDetails.jsx'
import CartList from './Components/CartList.jsx'
import WishList from './Components/WishListItems.jsx'
import ProductList from './Components/ProductList.jsx'
import Faq, { FaqLoader } from './Components/Faq.jsx'
import { Provider } from 'react-redux'
import itemStore from './store/index.js'
import Signup from './Components/SignUp.jsx'
import ProtectedRouted from './Components/ProtectedRoute.jsx'
import Profile, { profileLoader } from './Components/Profile.jsx'
import NotFound from './Components/404.jsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>, 
  children: [
    {path: "/", element: <ProductList/>},
    {path: "/product/:category/:id", element: <ProductDetails/>, loader: ProductDetailsLoader},
    {path: "/cart", element : <ProtectedRouted><CartList/></ProtectedRouted>},
    {path: "/wishlist", element : <ProtectedRouted><WishList/></ProtectedRouted>},
    {path: "/profile", element : <ProtectedRouted><Profile/></ProtectedRouted>, loader: profileLoader},
  ]},
  {path: "/signup", element: <Signup/>},
  {path: "/login", element: <Login/>},
  {path: "/faq", element: <Faq/>, loader: FaqLoader},
  {path: "*", element: <NotFound/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={itemStore}>
    <RouterProvider router={router} /> 
    </Provider>
  </React.StrictMode>,
)
