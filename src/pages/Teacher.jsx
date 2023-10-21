import React,{useState} from 'react';
import teacher from "../assets/classroom.png";
import FormTeacher from '../data/FormTeacher';
import ListTeacher from '../data/ListTeacher'
const Teacher = () => {
    const [teacherId,setTeacherId] = useState("");
    const getTeacherIdHandler=(id)=>{
        console.log("The ID of document to be edited : ",id);
        setTeacherId(id);
    }
    return (
       
            <FormTeacher id={teacherId} setTeacherId={setTeacherId}/>
          
            // <hr style={{border:" 1px dashed black"}}></hr>
            // <div className='col-md-12 mt-1'> 
            //     <div className='section-content'>
            //         <ListTeacher getTeacherId={getTeacherIdHandler}/> 
            //     </div>
            // </div>
       
    );
};
export default Teacher;
