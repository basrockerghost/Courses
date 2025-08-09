import React from 'react'
import { useLocation } from 'react-router-dom'
import { useUserContext } from '../../api/UserProvider';

const DetailInfo:React.FC = () => {

    const location = useLocation();
    const studentId = location.state?.studentId;

    const { users } = useUserContext();
    const student = users?.find((u: any) => u._id === studentId);
    
    if (!student) {
        return <p>No student Info found or any error</p>
    }

    return (
        <div className='flex justify-between pl-4 pt-6'>
            <div>
                <p className='text-2xl font-bold'>ข้อมูลนักศึกษา</p>
                <div className='flex gap-x-8'>
                    <p className='text-lg'><strong>รหัสนักศึกษา (ID) :</strong> {student.personalID || "No ID"}</p>
                    <p className='text-lg'><strong>ชื่อ-นามสกุล (Name-Surname) :</strong> {student.firstname + " " + student.lastname || "No name"}</p>
                </div>
                <div className='flex gap-x-8'>
                    <p className='text-lg'><strong>หน่วยกิต (Credits) :</strong> {student.totalCredits || "No Credits"}</p>
                    <p className='text-lg'><strong>GPA :</strong> {student.GPA || "No GPA"}</p>
                </div>
                <p className='text-lg'><strong>ตำแหน่ง (Role) :</strong> {student.role || "No role"}</p>
            </div>
        </div>
    )
}

export default DetailInfo