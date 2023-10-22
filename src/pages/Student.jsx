import React, { useState } from 'react';
import FormStudent from '../data/FormStudent';
const Student = () => {
    const [ID,setID] = useState("");
    return (
     
            <FormStudent  id={ID} setID={setID}/>
       
    );
};

export default Student;