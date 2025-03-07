import React, { useRef } from 'react'
import Theme from './Theme'
import Profile from './profile/Profile';
import { useNavigate } from 'react-router-dom';

const Navbar:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const navigate = useNavigate();


    const openProfile = () => {
        modalRef.current?.showModal();
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // หรือลบจาก sessionStorage
        console.log("Remove token from storage");
        navigate("/login"); // Redirect ไปหน้า Login
      };

    return (
        <div className="navbar md:flex hidden bg-base-100 shadow-sm border-b border-gray-300">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Something</a>
            </div>
            <div className="navbar-end flex gap-x-4">
                <Theme/>
                <div className='dropdown'>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </div>
                    <ul 
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 right-1 p-2 shadow">
                        <li className="list-row">
                            <div className='inline-block'>
                                <div>Name</div>
                                <div className="text-xs font-semibold opacity-60">About</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                        <a role='btn' onClick={openProfile}>
                            Profile
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
            <Profile modalRef={modalRef} />
        </div>
        
    )
}

export default Navbar