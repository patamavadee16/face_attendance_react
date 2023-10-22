import { useState } from "react";
import FormCourse from '../data/FormCourse';
import ListSubject from "../data/ListSubject";
import book from "../assets/book.png"
import ListCourse from "../data/ListCourse";

const Course = () => {
  const [courseId,setCourseId] = useState("");
  const getCourseIdHandler=(id)=>{
    console.log("The ID of document to be edited : ",id);
    setCourseId(id);
  }
  return (
  
    // <div className='container-fluid  container-subject'>
    //   <div className='col-md-12 title-section mb-5'>
    //     <div className="row g-0 ">
    //       <div className='col-md-3 title-box'>
    //         <div className='title-icon'>
    //           <img src={book} style={{ width: 90, height: 90 }}/>
    //         </div>
    //         <div className='title'>
    //           <h2 style={{color:'#A3A09F' }}>คอร์สเรียน</h2>
    //         </div> 
    //       </div>
    //       <div className='col-md-9 form-box '>
            <FormCourse id={courseId} setCourseId={setCourseId}/>
    //       </div>
    //     </div>
    //   </div>
    //   <hr style={{border:" 1px dashed black"}}></hr>
    //   <div className='mt-5 section-contentc'>
    //       <ListCourse getCourseId={getCourseIdHandler}/> 
    //   </div>
    // </div>
   
    );
};
export default Course ;