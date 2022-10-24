import styled from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import { useContext } from "react"
import { UserContext } from "./UserContext"

export default function Historico(){

    const [userInfo] = useContext(UserContext)

    return(
        
        <HistoricoContainer>
            <Header userInfo={userInfo} />
            <h1>
                Histórico
            </h1>
            <h2>
        Em breve você poderá ver o histórico dos seus hábitos aqui!
            </h2>
        <Footer/>
        </HistoricoContainer>
    )
}

const HistoricoContainer = styled.div`
background-color: #f2f2f2;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  font-family: Lexend Deca;
  padding-top: 100px;
  padding-left: 18px;
  padding-right: 17px;
  h1{
    font-family: Lexend Deca;
font-size: 23px;
font-weight: 400;
line-height: 29px;
letter-spacing: 0em;
text-align: left;
color:#126BA5;
margin-bottom:17px;
  }
h2{
    font-family: Lexend Deca;
font-size: 18px;
font-weight: 400;
line-height: 22px;
letter-spacing: 0em;
text-align: left;
color:#666666;
}
`