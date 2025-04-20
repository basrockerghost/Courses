import React, { useEffect, useState } from 'react'
import { useStructureContext } from '../../../api/StructureProvider'
import { useUserContext } from '../../../api/UserProvider';
import { useCatContext } from '../../../api/CatProvider';
import { useGroupContext } from '../../../api/GroupProvider';
import { useSubjectContext } from '../../../api/SubjectProvider';
import { useCourseContext } from '../../../api/CourseProvider';

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
                    {course?.coursenameTH || "ไม่พบข้อมูล"}
                </h2>
                <div className='flex gap-x-4 items-center'>
                    <div className="text-success text-sm">
                        <span>{successMessage}</span>
                    </div>
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
                </div>
            </div>
            
            {!structure ? (
                <div className="text-center text-gray-500 p-4 border rounded-md">
                    ยังไม่มีโครงสร้างหลักสูตร กรุณาเลือกหลักสูตรก่อน
                </div>
            ) : (
                // show course name if there is Id same as course
                
                structure.categories.map(categoryItem => {
                    const categoryDetail = categories.find(cat => cat._id === categoryItem.categoryId);

                    return (
                        <div key={categoryItem.categoryId} className="px-4 py-2 rounded-lg shadow overflow-y-auto">
                            <h3 className="flex items-center gap-x-4 text-lg font-semibold">
                                {categoryDetail?.catnameTH || "ไม่พบข้อมูล"}
                            </h3>

                            {categoryItem.groups.map(groupItem => {
                                const groupDetail = groups.find(g => g._id === groupItem.groupId);

                                return (
                                    <div key={groupItem.groupId} className="ml-4 mt-2 p-2 border-l-2">
                                        <h4 className="flex items-center gap-x-4 text-md font-medium">
                                            {groupDetail?.groupnameTH || "ไม่พบข้อมูล"}
                                        </h4>

                                        <div className="overflow-x-auto mt-4 rounded-box border border-base-content/15 bg-base-100">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>รหัสวิชา</th>
                                                        <th>ชื่อวิชา (TH)</th>
                                                        <th>ชื่อวิชา (EN)</th>
                                                        <th>หน่วยกิต</th>
                                                        <th>เกรด</th>
                                                        <th>หมายเหตุ</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {groupItem.subjects.map(subjectItem => {
                                                        const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
                                                        return (
                                                            <tr key={subjectItem.subjectId} className={!isSubjectSaved(subjectItem.subjectId) ? "" : "bg-warning/10"} >
                                                                <td className='w-36'>{subjectDetail?.subjectID || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameTH || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameEN || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-24'>{subjectDetail?.credits || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-24'>
                                                                    {/* dropdown select grade */}
                                                                    <select 
                                                                        className="select select-bordered select-sm w-full max-w-xs border-theme"
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
                                                                    </select>
                                                                </td>
                                                                <td className='w-24'>
                                                                    <textarea 
                                                                        className='p-1 h-10 rounded-md border-theme'
                                                                        value={getDescription(subjectItem.subjectId)}
                                                                        disabled={isSubjectSaved(subjectItem.subjectId)}
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
                                                                    ></textarea>
                                                                </td>
                                                                <td className='w-24'>
                                                                    <input 
                                                                        className='checkbox checked:bg-warning-content/75 text-theme' 
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
                })
            )}
        </div>
    )
}

export default StdList