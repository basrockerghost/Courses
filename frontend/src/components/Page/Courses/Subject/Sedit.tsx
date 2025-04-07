import React, { useState } from 'react'
import { useSubjectContext } from '../../../api/SubjectProvider';

interface SEditProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    subject: any;
}

const Sedit:React.FC<SEditProps> = ({modalRef, subject}) => {

    const { updateSubject, loading, error, success } = useSubjectContext();

    const [data, setData] = useState({
        subjectID: subject.subjectID,
        subjectnameTH: subject.subjectnameTH,
        subjectnameEN: subject.subjectnameEN,
        credits: subject.credits,
        description: subject.description,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         setData({ ...data, [e.target.id]: e.target.value });
     };

     const handleEdit = async (e: React.FormEvent) => {
         e.preventDefault();
         await updateSubject(subject._id, data);
     };


    return (
        <dialog ref={modalRef} id="subject-edit" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleEdit}>
                    <label htmlFor="subjectID">รหัสวิชา</label>
                    <input type="text" id='subjectID' className='input input-theme w-full border-theme' value={data.subjectID} onChange={handleChange} />
                    <label htmlFor="name">ชื่อวิชา (th)</label>
                    <input type="text" id='subjectnameTH' className='input input-neutral w-full border-theme ' value={data.subjectnameTH} onChange={handleChange} />
                    <label htmlFor="lastname">ชื่อวิชา (en)</label>
                    <input type="text" id='subjectnameEN' className='input input-theme w-full border-theme' value={data.subjectnameEN} onChange={handleChange} />
                    <label htmlFor="credit">หน่วยกิต</label>
                    <input type="number" id='credits' className='input input-theme w-full border-theme' value={data.credits} onChange={handleChange} />
                    <label htmlFor="description">รายละเอียด</label>
                    <textarea id='description' className='textarea textarea-theme w-full border-theme' value={data.description} onChange={handleChange} />

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {success && <p className="text-green-500 mt-2">{success}</p>}

                    <div className='flex justify-end mt-4 gap-x-4'>
                        <button type='submit' className="btn bg-success text-base-100" disabled={loading}>
                            {loading ? 'Loading...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default Sedit