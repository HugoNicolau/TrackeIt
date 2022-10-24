import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Header(props){
const navigate = useNavigate();
function returnToLogin(){

    navigate("/")
}
    return(
        <HeaderContainer>
        <h1 onClick={()=> returnToLogin()}>TrackIt</h1>
        <ImageContainer data-identifier="avatar" src={props.userInfo.image}/>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
box-sizing:border-box;
position:fixed;
height: 70px;
width: 100vw;
left: 0px;
top: 0px;
border-radius: 0px;
box-shadow: 0px 4px 4px 0px #00000026;
background-color: #126BA5;
padding-left:18px;
padding-right:18px;
display:flex;
align-items:center;
justify-content:space-between;
z-index:3;


h1{
    font-family: Playball;
font-size: 39px;
font-weight: 400;
line-height: 49px;
letter-spacing: 0em;
text-align: left;
color:white;

}

`

const ImageContainer = styled.img`
border-radius:50%;
width:51px;
height:51px;
`