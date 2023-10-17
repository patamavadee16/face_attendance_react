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
        console.log("isssssssssssss",newSubject.code);
        return addDoc(collection(db,"course"),newSubject)
        // addDoc(collection(db,"course",newSubject.code,"section",newSubject.sec,),newSubject);
    };

    updateCourse= (id,updateSubject)=>{
        const courseDoc = doc(db,"course",id);
        return updateDoc(courseDoc,updateSubject);
    };

    deleleCourse=(id)=>{
        const courseDoc=doc(db,"course",id);
        return deleteDoc(courseDoc);
    }

    getAllCourse=()=>{
        return getDocs(courseCollectionRef);
    };

    getCourse=(id)=>{
        const courseDoc = doc(db,"course",id);
        return getDoc(courseDoc);
    }
    getAllCourse=()=>{
        return getDocs(courseCollectionRef);
    };
}
 export default new courseDataService();