import React, { useRef, useState } from 'react'
import { useStructureContext } from '../../../../api/StructureProvider';
import { useSubjectContext } from '../../../../api/SubjectProvider';

interface Props {
    structureId: string;
    categoryId: string;
    groupId: string;
}

const AddSub:React.FC<Props> = ({ structureId, categoryId, groupId }) => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const { structures, addSubject } = useStructureContext();
    const { subjects } = useSubjectContext();
    
    const[ selectedSubjects, setSelectedSubjects ] = useState<string[]>([]);

    const handleSubjectChange = (subjectId: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId) // เอาออกถ้ากดซ้ำ
                : [...prev, subjectId] // เพิ่มถ้ายังไม่มี
        );
    };
    
    const handleAdd = async () => {
        if (selectedSubjects.length === 0) {
            alert('กรุณาเลือกวิชา');
            return;
        }
    
        const structure = structures.find(structure => structure._id === structureId);
        if (!structure) {
            alert("ไม่พบโครงสร้าง");
            return;
        }
    
        // 🔍 Collect all subjectIds in the entire structure
        const allSubjectIdsInStructure = structure.categories.flatMap(cat =>
            cat.groups.flatMap(group =>
                group.subjects.map(sub => sub.subjectId)
            )
        );
    
        // ❌ Check for any selected subjects that already exist
        const duplicates = selectedSubjects.filter(id => allSubjectIdsInStructure.includes(id));
        if (duplicates.length > 0) {
            alert(`วิชาดังต่อไปนี้มีอยู่แล้วในโครงสร้าง: ${duplicates.join(", ")}`);
            return;
        }

        try {
            await addSubject(structureId, categoryId, groupId, selectedSubjects);
            alert('เพิ่มวิชาสำเร็จ');
            modalRef.current?.close();
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
        }
    }

    const openModal = () => {
        modalRef.current?.showModal();
    }

    const usedSubjectIds = structures.find(s => s._id === structureId)?.categories
        .flatMap(cat => cat.groups.flatMap(g => g.subjects.map(sub => sub.subjectId))) || [];
    
    return (
        <div>
            <button onClick={openModal} className="btn btn-sm">+</button>
            <dialog ref={modalRef} className='modal'>
                <div className='modal-box'>
                    <form method='dialog' >
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => modalRef.current?.close()}>
                            ✕
                        </button>
                    </form>
                    <h3 className='font-bold text-lg'>เพิ่มวิชา</h3>

                    <div className='flex flex-col gap-y-2'>
                        <label className='text-sm'>เลือกวิชา</label>
                        <div className='flex flex-col gap-y-1.5 max-h-60 overflow-y-auto'>
                        {subjects.map((subject) => {
                            const isUsed = usedSubjectIds.includes(subject._id);

                            return (
                                <div key={subject._id} className="form-control">
                                    <div className="">
                                        <div className='label cursor-pointer flex'>
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={selectedSubjects.includes(subject._id)}
                                                onChange={() => handleSubjectChange(subject._id)}
                                                disabled={isUsed}
                                            />
                                            <span className={`label-text ml-2 ${isUsed ? "text-gray-400 line-through" : ""}`}>
                                                {subject.subjectnameTH}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    </div>

                    <button onClick={handleAdd} className='btn btn-primary mt-4'>บันทึก</button>
                </div>
            </dialog>
        </div>
    )
    
}

export default AddSub