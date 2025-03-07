
import React, { useRef } from 'react'
import Saddform from './Saddform';

const Saddmodal:React.FC = () => {

    // const navigate = useNavigate();

    const modalRef = useRef<HTMLDialogElement | null>(null);
    
        const AddStudent = () => {
            modalRef.current?.showModal();
        };
    
        return (
            <div className='flex flex-rows gap-x-4 items-center'>
                <button className="btn bg-blue-400 text-white rounded-2xl" onClick={AddStudent}>Add +</button>
                <dialog ref={modalRef} id="student-add" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">เพิ่มนักศึกษา</h3>
                        <Saddform/>
                    </div>
                </dialog>
            </div>
        )
}

export default Saddmodal