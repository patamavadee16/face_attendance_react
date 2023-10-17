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
        <div className='container-fluid  container-subject'>
            <div className='col-md-12 mb-5 title-section '>
              <div className="row g-0 ">
                <div className='col-md-3 title-box'>
                    <div className='title-icon'>
                        <img src={book} style={{ width: 90, height: 90 }}/>
                    </div>
                    <div className='title'>
                        <h2 style={{color:'#A3A09F' }}>รายวิชา</h2>
                    </div> 
                </div>
                <div className='col-md-9 form-box '>
                    <FormSubject id={subjectId} setSubjectId={setSubjectId}/>
                </div>
              </div>
            </div>
            <hr style={{border:" 1px dashed black"}}></hr>
            <div className='col-md-12 mt-5'> 
                <div className='section-contentc '>
                    <ListSubject getSubjectId={getSubjectIdHandler}/> 
                </div>
            </div>
        </div>
    );
};
export default Subject;