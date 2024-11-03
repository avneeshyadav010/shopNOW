import React from 'react'
import { getEmail } from '../store/auth'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom'


const Profile = () => {
    const user = useLoaderData();
    return (
        <>
            <div className='profile_container'>
                <div className='profile_picture'>
                    <img src={`http://localhost:8001${user.profilePicture}`} alt='Profile Picture' />
                </div>
                <div className='profile_desc'>
                    <h3>Profile</h3>
                    <p><b>First name:</b> {user.firstName}</p>
                    <p><b>Last Name:</b> {user.lastName}</p>
                    <p><b>Email:</b> {user.email}</p>
                </div>
            </div>

        </>
    )
}

export default Profile

export const profileLoader = async () => {
    const email = getEmail()
    const response = await axios('http://localhost:8001/user', {
        params: { email }
    });
    const data = await response.data;
    return data;
}