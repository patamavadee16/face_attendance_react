import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Subject from './pages/Subject.jsx';
import Teacher from './pages/Teacher.jsx';
import Course from './pages/Course.jsx';
import Each from './pages/Each.jsx';
import User from "./pages/User.jsx"
import Student from "./pages/Student"
import Recheck from './pages/Recheck.jsx';
function App() {
  return (
    <div className="App">
  <BrowserRouter>
  {/* <Routes>
  <Route path="/Recheck"element={<Recheck/>}/>
  </Routes> */}

  <Routes>
  {/* <Sidebar> */}
        <Route path="/Recheck"element={<Recheck/>}/>
        <Route path="/"element={<Home/>}/>
        <Route path="/Subject"element={<Subject/>}/>
        <Route path="/Teacher"element={<Teacher/>}/>
        <Route path="/Course"element={<Course/>}/>
        <Route path="/Each"element={<Each/>}/>
        <Route path='/User'element={<User/>}/>
        <Route path='/Student/:docId' element={<Student/>}/>
        {/* </Sidebar> */}
        </Routes>
      
    </BrowserRouter> 
    </div>
  );
}

export default App;
