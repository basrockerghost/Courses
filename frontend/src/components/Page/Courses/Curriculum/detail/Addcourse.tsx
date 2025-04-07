import React, { useEffect, useRef, useState} from 'react'
import { useCourseContext } from '../../../../api/CourseProvider';
import { useStructureContext } from '../../../../api/StructureProvider';

interface Props {
    curriculumId: string
    curriculum: { courseId: string; subjectId: string[] } | null;
}

const AddSub:React.FC<Props> = ({ curriculumId, curriculum }) => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const { courses } = useCourseContext();
    const { addStructure, structures, error, success } = useStructureContext();

    const [selectedCourse, setSelectedCourse] = useState<string>(curriculum?.courseId || '');

    const handleUpdate = async () => {
        if (!selectedCourse) {
            alert("กรุณาเลือกหลักสูตร");
            return;
        }

        const existingStructure = structures.find(
            (structure) => structure.curriculumId === curriculumId && structure.courseId === selectedCourse 
        );
    
        if (existingStructure) {
            alert('หลักสูตรนี้มีอยู่แล้วในโครงสร้างหลักสูตร');
            return;
        }

        try {
            await addStructure({
                curriculumId, // ใช้ curriculumId ที่รับมา
                courseId: selectedCourse, // ใช้ courseId ที่เลือก
                categories: [] // เริ่มต้นด้วย category ว่าง หรือเพิ่มข้อมูลตามที่ต้องการ
            });

            setSelectedCourse('');

            alert("เพิ่มหลักสูตรสำเร็จ");
            modalRef.current?.close();
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
        }
    };

    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div>
            <button onClick={openModal} className="btn">เพิ่ม/แก้ไขวิชา</button>
            <dialog ref={modalRef} id="course-edit" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => modalRef.current?.close()}>
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">เพิ่มหลักสูตร</h3>

                    <select 
                        value={selectedCourse} 
                        onChange={(e) => setSelectedCourse(e.target.value)} 
                        className="select select-bordered w-full mt-2"
                    >
                        <option value="">-- เลือกหลักสูตร --</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.coursenameTH} {/* หรือ course.title */}
                            </option>
                        ))}
                    </select>

                    {error && (
                        <div className="text-red-500 mt-2">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-500 mt-2">
                            {success}
                        </div>
                    )}
                    

                    <button onClick={handleUpdate} className="btn btn-primary mt-4">บันทึก</button>
                </div>
            </dialog>
        </div>
    )
}

export default AddSub