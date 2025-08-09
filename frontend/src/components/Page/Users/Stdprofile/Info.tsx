import React from 'react'
import { useLocation } from 'react-router-dom'

const Info:React.FC = () => {

    const location = useLocation()
    const student = location.state?.student

    if (!student) {
        return <p>No student found or any error</p>
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Student Info</h1>
            <div className='flex flex-col gap-y-2'>
                <div className='flex gap-x-8'>
                    <p><strong>รหัสนักศึกษา (ID) :</strong> {student.personalID}</p>
                    <p><strong>ชื่อ-นามสกุล (Name-Surname) :</strong> {student.firstname} {student.lastname}</p>
                </div>
                <div className='flex gap-x-8'>
                    <p><strong>หน่วยกิต (Credits) :</strong> {student.totalCredits}</p>
                    <p><strong>GPA :</strong> {student.GPA}</p>
                </div>
                <p><strong>ตำแหน่ง (Role) :</strong> {student.role}</p>
            </div>
        </div>
    )
}

export default Info