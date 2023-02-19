import {useState , useEffect} from "react";
import ReviewCard from "./ReviewCard";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { createPortal } from "react-dom";
import ReviewForm from "./ReviewForm";

function ProfilePage({reviews , setReviews , handleReviewChanges , portalSite}){

    
    const user = useContext(UserContext)
    const [viewReviewForm, setViewReviewForm] = useState(false)
    const [passedReview, setPassedReview] = useState(undefined)
   

    useEffect(() => {
            fetch(`http://localhost:9292/users/${user.id}/reviews`)
            .then(r => r.json())
            .then(data => setReviews(data))
        
    }, [])    


    function handler(data, method){
        setReviews(handleReviewChanges(data, method))
    }


    function renderReviews (reivewsArr) {
        const renderedReviews = reivewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} handleViewForm={handleViewForm} handleReviewChanges={handler} setPassedReview={setPassedReview} review={review} givenUser={true}/>)
        return renderedReviews
    }


    function handleViewForm(e){
        setViewReviewForm(viewReviewForm => !viewReviewForm)
        setPassedReview(undefined)
    }

    return(
        <>
            {user ? <> <h1>{user.name}</h1>
            <img src={user.avatar_url} alt="user avatar"/>
            <p>{user.bio}</p>
            <ul>
            {reviews ? renderReviews(reviews) : <></>}
            </ul> </> : <></>}

            {viewReviewForm ? createPortal(<ReviewForm review={passedReview} handleReviewChanges={handler} handleViewForm = {handleViewForm} />, portalSite) : <></>}
            
        </>

    )
}

export default ProfilePage