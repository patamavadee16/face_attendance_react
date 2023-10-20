import  React ,{ useEffect ,useState} from "react";
import {Button} from "react-bootstrap";
import courseDataService from "../services/course.services"
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import {useParams } from 'react-router-dom';
const Student = ({getCourseId,props}) => {
    
    const {docId} = useParams();

    const [students,setStudents]= useState([]);
    const [code,setData]= useState("");
    useEffect(()=>{
        getStudents();
        getDataCourse();
        
    },[]);

    const getStudents =async()=>{
        const data = await courseDataService.getAllStudent(docId);
        console.log("sssss",docId);
        setStudents(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
    };
    const getDataCourse =async()=>{
        const data = await courseDataService.getCourse(docId);
        setData(data.data().code);
    };

    const deleteHandler = async(id) =>{
        await courseDataService.deleleCourse(id);
        getStudents();
    }
    
    return (

        <div className='table-box'>
            <div>
            {code}
               
            </div>
            {/* <Button variant="dark edit" onClick={getSubjects}>Refresh List</Button> */}
            <table className="table table-striped" id="subject">
                <thead>
                    <tr height="50px">
                        <th>#</th>
                        <th>เลขที่</th>
                        <th>รหัสนักศึกษา</th>
                        <th>ชื่อนามสกุล</th>
                        <th>แก้ไข</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                
                <tbody >
                {students.map((doc,index)=>{
                    return(
                        <tr key={doc.id} height="50px">    
                            <td>{index+1}</td>
                            <td>{doc.no}</td>
                            <td>{doc.studentId}</td>
                            <td>{doc.name}</td>
                            {/* <td>{doc.sec}</td>
                            <td>{doc.teacher}</td> */}
                            {/* <td>        
                                <Link to='/Student'>ตรวจสอบข้อมูล
                                </Link>
                            </td> */}
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

export default Student ;