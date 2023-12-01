import React, { useState } from 'react';
import FormStudent from '../data/FormStudent';
import Sidebar from '../components/Sidebar';
const Student = () => {
    const [ID,setID] = useState("");
    return (
        <Sidebar>
            <FormStudent  id={ID} setID={setID}/>
            </Sidebar>
    );
};

export default Student;