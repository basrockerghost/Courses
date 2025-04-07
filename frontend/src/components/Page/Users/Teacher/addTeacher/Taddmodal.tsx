import React, { useRef, useState } from 'react'
import AddUserFile from '../../Student/AddStudent/AddUserfile'
import Taddform from './Taddform';

const Taddmodal:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [isForm, setIsForm] = useState(true)

    const AddTeacher = () => {
        modalRef.current?.showModal();
    };

    return (
        <div className='flex flex-rows gap-x-4 items-center'>
            <button className="btn btn-md bg-blue-400 text-white rounded-2xl" onClick={AddTeacher}>Add +</button>
            <dialog ref={modalRef} id="teacher-add" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex justify-between mr-6 items-center'>
                        <h3 className="font-bold text-lg">เพิ่มอาจารย์</h3>
                        <div className='flex items-center gap-x-2 mr-6'>
                            <p>file</p>
                            <input type="checkbox" defaultChecked className="toggle toggle-sm" onChange={() => setIsForm(prev => !prev)}/>
                            <p>form</p>
                        </div>
                    </div>
                    {isForm ? <Taddform /> : <AddUserFile/>}
                </div>
            </dialog>
        </div>
    )
}

export default Taddmodal
