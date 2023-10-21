import { useState } from "react";
import FormSubject from '../data/FormSubject';
import ListSubject from "../data/ListSubject";
import book from "../assets/book.png"

const Subject = () => {
    const [subjectId,setSubjectId] = useState("");
    const getSubjectIdHandler=(id)=>{
        console.log("The ID of document to be edited : ",id);
        setSubjectId(id);
    }
    return (
    
            <FormSubject id={subjectId} setSubjectId={setSubjectId}/>
           
            // {/* <hr style={{border:" 1px dashed black"}}></hr>
            // <div className='col-md-12 mt-5'> 
            //     <div className='section-contentc '>
            //         <ListSubject getSubjectId={getSubjectIdHandler}/> 
            //     </div>
            // </div> */}
       
    );
};
export default Subject;