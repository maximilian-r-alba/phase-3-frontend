import { useEffect , useState , useContext} from "react"
import styled from "styled-components";
import { BsTrash , BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

import { UserContext } from "./UserContext";
import StarsRating from "./StarsRating";
import ReviewForm from "./ReviewForm";

function ReviewCard({book, review , inUserPage , handleFormContainer ,  handleReviewChanges}){
    
    const [user, setUser] = useState()
    const loggedInUser = useContext(UserContext)
    
    useEffect(() => {
        if(!inUserPage){
            setUser(review.user)
        }
        else{
            setUser(loggedInUser)
        }
    }, [])

   
    function handleEdit(){
        handleFormContainer(true,<ReviewForm  handleReviewChanges = {handleReviewChanges} handleFormContainer= {handleFormContainer} book_id = {book.id} review={review}/> )   
    }

    function handleDelete(){
        fetch(`http://localhost:9292/reviews/${review.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(data => handleReviewChanges(data, 'delete'))
    }

    return(
       <>
       {user ?
       <li style={{"listStyleType": "none"}}>
            <StyledDiv>
            
            {!inUserPage ? 
            
            <div className="user">
                <p>{user.name}</p>
                <img src={user.avatar_url} alt="user avatar"/>
            </div> 
                    :
            <>
            {book ?
             
            <div className="book">
                <Link to={`/books/${book.id}`}>
                    <img src={`${book.cover_url}?random=${Math.floor(Math.random() * 50)}`} alt = "book cover" />
                    <p>Go to book</p>
                </Link> 
            </div>
                : <p>Loading</p>}
            </>}
            
            <div className="review">
                {inUserPage && book ? <h1>{book.title}</h1> : <></>}

                <h1>{review.title}</h1>

                <StarsRating key ={review.rating} givenRating={review.rating}/>

                <pre>{review.content}</pre>

                {loggedInUser.id === user.id ?<EditButton name = "edit" onClick={handleEdit}><BsPencilSquare size={20} /></EditButton> : <></>}
                
                {loggedInUser.id === user.id ?<DeleteButton name = "delete" onClick={handleDelete}><BsTrash size={20} /></DeleteButton> : <></>}
            </div>
                
        </StyledDiv>
        
       </li>  
       : <p>loading review</p>}
       </>
      
    )
}

export default ReviewCard

const StyledDiv = styled.div`
display: grid;
grid-template-columns: 30% 70%;
grid-template-rows: 350px;
grid-template-areas:
"user review";

border: solid;
margin: 30px;

div.user{
    margin: 20px;
    img{
        width: 50%;
        height: 50%;
    }
grid-area: user;
}

div.book{
    grid-area: user;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
        border: solid;
        width: 50%;
        height: 70%;
        p{
            margin-left: 50px;
        }
    }
    img{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}

div.review{
    position: relative;
    grid-area: review;
    pre{
    white-space: pre-wrap;
    }
}
`

const DeleteButton = styled.button`
border: none;
background-color: transparent;
cursor: pointer;
position: absolute;
right: 2%;
top: 5%;
`

const EditButton = styled.button`
border: none;
background-color: transparent;
cursor: pointer;
position: absolute;
right: 7%;
top: 5%; 
`