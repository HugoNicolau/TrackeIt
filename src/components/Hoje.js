import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Header from "./Header";
import Footer from "./Footer";
import { BsCheckSquareFill } from "react-icons/bs";
import axios from "axios";
import dayjs from "dayjs";
import { HabitsContext } from "./HabitsContext";

export default function Hoje() {


  const [userInfo] = useContext(UserContext);
  const [todayHabits, setTodayHabits] = useState([]);
  const [doneHabits, setDoneHabits] = useState([])

  const [totalHabits, setTotalHabits, finishedHabits, setFinishedHabits] = useContext(HabitsContext)

  useEffect(() => {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const promise = axios.get(URL, config);
    promise.then((res) => {
      console.log(res.data, "resdataDone");
      const newArray = res.data;
      let contador=0;
      newArray.map((n)=>(n.done===true)&& contador++)
      setTodayHabits(res.data);
      setTotalHabits(res.data.length)
      setFinishedHabits(contador)
      const arrayDone = newArray.filter((n) => n.done===true)
      console.log(arrayDone, "arrayDonepls")
      setDoneHabits(arrayDone)

    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  function checkHabit(id, done, t){
   if(done === false){
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
    const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const promise = axios.post(URL,null, config);

      promise.then((res) => {
        console.log(res.data)
        const checkAddDone = [...doneHabits, t]
        setDoneHabits(checkAddDone)
       
      })
      promise.catch((err) => {
        console.log(err.response.data)
      })
   }
   else{
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
    const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const promise = axios.post(URL,{}, config);

      promise.then((res) => {
        console.log(res.data)

        const NewDoneArray = doneHabits.filter((d) => d.id!== id)
        setDoneHabits(NewDoneArray)
      })
      promise.catch((err) => {
        console.log(err.response.data)
      })
   }

  }
  const now = dayjs().locale("pt-br").format("dddd");
  const date = dayjs().locale("pt-br").format("DD/MM");
  console.log(now, "now");
  return (
    <HojeContainer>
      <Header userInfo={userInfo} />
      
      <DayOfWeekContainer>
        {now === "Monday"
          ? "Segunda-Feira"
          : now === "Tuesday"
          ? "Terça-Feira"
          : now === "Wednesday"
          ? "Quarta-Feira"
          : now === "Thursday"
          ? "Quinta-Feira"
          : now === "Friday"
          ? "Sexta-Feira"
          : now === "Saturday"
          ? "Sábado"
          : "Domingo"}
        {", "}
        {date}
      </DayOfWeekContainer>
      <PercentageContainer zeroFinished={(finishedHabits/totalHabits===0)===true}>
        {finishedHabits/totalHabits===0 ? "Nenhum hábito concluído ainda" : `${(finishedHabits/totalHabits)*100}% dos hábitos concluídos`}
      </PercentageContainer>

      {todayHabits.map((t) => (
        <HabitBox key={t.id}>
          <h1>{t.name}</h1>
          <h2>Sequencia atual : {t.currentSequence}</h2>
          <h2>Seu recorde: {t.highestSequence}</h2>
          <CheckBoxContainer done={doneHabits.includes(t)} onClick={() => checkHabit(t.id, t.done, t)}>
            <BsCheckSquareFill />
          </CheckBoxContainer>
        </HabitBox>
      ))}
      <Footer />
    </HojeContainer>
  );
}

const HojeContainer = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  font-family: Lexend Deca;
  padding-top: 100px;
  padding-left: 18px;
  padding-right: 17px;
`;
const DayOfWeekContainer = styled.h1`
  font-family: Lexend Deca;
  font-size: 23px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: #126ba5;
`;
const PercentageContainer = styled.h2`
  font-family: Lexend Deca;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: #bababa;
  color: ${props => (props.zeroFinished===true) ? "#bababa" : "#8FC549"};
  margin-bottom: 28px;
`;
const HabitBox = styled.div`
  height: 94px;
  width: 100%;
  border-radius: 5px;
  background-color: #ffffff;
  padding-left: 15px;
  padding-top: 13px;
  padding-bottom: 12px;
  position: relative;
  margin-bottom: 10px;
  h1 {
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
    margin-bottom: 7px;
  }
  h2 {
    font-family: Lexend Deca;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;

const CheckBoxContainer = styled.div`
  position: absolute;
  right: 13px;
  top: 13px;
  height: 50px;
  font-size: 69px;
  color: ${(props) => (props.done ? "#8fc549" : "#ebebeb")};
  border-color: #e7e7e7;
  background-color: #ffffff;
  border-radius: 15px;
`;
