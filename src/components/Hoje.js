import styled from "styled-components"
import { useContext } from "react"
import { UserContext } from "./UserContext"
import Header from "./Header"
import Footer from "./Footer"


export default function Hoje(){
    const [userInfo] = useContext(UserContext)

    return(
        <HojeContainer>
        <Header userInfo={userInfo}/>
        {console.log(userInfo, "essa é a user info no hoje")}
        <Footer/>
        </HojeContainer>
        
    )
}

const HojeContainer = styled.div`
background-color:#F2F2F2;
width:100vw;
height:100vh;
font-family: Lexend Deca;

`