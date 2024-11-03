import { useState } from "react";
import {FaStar} from "react-icons/fa";

const RatingComponent = ()=> {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <>
        {[...Array(5)].map((star, index) => {
            const currRating = index + 1;
            return (
                <label key={index}>
                    <input 
                    type= "radio"
                    name= "rating"
                    value={currRating}
                    onClick={()=> setRating(currRating)}
                     />
                    <FaStar className="star" 
                    size={50}
                    color= {currRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={()=> setHover(currRating)}
                    onMouseLeave={()=> setHover(null)}
                      />
                </label>
               
                
            )
        })}
             <p>Your rating is {rating}</p>
        </>
    )
}
export default RatingComponent;