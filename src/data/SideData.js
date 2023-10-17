import React from "react";
import { FaChalkboardTeacher}from "react-icons/fa";
import { BiHome,BiBook ,BiLogIn} from "react-icons/bi";
import { PiStudentBold} from "react-icons/pi";

export const SidebarData = [
  {
    path:"/",
    title:"หน้าแรก",
    icon:<BiHome/>,
    name:"Home"
    },
    {
    path:"/Subject",
    title:"รายวิชา",
    icon:<BiBook/>,
    name:"Subject"
    },
    {
    path:"/Teacher",
    title:"ผู้สอน",
    icon:<FaChalkboardTeacher />,
    name:"Teacher"
    },
    {
    path:"/Course",
    title:"คอร์สเรียน",
    icon:< PiStudentBold/>,
    name:"Course"
    },
    {
    path:"/Each",
    title:"เพิ่มเติม",
    icon:<BiLogIn/>,
    name:"Each"
    },

];