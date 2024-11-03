import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'
import { Link } from 'react-router-dom';
import { getToken } from '../store/auth';


const Signup = () => {
    const checkLogin  = getToken();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState({});
    const [profile, setProfile] = useState('');
    const [isSubmit, setSubmit] = useState(false)
    const navigate = useNavigate();


    const handleInputs = (event) => {
        // setUser({ ...user, [event.target.name]: event.target.value });
        const {name, value} = event.target ;
        setUser({...user, [name]: value})
    }
    const handleReceipt = (event) => {
        setProfile(event.target.files[0])
    }
    const validate = (user, profile)=> {
        const error ={};
        if (!user.firstName)
          error.firstName = "First Name can not be empty";
        if (!user.lastName)
            error.lastName = "Last Name can not be empty" ;
        if (!user.email)
          error.email = "Email can not be empty" ;
        if (user.password.length < 4)
          error.password = "Password should be greater than 4";
        if (!profile)
            error.profile = "Please upload your profile picture" ;
        return error
    }
    const handleSignup = (event) => {
        event.preventDefault();
        setError(validate(user, profile));
        setSubmit(true)
        const formData = new FormData();
        formData.append('profile', profile);
        formData.append('user', JSON.stringify(user))
        axios.post("http://localhost:8001/signup", formData)
            .then((res) => {
                const temp = {
                    from_name: user.firstName,
                    email: user.email,
                    message: "HelloWorld"
                }
                emailjs.send('service_jxxn697', 'template_wbcjj4n', temp, 'HmMb5uyubHO_5meRE')
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                    }, (err) => {
                        console.log('FAILED...', err);
                    },);
                navigate('/login');
            })
            .catch((err) => console.log("Sign up err", err))
    }
    useEffect(()=> {
        if(Object.keys(error).length == 0 && isSubmit)
        {
          console.log("Successfully Registered")
        }
      },[error])

    return (
        <>
            { checkLogin? <Navigate to="/"/>: <form onSubmit={handleSignup} className='login_main' encType="multipart/form-data" >
            <div className='login_link'> <Link to="/login" >Already register?</Link></div>
                <div className="login_form">
                    <div className="mb-3">
                        <label htmlFor='fname' className="form-label" style={{ color: "white" }}>First Name</label>
                        <input type='text' className="form-control" name='firstName' value={user.firstName} onChange={handleInputs} id="fname" placeholder='First Name' />
                        <p className='error'>{error.firstName}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='lname' className="form-label" style={{ color: "white" }}>Last Name</label>
                        <input type='text' className="form-control" name='lastName' value={user.lastName} onChange={handleInputs} id="lname" placeholder='Last Name' />
                        <p className='error'>{error.lastName}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='email' className="form-label" style={{ color: "white" }}>Email</label>
                        <input type='email' className="form-control" name='email' value={user.email} onChange={handleInputs} id="email" placeholder='Email' />
                        <p className='error'>{error.email}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className="form-label" style={{ color: "white" }}>Password</label>
                        <input type='password' className="form-control" name='password' minLength={4} value={user.password} onChange={handleInputs} id="password" placeholder='Password' />
                        <p className='error'>{error.password}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='profile' className="form-label" style={{ color: "white" }}>Profile Picture: </label>
                        <input className='button' type='file' id="profile" onChange={handleReceipt} />
                        <p className='error'>{error.profile}</p>
                    </div>
                    <div className="mb-3">
                        <button className='button' type='submit'>Sign Up</button>
                    </div>
                </div>
            </form> }
            
        </>
    )
}

export default Signup