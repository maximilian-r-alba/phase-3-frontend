import styled from "styled-components"

function BookForm(){

    return (
        <StyledForm>
            <label>
                Title:
                <input type="text" name="title"/>
            </label>
            <label>
                Author:
                <input type="text" name="author"/>
            </label>
            <label>
                Fiction
                <input type="radio" name="fiction?" value = {true}/>
            </label>
            <label>
                Nonfiction
                <input type="radio" name="fiction?" value = {false}/>
            </label>
            <label>
                Summary:
                <textarea rows="10" cols="50" name="summary"/>
            </label>
            <label>
                Book Cover URL:
                <input type="text" name="cover_url"/>
            </label>
            <label>
                <input type="submit" name="cover_url"/>
            </label>
        </StyledForm>
    )
}

export default BookForm

const StyledForm = styled.form`
width: 200px;
`