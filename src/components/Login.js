import styled from "styled-components";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [clickedToLogin, setClickedToLogin] = useState(false);
  const navigate = useNavigate()
  
    const [userInfo, setUserInfo] = useContext(UserContext);

  function tryLogin(e) {
    console.log("cliquei");
    setClickedToLogin(!clickedToLogin);
    e.preventDefault();
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const body = {
      email:  userEmail ,
      password:  userPassword ,
    };

    const promise = axios.post(URL, body);
    promise.then((res) => {
      console.log(res.data);
      setUserInfo(res.data);
      navigate("/hoje")
      console.log(userInfo, "essa é a user info")
    });
    promise.catch((err) => {
      console.log(err.response.data);
      setClickedToLogin(false);
      setUserEmail("");
      setUserPassword("")
      alert("Dados de usuário ou senha estão incorretos, tente novamente!");
    });
  }

  return (
    
    <ScreenContainer>
      <img src={logo} alt="logo" />
      <LoginContainer>
        <form onSubmit={tryLogin}>
          <input
            type="email"
            id="emailField"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="email"
            required
          />
          <input
            type="password"
            id="passwordField"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="senha"
            required
          />
          <ButtonContainer
            clickedToLogin={clickedToLogin}
            type="submit"
            disabled={clickedToLogin}
          >
            {clickedToLogin === false ? (
              "Entrar"
            ) : (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#ffffff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            )}
          </ButtonContainer>
        </form>
        <StyledLink to="/cadastro">
          <h1>Não tem uma conta? Cadastre-se!</h1>
        </StyledLink>
      </LoginContainer>
    </ScreenContainer>
  );
}

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
`;

const LoginContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 6px;
  }

  input {
    height: 45px;
    width: 303px;
    border-radius: 5px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    border: 1px solid #d4d4d4;
    padding-left: 11px;
    box-sizing: border-box;

    &::placeholder {
      color: #dbdbdb;
    }
  }
`;

const ButtonContainer = styled.button`
  height: 45px;
  width: 303px;
  left: 36px;
  top: 381px;
  border-radius: 4.636363506317139px;
  font-family: Lexend Deca;
  font-size: 21px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  background-color: #52b6ff;
  opacity: ${(props) => (props.clickedToLogin === false ? "1" : "0.7")};
  align-items: center;
  color: #ffffff;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  border-color: #52b6ff;
  box-shadow: none;
`;

const StyledLink = styled(Link)`
  text-align: center;
`;
