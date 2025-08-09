import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useSubjectContext } from '../../api/SubjectProvider';
import { useUserContext } from '../../api/UserProvider';
import { useCourseContext } from '../../api/CourseProvider';
import { useCatContext } from '../../api/CatProvider';
import { useGroupContext } from '../../api/GroupProvider';
import { useStructureContext } from '../../api/StructureProvider';

const DetailList:React.FC = () => {

    const location = useLocation();
    const studentId = location.state?.studentId;
    const {courses} = useCourseContext();
    const {categories} = useCatContext();
    const {groups} = useGroupContext()
    const {subjects} = useSubjectContext();
    const {structures} = useStructureContext();
    const {addSubjectToUser} = useUserContext();
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { users } = useUserContext();
    // console.log(users);
    const student = users?.find((u: any) => u._id === studentId);
    console.log(student);

    const [detail, setDetail] = useState<{
        [subjectId: string] : {description: string}
    }>({});
    
    if(!student) {
        return <p>กำลังโหลดข้อมูลนักเรียน หรือไม่พบข้อมูล</p>
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

    const structure = structures.find(s => s.curriculumId === student.curriculumId)
    const course = structure ? courses.find(c => c._id === structure.courseId) : undefined;

    return (
        <div className='flex flex-col gap-y-4 p-2'>
            <div className='flex items-center justify-between mr-4'>
                <h2 className="flex gap-x-4 items-center text-xl font-bold">
                    {course?.coursenameTH || ""}
                </h2>
                <div className='flex gap-x-4 items-center'>
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
            
            {!structure ? (
                <div className="flex flex-col items-center justify-center gap-y-4 text-gray-500 p-4 border rounded-md">
                    ยังไม่มีโครงสร้างหลักสูตร กรุณาเลือกหลักสูตรก่อน
                </div>
            ) : (
                // show course name if there is Id same as course
                
                <div className='overflow-x-auto max-h-[var(--table)] scrollbar-hide'>
                    {structure.categories.map(categoryItem => {
                    const categoryDetail = categories.find(cat => cat._id === categoryItem.categoryId);

                    let isFirstGroup = true;

                    return (
                        <div key={categoryItem.categoryId} className=" py-2 rounded-lg shadow overflow-x-auto">

                            {categoryItem.groups.map(groupItem => {
                                const groupDetail = groups.find(g => g._id === groupItem.groupId);
                                

                                return (
                                    <div key={groupItem.groupId} className="mt-2 p-2">
                                        {isFirstGroup && (
                                            <h3 className="text-center text-lg font-semibold">
                                                --- {categoryDetail?.catnameTH || "ไม่พบข้อมูล"} ---
                                            </h3>
                                        )}
                                        {isFirstGroup = false}
                                        <div className="overflow-x-auto mt-4 rounded-box border border-base-content/15 bg-base-100">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className='text-center' colSpan={7}>
                                                            {groupDetail?.groupnameTH || "ไม่พบข้อมูล"}
                                                        </th>
                                                    </tr>
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
                                                <tbody>
                                                    {groupItem.subjects.map(subjectItem => {
                                                        const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
                                                        const studentSubject = studentSubjects.find((s: any) => s.subjectId === subjectItem.subjectId);
                                                        return (
                                                            <tr key={subjectItem.subjectId} className={
                                                                studentSubject?.grade === 'F' 
                                                                    ? "bg-error/15" 
                                                                    : studentSubject?.grade === 'T' 
                                                                        ? "bg-info/15" 
                                                                    :  studentSubject ? "bg-success/15" : ""
                                                            }>
                                                                <td className='w-36'>{subjectDetail?.subjectID || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameTH || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameEN || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-24'>{subjectDetail?.credits || "ไม่พบข้อมูล"}</td>
                                                                <td className='md:w-24'>
                                                                    {studentSubject?.grade || '-'}
                                                                </td>
                                                                <td>
                                                                    {studentSubject?.termandyear || '-'}
                                                                </td>
                                                                <td className='w-64'>
                                                                    <textarea 
                                                                        className='p-1 h-10 rounded-md border-theme w-full'
                                                                        value={getDescription(subjectItem.subjectId)}
                                                                        onChange={(e) => {
                                                                            const description = e.target.value;
                                                                            setDetail(prev => ({
                                                                                ...prev,
                                                                                [subjectItem.subjectId]: {
                                                                                    ...prev[subjectItem.subjectId],
                                                                                    description
                                                                                }
                                                                            }));
                                                                        }}
                                                                    ></textarea>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                })}
                </div>
            )}
        </div>
        
    )
}

export default DetailList