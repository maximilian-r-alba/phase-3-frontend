import {useState , useEffect} from "react";
import ReviewCard from "./ReviewCard";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { createPortal } from "react-dom";
import ReviewForm from "./ReviewForm";
function ProfilePage({portalSite}){

    const [reviews, setReviews] = useState([])
    const user = useContext(UserContext)
    const [viewReviewForm, setViewReviewForm] = useState(false)
    const [passedReview, setPassedReview] = useState(undefined)
    
    useEffect(() => {
        fetch(`http://localhost:9292/users/${user.id}/reviews`)
            .then(r => r.json())
            .then(data => setReviews(data))
    }, [])    

    function handleReviewChanges(reviewValues , method){

        const reviewID = reviewValues.id
        const filteredReviews = reviews.filter((review) => review.id !== reviewID)
        switch (method){

            case 'patch':
                const patchReviewArr = [reviewValues].concat(filteredReviews)
                setReviews(patchReviewArr)
            break;

            case 'delete':
                setReviews(filteredReviews)
            break;
        }
    }


    function renderReviews (reivewsArr) {
        const renderedReviews = reivewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} handleViewForm={handleViewForm} handleReviewChanges={handleReviewChanges} setPassedReview={setPassedReview} review={review} givenUser={true}/>)
        return renderedReviews
    }


    function handleViewForm(e){
        setViewReviewForm(viewReviewForm => !viewReviewForm)
        setPassedReview(undefined)
    }

    return(
        <>
            <h1>{user.name}</h1>
            <img src={user.avatar_url} alt="user avatar"/>
            <p>{user.bio}</p>
            <ul>
            {renderReviews(reviews)}
            </ul>

            {viewReviewForm ? createPortal(<ReviewForm review={passedReview} handleReviewChanges={handleReviewChanges} handleViewForm = {handleViewForm} />, portalSite) : <></>}
            
        </>

    )
}

export default ProfilePage