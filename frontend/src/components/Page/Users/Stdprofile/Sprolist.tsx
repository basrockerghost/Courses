import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSubjectContext } from '../../../api/SubjectProvider';
import { useUserContext } from '../../../api/UserProvider';
// import Sdropmenu from './Sdropmenu'

const Sprolist:React.FC = () => {

    const location = useLocation();
    const student = location.state?.student;
    const {subjects} = useSubjectContext()
    const {addSubjectToUser} = useUserContext();
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [detail, setDetail] = useState<{
        [subjectId: string] : {description: string}
    }>({});

    if(!student) {
        return <p>No student found or any error</p>
    }

    const studentSubjects = student.subjects || [];

    if (!studentSubjects || studentSubjects.length === 0) {
        return (
            <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tprolistH)]">
                <p className="text-center p-4">ยังไม่มีวิชาที่ลงทะเบียน</p>
            </div>
        );
    }
    
    const getDescription = (subjectId: string) => {
        const selected = detail[subjectId]?.description;
        const userSaved = studentSubjects.find((s: any) => s.subjectId === subjectId)?.description;
        return selected !== undefined && selected !== '' ? selected : userSaved || '';
    };

    const handleSave = async () => {
        setSuccess(null);
        setError(null);
        try {
            for (const subjectId in detail) {
                const newDescription = detail[subjectId].description;
                const oldDescription = studentSubjects.find((s: any) => s.subjectId === subjectId)?.description || '';
    
                if (newDescription !== oldDescription) {
                    await addSubjectToUser(student._id, subjectId, newDescription);
                }
            }
            setSuccess("บันทึกสำเร็จ!");
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to save");
        }
    };

    return (
        <div className='flex flex-col gap-y-4'>
            <div className='flex justify-between items-center'>
                <h2>วิชาที่ลงทะเบียน</h2>
                <div className='flex items-center gap-x-4'>
                    <div className="text-success text-sm">
                        <span>{success}</span>
                    </div>
                    <div className="text-error text-sm">
                        <span>{error}</span>
                    </div>
                    <button className='btn bg-success text-base-100' onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-[var(--sprolistH)] scrollbar-hide">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา (TH)</th>
                            <th>ชื่อวิชา (EN)</th>
                            <th>หน่วยกิต</th>
                            <th>เกรด</th>
                            <th>หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {studentSubjects.map((subjectItem: any) => {
                            const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
                            return (
                                <tr key={subjectItem.subjectId}>
                                    <td className='w-36'>{subjectDetail?.subjectID || "ไม่พบข้อมูล"}</td>
                                    <td className='w-80'>{subjectDetail?.subjectnameTH || "ไม่พบข้อมูล"}</td>
                                    <td className='w-80'>{subjectDetail?.subjectnameEN || "ไม่พบข้อมูล"}</td>
                                    <td className='w-24'>{subjectDetail?.credits || "ไม่พบข้อมูล"}</td>
                                    <td className='w-24'>{subjectItem.grade || "ไม่พบข้อมูล"}</td>
                                    <td className='w-24'>
                                    <textarea
                                        className="border-theme p-0.5 rounded-lg"
                                        value={getDescription(subjectItem.subjectId)}
                                        onChange={(e) =>
                                            setDetail(prev => ({
                                                ...prev,
                                                [subjectItem.subjectId]: {
                                                    description: e.target.value
                                                }
                                            }))
                                        }
                                    />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sprolist