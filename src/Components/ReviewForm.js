import  styled  from "styled-components"
import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "./UserContext"

function ReviewForm({ book_id , handleViewForm}){

    const user = useContext(UserContext)
    const [reviewValues, setReviewValues] = useState({user_id: user.id, book_id: book_id, title: "", rating: "", content: ""})

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
        console.log(reviewValues)
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
                Reivew:
                <textarea type="text" name="content" value={reviewValues.content} onChange={updateFormValues}/>
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
left: 25vw;
border: solid;
height: 50vh;
width: 50vw;
opacity: 1;
background-color: white;
`