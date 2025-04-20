import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ListCurtail from './ListCurtail';

const showDetailCur:React.FC = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    
    const curriculum = location.state?.curriculum;

    if (!curriculum) {
        return (
            <div className="p-4">
                <p className="text-center text-red-500">ไม่พบข้อมูลหลักสูตร</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate(-1)}>ย้อนกลับ</button>
            </div>
        );
    }

    
    
    return (
        <div className="flex gap-x-4">
            <div>
                <p><strong>ชื่อ (TH):</strong> {curriculum.curriculumnameTH}</p>
                <p><strong>ชื่อ (EN):</strong> {curriculum.curriculumnameEN}</p>
                <p><strong>สถานะ:</strong> {curriculum.status}</p>
            </div>
        </div>
    )
}

export default showDetailCur