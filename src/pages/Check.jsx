import React,{useState,useEffect,useRef} from 'react';
import logo from '../assets/logo.png';
import {Form,Alert,InputGroup,Button,Dropdown} from "react-bootstrap";
import courseServices from '../services/course.services';
// import FormStudent from '../data/FormStudent';
// import studentServices from '../services/student.services'
// import { PiRadioButton } from 'react-icons/pi';


const Check= () => {
  const [subjects,setSubjects]= useState([]);
  useEffect(()=>{
    getCourse();
},[]);

const getCourse =async()=>{
  const data = await courseServices.getAllCourse()
  console.log(data.docs);
  setSubjects(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
};


const [sec,setSec] = useState("");
const [code,setSubjectCode] = useState("");
const [titleTH,setSubjectThai] = useState("");
const subjectHandler = async(id)=>{
    try {
      const docSnap = await courseServices.getCourse(id);
      console.log(id);
      setSubjectCode(docSnap.data().code);
      console.log(docSnap.data().code)
      setSubjectThai(docSnap.data().titleTH);
      setSec(docSnap.data().sec);
      getStudents(id)
      } catch (err) {
        
      }
  }
  //student
  const [students,setStudents]= useState([]);
  const getStudents =async(docId)=>{
    const data = await courseServices.getAllStudent(docId);
    console.log("docID",docId);
    setStudents(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
};

function check() {
  document.getElementById("1").checked = true;
}
function uncheck() {
  document.getElementById("1").checked = false;
}




    return (
       <main >
        <div className='container-fluid g-0 sidebar'>
            <div className='row g-0'>
                <div className="col-md-12 content-container" >
                <div className='col-md-11 top-bar '>                    
                        <div className='navbar-icon'>
                            <img src={logo} style={{ width: 80, height: 80 }}/>
                        </div>

                        <div className='navbar-title'>
                            <h2 style={{color:'#A3A09F',marginBottom:'15px'}}>Face Recognition Attendance</h2>
                            <hr style={{border:'solid 2px #D0CECE' ,borderColor:'#D0CECE'}}></hr>
                            <p style={{fontSize:'20px', color:'#A3A09F' }}>User</p>
                        </div> 
                  </div>
                    
        <div className='container-fluid  container-subject'>
           <div className='col-md-12 title-section mb-3'>
            <div className="row g-0 ">
              <div className='col-md-12 title-box'>               
                <h2 style={{color:'#A3A09F', fontSize:'30px' }}>ตรวจสอบข้อมูลการเข้าเรียน</h2>
              </div>
              
          <div className='col-md-12 row- form-box '>
            <Form className='form-input-subject'>
              <div className='row mt-3 col-md-12'>
                <div className='col-md-3'>   
                  <Form.Group className='input-group-sub' controlId="">
                    <InputGroup className='input-group '>
                      <Form.Control
                      className='input-box'
                      type="text"
                      text = ""
                      placeholder="รายวิชา"
                      value={code}
                      required
                        // onChange={(e) => subjectHandler(e.target.value)}
                      />
                    </InputGroup>
                    <Dropdown 
                    alignRight 
                    title="Dropdown right"
                    id="dropdown-menu-align-right"
                    >
                    <Dropdown.Toggle
                      style={{background:"#AD8E79",borderColor:"#AD8E79"}}  >
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {subjects.map((doc,index)=>{
                      return( 
                        <Dropdown.Item
                        onClick={(e) => subjectHandler(doc.id)} >{doc.code+" " + doc.titleTH+" กลุ่ม "+ doc.sec}
                        </Dropdown.Item>
                        );
                        })}
                    </Dropdown.Menu> 
                    </Dropdown>     
                  </Form.Group>                  
                </div>  

                <div className='col-md-2'>
                  <Form.Group>
                  <InputGroup>
                    <Form.Control
                    className='input-box'
                    placeholder="วัน/เดือน/ปี"
                    type="date"
                    required
                    />
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className='row mt-0 col-md-2'>
                
                  <Button variant="primary" type="Submit" className='input-box' style={{background:"#AD8E79",borderColor:"#AD8E79"}}>
                  บันทึก
                  </Button>
                </div>
              </div>
            </Form>     
          </div>
        </div>
      </div>

      <hr style={{border:" 1px dashed black"}}></hr>
      <div><p style={{fontSize:'20px', color:'#A3A09F' }}>รายวิชา : {code} {titleTH} กลุ่มเรียน {sec} </p>
      </div>
        
      <div className='col-md-12 mt-3'> 
      <div className='section-contentc '>
                    <div className='table-box'>
                    <table className="table table-striped " id="subject">
                            <thead>
                                <tr height="40px">
                                    <th>#</th>
                                    {/* <th>เลขที่</th> */}
                                    <th>รหัสนักศึกษา</th>
                                    <th>ชื่อนามสกุล</th>
                                    <th>แก้ไข</th>
                                    <th>ลบ</th>
                                </tr>
                            </thead>
                            <tbody >
                            {students.map((doc,index)=>{
                                return(
                                    <tr key={doc.id} height="30px">    
                                        <td>{index+1}</td>
                                        <td>{doc.studentId}</td>
                                        <td>{doc.name}</td>
                                        
                                        <td>
                                          <input type='radio' name={doc.id} id='1'checked ></input>                        
                                        </td>
                                        
                                        <td>
                                        <input type='radio'  name={doc.id} id='0'></input>
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
    </div>
    </div>
    </div>
    








    </main>


    );
};

export default Check;