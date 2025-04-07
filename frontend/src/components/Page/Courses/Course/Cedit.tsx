import React, { useState } from 'react'
import { useCourseContext } from '../../../api/CourseProvider';

interface CEditProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    course: any;
}

const Cedit:React.FC<CEditProps> = ({modalRef, course}) => {

    const { updateCourse, loading, error, success } = useCourseContext();
    
    const [data, setData] = useState({
        CSId: course.CSId,
        coursenameTH: course.coursenameTH,
        coursenameEN: course.coursenameEN,
        courseStart: course.courseStart,
        courseEnd: course.courseEnd,
        description: course.description,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateCourse(course._id, data);
    };

    return (
        <dialog ref={modalRef} id="course-edit" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <form  className='flex flex-col gap-y-2 mt-4' onSubmit={handleEdit}>
                    <label htmlFor="CSId">รหัสหลักสูตร</label>
                    <input type="text" id='CSId' className='input input-theme w-full border-theme' value={data.CSId} onChange={handleChange} />
                    <label htmlFor="name">ชื่อหลักสูตร (th)</label>
                    <input type="text" id='coursenameTH' className='input input-neutral w-full border-theme ' value={data.coursenameTH} onChange={handleChange} />
                    <label htmlFor="lastname">ชื่อหลักสูตร (en)</label>
                    <input type="text" id='coursenameEN' className='input input-theme w-full border-theme' value={data.coursenameEN} onChange={handleChange} />
                    <label htmlFor="year">ปีที่เริ่ม</label>
                    <input type="number" id='courseStart' className='input input-theme w-full border-theme' value={data.courseStart} onChange={handleChange} />
                    <label htmlFor="courseEnd">ปีสิ้นสุด</label>
                    <input type="number" id='courseEnd' className='input input-theme w-full border-theme' value={data.courseEnd} onChange={handleChange} />
                    <label htmlFor="description">รายละเอียด</label>
                    <textarea id='description' className='textarea textarea-theme w-full border-theme' value={data.description} onChange={handleChange} />

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {success && <p className="text-green-500 mt-2">{success}</p>}

                    <div className='flex justify-end mt-4 gap-x-4'>
                        <button type='submit' className="btn bg-success text-base-100" disabled={loading}>
                            {loading ? 'Loading...' : 'Save'}
                        </button>
                    </div>
                </form >
            </div>
        </dialog>

    )
}

export default Cedit