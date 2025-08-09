import React from 'react'
import { useCurriculumContext } from '../../api/Curriculum'

const Board:React.FC = () => {

    const {curriculums} = useCurriculumContext();
    const curriculum = curriculums.filter((curriculum: any) => curriculum.status === 'พร้อมใช้งาน' || curriculum.status === 'ปิดปรับปรุง' || curriculum.status === 'ไม่พร้อมใช้งาน')
    const readyCurriculum = curriculum.filter((curriculum: any) => curriculum.status === 'พร้อมใช้งาน')

    return (
        <div className='flex gap-x-12 overflow-x-auto pb-3 md:pb-4'>
            <div className="card w-64 bg-base-100 card-sm  md:h-full h-28 md:shadow-lg shadow-md border-1 border-gray-300">
                <div className="card-body flex-row items-center gap-x-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 md:size-8">
                    <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>

                    <div>
                        <p className="md:text-xl text-base font-semibold">{curriculum.length}</p>
                        <h2 className="md:text-lg">structures</h2>
                    </div>
                </div>
            </div>
            <div className="card w-64 bg-base-100 card-sm  md:h-full h-28 md:shadow-lg shadow-md border-1 border-gray-300">
                <div className="card-body flex-row items-center gap-x-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 md:size-8">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                    <div>
                        <p className="md:text-xl text-base font-semibold">{readyCurriculum.length}</p>
                        <h2 className="md:text-lg">Ready</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board