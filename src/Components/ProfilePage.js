import {useState , useEffect} from "react";
import ReviewCard from "./ReviewCard";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { createPortal } from "react-dom";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";

function ProfilePage({reviews , setReviews , handleReviewChanges , handleFormContainer}){

    
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
        const renderedReviews = reivewsArr.map((review) => <ReviewCard key={`reviewKey${review.id}`} handleViewForm={handleViewForm} handleFormContainer={handleFormContainer} handleReviewChanges={handler} setPassedReview={setPassedReview} review={review} inUserPage={true}/>)
        return renderedReviews
    }


    function handleViewForm(e){
        setViewReviewForm(viewReviewForm => !viewReviewForm)
        setPassedReview(undefined)
    }

    return(
        <StyledDiv>

            <img className="avatar" src={user.avatar_url} alt="user avatar"/>

            <div>
                
            </div>
            {user ? <> 
            
                <h1>{user.name}</h1>
                <p>{user.bio}</p>
            
            
            
            <ul>
            {reviews ? renderReviews(reviews) : <></>}
            </ul> </> : <></>}

        </StyledDiv>

    )
}

export default ProfilePage

const StyledDiv = styled.div`
display: grid;
grid-template-columns: 1fr 2fr 3fr 1fr;
grid-template-rows: repeat(4, 20vh);
grid-gap: 30px;
grid-template-areas: 
". image name ."
". image bio ."
". review review ."
". review review ."
;

img.avatar {
    grid-area: image;
    border-radius: 60%;
    width: 65%;
    position: relative;
    align-self: center;
    justify-self: center;
}

h1{
    grid-area: name;
}

p{
   grid-area: bio;
}


ul{
    grid-area: review;
}
`