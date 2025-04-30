import React, { useRef } from 'react'
import { useSubjectContext } from '../../../api/SubjectProvider';

interface Props {
    subjectId: string;
}

const ViewDetail: React.FC<Props> = ({ subjectId }) => {
    
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const { subjects } = useSubjectContext();

    const subject = subjects.find((subject) => subject._id === subjectId);

    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div>
            <button onClick={openModal} className="btn btn-sm bg-info/75 text-base-100"> View</button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold mb-3 text-lg">รายละเอียดวิชา</h3>
                    {subject ? (
                        <div className='space-y-2'>
                            <p><strong>รหัสวิชา:</strong> {subject.subjectID}</p>
                            <p><strong>ชื่อวิชา (th):</strong> {subject.subjectnameTH}</p>
                            <p><strong>ชื่อวิชา (en):</strong> {subject.subjectnameEN}</p>
                            <p><strong>หน่วยกิต:</strong> {subject.credits}</p>
                            <p><strong>รายละเอียด:</strong> {subject.description || 'ไม่มีรายละเอียด'}</p>
                        </div>
                    ) : (
                        <p className='text-error'>Subject not found.</p>
                    )}
                </div>
            </dialog>
        </div>
    )
}

export default ViewDetail