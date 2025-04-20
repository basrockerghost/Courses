import React, { useRef, useState } from 'react'
import { useCurriculumContext } from '../../../api/Curriculum';
import { useUserContext } from '../../../api/UserProvider';

const CourseModal:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const { curriculums } = useCurriculumContext();
    const { selectCurriculum } = useUserContext();

    const [selectedCurriculumId, setSelectedCurriculumId] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurriculumId(e.target.value);
    };

    const handleSave = () => {
        const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;
        console.log("userId:", userId);
        console.log("selectedCurriculumId:", selectedCurriculumId);
        if (userId && selectedCurriculumId) {
            selectCurriculum(userId, selectedCurriculumId);
            alert("Save successfully")
            modalRef.current?.close(); // ปิด modal หลัง save
        }
    };

    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div>
            {/* show structure */}
            
            <button onClick={openModal} className="btn bg-accent text-base-100">เลือกหลักสูตร</button>
            <dialog ref={modalRef} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex flex-col gap-y-4'>
                        <h3 className="font-bold text-lg">เลือกหลักสูตรที่ใช้ศึกษา</h3>
                        <select className='select w-full border-theme' value={selectedCurriculumId} onChange={handleChange}>
                            <option value="" disabled={true}> --- หลักสูตร ---</option>
                            {curriculums.map((curriculum) => (
                                <option key={curriculum._id} value={curriculum._id}>
                                    {curriculum.curriculumnameTH}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-end mt-4'>
                        <button className='btn bg-success/80 text-base-100' onClick={handleSave}>Save</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default CourseModal