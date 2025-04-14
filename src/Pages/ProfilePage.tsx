import authenticate from "../Service/authenticate";
import { useParams } from "react-router-dom";
import NavBar from "../Components/NavBar";

const ProfilePage = () => {
    let [token, userId] = authenticate();
    let { id } = useParams();
    return (
        <>
            <NavBar />
            <div>Profile Page {id}</div>
        </>
    );
};

export default ProfilePage;
