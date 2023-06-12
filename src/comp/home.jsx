import './home.css'
import { NavLink } from "react-router-dom";
import video from '../main.mp4'

function Home(){
   return(
      <div className="Home">
         <video className="video" src={video} autoPlay loop muted />
         <div className="color"></div>
         <button className="B" ><NavLink  to="/algo">AVL tree </NavLink></button>
         {/* <div className="B"><NavLink  to="/algo"> AVL tree </NavLink></div> */}
      </div>
   )
}

export default Home