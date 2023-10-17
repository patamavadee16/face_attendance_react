import React,{useState,useEffect} from 'react';
import {Form,Alert,InputGroup,Button} from "react-bootstrap";
import subjectServices from '../services/subject.services';
const FormSubject = ({id,setSubjectId}) => {
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
    console.log(newSubject);
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
      };
  const editHandler = async()=>{
    setMessage("");
    try {
      const docSnap = await subjectServices.getSubject(id);
      console.log("the record is:", docSnap.data());
      setSubjectCode(docSnap.data().code);
      setSubjectEng(docSnap.data().titleEng);
      setSubjectThai(docSnap.data().titleTH);
    } catch (err) {
      setMessage({error:true,msg:err.message});
      }
    }
  useEffect(()=>{
    console.log("the id here is : ", id);
    if(id !== undefined && id !== ""){
      editHandler();
    }
  },[id]);
  return (
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
          <Button variant="primary" type="Submit" className='input-box' >
            Add/ Update
          </Button>
        </div> 
      </div>
    </Form>
  );
};
export default FormSubject;