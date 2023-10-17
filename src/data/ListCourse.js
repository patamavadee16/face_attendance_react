import  React ,{ useEffect ,useState} from "react";
import {Button} from "react-bootstrap";
import courseDataService from "../services/course.services"
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { Link} from "react-router-dom";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Each from '../pages/Each.jsx';
import User from '../pages/User'
const ListCourse = ({getCourseId}) => {
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

        <div className='table-box'>
            {/* <Button variant="dark edit" onClick={getSubjects}>Refresh List</Button> */}
            <table className="table table-striped" id="subject">
                <thead>
                    <tr height="50px">
                        <th>#</th>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา (ภาษาอังกฤษ)</th>
                        <th>ชื่อวิชา (ภาษาไทย)</th>
                        <th>กลุ่มเรียน</th>
                        <th>ผู้สอน</th>
                        <th>รายชื่อนักศึกษา</th>
                        <th>แก้ไข</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                
                <tbody >
                {courses.map((doc,index)=>{
                    return(
                        <tr key={doc.id} height="50px">    
                            <td>{index+1}</td>
                            <td>{doc.code}</td>
                            <td>{doc.titleEng}</td>
                            <td>{doc.titleTH}</td>
                            <td>{doc.sec}</td>
                            <td>{doc.name}</td>
                            <td>        
                            <Link to='../pages/Each.jsx'>
        <button>Click</button>
      </Link>

      <Routes>
        <Route path='../pages/Each.jsx' element={<Each />} />
      </Routes>
                            </td>
                            <td>
                                <Button
                                variant="warning"
                                className="edit"
                                onClick={(e) =>getCourseId(doc.id)}
                                ><GrEdit/>
                                </Button>
                            </td>
                            <td>
                                <Button
                                className="delete"
                                variant="danger"
                                onClick={(e) => deleteHandler(doc.id)}
                                ><RiDeleteBinLine/>
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ListCourse ;