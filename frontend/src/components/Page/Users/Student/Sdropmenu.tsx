import React, { useEffect, useRef, useState } from 'react'
import Sedit from './Sedit';
import { useUserContext } from '../../../api/UserProvider';

interface SdropmenuProps {
    userId: string;
}

const Sdropmenu:React.FC<SdropmenuProps> = ({ userId }) => {

    const { users, deleteUser } = useUserContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const SEdit = () => {
        const user = users.find(user => user._id === userId);
        if (user) {
            setSelectedUser(user);
            modalRef.current?.showModal();
        }
    }

    useEffect(() => {
        if (selectedUser && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [selectedUser]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          deleteUser(userId);
        }
    };


    return (
        <div className="dropdown dropdown-left">
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={SEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete}>Delete</a></li>
            </ul>
            {selectedUser && <Sedit modalRef={modalRef} user={selectedUser} />}
        </div>
    )
}

export default Sdropmenu