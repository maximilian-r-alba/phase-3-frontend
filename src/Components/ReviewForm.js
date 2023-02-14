import  styled  from "styled-components"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserContext } from "./UserContext"

function ReviewForm({ book_id , handleViewForm , postReview, review, patchReview}){

    const user = useContext(UserContext)
    const [reviewValues, setReviewValues] = useState({user_id: user.id, book_id: book_id, title: "", rating: "", content: ""})


    useEffect(() => {
        if (review) {
            setReviewValues({id: review.id, user_id: review.user_id, book_id: review.book_id, title: review.title, rating: review.rating, content: review.content})
        }
    }, [])

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

   function handleSubmit(e){
    e.preventDefault()
    if(review){
        patchReview(reviewValues)
    }
    else{
        postReview(reviewValues)
    }
    
    handleViewForm()
   }

    return (
        <StyledDiv>
            <button onClick={handleViewForm}>X</button>
            <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" name="title" value={reviewValues.title} onChange={updateFormValues}/>
            </label>
            <label>
                Rating:
                <input type="number" name="rating" min="1" max="5" value={reviewValues.rating} onChange={updateFormValues}/>
            </label>
            <label>
                Review:
                <textarea type="text" name="content" value={reviewValues.content} onChange={updateFormValues} rows="8" cols="45"/>
            </label>
            <label>
                <input type="submit"/>
            </label>
            </form>
        </StyledDiv>
    )
}

export default ReviewForm

const StyledDiv = styled.div `
position: fixed;
top: 15vh;
left: 35vw;
border: solid;
height: 70vh;
width: 30vw;
opacity: 1;
background-color: white;

form{
 display: flex;
 flex-direction: column;
 align-items: center;
}

form label{
margin: 25px;
font-size: 20px;
text-align: center;
}
form label input, textarea{
    display: block;
    margin: 20px;
    font-size: 15px;
}

form label textarea{
 font-size: 20px;
}


`