import {db} from "../firebase-config.js"
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,setDoc
}from "firebase/firestore";
const courseCollectionRef = collection(db,"course");

class courseDataService{
    addCourse = (newSubject) =>{
        // console.log("newSubject :",newSubject);
        return setDoc(doc(db, "course",`${newSubject.code}-${newSubject.sec}`), {
            code: newSubject.code,
            teacher: newSubject.teacherName,
            sec: newSubject.sec,
            titleEng: newSubject.titleEng,
            titleTH: newSubject.titleTH
          });
        // addDoc(collection(db,"course",newSubject.code,"section",newSubject.sec,),newSubject);
    };

    updateCourse= (id,updateSubject)=>{
        console.log(updateSubject)
        const courseDoc = doc(db,"course",id);
        return updateDoc(courseDoc,{code: updateSubject.code,
            teacher: updateSubject.teacherName,
            sec: updateSubject.sec,
            titleEng: updateSubject.titleEng,
            titleTH:updateSubject.titleTH});
    };

    deleleCourse=(id)=>{
        const courseDoc=doc(db,"course",id);
        return deleteDoc(courseDoc);
    }

    getAllCourse=()=>{
        return getDocs(collection(db,"course"));
    };

    getCourse=(id)=>{
        const courseDoc = doc(db,"course",id);
        return getDoc(courseDoc);
    }
    getAllStudent=(docId)=>{
        console.log("docId",docId)
        return getDocs(collection(db,"course",docId,"students"));
    }
    addStudent = (docId,newStudent) =>{
        return addDoc(collection(db, "course",docId,"students",), {
            name:newStudent.studentName,
            studentId:newStudent.studentId,
            no:"121"
          });
    };
    updateStudent= (docId,id,updateSubject)=>{
        console.log(updateSubject)
        const courseDoc = doc(db,"course",docId,"students",id);
        return updateDoc(courseDoc,{
            name:updateSubject.studentName,
            studentId:updateSubject.studentId

        });
    };
    getStudent=(docId,id)=>{
        const studentDoc = doc(db,"course",docId,"students",id);
        return getDoc(studentDoc);
    }
    deleleStudent=(docId,id)=>{
        const studentDoc=doc(db,"course",docId,"students",id);
        return deleteDoc(studentDoc);
    }
    // getDataCourse=(docId)=>{
    //     console.log("data",docId)
    //     const courseDoc=doc(db,"course",docId);
    //     return getDoc(courseDoc);
    // }

}
 export default new courseDataService();