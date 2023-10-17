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
const subjectCollectionRef = collection(db,"subjects");
class SubjectDataService{
    addSubjects = (newSubject) =>{
        return addDoc(subjectCollectionRef,newSubject);
    };

    updateSubject= (id,updateSubject)=>{
        const subjectDoc = doc(db,"subjects",id);
        return updateDoc(subjectDoc,updateSubject);
    };

    deleleSubject=(id)=>{
        const subjectDoc=doc(db,"subjects",id);
        return deleteDoc(subjectDoc);
    }

    getAllSubjects=()=>{
        return getDocs(subjectCollectionRef);
    };

    getSubject=(id)=>{
        const subjectDoc = doc(db,"subjects",id);
        return getDoc(subjectDoc);
    }
}
 export default new SubjectDataService();