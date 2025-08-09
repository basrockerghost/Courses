import React from 'react'
import { useUserContext } from '../../../api/UserProvider'
import { useLocation, useNavigate } from 'react-router-dom';

const Tprolist:React.FC<{ searchText: string }> = ({ searchText }) => {

    const location = useLocation();
    const teacher = location.state?.teacher;

    const {users} = useUserContext();

    const navigate = useNavigate();
    const handleClick = (student: any) => {
        navigate('/student', {state: {student}})
    }
    
    const filterStudents = (searchText: string) => {
        if (!searchText) return teacher.students;
        return teacher.students.filter((student: any) => {
            const studentDetail = users.find((s: any) => s._id === student.studentsId);
            return (
                studentDetail?.personalID.toLowerCase().includes(searchText.toLowerCase()) ||
                studentDetail?.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
                studentDetail?.lastname.toLowerCase().includes(searchText.toLowerCase())
            );
        });
    };

    return (
        <div className="overflow-x-visible rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>StudentID</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                    {teacher.students && filterStudents(searchText).length > 0 ? (
                        filterStudents(searchText).map((student: any) => {
                            const studentDetail = users.find((s: any) => s._id === student.studentsId);
                            return studentDetail ? (
                                <tr onClick={() => handleClick(studentDetail)} className='hover:cursor-pointer hover:text-info' key={studentDetail._id}>
                                    <td>{studentDetail.personalID}</td>
                                    <td>{studentDetail.firstname} {studentDetail.lastname}</td>
                                    <td>{studentDetail.totalCredits}</td>
                                    <td>{studentDetail.GPA}</td>
                                </tr>
                            ) : null;
                        })
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

export default Tprolist