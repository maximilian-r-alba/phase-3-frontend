import { useEffect , useContext} from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";


function ProfilePage({reviews , setReviews , setUser , createReviewCards}){

    const user = useContext(UserContext)
    
    useEffect(()=>{
        fetch(`http://localhost:9292/users/${user.id}`)
        .then(r => r.json())
        .then(data => setUser(data))
    },[])


    useEffect(() => {
        const userReviews = user.reviews.map((review) =>{
            review['user'] = user
            return review
        })
        setReviews(userReviews)
    },[user])


    return(
        <StyledDiv>

            {user ? <> <img className="avatar" src={user.avatar_url} alt="user avatar"/>

                <h1>{user.name}</h1>
                <p>{user.bio}</p>
            <ul>
            {reviews ? createReviewCards(reviews, false, true) : <></>}
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