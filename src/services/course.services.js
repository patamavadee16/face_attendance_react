import {db} from "../firebase-config.js"
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,setDoc,orderBy,query
}from "firebase/firestore";
const courseCollectionRef = collection(db,"course");

class courseDataService{
    addCourse = (newSubject,array) =>{
        // console.log("newSubject :",newSubject);
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
        
        // addDoc(collection(db,"course",newSubject.code,"section",newSubject.sec,),newSubject);
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
        return getDocs(collection(db,"course"));
    };

    getCourse=(id)=>{
        const courseDoc = doc(db,"course",id);
        return getDoc(courseDoc);
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