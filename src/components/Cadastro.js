import logo from "./img/logo"
import styled from "styled-components";

export default function Cadastro(){


    function trySingIn(){

    }
    return (
    //     <ScreenContainer>
    //       <img src={logo} alt="logo" />
    //       <LoginContainer>
    //         <form onSubmit={trySingIn}>
    //           <input
    //             type="email"
    //             id="emailField"
    //             value={userEmail}
    //             onChange={(e) => setUserEmail(e.target.value)}
    //             placeholder="email"
    //             required
    //           />
    //           <input
    //             type="password"
    //             id="passwordField"
    //             value={userPassword}
    //             onChange={(e) => setUserPassword(e.target.value)}
    //             placeholder="senha"
    //             required
    //           />
    //           <ButtonContainer clickedToLogin={clickedToLogin} type="submit" disabled={clickedToLogin}>
    //             {clickedToLogin === false ? (
    //               "Entrar"
    //             ) : (
    //               <ThreeDots
    //                 height="80"
    //                 width="80"
    //                 radius="9"
    //                 color="#ffffff"
    //                 ariaLabel="three-dots-loading"
    //                 wrapperStyle={{}}
    //                 wrapperClassName=""
    //                 visible={true}
    //               />
    //             )}
    //           </ButtonContainer>
    //         </form>
    //         <StyledLink to="/cadastro">
    //           <h1>Não tem uma conta? Cadastre-se!</h1>
    //         </StyledLink>
    //       </LoginContainer>
    //     </ScreenContainer>
    //   );
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