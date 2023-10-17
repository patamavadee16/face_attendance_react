
import React, { useState } from 'react';
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
const Each = () => {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const fileReader = new FileReader();
    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const csvFileToArray = string => {
        const strtrim = string.trim();
        // console.log(strtrim)
      const csvHeader = strtrim.slice(0, strtrim.indexOf("\n")).split(",");
    //   csvHeader[2]="คำนำหน้า";
      csvHeader[2]="ชื่อ";
    //   csvHeader.push("นามสกุล");
      console.log(csvHeader)
      const csvRows = strtrim.slice(strtrim.indexOf("\n") + 1).split("\n");
      const array = csvRows.map(row => {
        const values = row.split(",");
        // values[1]= values[1].trim(); 
        // values[1]=values[1].replace(/\s/g, '')
        // values[2]= values[2].trim();
        // values[2]= values[2].replace(/\s+/g,"_");
        // const name = values[2].split("_");
        // const pre = name[0].startsWith("นาย")?"นาย":"นางสาว"
        // values[2]= pre
        // values[2]= name[0]
        // values[3]= name[1]
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
      setArray(array);
      // console.log(array[1]);
      var docRef = collection(db,'course',"04622201","students");
      array.map((item,index)=>{
        console.log(item)
        addDoc(docRef,item)
      })
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (file) {
          fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text);
          };
          fileReader.readAsText(file);
        }
       
      };
      const headerKeys = Object.keys(Object.assign({}, ...array));
    return (
        <div>
              <label className='label-file' ><input  type={"file"} id={"csvFileInput"} accept={".csv"} onChange={handleOnChange}/>  </label>
              <button className="btn-course"onClick={(e) => {handleOnSubmit(e);}}>IMPORT CSV</button>
              <div className="tabel-box">
                <div className='table-box 'id="please-scroll">

               
              <table className='table'>
                <thead>
                  <tr key={"header"}>{
                    headerKeys.map((key) => (
                    <th>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {array.map((item) => (
                  <tr key={item.id}>
                    {Object.values(item).map((val) => (
                    <td>{val}</td>
                    ))}
                  </tr>
                  ))}
                </tbody>
             </table>
            </div>
        </div> </div>
        
    );
};

export default Each;