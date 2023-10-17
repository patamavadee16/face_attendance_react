import  React ,{ useEffect ,useState} from "react";
import {Button} from "react-bootstrap";
import courseDataService from "../services/course.services"
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { Link} from "react-router-dom";
const User = ({getCourseId}) => {
    const [courses,setCourses]= useState([]);
    useEffect(()=>{
        getCourses();
    },[]);

    const getCourses =async()=>{
        const data = await courseDataService.getAllCourse();
        console.log(data.docs.data);
        setCourses(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
    };

    const deleteHandler = async(id) =>{
        await courseDataService.deleleCourse(id);
        getCourses();
    }
    return (
        <div className='container-fluid  container-subject'>
ppppppppppppppppppppp
    </div>
    );
};

export default User;