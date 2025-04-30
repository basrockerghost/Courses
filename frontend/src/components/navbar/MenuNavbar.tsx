import React from 'react'

const MenuNavbar:React.FC = () => {
    return (
        <div className="dropdown flex md:hidden dropdown-end">
            <summary tabIndex={0} className="">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </button>
            </summary>
            <ul
                tabIndex={0}
                className="menu dropdown-content left-0 bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/teachers">Teachers</a></li>
                <li><a href="/students">Students</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/groups">Groups</a></li>
                <li><a href="/subjects">Subjects</a></li>
                <li><a href="/curriculums">Curriculums</a></li>
            </ul>
        </div>
    )
}

export default MenuNavbar