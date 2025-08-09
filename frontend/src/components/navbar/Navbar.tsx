import React, { useRef } from 'react'
import logo from '../assets/logoคณะ.png'
import Profile from './profile/Profile';
import { useNavigate } from 'react-router-dom';
import MenuNavbar from './MenuNavbar';
import { useUserContext } from '../api/UserProvider';

const Navbar:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const navigate = useNavigate();
    const {user} = useUserContext()

    const openProfile = () => {
        modalRef.current?.showModal();
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // หรือลบจาก sessionStorage
        console.log("Remove token from storage");
        navigate("/login"); // Redirect ไปหน้า Login
      };

    return (
        <div className="navbar bg-base-100 shadow-sm border-b border-gray-300">
            <div className="navbar-start pl-4">
                <MenuNavbar/>
                <div className='flex gap-x-4 items-center'>
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={logo} />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Com-Sci</p>
                    </div>
                </div>
            </div>
            <div className="navbar-end flex gap-x-4">
                <p>user : {user.firstname} {user.lastname}</p>
                <div className="dropdown dropdown-end pr-4">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a role='btn' onClick={openProfile}>
                                Edit profile
                            </a>
                        </li>
                        <li>
                            <a onClick={handleLogout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Profile modalRef={modalRef} />
        </div>
        
    )
}

export default Navbar