import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSubjectContext } from '../../../api/SubjectProvider';
import { useUserContext } from '../../../api/UserProvider';
// import Sdropmenu from './Sdropmenu'

const Sprolist:React.FC<{ searchText: string }> = ({ searchText }) => {

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

    const filterSubjects = (searchText: string) => {
        if (!searchText) return studentSubjects;
        return studentSubjects.filter((subjectItem: any) => {
            const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
            return (
                subjectDetail?.subjectID.toLowerCase().includes(searchText.toLowerCase()) ||
                subjectDetail?.subjectnameTH.toLowerCase().includes(searchText.toLowerCase()) ||
                subjectDetail?.subjectnameEN.toLowerCase().includes(searchText.toLowerCase())
            );
        });
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
                            <th>ปี/เทอม</th>
                            <th>หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filterSubjects(searchText).map((subjectItem: any) => {
                            const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
                            return subjectDetail ? (
                                <tr key={subjectItem.subjectId}>
                                    <td>{subjectDetail.subjectID}</td>
                                    <td>{subjectDetail.subjectnameTH}</td>
                                    <td>{subjectDetail.subjectnameEN}</td>
                                    <td>{subjectDetail.credits}</td>
                                    <td>{subjectItem.grade || '-'}</td>
                                    <td>{subjectItem.termandyear || '-'}</td>
                                    <td>
                                        <textarea 
                                            placeholder="รายละเอียด" 
                                            className="input input-bordered input-sm w-full max-w-xs border-theme" 
                                            value={getDescription(subjectItem.subjectId)}
                                            onChange={(e) => setDetail({
                                                ...detail,
                                                [subjectItem.subjectId]: { description: e.target.value }
                                            })}
                                        />
                                    </td>
                                </tr>
                            ) : <p>No subject found</p>;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sprolist