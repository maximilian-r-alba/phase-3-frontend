import  styled  from "styled-components"
import { useState } from "react"

function ReviewForm({ user , book_id , handleViewForm}){

    const [reviewValues, setReviewValues] = useState()

    console.log(book_id)
    return (
        <StyledDiv>
            <button onClick={handleViewForm}>X</button>
            <form>
            <label>
                Title:
                <input type="text" name="title" />
            </label>
            <label>
                Rating:
                <input type="text" name="title" />
            </label>
            <label>
                Reivew:
                <textarea type="text" name="title" />
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