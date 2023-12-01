import React from 'react';
import { NavLink } from "react-router-dom";
import { SidebarData } from '../data/SideData';
import logo from '../assets/logo.png';
const Sidebar = ({children}) => {
    return (
        <main >
        <div className='container-fluid g-0 sidebar'>
            <div className='row g-0'>
                <div className="col-md-1 navigation-container">
                    <div className='nav-bar '>
                        <ul>
                            {SidebarData.map((item, index) => (
                                <li  activeclassName='active' className='list'>
                                    <NavLink to={item.path} className='link' >
                                        <span className='icon'>{item.icon}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                                
                    </div>
                </div>
                <div className="col-md-11 content-container" >
                <div className='col-md-11 top-bar '>
                        <div className='navbar-icon'>
                            <img src={logo} style={{ width: 80, height: 80 }}/>
                        </div>
                        <div className='navbar-title'>
                            <h2 style={{color:'#A3A09F',marginBottom:'10px'}}>Face Recognition Attendance</h2>
                            <hr style={{border:'solid 2px #D0CECE' ,borderColor:'#D0CECE'}}></hr>
                            <p style={{fontSize:'20px', color:'#A3A09F' }}>Admin</p>
                        </div> 
                    </div>
               
                    {children} 
                </div>
            </div>
        </div>
    </main>

 
    //     <div className="navigation">
    //     <ul>
    //       <li className="list active">
    //         <a href="#">
    //           <span className="icon"><FaBeer /> </span>
    //         </a>
    //       </li>
    //       <li className="list active">
    //         <a href="#">
    //           <span className="icon"><FaBeer /> </span>
    //         </a>
    //       </li>          <li className="list active">
    //         <a href="#">
    //           <span className="icon"><FaBeer /> </span>
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    );
};

export default Sidebar;