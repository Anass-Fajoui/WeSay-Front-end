import myAvatar from "../assets/maleUser.png"
import icon from "../assets/twitter.png"
import {Link} from "react-router-dom"

const NavBar = () => {
  return (
    <div className='navbar'>
        <Link to="/feed" className="logo flex items-center justify-center" style={{textDecoration : "none"}}>
          <img src={icon} alt="" />
          <div className="p-2 text-black font-bold no-underline">Chatterly</div>
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