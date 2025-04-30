import React from 'react'
import Cdropmenu from './Cdropmenu'
// import api from '../../../api/Api'
import { useCourseContext } from '../../../api/CourseProvider';
import ViewDetail from './ViewDetail';

const CourseList:React.FC = () => {
    const { courses } = useCourseContext();

    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)] overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>CSId</th>
                        <th>ชื่อหลักสูตร (th)</th>
                        <th>ชื่อหลักสูตร (en)</th>
                        <th>หลักสูตรถึงปี</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                {courses.length > 0 ? (
                        courses.map(course => (
                            <tr key={course._id}>
                                <td className='w-32'>{course.CSId}</td>
                                <td className='w-96'>{course.coursenameTH}</td>
                                <td className='w-72'>{course.coursenameEN}</td>
                                <td className='w-48'>{course.courseStart} - {course.courseEnd}</td>
                                <td className='w-36'>
                                    <div className='flex items-center gap-x-4'>
                                        <ViewDetail courseId={course._id} />
                                        <Cdropmenu courseId={course._id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                No courses available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CourseList