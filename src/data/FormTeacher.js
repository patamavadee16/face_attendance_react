import React,{useState,useEffect} from 'react';
import {Form,Alert,InputGroup,Button} from "react-bootstrap";
import teacherServices from '../services/teacher.services';
import teacher from "../assets/classroom.png";
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
const FormTeacher = ({id,setTeacherId,getTeacherId}) => {
  // Form //
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
        await teacherServices.updateTeacher(id,newTeacher);
        setMessage({error:false,msg:"Update successfully!"});
        
      }else{
        await teacherServices.addTeacher(newTeacher);
        setMessage({error: false,msg:"added sucessfully!"});
        }}catch (err){
      setMessage({error :true,msg:err.message});
      }
      setName("");
      setUsername("");
      setPasword("");
      getTeacher();
      setTeacherId("");
  };
  const editHandler = async(id)=>{
    setMessage("");
      try {
        const docSnap = await teacherServices.getTeacher(id);
        console.log("the record is:", docSnap.data());
        setName(docSnap.data().name);
        setUsername(docSnap.data().username);
        setPasword(docSnap.data().password);
        setTeacherId(id)
      } catch (err) {
        setMessage({error:true,msg:err.message});
      }
  }
  // useEffect(()=>{
  //   console.log("the id here is : ", id);
  //     if(id !== undefined && id !== ""){
  //       editHandler();
  //     }
  //   },[id]);
  // List //
  const [teachers,setTeacher]= useState([]);
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
      <div className='col-md-12 mt-1'> 
        <div className='section-content'>
          <div className='table-box '>
            <table className="table table-striped mt-2 table-boxx" id="teacher">
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
                {teachers.map((doc,index)=>{
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
                                onClick={(e) => editHandler(doc.id)}
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
        </div>
      </div>
    </div>
  );
};
export default FormTeacher;