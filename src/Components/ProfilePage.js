import {useState , useEffect} from "react";
import ReviewCard from "./ReviewCard";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function ProfilePage(){

    const [reviews, setReviews] = useState([])
    const user = useContext(UserContext)
    
    useEffect(() => {
        fetch(`http://localhost:9292/users/${user.id}/reviews`)
            .then(r => r.json())
            .then(data => setReviews(data))
    }, [])    

    function renderReviews (reivewsArr) {
        const renderedReviews = reivewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} review={review} givenUser={true}/>)
        return renderedReviews
    }

    return(
        <>
            <h1>{user.name}</h1>
            <img src={user.avatar_url} alt="user avatar"/>
            <p>{user.bio}</p>
            <ul>
            {renderReviews(reviews)}
            </ul>
            
        </>

    )
}

export default ProfilePage