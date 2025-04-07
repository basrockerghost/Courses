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
    const { structures, loading, error } = useStructureContext();
    const {categories} = useCatContext();
    const {groups} = useGroupContext();
    const {subjects} = useSubjectContext();
    const {courses} = useCourseContext();


    const structure = structures.find(s => s.curriculumId === curriculumId)
    // if (!structure) return <p>Loading structure...</p>;
    
    // console.log("Structure object:", structure?._id);
    // console.log(structure?.curriculumId)
    
    const course = structure ? courses.find(c => c._id === structure.courseId) : undefined;
    
    // const course = courses.find(c => c._id === structure?.courseId);

    return (
        <div className='flex flex-col gap-y-4'>
            <h2 className="flex gap-x-4 items-center text-xl font-bold">
                {course?.coursenameTH || "ไม่พบข้อมูล"}
                {course && (
                    <AddForm structureId={structure?._id ?? ''} />
                )}
            </h2>
            {structure?.categories.map(categoryItem => {
                const categoryDetail = categories.find(cat => cat._id === categoryItem.categoryId);

                return (
                    <div key={categoryItem.categoryId} className="p-4 rounded-lg shadow overflow-y-auto">
                        <h3 className="flex items-center gap-x-4 text-lg font-semibold">
                            หมวดหมู่: {categoryDetail?.catnameTH || "ไม่พบข้อมูล"}
                            {categoryDetail && (
                                <Addgroup structureId={structure?._id ?? ''} categoryId={categoryItem.categoryId} />
                            )}
                        </h3>

                        {categoryItem.groups.map(groupItem => {
                            const groupDetail = groups.find(g => g._id === groupItem.groupId);

                            return (
                                <div key={groupItem.groupId} className="ml-4 mt-2 p-2 border-l-2">
                                    <h4 className="flex items-center gap-x-4 text-md font-medium">
                                        กลุ่มวิชา: {groupDetail?.groupnameTH || "ไม่พบข้อมูล"}
                                        {groupDetail && (
                                            <AddSub structureId={structure?._id ?? ''} categoryId={categoryItem.categoryId} groupId={groupItem.groupId} />
                                        )}
                                    </h4>

                                    <ul className="ml-4 list-disc mt-2.5">
                                        {groupItem.subjects.map(subjectItem => {
                                            const subjectDetail = subjects.find(s => s._id === subjectItem.subjectId);

                                            return (
                                                <li key={subjectItem.subjectId} className="text-sm">
                                                    วิชา: {subjectDetail?.subjectnameTH || "ไม่พบข้อมูล"}
                                                </li>
                                            );
                                        })}
                                    </ul>
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

