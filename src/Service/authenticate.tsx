import { useNavigate } from "react-router";

function authenticate() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (token) {
        const payloadBase64 = token.split(".")[1]; 
        const payloadJson = atob(payloadBase64); 
        const payload = JSON.parse(payloadJson); 

        const userId = payload.id;
        window.localStorage.setItem("userId", userId);
        return [token, userId];
        
    }
    if (!token) {
        navigate("/login");
    }
    return ["", ""]
}

export default authenticate;
