import authenticate from "../Service/authenticate"
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  let [token, userId] = authenticate();
  let {id} = useParams();
  return (
    <div>Profile Page {id}</div>
  )
}

export default ProfilePage 