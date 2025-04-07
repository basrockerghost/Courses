import React, { useRef, useState } from 'react'
import { useStructureContext } from '../../../../api/StructureProvider';
import { useGroupContext } from '../../../../api/GroupProvider';

interface Props {
    structureId: string;
    categoryId: string;
}

const addGroup:React.FC<Props> = ({ structureId, categoryId }) => {
    
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const { structures, addGroup } = useStructureContext();
    const { groups } = useGroupContext();


    const [selectedGroup, setSelectedGroup] = useState('');

    const handleAdd = async () => {
        if(!selectedGroup) {
            alert('กรุณาเลือกกลุ่มวิชา');
            return;
        }

        const structure = structures.find(structure => structure._id === structureId);
        console.log(structure);
        
        const category = structure?.categories.find(cat => cat.categoryId === categoryId);
        console.log(category);
        
        if (category && category.groups.some(group => group.groupId === selectedGroup)) {
            alert('กลุ่มวิชานี้มีอยู่แล้วในหมวดหมู่นี้');
            return;
        }

        try {
            await addGroup(structureId, categoryId, selectedGroup);
            alert('เพิ่มกลุ่มวิชาสำเร็จ');
            modalRef.current?.close();
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert("กลุ่มวิชานี้มีอยู่แล้วในหมวดหมู่");
            } else if(error.response?.status === 404) {
                console.error('เกิดข้อผิดพลาด:', error);
            } else {
                console.error('เกิดข้อผิดพลาด:', error);
                alert('เกิดข้อผิดพลาดในการเพิ่มกลุ่มวิชา');
            }
        }
    }

    const openModal = () => {
        modalRef.current?.showModal();
    }
    
    const usedGroupIds = structures.find(s => s._id === structureId)?.categories
    .flatMap(cat => cat.groups.map(g => g.groupId)) || [];

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
                    <h3 className='font-bold text-lg'>เพิ่มกลุ่มวิชา</h3>

                    <div className=''>
                    <label className="text-sm">เลือกกลุ่มวิชา</label>
                        <div className="flex flex-col mt-2 max-h-60 overflow-y-auto gap-y-1.5">
                            {groups.map(group => (
                                <label key={group._id} className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="group"
                                        value={group._id}
                                        disabled={usedGroupIds.includes(group._id)}
                                        checked={selectedGroup === group._id}
                                        onChange={() => setSelectedGroup(group._id)}
                                        className="radio radio-sm"
                                    />
                                    <span className="label-text ml-2 text-sm">
                                        {group.groupnameTH}
                                        {usedGroupIds.includes(group._id) && (
                                            <span className="text-red-400 ml-1">(already used)</span>
                                        )}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleAdd} className='btn btn-primary mt-4'>บันทึก</button>
                </div>
             </dialog>
        </div>
    )
}

export default addGroup