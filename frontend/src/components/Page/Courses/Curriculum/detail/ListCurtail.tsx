import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useStructureContext } from '../../../../api/StructureProvider';
import { useCatContext } from '../../../../api/CatProvider';
import { useGroupContext } from '../../../../api/GroupProvider';
import { useSubjectContext } from '../../../../api/SubjectProvider';
import { useCourseContext } from '../../../../api/CourseProvider';
import AddForm from './AddForm';
import Addgroup from './addGroup';
import AddSub from './AddSub';

const ListCurtail:React.FC = () => {

    const location = useLocation();
    const curriculumId = location.state?.curriculum?._id;
    const { structures, deleteSubject } = useStructureContext();
    const {categories} = useCatContext();
    const {groups} = useGroupContext();
    const {subjects} = useSubjectContext();
    const {courses} = useCourseContext();


    const structure = structures.find(s => s.curriculumId === curriculumId);
    
    const course = structure ? courses.find(c => c._id === structure.courseId) : undefined;

    const handleDelete = (structureId: string, categoryId: string, groupId: string, subjectId: string) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            deleteSubject(structureId, categoryId, groupId, subjectId);
        }
    };

    const calculateGroupCredits = (groupItem: any) => {
        return groupItem.subjects.reduce((sum: number, subjectItem: any) => {
            const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
            return sum + (subjectDetail?.credits || 0);
        }, 0);
    };
    
    const calculateCategoryCredits = (categoryItem: any) => {
        return categoryItem.groups.reduce((sum: number, groupItem: any) => {
            return sum + calculateGroupCredits(groupItem);
        }, 0);
    };
    
    const calculateCourseCredits = (structure: any) => {
        return structure.categories.reduce((sum: number, categoryItem: any) => {
            return sum + calculateCategoryCredits(categoryItem);
        }, 0);
    };
    
    const totalCourseCredits = structure ? calculateCourseCredits(structure) : 0;

    return (
        <div className='flex flex-col gap-y-4 p-2'>
            <h2 className="flex gap-x-4 items-center text-xl font-bold">
                {course?.coursenameTH || "ไม่พบข้อมูล"}
                {course && (
                    <>
                    <span className='text-base font-normal text-gray-600'>รวมทั้งหมด: {totalCourseCredits} หน่วยกิต</span>
                    <AddForm structureId={structure?._id ?? ''} />
                </>
                )}
            </h2>
            {structure?.categories.map(categoryItem => {
                const categoryDetail = categories.find(cat => cat._id === categoryItem.categoryId);
                let isFirstGroup = true;
                

                return (
                    <div key={categoryItem.categoryId} className="overflow-x-auto">
                                    {isFirstGroup && (
                                        <div className='flex items-center gap-x-4 justify-center mb-4'>                    
                                            <h3 className="text-center text-lg font-semibold">
                                                --- {categoryDetail?.catnameTH || "ไม่พบข้อมูล"} ---
                                            </h3>
                                            <span className='text-sm font-normal text-gray-500'>
                                                รวม: {calculateCategoryCredits(categoryItem)} หน่วยกิต
                                            </span>
                                            {categoryDetail && (
                                                <Addgroup structureId={structure?._id ?? ''} categoryId={categoryItem.categoryId} />
                                            )} 
                                        </div>
                                    )}
                                    {isFirstGroup = false}

                        {categoryItem.groups.map(groupItem => {
                            const groupDetail = groups.find(g => g._id === groupItem.groupId);

                            return (
                                <div key={groupItem.groupId}>
                                    
                                        
                                    
                                    <div className="overflow-x-auto mt-4 rounded-box border border-base-content/5 bg-base-100">
                                        <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className='text-center' colSpan={7}>
                                                            <div className='flex justify-center items-center gap-x-4'>
                                                            {groupDetail?.groupnameTH || "ไม่พบข้อมูล"}
                                                            <span className='text-sm font-normal text-gray-500'>
                                                                รวม: {calculateGroupCredits(groupItem)} หน่วยกิต
                                                            </span>
                                                            {groupDetail && (
                                                                <AddSub structureId={structure?._id ?? ''} categoryId={categoryItem.categoryId} groupId={groupItem.groupId} />
                                                            )}
                                                            </div>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>รหัสวิชา</th>
                                                        <th>ชื่อวิชา (TH)</th>
                                                        <th>ชื่อวิชา (EN)</th>
                                                        <th>หน่วยกิต</th>
                                                        <th className='flex'>ลบ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {groupItem.subjects.map(subjectItem => {
                                                        const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);
                                                        return (
                                                            <tr key={subjectItem.subjectId}>
                                                                <td className='w-36'>{subjectDetail?.subjectID || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameTH || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-80'>{subjectDetail?.subjectnameEN || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-24'>{subjectDetail?.credits || "ไม่พบข้อมูล"}</td>
                                                                <td className='w-24'>
                                                                    <button className='btn bg-error text-base-100' onClick={() => handleDelete(structure._id, categoryItem.categoryId, groupItem.groupId, subjectItem.subjectId)}>ลบ</button>
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
                );
            })}
        </div>
    )
}

export default ListCurtail