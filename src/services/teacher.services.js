import {db} from "../firebase-config.js"
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
}from "firebase/firestore";
const teacherCollectionRef = collection(db,"teachers");
class teacherDataService{
    addTeacher = (newSubject) =>{
        return addDoc(teacherCollectionRef,newSubject);
    };

    updateTeacher= (id,updateSubject)=>{
        const teacherDoc = doc(db,"teachers",id);
        return updateDoc(teacherDoc,updateSubject);
    };

    deleleTeacher=(id)=>{
        const teacherDoc=doc(db,"teachers",id);
        return deleteDoc(teacherDoc);
    }

    getAllTeacher=()=>{
        return getDocs(teacherCollectionRef);
    };

    getTeacher=(id)=>{
        const teacherDoc = doc(db,"teachers",id);
        return getDoc(teacherDoc);
    }
}
 export default new teacherDataService();