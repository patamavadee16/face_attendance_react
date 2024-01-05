import React, { useState,useEffect} from 'react';
import Sidebar from '../components/Sidebar';
const Each = () => {
   
  
    const [check, setCheck] = useState(false);

    useEffect(() => {
      // This block of code will run after the component renders
      // and after any update to the 'check' state.
      console.log('+' + check);
    }, [check]); // The useEffect hook depends on the 'check' state.
  
    // Updating the state asynchronously
    const updateCheck = () => {
      setCheck(true);
      console.log(check)
    };
    const updateCheck1 = () => {
        setCheck(false);
        console.log(check)
      };
    return (
        <Sidebar>
        <div>
        <button onClick={updateCheck}>Update Check</button>
        <button onClick={updateCheck1}>-Check</button>
        </div>
        </Sidebar>
    );
};

export default Each;