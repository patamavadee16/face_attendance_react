import React,{useState,useEffect} from 'react';
import {Form,Alert,InputGroup,Button,Dropdown,Col} from "react-bootstrap";
import teacherServices from '../services/teacher.services';
import subjectServices from '../services/subject.services';
import courseServices from '../services/course.services';
import {db} from "../firebase-config.js"
import {
    collection,
    addDoc,
}from "firebase/firestore";
const FormCourse = ({id,setCourseId}) => {

  //input file csv//
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();
  const handleOnChange = (e) => {
    // console.log("data file",e.target.files[0])
    setFile(e.target.files[0]);
  };
  const csvFileToArray = string => {
    const strtrim = string.trim();
    const csvHeader = strtrim.slice(0, strtrim.indexOf("\n")).split(",");
    csvHeader[0]="no";
    csvHeader[1]="studentId";
    csvHeader[2]="name";
    const csvRows = strtrim.slice(strtrim.indexOf("\n") + 1).split("\n");
    const array = csvRows.map(row => {
    const values = row.split(",");
    //set data
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
    setArray(array);
    //insert file//
    var docRef = collection(db,'course',`${code}-${sec}`,"students");
    array.map((item,index)=>{
    addDoc(docRef,item)
    })
  };
const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
        console.log(text)
      };
      fileReader.readAsText(file);
    }
  };

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
      console.log(e);
      setSec(e)
    }
    //Cour
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(file)
      setMessage("");
      if (code === ""|| titleEng === "" ||titleTH==="" || teacherName==="" ||sec===""|| file===""){
          setMessage({error:true ,msg:"กรอกข้อมูลให้ครบ"});
          return ;
      }
      const newSubject ={
         code,
         titleEng,
         titleTH,
         teacherName,
         sec,
         file,
         array
      };
      // console.log(newSubject);
      try {
          if(id !== undefined && id !==""){
              await courseServices.updateCourse(id,newSubject);
              setCourseId("");
              setMessage({error:false,msg:"Update successfully!"});
          }else{
              await courseServices.addCourse(newSubject);
              handleOnSubmit(e);
              setMessage({error: false,msg:"บันทึกข้อมูลเรียบร้อย"});
          }}catch (err){
              setMessage({error :true,msg:err.message});
          }
          setSubjectCode("");
          setSubjectEng("");
          setSubjectThai("");
          setSec("");
          setTeacherName("");
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
  return (
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
                  style={{background:"#76C6D1",borderColor:"#76C6D1"}}  >
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      {subjects.map((doc,index)=>{
                      return( 
                        <Dropdown.Item
                        onClick={(e) =>  subjectHandler(doc.id)} >{doc.code}
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
                    required
                        // onChange={(e) => setSubjectEng(e.target.value)}
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
        <Form.Group  controlId="file" className='input-group-sub' >
              <Form.Control
                 className='input-box'
              type="file"

              accept={".csv"}
              onChange={handleOnChange}
              // required
              // onChange={(e) => setSubjectThai(e.target.value)}
              />
              {/* <label className='label-file' ><input  type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange}/>  </label> */}
          </Form.Group>
       
        </div>
        {/* <label for="formFile" class="form-label">Default file input example</label>
        <input class="form-control" type="file" id="formFile"></input>
        <div className='col-md-3'>
              <button className="btn-course"onClick={(e) => {handleOnSubmit(e);}}>IMPORT CSV</button>
        </div> */}
        <div className='col-md-3'>
          <Button variant="primary" type="Submit" className='input-box' >
              Add/ Update
          </Button>
        </div>
      </div>
    </Form>       
  );
};
export default FormCourse;