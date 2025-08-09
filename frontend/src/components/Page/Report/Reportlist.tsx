import React from 'react'
import { useUserContext } from '../../api/UserProvider'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { useSubjectContext } from '../../api/SubjectProvider'

const Reportlist:React.FC = () => {
    
    const {users} = useUserContext();
    const {subjects} = useSubjectContext();

    const students = users.filter((user: any) => user.role === 'student')

    const handleExportSingle = (student: any) => {
        const dataForExcel = (student.subjects || []).map((sub: any) => {
            const subjectDetail = subjects.find((s: any) => s._id === sub.subjectId);
            return {
                Student: `${student.firstname} ${student.lastname}`,
                Subject: subjectDetail ? subjectDetail.subjectnameTH : 'Unknown',
                Grade: sub.grade,
                Credits: sub.credits,
                Description: sub.description
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Student");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, `${student.firstname}_${student.lastname}_report.xlsx`);
    };

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>ชื่อ-นามสกุล</th>
                        <th>จำนวนวิชา</th>
                        <th>หน่วยกิต</th>
                        <th>GPA</th>
                        <th>Export</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student: any) => (
                            <tr key={student._id} className="hover">
                                <th>{student.personalID}</th>
                                <td>{student.firstname} {student.lastname}</td>
                                <td>{student.subjects.length}</td>
                                <td>{student.totalCredits}</td>
                                <td>{student.GPA}</td>
                                <td>
                                    <button onClick={() => handleExportSingle(student)} className='btn btn-ghost btn-sm'>export</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">No Student</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Reportlist