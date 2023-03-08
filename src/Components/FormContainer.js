import styled from "styled-components"

function FormContainer ({form}) {
    return (
        <>
        <StyledDiv >
            {form ? form : <></>}
        </StyledDiv>
            
        </>
    )
}

export default FormContainer

const StyledDiv = styled.div `
position: fixed;
top: 15vh;
left: 35vw;
border: solid;
height: 70vh;
width: 30vw;
background: white

`