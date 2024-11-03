import { useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import FaqPost from "./FaqPost";

const Faq = () => {
    const initialPosts = useLoaderData(); 

    const postBodyElement = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (event)=> {
        event.preventDefault();
        const post = postBodyElement.current.value;
        const posts = {
            post: post
        }
        await fetch('http://localhost:3000/posts',{
            method: 'POST',
            body: JSON.stringify(posts),
            headers: {
                'Content-type': 'application/json',
            },
        }).then(response => {
            postBodyElement.current.value = "";
            navigate('/faq')
        }) .catch((err) => {
                console.log(err.message)
            })
    }
    return (
        <>
            <h1>Drop some feedback</h1>
            <form className="create-post" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="body" className="form-label">Post Content</label>
                    <textarea rows="1" ref={postBodyElement} type="text" className="form-control" id="body" placeholder="Tell us more about it" />
                </div>
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
            { initialPosts.map((item)=> <FaqPost key={item.id} items={item}/>) }
        </>
    )
}

export const FaqLoader =async ()=> {
    const res =await fetch('http://localhost:3000/posts');
    const data = res.json();
    return data;

}

export default Faq;