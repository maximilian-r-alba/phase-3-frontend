import styled from "styled-components"
import { useState } from "react"
import {FaWindowClose} from "react-icons/fa"

function BookForm({handleFormContainer, setBooks}){

    
    const defaultFormValues = {title: "", author: "", summary:"", cover_url: "", subgenre: "", "fiction?":true }
    const [formValues, setFormValues] = useState(defaultFormValues)

    function updateFormValues(e){
 
        const key = e.target.name
        const value = e.target.value    
        setFormValues({...formValues, [key]: value})
    
    }

    function submitBook(e){
        e.preventDefault()
        fetch("http://localhost:9292/books",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(formValues)
        })
        .then(r=>r.json())
        .then(data=>setBooks(books => [...books, data]))
        handleFormContainer(false)
    }

    return (
      
            <StyledForm onSubmit={submitBook}>
           <button onClick={(e) => {
                e.preventDefault();
                handleFormContainer(false)}}><FaWindowClose size={20}/></button>
            <label>
                Title:
                <input type="text" name="title" value = {formValues['title']} onChange={updateFormValues}/>
            </label>
            <label>
                Author:
                <input type="text" name="author" value = {formValues['author']} onChange={updateFormValues}/>
            </label>
            <label>
                Genre:
                <input type="text" name="subgenre" value = {formValues['subgenre']} onChange={updateFormValues}/>
            </label>

            <label className="fiction">
                Fiction
                <input type="radio" name="fiction?" value = {true} defaultChecked onChange={updateFormValues}/>
            </label>

            <label className="fiction">
                Nonfiction
                <input type="radio" name="fiction?" value = {false} onChange={updateFormValues}/>
            </label>
                  
            <label>
                Summary:
                <textarea rows="8" cols="50" name="summary" value = {formValues['summary']} onChange={updateFormValues}/>
            </label>
            <label className="bookCoverLabel">
                Book Cover URL:
                <input type="text" name="cover_url" value = {formValues['cover_url']} onChange={updateFormValues}/>
            </label>
          
            <input className="submitBtn" type="submit"/>
            
        </StyledForm>

        
    )
}

export default BookForm

const StyledForm = styled.form `

display: flex;
flex-direction: column;
gap: 20px;

button{
    color: red;
    width: 30px;
    background: none;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    
}

label{
    margin-left: 20px;
    font-size: 20px;
    input{
        font-size: 15px;
        outline: none;
        margin-left: 10px;
        border-style: none none dotted none;
    }
}
textarea{
    display: block;
}
input.submitBtn{
  align-self: center;
  width: 100px;
  height: 30px;
  font-size: 25px;
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}
`