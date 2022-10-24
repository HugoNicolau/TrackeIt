import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import {BsTrash} from "react-icons/bs"


export default function Habitos() {
  const [userInfo] = useContext(UserContext);
  const [habitsList, setHabitsList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false)
  const [isSelected, setIsSelected] = useState([]);
  

  
  const DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

  function selectButton(index) {
    if (isSelected.includes(index)) {
      const newArray = isSelected.filter((i) => i !== index);
      setIsSelected(newArray);
    } else {
      const newArray = [...isSelected, index];
      setIsSelected(newArray);
    }
  }
  useEffect(() => {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const promise = axios.get(URL, config);
    promise.then((res) => {
      setHabitsList(res.data);
      console.log(habitsList, "essa é a habitList")
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  }, [userInfo.token]);

  function toOpenForm() {
    setOpenForm(!openForm);
  }
  function saveHabit(e) {
    e.preventDefault();
    //Mandar o habito pra API
    setIsDisabled(true)
    const urlCreateHabit = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
    const body = {
      name: habitName,
      days: isSelected 
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const promise = axios.post(urlCreateHabit,body,config);
    promise.then((res) => {
      console.log(res.data)
     const newHabitAdded = [...habitsList,res.data]
      setHabitsList(newHabitAdded)
      //Adicionar o habito ao array de habitos

      //Limpar os negocios e fechar o form
      setOpenForm(false)
      setHabitName("")
      setIsSelected([])
      setIsDisabled(false)
    })
    promise.catch((err) => {
      alert(err.response.data)
      setIsDisabled(false)
    })
  }

  function deleteHabit(id){
    if(window.confirm("Tem certeza de que deseja excluir este hábito?") === true){

      const DELETEurl = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const promise = axios.delete(DELETEurl, config)
  
      promise.then((res) => {
        const newHabitList = habitsList.filter((h) => h.id!==id)
        setHabitsList(newHabitList)
      })
      promise.catch((err) => {
        console.log(err.response.data)
      })
    }
    else{
      return;
    }
    

  }

  return (
    <HabitosContainer>
      <Header userInfo={userInfo} />
      <HabitosInnerContainer>
        <HabitsHeadPart>
          <h1>Meus hábitos</h1>
          <button onClick={() => toOpenForm()}>+</button>
        </HabitsHeadPart>
        {openForm && (
          <CreatingContainer onSubmit={saveHabit}>
            <input
              type="text"
              placeholder="nome do hábito"
              id="habitName"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              disabled={isDisabled}
              required
            />
            <DaysContainer>
              {DAYS.map((d, i) => (
                <ButtonDay
                  key={i}
                  id={i}
                  onClick={() => selectButton(i)}
                  isSelected={isSelected}
                  index={i}
                  type="button"
                  disabled={isDisabled}
                >
                  {d}
                </ButtonDay>
              ))}
            </DaysContainer>
            <ButtonsContainer>
              <CancelButton onClick={() => toOpenForm()}>Cancelar</CancelButton>
              <SaveButton type="submit" disabled={isDisabled}>{
              isDisabled ? (
                <ThreeDots
                  height="10"
                  width="84"
                  radius="9"
                  color="#ffffff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              )
              :

              "Salvar"
              }</SaveButton>
            </ButtonsContainer>
          </CreatingContainer>
        )}
        {habitsList.length < 1 && (
          <TextContainer>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </TextContainer>
        )}
        {habitsList.map((h,idx) => 
          <OneHabitContainer key={idx}>
          <h1>{h.name}</h1>
           <DaysContainer>
            {DAYS.map((d, i) => (
              <ButtonDay
                key={i}
                id={i}
                isSelected={h.days}
                index={i}
                >
                {d}
                </ButtonDay>
            ))}
            
          </DaysContainer> 
              <DeleteHabitContainer onClick={() => deleteHabit(h.id)}>
              <BsTrash/>
              </DeleteHabitContainer>
          </OneHabitContainer>
        )}
      </HabitosInnerContainer>
      <Footer />
    </HabitosContainer>
  );
}

const HabitosContainer = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  height: 100%;
  min-height:100vh;
`;

const HabitosInnerContainer = styled.div`
  padding-top: 90px;
  padding-bottom: 120px;
  padding-left: 17px;
  padding-right: 17px;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
`;
const HabitsHeadPart = styled.div`
  font-family: Lexend Deca;
  font-size: 23px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: #126ba5;
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-bottom: 20px;
  button {
    height: 35px;
    width: 40px;
    left: 317px;
    top: 92px;
    border-radius: 4.636363506317139px;
    font-family: Lexend Deca;
    font-size: 27px;
    font-weight: 400;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: center;
    background-color: #52b6ff;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    text-align: center;
    padding: auto;
  }
`;

const OneHabitContainer = styled.div`
height: 91px;
width: 340px;
border-radius: 5px;
background-color:#ffffff;
margin-bottom: 10px;
font-family: Lexend Deca;
font-size: 20px;
font-weight: 400;
line-height: 25px;
letter-spacing: 0em;
text-align: left;
padding-left:15px;
padding-top:13px;
padding-right:10px;
color:#666666;
position:relative;


`;

const TextContainer = styled.h3`
  font-family: Lexend Deca;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: #666666;
  margin-top: 29px;
`;

const CreatingContainer = styled.form`
  height: 180px;
  width: 340px;
  left: 17px;
  top: 147px;
  border-radius: 5px;
  background-color: #ffffff;
  padding-left: 19px;
  padding-top: 18px;
  /* position:absolute; */
  padding-right: 16px;
  padding-bottom: 15px;
  margin-top: 22px;
  margin-bottom:20px;

  input {
    height: 45px;
    width: 303px;
    left: 36px;
    top: 165px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    padding-left: 11px;
    padding-right: 10px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;

    &::placeholder {
      color: #dbdbdb;
    }
  }
`;

const DaysContainer = styled.div`
  display: flex;
`;
const ButtonDay = styled.button`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  border-radius: 5px;
  background-color: #ffffff;
  background-color: ${(props) =>
    props.isSelected.includes(props.index) ? "#dbdbdb" : "#ffffff"};
  border: 1px solid #d4d4d4;
  font-family: Lexend Deca;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) =>
    props.isSelected.includes(props.index) ? "#ffffff" : "#dbdbdb"};
  margin-top: 8px;
  margin-right: 4px;
`;

const CancelButton = styled.button`
  height: 35px;
  width: 84px;
  left: 257px;
  top: 277px;
  border-radius: 4.636363506317139px;
  color: #52b6ff;
  font-family: Lexend Deca;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  background: #ffffff;
  border: none;
  height: 35px;
  width: 84px;
  border-radius: 4.636363506317139px;
`;

const SaveButton = styled.button`
  height: 35px;
  width: 84px;
  left: 257px;
  top: 277px;
  border-radius: 4.636363506317139px;
  background: #52b6ff;
  font-family: Lexend Deca;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  border: none;
  height: 35px;
  width: 84px;
  border-radius: 4.636363506317139px;
  opacity: ${(props) => (props.disabled === false ? "1" : "0.7")};
`;

const ButtonsContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  /* background:blue; */
  align-items: flex-end;
  justify-content: right;
`;
const DeleteHabitContainer = styled.div`
position:absolute;
right:10px;
top:10px;
`