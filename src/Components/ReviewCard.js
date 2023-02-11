import { useEffect , useState } from "react"
import { useContext } from "react";
import { UserContext } from "./UserContext";

function ReviewCard({review , givenUser}){
    const [user, setUser] = useState(undefined)
    const loggedInUser = useContext(UserContext)
    const [book, setBook] = useState(undefined)

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

    useEffect(() => {
        fetch(`http://localhost:9292/reviews/${review.id}/book`)
        .then(r => r.json())
        .then(data => setBook(data))
    },[])


    return(
       <>
       {user ?
       <li>
            <div>
                {givenUser && book ? <h1>{book.title}</h1> : <></>}
                <h1>{review.title}</h1>
                <p>{review.rating}</p>
                <p>{review.content}</p>
                {!givenUser ? <p>{user.name}</p> : <></>}
                {!givenUser ? <img src={user.avatar_url} alt="user avatar"/> : <></>}
        </div>
       </li>  
       : <p>loading review</p>}
       </>
      
    )
}

export default ReviewCard