import React, { useRef, useState } from 'react'
import { useSubjectContext } from '../../../api/SubjectProvider';

const Createsubject:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    
    const { addSubject, loading, error, success } = useSubjectContext();

    const [data, setData] = useState({
        subjectID: "",
        subjectnameTH: "",
        subjectnameEN: "",
        credits: "",
        description: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await addSubject({
            subjectID: data.subjectID,
            subjectnameTH: data.subjectnameTH,
            subjectnameEN: data.subjectnameEN,
            credits: Number(data.credits),
            description: data.description,
        });
        
        setData({
            subjectID: "",
            subjectnameTH: "",
            subjectnameEN: "",
            credits: "",
            description: "",
        });
    };

    const CreateSubjectModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div className='flex flex-rows gap-x-4 items-center'>
            <label className="input input-sm">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                <input type="search" className="grow" placeholder="Search" />
            </label>
            <button className="btn bg-blue-400 text-white rounded-2xl" onClick={CreateSubjectModal}>Create +</button>
            <dialog ref={modalRef} id="subject" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">เพิ่มวิชา</h3>
                    <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleAdd}>
                        <label htmlFor="">รหัสวิชา</label>
                        <input type="text" id='subjectID' className='input input-neutral w-full border-theme ' value={data.subjectID} onChange={handleChange} required />
                        <label htmlFor="sname">ชื่อวิชา (th)</label>
                        <input type="text" id='subjectnameTH' className='input input-neutral w-full border-theme ' value={data.subjectnameTH} onChange={handleChange} required />
                        <label htmlFor="snameen">ชื่อวิชา (en)</label>
                        <input type="text" id='subjectnameEN' className='input input-neutral w-full border-theme ' value={data.subjectnameEN} onChange={handleChange} required />
                        <label htmlFor="scredit">หน่วยกิต</label>
                        <input type="number" id='credits' className='input input-neutral w-full border-theme ' value={data.credits} onChange={handleChange} required />
                        <label htmlFor="">description</label>
                        <textarea id='description' className='textarea textarea-neutral w-full border-theme' value={data.description} onChange={handleChange} />

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">{success}</p>}

                        <div className='flex justify-end mt-4 gap-x-4'>
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

export default Createsubject