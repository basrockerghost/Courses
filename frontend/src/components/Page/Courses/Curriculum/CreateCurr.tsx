import React, { useRef, useState } from 'react'
import { useCurriculumContext } from '../../../api/Curriculum';

const CreateCurr:React.FC = () => {

    const { addCurriculum, loading, error, success } = useCurriculumContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const [data, setData] = useState({
        curriculumnameTH: "",
        curriculumnameEN: "",
        status: "ไม่พร้อมใช้งาน",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await addCurriculum({
            curriculumnameTH: data.curriculumnameTH,
            curriculumnameEN: data.curriculumnameEN,
            status: data.status as "ไม่พร้อมใช้งาน" | "ปิดปรับปรุง" | "พร้อมใช้งาน",
        })
        setData({
            curriculumnameTH: "",
            curriculumnameEN: "",
            status: "ไม่พร้อมใช้งาน",
        })
    };

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
                    <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleAdd} >
                        <label htmlFor="curriculumnameTH">ชื่อหลักสูตร (th)</label>
                        <input type="text" id='curriculumnameTH' className='input input-neutral w-full border-theme ' value={data.curriculumnameTH} onChange={handleChange} required/>
                        <label htmlFor="curriculumnameEN">ชื่อหลักสูตร (en)</label>
                        <input type="text" id='curriculumnameEN' className='input input-theme w-full border-theme' value={data.curriculumnameEN} onChange={handleChange} required />
                        
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">{success}</p>}
                        
                        <div className='flex justify-end mt-4 gap-x-4'>
                            <button className="btn">Close</button>
                            <button type='submit' className="btn" disabled={loading}>
                                {loading ? 'Loading...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default CreateCurr