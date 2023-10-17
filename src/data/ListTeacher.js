import  React ,{ useEffect ,useState} from "react";
import {Button} from "react-bootstrap";
import teacherServices from '../services/teacher.services';
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

// import 'bootstrap/dist/css/bootstrap.min.css';
const ListTeacher = ({getTeacherId}) => {
    const [subjects,setTeacher]= useState([]);
    useEffect(()=>{
        getTeacher();
    },[]);

    const getTeacher =async()=>{
        const data = await teacherServices.getAllTeacher();
        console.log(data.docs);
        setTeacher(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
    };

    const deleteHandler = async(id) =>{
        await teacherServices.deleleTeacher(id);
        getTeacher();
    }
    return (
        <div className='table-box  overflow-scroll'>
            {/* <Button variant="dark edit" onClick={getSubjects}>Refresh List</Button> */}
            <table className="table table-striped" id="subject">
                <thead>
                    <tr height="50px">
                        <th>#</th>
                        <th>ชื่อ นามสกุล</th>
                        <th> username</th>
                        <th>password</th>
                        <th>แก้ไข</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                
                <tbody >
                {subjects.map((doc,index)=>{
                    return(
                        <tr key={doc.id} height="50px">    
                            <td>{index+1}</td>
                            <td>{doc.name}</td>
                            <td>{doc.username}</td>
                            <td>{doc.password}</td>
                            <td>
                                <Button 
                                variant="warning"
                                className="edit"
                                onClick={(e) => getTeacherId(doc.id)}
                                ><GrEdit/>
                                </Button>
                            </td>
                            <td>
                                <Button
                                variant="danger"
                                className="delete"
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

export default ListTeacher;