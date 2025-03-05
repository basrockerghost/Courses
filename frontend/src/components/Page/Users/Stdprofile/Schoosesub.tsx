import React from 'react'
import Schooselist from './Schooselist';

interface SchoosesubProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

// admin choose subject in student page
const Schoosesub:React.FC<SchoosesubProps> = ({modalRef}) => {
    return (
        <dialog ref={modalRef} id="student-choose" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">เลือกวิชา</h3>
                <div className='flex flex-col gap-y-2 mt-4'>
                    <Schooselist/>
                </div>
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
        </dialog>
    )
}

export default Schoosesub