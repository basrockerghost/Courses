import React from 'react'
import Dropmenu from './Dropmenu'
import { useUserContext } from '../../../api/UserProvider'
import { useNavigate } from 'react-router-dom';

// Teacher list
const Tlist:React.FC<{ searchText: string }> = ({ searchText }) => {

    const { users } = useUserContext();
    const teachers = users.filter((user: any) => user.role === 'teacher')

    const navigate = useNavigate();
    const handleRowClick = (teacher: any) => {
        navigate('/teacher', {state: {teacher}});
    }

    const filterTeachers = (searchText: string) => {
        if (!searchText) return teachers;
        return teachers.filter((teacher: any) =>
            teacher.personalID.toLowerCase().includes(searchText.toLowerCase())
                || teacher.firstname.toLowerCase().includes(searchText.toLowerCase())
                || teacher.lastname.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>TeacherID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {filterTeachers(searchText).length > 0 ? (
                        filterTeachers(searchText).map((teacher: any) => (
                            <tr onClick={() => handleRowClick(teacher)} className='hover:cursor-pointer hover:bg-base-200' key={teacher._id}>
                                <td>{teacher.personalID}</td>
                                <td>{teacher.firstname} {teacher.lastname}</td>
                                <td>{teacher.role}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Dropmenu teacherId={teacher._id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4">ไม่พบข้อมูล</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Tlist