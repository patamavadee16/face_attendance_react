import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Subject from './pages/Subject.jsx';
import Teacher from './pages/Teacher.jsx';
import Course from './pages/Course.jsx';
import Each from './pages/Each.jsx';
function App() {
  return (
    <div className="App">
  
  <BrowserRouter>
      <Sidebar>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/Subject"element={<Subject/>}/>
        <Route path="/Teacher"element={<Teacher/>}/>
        <Route path="/Course"element={<Course/>}/>
        <Route path="/Each"element={<Each/>}/>
      </Routes>
      </Sidebar>
    </BrowserRouter> 
    </div>
  );
}

export default App;
