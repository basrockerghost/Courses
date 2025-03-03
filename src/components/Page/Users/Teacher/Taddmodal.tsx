import React, { useRef } from 'react'

const Taddmodal:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);

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
                    <h3 className="font-bold text-lg">เพิ่มอาจารย์</h3>
                    <div className='flex flex-col gap-y-2 mt-4'>
                        <label htmlFor="name">ชื่อ</label>
                        <input type="text" id='name' className='input input-neutral w-full border-theme ' />
                        <label htmlFor="lastname">นามสกุล</label>
                        <input type="text" id='lastname' className='input input-theme w-full border-theme' />
                        <label htmlFor="tcode">รหัสอาจารย์</label>
                        <input type="tcode" id='tcode' className='input input-theme w-full border-theme' />
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id='password' className='input input-theme w-full border-theme' />
                        <div className="modal-action gap-x-4">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <div className='flex gap-x-4'>
                                    <button className="btn bg-red-400 hover:bg-red-500 text-white">Close</button>
                                    <button className="btn bg-blue-400 hover:bg-blue-500 text-white">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Taddmodal
