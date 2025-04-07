import React, { useState } from 'react'
import { useCurriculumContext } from '../../../api/Curriculum';

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    curriculum: any;
}

const editCur:React.FC<Props> = ({ modalRef, curriculum }) => {

    const { updateCurriculum, loading, error, success } = useCurriculumContext();;
    const [data, setData] = useState({
        curriculumnameTH: curriculum.curriculumnameTH,
        curriculumnameEN: curriculum.curriculumnameEN,
        status: curriculum.status,
        description: curriculum.description,
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };
    
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateCurriculum(curriculum._id, data);
    }

    return (
        <dialog ref={modalRef} className='modal'>
            <div className='modal-box'>
                <form method='dialog'>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleEdit}>
                    <label htmlFor="curriculumnameTH">ชื่อโครงสร้างหลักสูตร (th)</label>
                    <input type="text" id='curriculumnameTH' className='input input-neutral w-full border-theme ' value={data.curriculumnameTH} onChange={handleChange} />
                    <label htmlFor="curriculumnameEN">ชื่อโครงสร้างหลักสูตร (en)</label>
                    <input type="text" id='curriculumnameEN' className='input input-theme w-full border-theme' value={data.curriculumnameEN} onChange={handleChange} />
                    <label htmlFor="status">สถานะ</label>
                    <select id="status" className="select select-bordered w-full" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })}>
                        <option value="ไม่พร้อมใช้งาน">ไม่พร้อมใช้งาน</option>
                        <option value="ปิดปรับปรุง">ปิดปรับปรุง</option>
                        <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
                    </select>


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

export default editCur