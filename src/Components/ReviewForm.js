import  styled  from "styled-components"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserContext } from "./UserContext"
import StarsRating from "./StarsRating"

function ReviewForm({ book_id , handleFormContainer , handleReviewChanges, review = null, patchReview}){

    const user = useContext(UserContext)
    const [reviewValues, setReviewValues] = useState({user_id: user.id, book_id: book_id, title: "", rating: 1, content: ""})
    

//if a review is provided, i.e is being edited, then set form values
    useEffect(() => {
        if (review) {
            setReviewValues({id: review.id, user_id: review.user_id, book_id: review.book_id, title: review.title, rating: review.rating, content: review.content})
        }
    }, [])

//update form values
    function updateFormValues(e){
        const key = e.target.name
        if(key == "rating")
        {
            const value = parseFloat(e.target.value)
            setReviewValues({...reviewValues, [key]: value})
        }

        else{
            const value = e.target.value    
            setReviewValues({...reviewValues, [key]: value})
        }
 
    
    }

//post new reviews
    function postReview(reviewValues){
        fetch(`http://localhost:9292/reviews`, {
            method: 'POST', 
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(reviewValues)
        })
        .then(r=> r.json())
        .then(data => handleReviewChanges(data, 'post'))
    }
// patch old reviews
function patchReview(reviewValues){
        
    fetch(`http://localhost:9292/reviews/${reviewValues.id}`, {
        method: 'PATCH', 
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(reviewValues)
    })
    .then(r=> r.json())
    .then(data => handleReviewChanges(data, 'patch'))

}
   function handleSubmit(e){
    e.preventDefault()
    if(review){
        patchReview(reviewValues)
    }
    else{
        postReview(reviewValues)
    }
    
    handleFormContainer(false)
   }

    return (
        // <StyledDiv>
            <StyledForm onSubmit={handleSubmit}>
            <button onClick={(e) => handleFormContainer(false)}>X</button>
            <label className="title">
                <h1>Title:</h1>
                <input type="text" name="title" value={reviewValues.title} onChange={updateFormValues}/>
            </label>
            <label className="rating">
            <h1>Rating:</h1>
            {review ? <StarsRating updateFormValues= {updateFormValues} givenRating={review.rating}/> : <StarsRating updateFormValues={updateFormValues} />}
            
            </label>
            
            
            <label className="review">
                <h1>Review:</h1>
                <textarea type="text" name="content" value={reviewValues.content} onChange={updateFormValues} rows="10" cols="40"/>
            </label>
            <label className="submit">
                <input type="submit"/>
            </label>
            </StyledForm>
        // </StyledDiv>
    )
}

export default ReviewForm

const StyledForm = styled.form`
width: 100%;
height: 100%;
display: grid;
grid-template-columns: repeat(4,25%);
grid-template-rows: 1fr 1fr 1fr 3fr 1fr;
grid-template-areas: 
". . . close"
". title title ."
". rating rating ."
". review review ."
". submit submit ."
;

h1{
        margin-top: 0px;
        font-size: 25px;
    }

button{
    position: relative;
    left: 70%;
    top: 10%;
    width: 20%;
    height: 20%;
    grid-area: close;
}
.title{
    grid-area: title;
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        height: 35px;
        width: 80%;
        text-align: center;
    }
}

.rating{
    grid-area: rating;
    display: flex;
    flex-direction: column;
    align-items: center;
 
    label{
        width: 70%;
        margin-left: 8px;
    }
}

.review{
    grid-area: review;
    display: flex;
    flex-direction: column;
    align-items: center;

    textarea{
        font-size: 20px;
    }
}

.submit{
    grid-area: submit;
    display: flex;
    justify-content: center;

    input{
        margin-top: 20px;
        height: 30%;
    }
}
`