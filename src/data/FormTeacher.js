import React,{useState,useEffect} from 'react';
import {Form,Alert,InputGroup,Button,ButtonGroup,Col} from "react-bootstrap";
import teacherServices from '../services/teacher.services';
import  {ListTeacher} from './ListTeacher';
import refreshPage from './ListTeacher'

const FormTeacher = ({id,setTeacherId}) => {
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPasword] = useState("");
  const [message,setMessage] = useState({error:false,msg:""});
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === ""|| username === "" ||password==="" ){
      setMessage({error:true ,msg:"All fields are mandatory!"});
      return ;
    }
    const newTeacher ={
      name,
      username,
      password,
    };
    console.log(newTeacher);
    try {
      if(id !== undefined && id !==""){
        await teacherServices.updateSubject(id,newTeacher);
        setTeacherId("");
        setMessage({error:false,msg:"Update successfully!"});
      }else{
        await teacherServices.addTeacher(newTeacher);
        setMessage({error: false,msg:"added sucessfully!"});
        refreshPage()
        }}catch (err){
      setMessage({error :true,msg:err.message});
      }
      setName("");
      setUsername("");
      setPasword("");
  };
  const editHandler = async()=>{
    setMessage("");
      try {
        const docSnap = await teacherServices.getTeacher(id);
        console.log("the record is:", docSnap.data());
        setName(docSnap.data().name);
        setUsername(docSnap.data().username);
        setPasword(docSnap.data().password);
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
    <div>
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
          <Form.Group  controlId="name">
            <InputGroup className='input-group'>
              <Form.Control
                className='input-box'
                type="text"
                placeholder="ชื่อ นามสกุล"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </div>  
        <div className='col-md-6'>
          <Form.Group  controlId="username">
            <InputGroup className='input-group'>
              <Form.Control
                className='input-box'
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </InputGroup>
          </Form.Group>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-6'>
          <Form.Group  controlId="password">
            <InputGroup>
              <Form.Control
               className='input-box'
               type="text"
               placeholder="password"
               value={password}
               required
               onChange={(e) => setPasword(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </div>
        <div className='col-md-6'>
          <Button variant="primary" type="Submit" className='input-box' >
            Add/ Update
          </Button></div></div>
    </Form>         

    </div>
  );
};
export default FormTeacher;