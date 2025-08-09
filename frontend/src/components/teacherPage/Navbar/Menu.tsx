import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileModal from '../../studentPage/Pages/Modal/ProfileModal';

const Menu: React.FC = () => {

    const navigate = useNavigate();
    const modalRef = React.useRef<HTMLDialogElement | null>(null);

    const openModal = () => {
        modalRef.current?.showModal();
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // หรือลบจาก sessionStorage
        localStorage.removeItem("user");
        console.log("Remove token and user from storage");
        navigate("/login"); // Redirect ไปหน้า Login
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </button>
            </div>
            <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                {/* <ProfileModal/> */}
                <li><a className='hover:bg-accent hover:text-white' onClick={openModal}>Edit Profile</a></li>
                <li><a className='hover:bg-error hover:text-white' onClick={handleLogout}>Logout</a></li>
            </ul>
            <ProfileModal modalRef={modalRef}/>
        </div>
    )
}

export default Menu