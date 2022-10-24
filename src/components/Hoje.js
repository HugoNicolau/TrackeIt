import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import Header from "./Header"
import Footer from "./Footer"
import {BsCheckSquareFill} from "react-icons/bs"
import axios from "axios"

export default function Hoje(){
    const [userInfo] = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([])
    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const promise = axios.get(URL, config)
          promise.then((res) => {
            console.log(res.data)
            setTodayHabits(res.data)
          })
          promise.catch((err) => {
            console.log(err.response.data)
          })
    },[])

    return(
        <HojeContainer>
        <Header userInfo={userInfo}/>
        {console.log(userInfo, "essa é a user info no hoje")}
        <DayOfWeekContainer>
        Dia da semana
        </DayOfWeekContainer>
        <PercentageContainer>
        Quantidade de habitos concluidos
        </PercentageContainer>

        {todayHabits.map((t) => (

        <HabitBox key={t.id}>
            <h1>
                {t.name}
            </h1>
            <h2>
                Sequencia atual : {t.currentSequence}
            </h2>
            <h2>
                Seu recorde: {t.highestSequence}
            </h2>
            <CheckBoxContainer done={t.done}>
            <BsCheckSquareFill/>
            </CheckBoxContainer>
        </HabitBox>
        ))}
        <Footer/>
        </HojeContainer>
        
    )
}

const HojeContainer = styled.div`
background-color:#F2F2F2;
width:100vw;
min-height:100vh;
height:100%;
font-family: Lexend Deca;
padding-top:100px;
padding-left:18px;
padding-right:17px;

`
const DayOfWeekContainer = styled.h1`
font-family: Lexend Deca;
font-size: 23px;
font-weight: 400;
line-height: 29px;
letter-spacing: 0em;
text-align: left;
color: #126BA5;
`
const PercentageContainer = styled.h2`
font-family: Lexend Deca;
font-size: 18px;
font-weight: 400;
line-height: 22px;
letter-spacing: 0em;
text-align: left;
color: #BABABA;
margin-bottom:28px;
`
const HabitBox = styled.div`
height: 94px;
width: 100%;
border-radius: 5px;
background-color:#ffffff;
padding-left:15px;
padding-top:13px;
padding-bottom:12px;
position:relative;
margin-bottom:10px;
h1{
    font-family: Lexend Deca;
font-size: 20px;
font-weight: 400;
line-height: 25px;
letter-spacing: 0em;
text-align: left;
color: #666666;
margin-bottom:7px;

}
h2{
    font-family: Lexend Deca;
font-size: 13px;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: left;
color: #666666;
}
`

const CheckBoxContainer = styled.div`
    position:absolute;
    right:13px;
    top:13px;
    height:50px;
    font-size:69px;
    color: ${props => props.done ? "#8fc549" : "#ebebeb"};
    border-color:#e7e7e7;
    background-color:#ffffff;
    border-radius:15px;
`