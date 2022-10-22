import { useContext } from "react"
import { UserContext } from "./UserContext"


export default function Hoje(){
    const [userInfo, setUserInfo] = useContext(UserContext)

    return(
        <>Oi
        {console.log(userInfo, "essa é a user info no hoje")}
        </>
        
    )
}