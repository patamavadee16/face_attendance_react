import React from 'react';
import { Link} from "react-router-dom";
import book from "../assets/book.png";
import course from "../assets/course.png";
import teacher from "../assets/classroom.png";
import Sidebar from '../components/Sidebar';
const Home = () => {
    const menuItem =[
        {
            path:"/Subject",
            title:"รายวิชา",
            Image:book,
            name:"subject"
        },
        {
            path:"/Teacher",
            title:"ผู้สอน",
            Image:teacher,
            name:"teacher"
        },
        {
            path:"/Course",
            title:"คอร์สเรียน",
            Image:course,
            name:"course"
        },
        {
            path:"/Each",
            title:"เพิ่มเติม",
            Image:course,
            name:"each"
        },
        ]
    return (
        <Sidebar>
        <div className='container-fluid g-0 container-home'>
            <div className='row g-0'>
            {menuItem.map((item, index)=>(
                <Link to={item.path} key={index} className="  col-md-3 menu-home " activeclassName="active-home" >
                    <div className=' menu-box '>
                        <div className='icon-home'>
                            <img className='img-home 'src={item.Image} alt="" style={{height:'70px',width:'70px'}}/>
                        </div>
                        <div className='title' style={{fontSize:'25px'}}>{item.title} </div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
        </Sidebar>
    );
};

export default Home;