import React, { useRef } from 'react'
import CourseModal from '../Modal/CourseModal';
import { useUserContext } from '../../../api/UserProvider';
import SaveBtn from '../List/SaveBtn';

const Info:React.FC = () => {

    const { user } = useUserContext();

    return (
        <div className='flex justify-between pl-4 pt-6'>
            <div className='flex flex-col gap-y-1.5'>
                <p className='text-2xl font-bold'>ข้อมูลส่วนตัว</p>
                <div className='flex gap-x-8'>
                    <p className='text-lg'><strong>รหัสนักศึกษา (ID) :</strong> {user.personalID || "No ID"}</p>
                    <p className='text-lg'><strong>ชื่อ-นามสกุล (Name-Surname) :</strong> {user.firstname + " " + user.lastname || "No name"}</p>
                </div>
                <div className='flex gap-x-8'>
                    <p className='text-lg'><strong>หน่วยกิต (Credits) :</strong> {user.totalCredits || "0"} </p>
                    <p className='text-lg'><strong>GPA : </strong>{user.GPA?.toFixed(2) || "0.00"}</p>
                </div>
                <p className='text-lg'><strong>ตำแหน่ง (Role) :</strong> {user.role || "No role"}</p>
            </div>
        </div>
    )
}

export default Info