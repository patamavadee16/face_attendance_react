import React,{useState,useEffect,useRef} from 'react';
import {Form,Alert,InputGroup,Button,Dropdown} from "react-bootstrap";
import teacherServices from '../services/teacher.services';
import subjectServices from '../services/subject.services';
import courseServices from '../services/course.services';
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import book from "../assets/book.png";
import { Link} from "react-router-dom";
// import * as d3 from 'd3';
const FormCourse = ({id,setCourseId,getCourseId}) => {

// csv handile // 
const [ parsed, setParsed ] = useState({});
// const [array, setArray] = useState([]);
  const uploadFile = useRef(null);
  useEffect(()=>{
    console.log(parsed[1]);
  },[parsed])
  const handleFiles = () => {
    console.log(uploadFile.current.files);
    (async ()=>{
      console.log('uploaded!');
        const text = await uploadFile.current.files[0].text();
        // const data = await d3.csvParse(text);
        csvFileToArray(text)
    })();
  }
  // const [file, setFile] = useState();
  // const fileReader = new FileReader();
  // const handleOnChange = (e) => {
  // console.log("data file",e.target.files[0])
  //   setFile(e.target.files[0]);
  // };
  const csvFileToArray = string => {
    const strtrim = string.trim();
    const csvHeader = strtrim.slice(0, strtrim.indexOf("\n")).split(",");
    csvHeader[0]="no";
    csvHeader[1]="studentId";
    csvHeader[2]="name";
    const csvRows = strtrim.slice(strtrim.indexOf("\n") + 1).split("\n");
    const array = csvRows.map(row => {
    const values = row.split(",");
    //set data //
    values[1]= values[1].trim(); 
    values[1]=values[1].replace(/\s/g, '')
    values[2]= values[2].trim();
    values[2]= values[2].replace(/\s+/g," ");
    // const name = values[2].split("_");
    // values[2]= name[0]
    // values[3]= name[1]
    const obj = csvHeader.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return obj;
    });
    setParsed(array);
    // console.log(array)
    //insert file//
    // courseServices.addListStudent(array,id)
    
    // var docRef = collection(db,'course','MlNA7NegYhn1kHk17Ugu',"students");
    // array.map((item,index)=>{
    // addDoc(docRef,item)
    // })
  };
// const handleOnSubmit = (e) => {
//     e.preventDefault();
//     if (file) {
//       fileReader.onload = function (event) {
//         const text = event.target.result;
//         csvFileToArray(text);
//       };
//       fileReader.readAsText(file);
//     }
//   };

  //Teacher//
  const [teacherName,setTeacherName] = useState("");
  const [teacher,setTeacher]= useState([]);
    useEffect(()=>{
        getTeacher();
    },[]);

  const getTeacher =async()=>{
    const data = await teacherServices.getAllTeacher();
    console.log(data.docs);
    setTeacher(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
  };
  const teacherHandler = async(id)=>{
    setMessage("");
    try {
      const docSnap = await teacherServices.getTeacher(id);
      console.log("the record is:", docSnap.data());
      setTeacherName(docSnap.data().name);
    } catch (err) {
      setMessage({error:true,msg:err.message});
      }
  }

  //subject//
  const [subjects,setSubjects]= useState([]);
  useEffect(()=>{
      getSubjects();
  },[]);
  const getSubjects =async()=>{
    const data = await subjectServices.getAllSubjects();
    console.log(data.docs);
    setSubjects(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
  };

  const [code,setSubjectCode] = useState("");
  const [titleEng,setSubjectEng] = useState("");
  const [titleTH,setSubjectThai] = useState("");
  const [message,setMessage] = useState({error:false,msg:""});
  const subjectHandler = async(id)=>{
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

  //section//
  const [sec,setSec] = useState("");
  const handleSelect=(e)=>{
  // console.log(e);
    setSec(e)
    //เพิ่ม
    validateSubject(refCode.current.value , e)
  }
 //Course
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (code === ""|| titleEng === "" ||titleTH==="" || teacherName==="" ||sec===""|| uploadFile===""){
      setMessage({error:true ,msg:"กรอกข้อมูลให้ครบ"});
      return ;
    }
    const newSubject ={
      code,
      titleEng,
      titleTH,
      teacherName,
      sec,
      // file,
      parsed
    };
    try {
      if(id !== undefined && id !==""){
        await courseServices.updateCourse(id,newSubject);
        courseServices.addListStudent(parsed,id)
        setCourseId("");
        setMessage({error:false,msg:"Update successfully!"});
    
      }else{
        await courseServices.addCourse(newSubject);
        setMessage({error: false,msg:"บันทึกข้อมูลเรียบร้อย"});
      }}catch (err){
          setMessage({error :true,msg:err.message});
      }
        setSubjectCode("");
        setSubjectEng("");
        setSubjectThai("");
        setSec("");
        setTeacherName("");
        uploadFile.current.value = null;
        getCourses()
        setCourseId("");
      };
      const editHandler = async(id)=>{
        setMessage("");
          try {
            const docSnap = await courseServices.getCourse(id);
            console.log("the record is:", docSnap.data());
            setSubjectCode(docSnap.data().code);
            setSubjectEng(docSnap.data().titleEng);
            setSubjectThai(docSnap.data().titleTH);
            setSec(docSnap.data().sec);
            setTeacherName(docSnap.data().teacher);
            setCourseId(id)
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


        // List //
  const [courses,setCourses]= useState([]);
  useEffect(()=>{
    getCourses();
  },[]);
    
  const getCourses =async()=>{
    const data = await courseServices.getAllCourse();
    console.log(data.docs.data);
    setCourses(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
  };
    
  const deleteHandler = async(id) =>{
    await courseServices.deleleCourse(id);
    getCourses();
  }
  //แจ้งเตือนเมื่อรายวิชานี้มีกลุ่มเรียนนี้อยู่แล้ว
  const refCode = useRef()
  const refSec = useRef()
  const validateSubject = async (code , sec) => {
    const validate = await courseServices.getValidateCourse(code , sec)
    if(validate.docs.map((doc) => ({ ...doc.data() })).length) alert("มีคอร์สเรียนนี้อยู่แล้ว")
  }

  return (
    <div className='container-fluid  container-subject'>
      <div className='col-md-12 title-section mb-3'>
        <div className="row g-0 ">
          <div className='col-md-3 title-box'>
            <div className='title-icon'>
              <img src={book} style={{ width: 90, height: 90 }}/>
            </div>
            <div className='title'>
              <h2 style={{color:'#A3A09F' }}>คอร์สเรียน</h2>
            </div> 
          </div>
          <div className='col-md-9 form-box '>
            <Form className='form-input-subject' onSubmit={handleSubmit}>
              {message?.msg && (
              <Alert className='col-md-3'
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
              >
              {message?.msg}
              </Alert>
              )}
              <div className='row mt-3'>
                <div className='col-md-3'>              
                  <Form.Group className='input-group-sub' controlId="code">
                    <InputGroup className='input-group '>
                      <Form.Control
                      className='input-box'
                      type="text"
                      placeholder="รหัสวิชา"
                      value={code}
                      ref={refCode}
                      required
                        onChange={(e) => {                       
                          // setSubjectEng(e.target.value)
                          validateSubject(e.target.value , refSec.current.value)
                        }}
                      />
                    </InputGroup>
                    <Dropdown 
                    alignRight 
                    title="Dropdown right"
                    id="dropdown-menu-align-right"
                    >
                    <Dropdown.Toggle
                      style={{background:"#76C6D1",borderColor:"#76C6D1"}}  >
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {subjects.map((doc,index)=>{
                      return( 
                        <Dropdown.Item
                          onClick={(e) =>  {
                            subjectHandler(doc.id)
                            validateSubject(doc.code , refSec.current.value)
                          }} >
                            {doc.code}
                        </Dropdown.Item>
                        );
                        })}
                    </Dropdown.Menu> 
                    </Dropdown>     
                  </Form.Group>
                </div>  
                <div className='col-md-3'>
                  <Form.Group  controlId="titleEng">
                    {/* <InputGroup className='input-group'> */}
                    <Form.Control
                    className='input-box'
                    // type="text"
                    placeholder="ชื่อวิชา (ภาษาอังกฤษ)"
                    value={titleEng}
                    required
                    // onChange={(e) => setSubjectThai(e.target.value)}
                    />
                    {/* </InputGroup> */}
                  </Form.Group>
                </div>
                <div className='col-md-4'>
                  <Form.Group  controlId="titleTH">
                    {/* <InputGroup> */}
                    <Form.Control
                    className='input-box'
                    // type="text"
                    placeholder="ชื่อวิชา (ภาษาไทย)"
                    value={titleTH}
                    required
                    // onChange={(e) => setSubjectThai(e.target.value)}
                    />
                    {/* </InputGroup> */}
                  </Form.Group>
                </div>
                <div className='col-md-2'>              
                  <Form.Group className='input-group-sub' controlId="sec">
                    <InputGroup className='input-group '>
                      <Form.Control
                      className='input-box'
                      type="text"
                      placeholder="กลุ่มเรียน"
                      value={sec}
                      ref={refSec}
                      required
                        onChange={(e) => {
                          // setSubjectEng(e.target.value)
                          validateSubject(refCode.current.value , e.target.value)
                        }}
                      />
                    </InputGroup>
                    <Dropdown 
                      alignRight 
                      title="Dropdown right"
                      id="dropdown-menu-align-right"
                      onSelect={handleSelect}
                      >
                    <Dropdown.Toggle
                      style={{background:"#76C6D1",borderColor:"#76C6D1"}}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey={1}>1</Dropdown.Item>
                      <Dropdown.Item eventKey={2}>2</Dropdown.Item>
                    </Dropdown.Menu> 
                    </Dropdown>     
                  </Form.Group>
                </div>  
              </div>
              <div className='row mt-3'>
                <div className='col-md-3'>              
                  <Form.Group className='input-group-sub' controlId="code">
                    <InputGroup className='input-group '>
                      <Form.Control
                      className='input-box'
                      type="text"
                      placeholder="ชื่อผู้สอน"
                      value={teacherName}
                      required
                        // onChange={(e) => setSubjectEng(e.target.value)}
                      />
                    </InputGroup>
                    <Dropdown 
                    alignRight 
                    title="Dropdown right"
                    id="dropdown-menu-align-right"
                    >
                    <Dropdown.Toggle
                      style={{background:"#76C6D1",borderColor:"#76C6D1"}}>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {teacher.map((doc,index)=>{
                      return( 
                        <Dropdown.Item
                        onClick={(e) =>  teacherHandler(doc.id)} >{doc.name}
                        </Dropdown.Item>
                        );
                        })}
                    </Dropdown.Menu> 
                    </Dropdown>     
                  </Form.Group>
                </div> 
                <div className='col-md-3'>
                  <Form.Group  controlId="uploadFile" className='input-group-sub' >
                    <Form.Control
                    className='input-box'
                    type="file"
                    ref={uploadFile}

                    accept={".csv"}
                    onChange={handleFiles}
                    // required
                    // onChange={(e) => setSubjectThai(e.target.value)}
                    />
                    {/* <label className='label-file' ><input  type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange}/>  </label> */}
                  </Form.Group>
                </div>
                <div className='col-md-3'>
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
      <div className='mt-3 section-contentc'>
      <div className='table-box'>
            {/* <Button variant="dark edit" onClick={getSubjects}>Refresh List</Button> */}
            <table className="table table-striped" id="subject">
                <thead>
                    <tr height="40px">
                        <th>#</th>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา (ภาษาอังกฤษ)</th>
                        <th>ชื่อวิชา (ภาษาไทย)</th>
                        <th>กลุ่มเรียน</th>
                        <th>ผู้สอน</th>
                        <th>รายชื่อนักศึกษา</th>
                        <th>แก้ไข</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                
                <tbody >
                {courses.map((doc,index)=>{
                    return(
                        <tr key={doc.id} height="40px">    
                            <td>{index+1}</td>
                            <td>{doc.code}</td>
                            <td>{doc.titleEng}</td>
                            <td>{doc.titleTH}</td>
                            <td>{doc.sec}</td>
                            <td>{doc.teacher}</td>
                            <td>        
                                <Link to={`/Student/${doc.id}`}>ตรวจสอบข้อมูล
                                </Link>
                            </td>
                            <td>
                                <Button
                                variant="warning"
                                className="edit"
                                onClick={(e) =>editHandler(doc.id)}
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
    
  );
};
export default FormCourse;