import React, { useRef } from 'react'
import { useCurriculumContext } from '../../../api/Curriculum';

interface Props {
    curId : string;
}

const ViewDetail: React.FC<Props> = ({curId}) => {
    
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const {curriculums} = useCurriculumContext();

    const curriculum = curriculums.find(cur => cur._id === curId);

    const openModal = () => {
        modalRef.current?.showModal();
    }

    return (
        <div>
            <button onClick={openModal} className="btn btn-sm bg-info/75 text-base-100">view</button>
            <dialog ref={modalRef} className="modal">
                <div className='modal-box'>
                    <form method='dialog'>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold mb-3 text-lg">รายละเอียดโครงสร้างหลักสูตร</h3>
                    {curriculum ? (
                        <div className='space-y-2'>
                            <p><strong>ชื่อโครงสร้าง : </strong> {curriculum.curriculumnameTH} </p>
                            <p><strong>ชื่อโครงสร้าง (EN) : </strong> {curriculum.curriculumnameEN} </p>
                            <p><strong>รายละเอียด : </strong> {curriculum.description || 'ไม่มีรายละเอียด'} </p>
                            <p><strong>สถานะ : </strong> {curriculum.status}</p>
                        </div>
                    ) : (
                        <p className='text-error'>ไม่พบหลักสูตร</p>
                    )}
                </div>
            </dialog>
        </div>
    )
}

export default ViewDetail