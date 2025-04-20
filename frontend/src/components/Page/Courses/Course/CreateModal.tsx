import React, { useRef, useState } from 'react'
import { useCourseContext } from '../../../api/CourseProvider';

const CreateModal:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);

    const { addCourse, loading, error, success } = useCourseContext();
    

    const [formData, setFormData] = useState({
        CSId: "",
        coursenameTH: "",
        coursenameEN: "",
        courseStart: "",
        courseEnd: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await addCourse({
            CSId: formData.CSId,
            coursenameTH: formData.coursenameTH,
            coursenameEN: formData.coursenameEN,
            courseStart: Number(formData.courseStart),
            courseEnd: Number(formData.courseEnd),
            description: formData.description,
        });

        // เคลียร์ฟอร์มหลังจากเพิ่มสำเร็จ
        setFormData({
            CSId: "",
            coursenameTH: "",
            coursenameEN: "",
            courseStart: "",
            courseEnd: "",
            description: "",
        });
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
                        <label>รหัสหลักสูตร</label>
                        <input type="text" id='CSId' className='input input-neutral w-full border-theme ' value={formData.CSId} placeholder='Ex. CS-0000' onChange={handleChange} required />
                        <label>ชื่อหลักสูตร (th)</label>
                        <input type="text" id='coursenameTH' className='input input-neutral w-full border-theme ' value={formData.coursenameTH} placeholder='ไทยเท่านั้น' onChange={(e) => {
                            const thOnly = e.target.value.replace(/[^ก-๙\s]/g, "");
                            setFormData({ ...formData, coursenameTH: thOnly });
                        }} required />
                        <label>ชื่อหลักสูตร (en)</label>
                        <input type="text" id='coursenameEN' className='input input-neutral w-full border-theme ' value={formData.coursenameEN} placeholder='อังกฤษเท่านั้น' onChange={(e) => {
                            const enOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                            setFormData({ ...formData, coursenameEN: enOnly });
                        }} required />
                        <label>เริ่มใช้หลักสูตร</label>
                        <select
                            id="courseStart"
                            className="select w-full border-theme"
                            value={formData.courseStart}
                            onChange={handleChange}
                            required
                            >
                            <option value="" disabled={true}>เลือกปี</option>
                            {Array.from({ length: 50 }, (_, i) => {
                                const year = 2560 + i;
                                return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                                );
                            })}
                        </select>
                        <label>จบใช้หลักสูตร</label>
                        <select
                            id="courseEnd"
                            className="select w-full border-theme"
                            value={formData.courseEnd}
                            onChange={handleChange}
                            required
                            >
                            <option value="" disabled={true}>เลือกปี</option>
                            {Array.from({ length: 50 }, (_, i) => {
                                const year = 2560 + i;
                                return (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                                );
                            })}
                        </select>
                        <label>รายละเอียด</label>
                        <textarea id='description' className='textarea textarea-neutral w-full border-theme' value={formData.description} placeholder='รายละเอียดหลักสูตร' onChange={handleChange} />
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">{success}</p>}
                        
                        <div className='flex justify-end mt-4 gap-x-4'>
                            <button type='submit' className="btn bg-info/80 text-base-100" disabled={loading}>
                                {loading ? 'Loading...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default CreateModal