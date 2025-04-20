import { useEffect, useRef, useState } from 'react';
import Sedit from './Sedit';
import { useSubjectContext } from '../../../api/SubjectProvider';

interface Props {
    subjectId: string;
}

const Sdropmenu:React.FC<Props> = ({ subjectId }) => {

    const { subjects, deleteSubject } = useSubjectContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<any>(null);

    const SEdit = () => {
        const subject = subjects.find(subject => subject._id === subjectId);
        if (subject) {
            setSelectedSubject(subject);
            modalRef.current?.showModal()
        }
    };

    useEffect(() => {
        if (selectedSubject && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [selectedSubject]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            deleteSubject(subjectId);
        }
    }

    return (
        <div className="dropdown dropdown-left dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={SEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete} >Delete</a></li>
            </ul>
            {selectedSubject && <Sedit modalRef={modalRef} subject={selectedSubject} />}
        </div>

    )
}

export default Sdropmenu