import { useEffect } from "react"
function ReviewCard({review}){


    return(
       <div>
        <h1>{review.title}</h1>
        <p>{review.rating}</p>
        <p>{review.content}</p>
        <p>{review.user.name}</p>

       </div>
    )
}

export default ReviewCard