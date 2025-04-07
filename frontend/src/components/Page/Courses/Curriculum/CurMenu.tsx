import React, { useEffect, useRef, useState } from 'react'
import { useCurriculumContext } from '../../../api/Curriculum';
import EditCur from './editCur';

interface Props {
    curId: string;
}

const CurMenu:React.FC<Props> = ({ curId }) => {

    const { curriculums, deleteCurriculum } = useCurriculumContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedCur, setSelectedCur] = useState<any>(null);

    const editForm = () => {
        const curriculum = curriculums.find(curriculum => curriculum._id === curId);
        if(curriculum) {
            setSelectedCur(curriculum);
            modalRef.current?.showModal();
        }
    }

    useEffect(() => {
        if(selectedCur && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [selectedCur])

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this curriculum?")) {
            deleteCurriculum(curId);
        }
    }

    return (
        <div className='dropdown dropdown-left dropdown-end'>
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={editForm} >Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete} >Delete</a></li>
            </ul>
            {selectedCur && <EditCur modalRef={modalRef} curriculum={selectedCur} />}
        </div>
    )
}

export default CurMenu