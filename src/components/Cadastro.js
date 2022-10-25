import styled from "styled-components";
import logo from "./img/logo.png"
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cadastro(){

const [registerEmail, setRegisterEmail] = useState("")
const [registerName, setRegisterName] = useState("")
const [registerImage, setRegisterImage] = useState("")
const [registerPassword, setRegisterPassword] = useState("")
const [clickedToSingIn, setClickedToSingIn] = useState(false)
const navigate = useNavigate();



    function trySingIn(e){

        e.preventDefault();
        setClickedToSingIn(!clickedToSingIn);
        const body = {
            email: registerEmail,
            name: registerName,
            image: registerImage,
            password: registerPassword
        };

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

        const promise = axios.post(URL, body)

        promise.then((res)=> {
            navigate("/");
        })
        promise.catch((err) => {
            console.log(err.response.data)
            setClickedToSingIn(false);
            

            alert("Dados de email ou nome já existentes, tente novamente!");
        })
    }


    return (
        <ScreenContainer>
            <Link to={"/"}>
          <img src={logo} alt="logo" />
            </Link>
          <LoginContainer>
            <form onSubmit={trySingIn}>
              <input
                type="email"
                id="emailField"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="email"
                required
                data-identifier="input-email"
              />
              <input
                type="password"
                id="passwordField"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="senha"
                required
                data-identifier="input-password"
              />
              <input
                type="text"
                id="nameField"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="nome"
                required
                data-identifier="input-name"
              />
              <input
                type="url"
                id="imageField"
                value={registerImage}
                onChange={(e) => setRegisterImage(e.target.value)}
                placeholder="foto"
                required
                data-identifier="input-photo"
              />
              <ButtonContainer clickedToSingIn={clickedToSingIn} type="submit" disabled={clickedToSingIn}>
                {clickedToSingIn === false ? (
                  "Cadastrar"
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
            <StyledLink to="/">
              <h1 data-identifier="back-to-login-action">Já tem uma conta? Faça login!</h1>
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
      opacity: ${(props) => (props.clickedToLogin === false)?"1" :"0.7"};
      align-items: center;
      color: #ffffff;
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
      border-color:#52b6ff;
      box-shadow:none;
    `;
    
    const StyledLink = styled(Link)`
      text-align: center;
    `;