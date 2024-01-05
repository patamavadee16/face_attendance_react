import {db} from "../firebase-config.js"
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,setDoc,orderBy,query,where,and
}from "firebase/firestore";
const courseCollectionRef = collection(db,"course");

class courseDataService{
    addCourse = (newSubject,array) =>{
        return  addDoc(collection(db, "course"), {
            code: newSubject.code,
            teacher: newSubject.teacherName,
            sec: newSubject.sec,
            titleEng: newSubject.titleEng,
            titleTH: newSubject.titleTH
          }).then(function(docRef) {
            var doc = collection(db,'course',docRef.id,"students");
            var list = newSubject.parsed;
            console.log("add",newSubject.parsed);
            console.log(list,"list");
            list.map((item,index)=>{
                // console.log(item)
                addDoc(doc,item)
                });
            console.log("Document written with ID: ", docRef.id);
            
            
        });
    };
    addListStudent=(array,id)=>{
        console.log(id)
        console.log(array)
        var docRef = collection(db,'course',id,"students");
    return array.map((item,index)=>{
    addDoc(docRef,item)
    })
       
    }
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
        const CollectionRef = collection(db,"course")
        const q = query(CollectionRef, orderBy('code'))
        const querySnapshot = getDocs(q);
        return querySnapshot
    };

    getCourse=(id)=>{
        const courseDoc = doc(db,"course",id);
        return getDoc(courseDoc);
    }

    getValidateCourse = (code , sec) => {
        const courseDoc = collection(db , "course")
        const wCode = where("code" , "==" , code)
        const wSec = where("sec" , "==" , sec)
        const q = query(courseDoc , and(wCode , wSec))
        const get = getDocs(q)
        return get
    }

    getAllStudent=(docId)=>{
        console.log("docId",docId)
        const sectionsCollectionRef = collection(db,"course",docId,"students")
        const q = query(sectionsCollectionRef, orderBy('studentId'))
        const querySnapshot = getDocs(q);
        return querySnapshot
    }
    addStudent = (docId,newStudent) =>{
        return addDoc(collection(db, "course",docId,"students",), {
            name:newStudent.studentName,
            studentId:newStudent.studentId,
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
}
 export default new courseDataService();