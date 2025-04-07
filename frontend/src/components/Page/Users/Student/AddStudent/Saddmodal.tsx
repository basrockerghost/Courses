
import React, { useRef, useState } from 'react'
import Saddform from './Saddform';
import AddUserFile from './AddUserfile';

const Saddmodal:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [isForm, setIsForm] = useState(true)
    
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
                    <div className='flex justify-between items-center'>
                        <h3 className="font-bold text-lg">เพิ่มนักศึกษา</h3>
                        <div className='flex items-center gap-x-2 mr-6'>
                            <p>file</p>
                            <input type="checkbox" defaultChecked className="toggle toggle-sm" onChange={() => setIsForm(prev => !prev)}/>
                            <p>form</p>
                        </div>
                    </div>
                    {isForm ? <Saddform /> : <AddUserFile />  }
                </div>
            </dialog>
        </div>
    )
}

export default Saddmodal