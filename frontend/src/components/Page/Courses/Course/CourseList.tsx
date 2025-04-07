import React from 'react'
import Cdropmenu from './Cdropmenu'
// import api from '../../../api/Api'
import { useCourseContext } from '../../../api/CourseProvider';

const CourseList:React.FC = () => {
    const { courses } = useCourseContext();

    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)]">
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
                                <td>{course.CSId}</td>
                                <td>{course.coursenameTH}</td>
                                <td>{course.coursenameEN}</td>
                                <td>{course.courseStart} - {course.courseEnd}</td>
                                <td className="relative w-52">
                                    <Cdropmenu courseId={course._id} />
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