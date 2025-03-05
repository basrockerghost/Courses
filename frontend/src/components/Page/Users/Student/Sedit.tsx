import React from 'react'

interface SEditProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

const Sedit:React.FC<SEditProps> = ({modalRef}) => {

    return (
        <dialog ref={modalRef} id="student-edit" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <div className='flex flex-col gap-y-2 mt-4'>
                    <label htmlFor="name">ชื่อ</label>
                    <input type="text" id='name' className='input input-neutral w-full border-theme ' />
                    <label htmlFor="lastname">นามสกุล</label>
                    <input type="text" id='lastname' className='input input-theme w-full border-theme' />
                    <label htmlFor="scode">รหัสนักศึกษา</label>
                    <input type="scode" id='scode' className='input input-theme w-full border-theme' />
                    <div className="modal-action gap-x-4">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <div className='flex gap-x-4'>
                                <button className="btn bg-red-400 hover:bg-red-500 text-white">Close</button>
                                <button className="btn bg-green-400 hover:bg-green-500 text-white">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Sedit