import  React ,{ useEffect ,useState} from "react";
import {Button} from "react-bootstrap";
import subjectServices from "../services/subject.services";
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
const ListSubject = ({getSubjectId}) => {
    const [subjects,setSubjects]= useState([]);
    useEffect(()=>{
        getSubjects();
    },[]);

    const getSubjects =async()=>{
        const data = await subjectServices.getAllSubjects();
        console.log(data.docs.data);
        setSubjects(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
    };

    const deleteHandler = async(id) =>{
        await subjectServices.deleleSubject(id);
        getSubjects();
    }
    return (
        <div className='table-box 'id="please-scroll" >
            {/* <Button variant="dark edit" onClick={getSubjects}>Refresh List</Button> */}
            <table className="table table-striped" id="subject">
                <thead>
                    <tr height="50px">
                        <th>#</th>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา (ภาษาอังกฤษ)</th>
                        <th>ชื่อวิชา (ภาษาไทย)</th>
                        <th>แก้ไข</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                
                <tbody >
                {subjects.map((doc,index)=>{
                    return(
                        <tr key={doc.id} height="50px">    
                            <td>{index+1}</td>
                            <td>{doc.code}</td>
                            <td>{doc.titleEng}</td>
                            <td>{doc.titleTH}</td>
                            <td>
                                <Button
                                variant="warning"
                                className="edit"
                                onClick={(e) => getSubjectId(doc.id)}
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

export default   ListSubject;