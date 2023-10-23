import  React ,{ useEffect ,useState} from "react";
import courseDataService from "../services/course.services"
import { RiDeleteBinLine} from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import {useParams } from 'react-router-dom';
import student from "../assets/student.png";
import {Form,Alert,InputGroup,Button} from "react-bootstrap";
const FormStudent = ({id,setID}) => {
    const {docId} = useParams();

    // student //
    const [students,setStudents]= useState([]);
    const [studentName,setStudentName] = useState("");
    const [studentId,setStudentId] = useState("")
    const [message,setMessage] = useState({error:false,msg:""});
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      if (studentId === ""|| studentName === ""  ){
        setMessage({error:true ,msg:"กรอกข้อมูลให้ครบ"});
        return ;
      }
      const newStudent ={
        studentId,studentName
      };
      console.log(newStudent);
      try {
        if(id !== undefined && id !==""){
          await courseDataService.updateStudent(docId,id,newStudent);
            setID("");
            setMessage({error:false,msg:"Update successfully!"});
        }else{
          await courseDataService.addStudent(docId,newStudent);
            setMessage({error: false,msg:"added sucessfully!"});
        }}catch (err){
            setMessage({error :true,msg:err.message});
        }
            setSubjectCode("");
            setSubjectEng("");
            setSubjectThai("");
            setID("");
            getStudents();
        };
    const editHandler = async(docId,id)=>{
      setMessage("");
      try {
        const docSnap = await courseDataService.getStudent(docId,id);
        console.log("the record is:", docSnap.data());
        setStudentName(docSnap.data().name);
        setStudentId(docSnap.data().studentId);
        setID(id)
      } catch (err) {
        setMessage({error:true,msg:err.message});
        }
      }
    useEffect(()=>{
      console.log("the id here is : ", id);
      if(id !== undefined && id !== ""){
        editHandler(docId,id);
      }
    },[id]);
    // course //
    const [code,setSubjectCode] = useState("");
    const [titleEng,setSubjectEng] = useState("");
    const [titleTH,setSubjectThai] = useState("");
    const [sec,setSec] = useState("");
    const [teacherName,setTeacherName] = useState("");
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
        setSec(data.data().sec);
        setTeacherName(data.data().teacher)
    };

    const deleteHandler = async(id) =>{
        await courseDataService.deleleStudent(docId,id);
        getStudents();
    }
    // const [query, setQuery] = useState("")

    // function search(e){
    //     e.preventDefault()
    //     setQuery(e.target.value)

    // }
    
    return (
        <div className='container-fluid  container-subject'>
            <div className='col-md-12 mb-3 title-section '>
                 <div className="row g-0 ">
                    <div className='col-md-3 title-box'>
                        <div className='title-icon'>
                            <img src={student} style={{ width: 90, height: 90 }}/>
                        </div>
                        <div className='title'>
                            <h2 style={{color:'#A3A09F' }}>นักศึกษา</h2>
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
                            <div className="row" >
                                <h5  className='col-md-2 '>{code}</h5>
                                <h5 className='col-md-5'>{titleEng}</h5>
                                <h5 className='col-md-5'>{titleTH}</h5>
                    
                            </div>
                            <div className="row" >
                                <h5 className='col-md-2'>กลุ่มที่: {sec}</h5>
                                <h5 className='col-md-5'>อาจารย์ผู้สอน : {teacherName}</h5>
                                <h5 className='col-md-5'>จำนวนนักศึกษา : {students.length}</h5>
                            </div>
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
                                            onChange={(e) => setStudentId(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className='col-md-4 '>
                                    <Form.Group  controlId="studentId">
                                        <InputGroup className='input-group'>
                                            <Form.Control
                                            className='input-box'
                                            type="text"
                                            placeholder="ชื่อ นามสกุล"
                                            value={studentName}
                                            required
                                            onChange={(e) => setStudentName(e.target.value)}
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
                        </Form>
                    </div>
                </div> 
            </div>
            <hr style={{border:" 1px dashed black"}}></hr>
            <div className='col-md-12 mt-3'> 
                <div className='section-contentc '>
                {/* <div className="w-full max-w-xl flex mx-auto p-20 text-xl">
                <input
                type="text"
                className="w-full placeholder-gray-400 text-gray-900 p-4"
                placeholder="Search"
                onChange={search}
                value={query}
            />
            <button className="bg-white p-4">🔍</button>
        </div> */}
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
                                        {/* <td>{doc.no}</td> */}
                                        <td>{doc.studentId}</td>
                                        <td>{doc.name}</td>
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