import React, { useRef } from 'react'
import { useDispatch,  useSelector } from 'react-redux';
// import { Auth } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { getEmail, getToken, setUser } from '../store/auth';
import { Navigate } from 'react-router-dom';



const Login = () => {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const checkLogin = getToken()
    const login = async (email, password)=> {
      await fetch("http://localhost:8001/login", {
          method: 'POST',
          body: JSON.stringify({
              email: email,
              password: password,
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
      .then((res) => res.json())
      .then((data)=> {
          setUser(data.token, data.email);
          const token = getToken();
          const email = getEmail();
          navigate('/');
      })
      .catch((err)=> console.log(err))
  }

    const handleSubmit = async (event) => {
         event.preventDefault();
        login(email.current.value, password.current.value)
        email.current.value = "";
        password.current.value = "";
    }

  return (
    <>
    { checkLogin? <Navigate to="/" />: <form onSubmit={handleSubmit} className='login_main'>
    <div className='login_link'> <Link to="/signup" >New user?</Link></div>
    <div className="login_form">
         <div className="mb-3">
        <label htmlFor='email' className="form-label" style={{color: "white"}}>Email</label>
        <input type='email' required  className="form-control" ref={email} id="email" placeholder='Email'/>
        </div>
         <div className="mb-3">
        <label htmlFor='password' className="form-label" style={{color: "white"}}>Password</label>
        <input type='password' required  className="form-control" ref={password} id="password" placeholder='Password'/>
        </div>
         <div className="mb-3">
        <button className='button' type='submit'>Login</button>
        </div>
       </div>
    </form>}
    
    </>
  )
}

export default Login