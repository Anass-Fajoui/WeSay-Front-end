import { useNavigate } from "react-router";

function authenticate(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (!token){
        navigate("/login")
    }
    return token;
}

export default authenticate