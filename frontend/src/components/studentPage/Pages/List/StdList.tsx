import React, { useState } from 'react'
import { useStructureContext } from '../../../api/StructureProvider'
import { useUserContext } from '../../../api/UserProvider';
import { useCatContext } from '../../../api/CatProvider';
import { useGroupContext } from '../../../api/GroupProvider';
import { useSubjectContext } from '../../../api/SubjectProvider';
import { useCourseContext } from '../../../api/CourseProvider';
import CourseModal from '../Modal/CourseModal';

// student list for show course
const StdList:React.FC = () => {

    const {user, addSubjectToUser, updateSubjectGrade, removeSubjectFromUser} = useUserContext();
    const { structures } = useStructureContext();
    const {categories} = useCatContext();
    const {groups} = useGroupContext();
    const {subjects} = useSubjectContext();
    const {courses} = useCourseContext();

    const [selectedSubjects, setSelectedSubjects] = useState<{
        [subjectId: string]: { grade: string, description: string }
    }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const userSubjects = user?.subjects || []; // จาก context 

    const getGrade = (subjectId: string) => {
        const selected = selectedSubjects[subjectId]?.grade;
        const userSaved = userSubjects.find((s: any) => s.subjectId === subjectId)?.grade;
        return selected !== undefined && selected !== '' ? selected : userSaved || '';
    };
      
    const getDescription = (subjectId: string) => {
        const selected = selectedSubjects[subjectId]?.description;
        const userSaved = userSubjects.find((s: any) => s.subjectId === subjectId)?.description;
        return selected !== undefined && selected !== '' ? selected : userSaved || '';
    };

    const isSubjectSaved = (subjectId: string) => {
        return userSubjects.some((s: any) => s.subjectId === subjectId);
    };


    const structure = structures.find(s => s.curriculumId === user.curriculumId)
    const course = structure ? courses.find(c => c._id === structure.courseId) : undefined;

    return (
        <div className='flex flex-col gap-y-4 p-2'>
            <div className='flex items-center justify-between mr-4'>
                <h2 className="flex gap-x-4 items-center text-xl font-bold">
                    {course?.coursenameTH || ""}
                </h2>
                <div className='flex gap-x-4 items-center'>
                    <div className="text-success text-sm">
                        <span>{successMessage}</span>
                    </div>
                    {user.curriculumId && (
                        <button
                            className='btn bg-success text-base-100'
                            onClick={async () => {
                                for (const subjectId in selectedSubjects) {
                                const { grade, description } = selectedSubjects[subjectId];
                            
                                if (!isSubjectSaved(subjectId)) {
                                    await addSubjectToUser(user._id, subjectId, description);
                                }
                            
                                if (grade) {
                                    await updateSubjectGrade(user._id, subjectId, grade);
                                }
                                }
                            
                                setSuccessMessage("บันทึกสำเร็จ!");
                                setTimeout(() => {
                                setSuccessMessage(null);
                                }, 3000);
                            }}  
                        >
                            save
                        </button>
                    )}
                </div>
            </div>
            
            {!structure ? (
                <div className="flex flex-col items-center justify-center gap-y-4 text-gray-500 p-4 border rounded-md">
                    ยังไม่มีโครงสร้างหลักสูตร กรุณาเลือกหลักสูตรก่อน
                    <CourseModal/>
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
                                                        <th>หมายเหตุ</th>
                                                        <th className='text-center'>ผ่าน/ไม่ผ่าน</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {groupItem.subjects.map(subjectItem => {
                                                        const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
                                                        return (
                                                            <tr key={subjectItem.subjectId}
                                                            className={
                                                                getGrade(subjectItem.subjectId) === 'F' 
                                                                    ? "bg-error/15" 
                                                                    : getGrade(subjectItem.subjectId) === 'T' 
                                                                        ? "bg-info/15" 
                                                                    : isSubjectSaved(subjectItem.subjectId) 
                                                                        ? "bg-success/15" 
                                                                        : ""
                                                            }
                                                            >
                                                                <td className='w-36'>{subjectDetail?.subjectID || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameTH || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameEN || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-24'>{subjectDetail?.credits || "ไม่พบข้อมูล"}</td>
                                                                <td className='md:w-24'>
                                                                    {/* dropdown select grade */}
                                                                    <select 
                                                                        className="input input-neutral input-sm cursor-pointer md:w-16 max-w-xs border-theme"
                                                                        value={getGrade(subjectItem.subjectId)}
                                                                        disabled={isSubjectSaved(subjectItem.subjectId)}
                                                                        onChange={(e) => {
                                                                            const grade = e.target.value;
                                                                            setSelectedSubjects(prev => ({
                                                                                ...prev,
                                                                                [subjectItem.subjectId]: {
                                                                                    ...prev[subjectItem.subjectId],
                                                                                    grade
                                                                                }
                                                                            }));
                                                                        }}
                                                                    >
                                                                        <option>เกรด</option>
                                                                        <option>A</option>
                                                                        <option>B+</option>
                                                                        <option>B</option>
                                                                        <option>C+</option>
                                                                        <option>C</option>
                                                                        <option>D+</option>
                                                                        <option>D</option>
                                                                        <option>F</option>
                                                                        <option>T</option>
                                                                    </select>
                                                                </td>
                                                                <td className='w-24'>
                                                                    {/* <textarea 
                                                                        className='p-1 h-10 rounded-md border-theme'
                                                                        value={getDescription(subjectItem.subjectId)}
                                                                        // disabled={isSubjectSaved(subjectItem.subjectId)}
                                                                        disabled
                                                                        onChange={(e) => {
                                                                            const description = e.target.value;
                                                                            setSelectedSubjects(prev => ({
                                                                                ...prev,
                                                                                [subjectItem.subjectId]: {
                                                                                    ...prev[subjectItem.subjectId],
                                                                                    description
                                                                                }
                                                                            }));
                                                                        }}
                                                                    ></textarea> */}
                                                                    {getDescription(subjectItem.subjectId)}
                                                                </td>
                                                                <td className='text-center w-24'>
                                                                    <input 
                                                                        className={
                                                                            getGrade(subjectItem.subjectId) === 'F'
                                                                                ?   "checkbox text-error/75"
                                                                                :   getGrade(subjectItem.subjectId) === 'T'
                                                                                    ?   "checkbox text-info/75"
                                                                                :   isSubjectSaved(subjectItem.subjectId)
                                                                                    ?   "checkbox text-success/75"
                                                                                    :   "checkbox"
                                                                        }
                                                                        type='checkbox'
                                                                        checked={selectedSubjects.hasOwnProperty(subjectItem.subjectId) || isSubjectSaved(subjectItem.subjectId)}
                                                                        onChange={async(e) => {
                                                                            const isChecked = e.target.checked;
                                                                            const subjectId = subjectItem.subjectId;
                                                                        
                                                                            setSelectedSubjects(prev => {
                                                                                const newState = { ...prev };
                                                                                if (isChecked) {
                                                                                    newState[subjectId] = {
                                                                                        grade: '',
                                                                                        description: ''
                                                                                    };
                                                                                } else {
                                                                                    delete newState[subjectId];
                                                                                }
                                                                                return newState;
                                                                            });

                                                                            if (!isChecked && isSubjectSaved(subjectId)) {
                                                                                await removeSubjectFromUser(user._id, subjectId);
                                                                            }
                                                                        }}
                                                                    />
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

export default StdList