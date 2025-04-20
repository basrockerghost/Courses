import React, { useEffect, useRef, useState } from 'react'
import Cedit from './Cedit';
import { useCourseContext } from '../../../api/CourseProvider';

interface Props {
    courseId: string;
}

const Cdropmenu:React.FC<Props> = ({ courseId }) => {
    
    const { courses, deleteCourse } = useCourseContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const CEdit = () => {
        const course = courses.find(course => course._id === courseId);
        if (course) {
            setSelectedCourse(course);
            modalRef.current?.showModal()
        }
    };

    useEffect(() => {
        if (selectedCourse && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [selectedCourse]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this course?")) {
          deleteCourse(courseId);
        }
    };

    return (
        <div className="dropdown dropdown-left dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm bg-warning/75 text-base-100">More</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm border border-base-content/5">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={CEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete} >Delete</a></li>
            </ul>
            {selectedCourse && <Cedit modalRef={modalRef} course={selectedCourse} />}
        </div>

    )
}

export default Cdropmenu