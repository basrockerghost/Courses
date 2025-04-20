import React, { useRef } from 'react'
import { useCourseContext } from '../../../api/CourseProvider';

interface Prop {
    courseId: string;
}


const ViewDetail:React.FC<Prop> = ({ courseId }) => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const { courses } = useCourseContext();

    const courseDetail = courses.find(course => course._id === courseId);

    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div>
            <button onClick={openModal} className="btn btn-sm bg-info/75 text-base-100"> View</button>
            <dialog ref={modalRef} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {courseDetail ? (
                        <div className="space-y-2">
                            <p><strong>ชื่อหลักสูตรไทย:</strong> {courseDetail.coursenameTH}</p>
                            <p><strong>ชื่อหลักสูตรอังกฤษ:</strong> {courseDetail.coursenameEN}</p>
                            <p><strong>ปีเริ่มต้น-จบ:</strong> {courseDetail.courseStart} - {courseDetail.courseEnd}</p>
                            <p><strong>รายละเอียด:</strong> {courseDetail.description || 'ไม่มีรายละเอียด'}</p>
                            {/* เพิ่ม field ตามที่มีใน course */}
                        </div>
                    ) : (
                        <p className="text-error">Course not found.</p>
                    )}
                </div>
            </dialog>
        </div>
    )
}

export default ViewDetail