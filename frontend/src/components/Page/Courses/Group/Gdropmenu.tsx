import { useEffect, useRef, useState } from 'react';
import Gedit from './Gedit';
import { useGroupContext } from '../../../api/GroupProvider';

interface Props {
    groupId: string;
}

const Gdropmenu:React.FC<Props> = ({ groupId }) => {

    const  {groups, deleteGroup} = useGroupContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<any>(null);

    const GEdit = () => {
        const group = groups.find(group => group._id === groupId);
        if (group) {
            setSelectedGroup(group);
            modalRef.current?.showModal()
        }
    };

    useEffect(() => {
        if (selectedGroup && modalRef.current) {
            modalRef.current.showModal(); // เปิด modal ทันทีหลังจาก selectedGroup เปลี่ยนค่า
        }
    }, [selectedGroup]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this group?")) {
            deleteGroup(groupId);
        }
    };



    return (
        <div className="dropdown dropdown-right ">
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={GEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete} >Delete</a></li>
            </ul>
            {selectedGroup && <Gedit modalRef={modalRef} group={selectedGroup} />}
        </div>
    )
}

export default Gdropmenu