import React,{useState,useEffect} from 'react';
import {Form,Alert,InputGroup,Button} from "react-bootstrap";
import subjectServices from '../services/subject.services';
import book from "../assets/book.png"
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
const FormSubject = ({id,setSubjectId,getSubjectId}) => {
  const [code,setSubjectCode] = useState("");
  const [titleEng,setSubjectEng] = useState("");
  const [titleTH,setSubjectThai] = useState("");
  // const [flag,ssetFlag] = useState(true);
  const [message,setMessage] = useState({error:false,msg:""});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (code === ""|| titleEng === "" ||titleTH==="" ){
      setMessage({error:true ,msg:"กรอกข้อมูลให้ครบ"});
      return ;
    }
    const newSubject ={
      code,
      titleEng,
      titleTH,
    };
    console.log(id);
    try {
      if(id !== undefined && id !==""){
        await subjectServices.updateSubject(id,newSubject);
          setSubjectId("");
          setMessage({error:false,msg:"Update successfully!"});
          
      }else{
        await subjectServices.addSubjects(newSubject);
          setMessage({error: false,msg:"added sucessfully!"});
      }}catch (err){
          setMessage({error :true,msg:err.message});
      }
          setSubjectCode("");
          setSubjectEng("");
          setSubjectThai("");
          setSubjectId("");
          getSubjects();
      };
  const editHandler = async(id)=>{
    console.log("the id here is : ", id);
    setMessage("");
    try {
      const docSnap = await subjectServices.getSubject(id);
      console.log("the record is:", docSnap.data());
      setSubjectCode(docSnap.data().code);
      setSubjectEng(docSnap.data().titleEng);
      setSubjectThai(docSnap.data().titleTH);
      setSubjectId(id)
    } catch (err) {
      setMessage({error:true,msg:err.message});
      }
    }
  useEffect(()=>{
    console.log("the id here is : ", id);
    if(id !== undefined && id !== ""){
      editHandler(id);
    }
  },[id]);

  // list //
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
    <div className='container-fluid  container-subject'>
      <div className='col-md-12 mb-3 title-section '>
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
            <Form className='form-input-subject' onSubmit={handleSubmit}>
        {message?.msg && (
      <Alert className='col-md-6'
       variant={message?.error ? "danger" : "success"}
       dismissible
       onClose={() => setMessage("")}
      >
        {message?.msg}
       </Alert>
      )}
      <div className='row mt-3'>
        <div className='col-md-6'>
          <Form.Group  controlId="SubjectCode">
            <InputGroup className='input-group'>
              <Form.Control
              className='input-box'
              type="text"
              placeholder="รหัสวิชา"
              value={code}
              required
              onChange={(e) => setSubjectCode(e.target.value)}
              />
            </InputGroup>
          </Form.Group></div>
        <div className='col-md-6 '>
          <Form.Group  controlId="SubjectEng">
            <InputGroup className='input-group'>
              <Form.Control
               className='input-box'
               type="text"
               placeholder="ชื่อวิชา (ภาษาอังกฤษ)"
               value={titleEng}
               required
               onChange={(e) => setSubjectEng(e.target.value)}
               />
            </InputGroup>
          </Form.Group>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-6'>
          <Form.Group  controlId="SubjectThai">
            <InputGroup className='required'>
              <Form.Control
               className='input-box required'
               type="text"
               placeholder="ชื่อวิชา (ภาษาไทย)"
               value={titleTH}
               required
                onChange={(e) => setSubjectThai(e.target.value)}
              />
            </InputGroup>
          </Form.Group>   
        </div>
        <div className='col-md-6'>
          <Button variant="primary" type="Submit" className='input-box' style={{background:"#76C6D1",borderColor:"#76C6D1"}}>
            บันทึก
          </Button>
        </div> 
      </div>
            </Form>
          </div>
        </div>
      </div>
      <hr style={{border:" 1px dashed black"}}></hr>
      <div className='col-md-12 mt-3'> 
        <div className='section-contentc '>
          <div className='table-box 'id="please-scroll" >
              <table className="table table-striped" id="subject">
                <thead>
                    <tr height="40px">
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
                        <tr key={doc.id} height="40px">    
                            <td>{index+1}</td>
                            <td>{doc.code}</td>
                            <td>{doc.titleEng}</td>
                            <td>{doc.titleTH}</td>
                            <td>
                                <Button
                                variant="warning"
                                className="edit"
                                onClick={(e) => editHandler(doc.id)}
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
        </div>
      </div>
    </div>
  );
};
export default FormSubject;