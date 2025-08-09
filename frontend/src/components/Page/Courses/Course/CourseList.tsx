import React from 'react'
import Cdropmenu from './Cdropmenu'
// import api from '../../../api/Api'
import { useCourseContext } from '../../../api/CourseProvider';
import ViewDetail from './ViewDetail';

const CourseList:React.FC<{searchText: string}> = ({ searchText }) => {
    const { courses } = useCourseContext();

    const filterCourses = (searchText: string) => {
        if (!searchText) return courses;
        return courses.filter(course =>
            course.CSId.toLowerCase().includes(searchText.toLowerCase()) ||
            course.coursenameTH.toLowerCase().includes(searchText.toLowerCase()) ||
            course.coursenameEN.toLowerCase().includes(searchText.toLowerCase())
        );
    };

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
                    {filterCourses.length > 0 ? (
                        filterCourses(searchText).map(course => (
                            <tr key={course._id}>
                                <td>{course.CSId}</td>
                                <td>{course.coursenameTH}</td>
                                <td>{course.coursenameEN}</td>
                                <td>{course.courseEnd}</td>
                                <td className='flex gap-x-2'>
                                    <ViewDetail courseId={course._id} />
                                    <Cdropmenu courseId={course._id} />
                                </td>
                            </tr>
                        ))  
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4">ไม่พบข้อมูล</td>
                        </tr>
                    )}                  
                </tbody>
            </table>
        </div>
    )
}

export default CourseList