import React, { useRef } from 'react'

const CreateModal:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);

    const CreateCourseModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div className='flex flex-rows gap-x-4 items-center'>
            <label className="input input-sm">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                <input type="search" className="grow" placeholder="Search" />
            </label>
            <button className="btn bg-blue-400 text-white rounded-2xl" onClick={CreateCourseModal}>Create +</button>
            <dialog ref={modalRef} id="course" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">เพิ่มหลักสูตร</h3>
                    <div className='flex flex-col gap-y-2 mt-4'>
                        <label htmlFor="cname">ชื่อหลักสูตร (th)</label>
                        <input type="text" id='cname' className='input input-neutral w-full border-theme ' />
                        <label htmlFor="cnameen">ชื่อหลักสูตร (en)</label>
                        <input type="text" id='cnameen' className='input input-neutral w-full border-theme ' />
                        <label htmlFor="cdescription">หลักสูตรปีการศึกษา</label>
                        <input type="text" id='cdescription' className='input input-theme w-full border-theme' />
                        <div className="modal-action gap-x-4">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <div className='flex gap-x-4'>
                                    <button className="btn">Close</button>
                                    <button className="btn">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default CreateModal