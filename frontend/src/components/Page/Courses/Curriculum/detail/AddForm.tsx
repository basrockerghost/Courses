import React, { useRef, useState } from 'react'
import { useStructureContext } from '../../../../api/StructureProvider';
import { useCatContext } from '../../../../api/CatProvider';

interface Props {
    structureId: string;
}

const AddForm:React.FC<Props> = ({ structureId }) => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const { structures, addCategory } = useStructureContext();
    const { categories } = useCatContext();
    
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAdd = async () => {
        if(!selectedCategory) {
            alert('กรุณาเลือกหมวดหมู่');
            return;
        }

        const structure = structures.find(structure => structure._id === structureId);
        if (structure && structure.categories.some(category => category.categoryId === selectedCategory)) {
            alert('หมวดหมู่นี้มีอยู่แล้วในโครงสร้างหลักสูตร');
            return;
        }
        try {
            await addCategory(structureId, selectedCategory);
            alert('เพิ่มหมวดหมู่สำเร็จ');
            modalRef.current?.close();
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
        }
    }

    const openModal = () => {
        modalRef.current?.showModal();
    }

    return (
        <div>
            <button onClick={openModal} className="btn btn-sm">+</button>
            <dialog ref={modalRef} id="course-edit" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => modalRef.current?.close()}>
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">เพิ่มหมวดหมู่</h3>

                    <div className='flex'>
                        <div>
                            <label className='text-sm'>เลือกหมวดหมู่</label>
                            <select 
                                value={selectedCategory} 
                                onChange={(e) => setSelectedCategory(e.target.value)} 
                                className="select select-bordered w-full mt-2"
                            >
                                <option value="">-- เลือกหมวดหมู่ --</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.catnameTH}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button onClick={handleAdd} className="btn btn-primary mt-4">บันทึก</button>
                
                </div>
            </dialog>
        </div>
    )
}

export default AddForm