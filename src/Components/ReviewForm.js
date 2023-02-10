import  styled  from "styled-components"
import { useState } from "react"

function ReviewForm({handleViewForm}){



    return (
        <StyledDiv>
            <button onClick={handleViewForm}>X</button>
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