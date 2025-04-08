import authenticate from "../Service/authenticate"


const ProfilePage = () => {
  let token = authenticate();
  return (
    <div>Profile Page</div>
  )
}

export default ProfilePage 