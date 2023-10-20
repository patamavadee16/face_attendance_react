import React from 'react';
import { useState } from "react";
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
        <div className='container-fluid  container-subject'>
            <div className='col-md-12 title-section mb-5'>
                <div className="row g-0 ">
                    <div className='col-md-3 title-box'>
                        <div className='title-icon'>
                            <img src={teacher} style={{ width: 90, height: 90 }}/>
                        </div>
                        <div className='title'>
                            <h2 style={{color:'#A3A09F' }}>ผู้สอน</h2>
                        </div> 
                    </div>
                    <div className='col-md-9 form-box '>
                        <FormTeacher id={teacherId} setTeacherId={setTeacherId}/>
                    </div>
                </div>
            </div>
            <hr style={{border:" 1px dashed black"}}></hr>
            <div className='col-md-12 mt-1'> 
                <div className='section-content'>
                    <ListTeacher getTeacherId={getTeacherIdHandler}/> 
                </div>
            </div>
        </div>
    );
};
export default Teacher;
