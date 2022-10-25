import styled from "styled-components"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import { HabitsContext } from "./HabitsContext";
import { useContext } from "react";

export default function Footer(){

    const [totalHabits, setTotalHabits, finishedHabits, setFinishedHabits] = useContext(HabitsContext)
    let percentage = 0;
    
    if(totalHabits === 0){
         percentage = 0;
    }
    else{
        
         percentage = (finishedHabits/totalHabits)*100;
         
    }

    return(
        <FooterContainer>
            <StyledLink to={"/habitos"}>
        <h1 data-identifier="habit-page-action">Habitos</h1>
            </StyledLink>
        <ElipseContainer>
            <StyledLink to={"/hoje"}>
        <CircularProgressbar value={percentage}
        text={`Hoje`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#52b6ff",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent",
        })}/>
        </StyledLink>
        </ElipseContainer>
        <StyledLink to={"/historico"}>
        <h1 data-identifier="historic-page-action">Histórico</h1>
        </StyledLink>

        </FooterContainer>
    )
}


const FooterContainer = styled.div`
height: 70px;
width: 100vw;
left: 0px;
bottom:0px;
border-radius: 0px;
position:fixed;
background-color:#ffffff;
font-family: Lexend Deca;
font-size: 18px;
font-weight: 400;
line-height: 22px;
letter-spacing: 0em;
text-align: center;
color:#52B6FF;
display:flex;
align-items:center;
justify-content:space-between;
padding-left:30px;
padding-right:30px;
`

const ElipseContainer = styled.div`
width:91px;
height:91px;
/* border-radius:50%; */
/* background-color:#52b6ff; */
display: flex;
align-items: center;
justify-content:center;
margin-bottom:50px;
color:#ffffff;
font-family: Lexend Deca;
font-size: 18px;
font-weight: 400;
line-height: 22px;
letter-spacing: 0em;
text-align: center;

`

const StyledLink = styled(Link)`

text-decoration:none;
color:#52B6FF;


`