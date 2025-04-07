import React from 'react'
import { useCurriculumContext } from '../../../api/Curriculum'
import CurMenu from './CurMenu';
import { useNavigate } from 'react-router-dom';

const Curlist:React.FC = () => {

    const { curriculums } = useCurriculumContext();
    const navigate = useNavigate();
    
    const handleRowClick = (curriculum: any) => {
        navigate('/curriculum', { state: { curriculum } }); // ส่งข้อมูลไปยังหน้าเป้าหมาย
    };

    return (
        <div className='flex flex-col gap-y-4'>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ชื่อโครงสร้างหลักสูตร (th)</th>
                            <th>ชื่อโครงสร้างหลักสูตร (en)</th>
                            <th>สถานะ</th>
                            <th>เมนู</th>
                        </tr>
                    </thead>
                    <tbody>
                        {curriculums.length > 0 ? (
                            curriculums.map(curriculum => (
                                <tr key={curriculum._id} className="cursor-pointer hover:bg-base-200" onClick={() => handleRowClick(curriculum)}>
                                    <td>{curriculum.curriculumnameTH}</td>
                                    <td>{curriculum.curriculumnameEN}</td>
                                    <td>{curriculum.status}</td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <CurMenu curId={curriculum._id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    No curriculums available
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Curlist