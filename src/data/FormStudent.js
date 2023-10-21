import  React ,{ useEffect ,useState} from "react";
import subjectServices from '../services/subject.services';
import courseDataService from "../services/course.services"
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import {useParams } from 'react-router-dom';
import book from "../assets/book.png"
import {Form,Alert,InputGroup,Button} from "react-bootstrap";
const FormStudent = ({id,setSubjectId,getCourseId,props}) => {

    const [studentName,setStudentName] = useState("");
    const [studentId,setStudentId] = useState("")
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
    const editHandler = async(docId,id)=>{
      setMessage("");
      try {
        const docSnap = await courseDataService.getStudent(docId,id);
        console.log("the record is:", docSnap.data());
        setStudentName(docSnap.data().name);
        setStudentId(docSnap.data().studentId);
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
    const {docId} = useParams();

    const [students,setStudents]= useState([]);
    const [code,setSubjectCode] = useState("");
    const [titleEng,setSubjectEng] = useState("");
    const [titleTH,setSubjectThai] = useState("");
    useEffect(()=>{
        getStudents();
        getDataCourse();
        
    },[]);

    const getStudents =async()=>{
        const data = await courseDataService.getAllStudent(docId);
        console.log("docID",docId);
        setStudents(data.docs.map((doc => ({...doc.data(),id:doc.id}))));
    };
    const getDataCourse =async()=>{
        const data = await courseDataService.getCourse(docId);
        setSubjectCode(data.data().code);
        setSubjectEng(data.data().titleEng);
        setSubjectThai(data.data().titleTH);
    };

    const deleteHandler = async(id) =>{
        await courseDataService.deleleCourse(id);
        getStudents();
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
        <div className='col-md-4'>
          <Form.Group  controlId="studentName">
            <InputGroup className='input-group'>
              <Form.Control
              className='input-box'
              type="text"
              placeholder="รหัสนักศึกษา"
              value={studentId}
              required
              onChange={(e) => setSubjectCode(e.target.value)}
              />
            </InputGroup>
          </Form.Group></div>
        <div className='col-md-4 '>
          <Form.Group  controlId="studentId">
            <InputGroup className='input-group'>
              <Form.Control
               className='input-box'
               type="text"
               placeholder="ชื่อ นามสกุล"
               value={studentName}
               required
               onChange={(e) => setSubjectEng(e.target.value)}
               />
            </InputGroup>
          </Form.Group>
        </div>
        <div className='col-md-4'>
        <Button variant="primary" type="Submit" className='input-box' style={{background:"#76C6D1",borderColor:"#76C6D1"}}>
            บันทึก
          </Button>
          </div>
      </div>
      <div className='row mt-3'>
        {/* <div className='col-md-6'>
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
        </div> */}
        {/* <div className='col-md-6'>
          <Button variant="primary" type="Submit" className='input-box' style={{background:"#76C6D1",borderColor:"#76C6D1"}}>
            บันทึก
          </Button>
        </div>  */}
      </div>
    </Form>
                    </div>
                </div> 
                <h4>{titleEng}</h4>
                <h4>{titleTH}</h4>
                <h4>{code}</h4>
            

               
            </div>
            <hr style={{border:" 1px dashed black"}}></hr>
            <div className='col-md-12 mt-5'> 
                <div className='section-contentc '>
                <div className='table-box'>
            <table className="table table-striped" id="subject">
                <thead>
                    <tr height="50px">
                        <th>#</th>
                        <th>เลขที่</th>
                        <th>รหัสนักศึกษา</th>
                        <th>ชื่อนามสกุล</th>
                        <th>แก้ไข</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                
                <tbody >
                {students.map((doc,index)=>{
                    return(
                        <tr key={doc.id} height="50px">    
                            <td>{index+1}</td>
                            <td>{doc.no}</td>
                            <td>{doc.studentId}</td>
                            <td>{doc.name}</td>
                            {/* <td>{doc.sec}</td>
                            <td>{doc.teacher}</td> */}
                            {/* <td>        
                                <Link to='/Student'>ตรวจสอบข้อมูล
                                </Link>
                            </td> */}
                            <td>
                                <Button
                                variant="warning"
                                className="edit"
                                onClick={(e) =>editHandler(docId,doc.id)}
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

export default FormStudent ;