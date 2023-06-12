import './header.css'
import { NavLink } from "react-router-dom";

function Header(){
   return(
      <div className="Header">
         <div className="name">Zastavnyi course work</div>
         <button className="glow-on-hover">
         <NavLink  to="/"> Home </NavLink>
         </button>
         {/* <div className="B"><NavLink  to="/"> Home </NavLink></div> */}
      </div>
   );
}

export default Header