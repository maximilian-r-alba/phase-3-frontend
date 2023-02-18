import { useEffect , useState } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext";
import ReviewForm from "./ReviewForm";
import { createPortal } from "react-dom";

function ReviewCard({review , givenUser , handleViewForm , setPassedReview , handleReviewChanges}){
    const [user, setUser] = useState(undefined)
    const loggedInUser = useContext(UserContext)

    const [book, setBook] = useState(undefined)

    // console.log(handleReviewChanges)
//getuser datat for review cards
    useEffect(() => {
        if(givenUser) 
        {
            setUser(loggedInUser)
        }
            else
            {
                fetch(`http://localhost:9292/users/${review.user_id}`)
                .then(r => r.json())
                .then(data => setUser(data))
            }
    },[])

//get book data; ****only needs name for when on profile page
    useEffect(() => {
        fetch(`http://localhost:9292/reviews/${review.id}/book`)
        .then(r => r.json())
        .then(data => setBook(data))
    },[])

    function handleEdit(){
        handleViewForm()
        setPassedReview(review)
    }

    function handleDelete(){
        fetch(`http://localhost:9292/reviews/${review.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(data => handleReviewChanges(data, 'delete'))
    }

    return(
       <>
       {user ?
       <li>
            <div>
                {loggedInUser.id === review.user_id ?<button name = "edit" onClick={handleEdit}>Edit</button> : <></>}
                {loggedInUser.id === review.user_id ?<button name = "delete" onClick={handleDelete}>Delete</button> : <></>}
                {givenUser && book ? <h1>{book.title}</h1> : <></>}
                <h1>{review.title}</h1>
                <p>{review.rating}</p>
                <p><pre>{review.content}</pre></p>
                {!givenUser ? <p>{user.name}</p> : <></>}
                {!givenUser ? <img src={user.avatar_url} alt="user avatar"/> : <></>}
        </div>
       </li>  
       : <p>loading review</p>}
       </>
      
    )
}

export default ReviewCard