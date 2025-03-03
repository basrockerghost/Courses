import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import { useEffect } from 'react';
import Course from './components/Page/Courses/Course/Course';
import Category from './components/Page/Courses/Category/Category';
import Group from './components/Page/Courses/Group/Group';
import Subject from './components/Page/Courses/Subject/Subject';
import Dashboard from './components/Page/Dashboard/Dashboard';
import Teacher from './components/Page/Users/Teacher/Teacher';
import Student from './components/Page/Users/Student/Student';
import Report from './components/Page/Report/Report';
import Login from './components/Page/Login/Login';
import Tprofile from './components/Page/Users/Teacherprofile/Tprofile';
import Sprofile from './components/Page/Users/Stdprofile/Sprofile';

function App() {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Home/>} >
          <Route path='/dashboard' element={<Dashboard/>} ></Route>
          <Route path='/teachers' element={<Teacher/>} ></Route>
          <Route path='/tprofile' element={<Tprofile/>} ></Route>
          <Route path='/students' element={<Student/>} ></Route>
          <Route path='/sprofile' element={<Sprofile/>} ></Route>
          <Route path='/report' element={<Report/>} ></Route>
          <Route path='/course' element={<Course/>} ></Route>
          <Route path='/category' element={<Category/>} ></Route>
          <Route path='/group' element={<Group/>} ></Route>
          <Route path='/subject' element={<Subject/>} ></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
