import { useEffect , useState } from "react"
function ReviewCard({review}){
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        fetch(`http://localhost:9292/users/${review.user_id}`)
        .then(r => r.json())
        .then(data => setUser(data))
    },[])

    return(
       <>
       {user ?  
       <div>
        <h1>{review.title}</h1>
        <p>{review.rating}</p>
        <p>{review.content}</p>
        <p>{user.name}</p>
        <img src={user.avatar_url} alt="user avatar"/>
       </div> : <p>loading review</p>}
       </>
      
    )
}

export default ReviewCard