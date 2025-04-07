import React from 'react'
import ShowDetailCur from './showDetailCur'
import ListCurtail from './ListCurtail';
import AddSub from './Addcourse';
import { useLocation } from 'react-router-dom';

const showCur:React.FC = () => {

    const location = useLocation();
    const curriculum = location.state?.curriculum;

    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between items-center'>
                    <p className='text-2xl font-semibold'>รายละเอียดโครงสร้างหลักสูตร</p>
                    <AddSub curriculumId={curriculum._id} curriculum={curriculum} />
                </div>
                <div className='flex flex-col gap-y-4'>
                    <ShowDetailCur />
                    <ListCurtail/>
                </div>
            </div>
        </div>
    )
}

export default showCur