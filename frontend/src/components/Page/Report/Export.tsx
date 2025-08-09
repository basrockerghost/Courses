import React, { useRef } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { useUserContext } from '../../api/UserProvider';
import { useSubjectContext } from '../../api/SubjectProvider';

const Export:React.FC = () => {

    const { users } = useUserContext();
    const { subjects } = useSubjectContext();

    const students = users.filter((user: any) => user.role === 'student');

    const handleExportAll = () => {
        const dataForExcel = students.flatMap((student: any) =>
            (student.subjects || []).map((sub: any) => {
                const subjectDetail = subjects.find((s: any) => s._id === sub.subjectId);
                return {
                    นักศึกษา: `${student.firstname} ${student.lastname}`,
                    วิชา: subjectDetail ? subjectDetail.subjectnameTH : 'Unknown',
                    เกรด: sub.grade,
                    หน่วยกิต: sub.credits,
                    หมายเหตุ: sub.description
                };
            })
        );

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "All Students");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'all_students_report.xlsx');
    };

    return (
        <div>
            <button onClick={handleExportAll} className='btn bg-info/75 text-base-100'>รายงานทั้งหมด</button>
        </div>
    )
}

export default Export