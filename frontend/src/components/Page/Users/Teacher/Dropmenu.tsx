import React, { useEffect, useRef, useState } from 'react'
import Tedit from './Tedit';
import { useUserContext } from '../../../api/UserProvider';

interface Props {
    teacherId: string;
}

const Dropmenu:React.FC<Props> = ({ teacherId  }) => {

    const { users, deleteUser } = useUserContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    
    const TEdit = () => {
        const user = users.find((user) => user._id === teacherId);
        if(user) {
            setSelectedUser(user);
            modalRef.current?.showModal();
        }
    };

    useEffect(() => {
        if (selectedUser && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [selectedUser]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          deleteUser(teacherId);
        }
    };

    return (
        <div className="dropdown dropdown-right ">
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={TEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete} >Delete</a></li>
            </ul>
            {selectedUser && <Tedit modalRef={modalRef} user={selectedUser} />}
        </div>
    )
}

export default Dropmenu