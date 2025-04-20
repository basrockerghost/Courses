import React, { useRef } from 'react'
import CourseModal from '../Modal/CourseModal';
import { useUserContext } from '../../../api/UserProvider';

const Info:React.FC = () => {

    const { user } = useUserContext();

    // const totalCredits = user?.subjects?.reduce((acc: number, subject: any) => acc + subject.credits, 0) || 0;

    return (
        <div className='flex justify-between pl-4 pt-6'>
            <div>
                <p className='text-2xl font-bold'>Info</p>
                <p className='text-lg'><strong>Name :</strong> {user.firstname + " " + user.lastname || "No name"}</p>
                <p className='text-lg'><strong>credits :</strong> {user.totalCredits || "0"} </p>
                <p className='text-lg'><strong>GPA : </strong>{user.GPA?.toFixed(2) || "0.00"}</p>
            </div>
            <div className='flex items-end'>
                <CourseModal/>
            </div>
        </div>
    )
}

export default Info