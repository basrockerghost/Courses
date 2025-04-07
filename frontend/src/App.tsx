import './App.css'
import { Route, Routes } from 'react-router-dom'
import AdminHome from './components/Home/Home'
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
import Register from './components/Page/Register/Register';
import Curriculum from './components/Page/Courses/Curriculum/curriculum';
import ShowCur from './components/Page/Courses/Curriculum/detail/showCur';
import StdHome from './components/studentPage/Pages/Home/stdHome';


function App() {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<StdHome/>} ></Route>
        <Route path='/' element={<AdminHome/>} >
          <Route path='/dashboard' element={<Dashboard/>} ></Route>
          <Route path='/teachers' element={<Teacher/>} ></Route>
          <Route path='/tprofile' element={<Tprofile/>} ></Route>
          <Route path='/students' element={<Student/>} ></Route>
          <Route path='/sprofile' element={<Sprofile/>} ></Route>
          <Route path='/report' element={<Report/>} ></Route>
          <Route path='/curriculums' element={<Curriculum/> }> </Route>
          <Route path='/curriculum' element={<ShowCur/> }> </Route>
          <Route path='/courses' element={<Course/>} ></Route>
          <Route path='/categories' element={<Category/>} ></Route>
          <Route path='/groups' element={<Group/>} ></Route>
          <Route path='/subjects' element={<Subject/>} ></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
