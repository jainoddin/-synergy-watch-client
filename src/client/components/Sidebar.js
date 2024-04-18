import React from 'react'
import 'remixicon/fonts/remixicon.css'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isDark }) => {
  const navigate = useNavigate();

  
  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className={`sidebar-components ${isDark ? "dark-mode" : ""}`}>
      <section>
        <div className='container-fluid pl-4  pt-5 a' id='active'>
          <div className='sidebar-content' id='home'>
            <p className='ps'>
              <i class="ri-home-3-fill  pr-3"></i>
              <Link to='/Home' id='q'>
                Home
              </Link>
            </p>
          </div>
          <div className='sidebar-content' id='trending'>
            <p>
             <a><i class="ri-fire-fill pr-3"></i>
              <Link to='/trending' id='q'>
              
                Trending
              </Link></a> 
            </p>
          </div>
          <div className='sidebar-content' id='gamming'>
            <p>
              <i class="ri-discord-fill pr-3"></i>
            <a>  <Link to='/gamming' id='q'>
                Gamming
              </Link></a>
            </p>
          </div>
          <div className='sidebar-content' id='saved'>
            <p>
              <i class="ri-save-fill pr-3"></i>
              <Link to='/saved' id='q'>
                Saved
              </Link>
            </p>
          </div>
          <div className="sidebar_content" onClick={logouthandler} id='btnl'>
            <p>
              <i className="ri-logout-box-line pr-3"></i> Logout
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sidebar