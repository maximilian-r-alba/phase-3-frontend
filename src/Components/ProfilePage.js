import {useState , useEffect} from "react";
import ReviewCard from "./ReviewCard";

function ProfilePage({user}){

    const [profile, setProfile] = useState({})
    const [reviews, setReviews] = useState([])

    // useEffect(() => {
    //     fetch(`http://localhost:9292/users/${user.id}`)
    //         .then(r => r.json())
    //         .then(data => setProfile(data))
    // }, [])
    
    // useEffect(() => {
    //     fetch(`http://localhost:9292/reviews/users/${user.id}`)
    //         .then(r => r.json())
    //         .then(data => setReviews(data))
    // }, [])    

    // function renderReviews (reivewsArr) {
    //     const renderedReviews = reivewsArr.map((review) => <ReviewCard review={review}/>)
    //     return renderedReviews
    // }

    return(
        <>
            {/* <h1>{user.name}</h1>
            <img src={user.avatar_url} alt="user avatar"/>
            <p>{user.bio}</p> */}
            <h1>PROFILE PAGE HERE</h1>
            {/* {renderReviews(reviews)} */}
        </>

    )
}

export default ProfilePage