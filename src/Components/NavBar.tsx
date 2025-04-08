import myAvatar from "../assets/maleUser.png"
import icon from "../assets/twitter.png"
import chat from "../assets/chat1.png"
import {Link} from "react-router-dom"

const NavBar = () => {
  return (
    <div className='navbar'>
        <Link to="/feed" className="logo flex items-center justify-center" style={{textDecoration : "none"}}>
          <img src={chat} alt="" />
          <div className="p-2 text-black font-bold no-underline text-xl">Tweetle</div>
        </Link>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <Link to="/create"><i className="fa-solid fa-square-plus  "></i></Link>
        <div></div>
        <div></div>
        
        <Link to="/profile/1"><img src={myAvatar} alt="avatar" width={30} /></Link>
    </div>
  ) 
}

export default NavBar