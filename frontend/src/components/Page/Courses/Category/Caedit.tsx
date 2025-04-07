import React, { useState } from 'react'
import { useCatContext } from '../../../api/CatProvider';

interface CaEditProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    category: any;
}

const Caedit:React.FC<CaEditProps> = ({modalRef, category}) => {

    const { updateCategory, loading, success, error } = useCatContext();

    const [data, setData] = useState({
        catnameTH: category.catnameTH,
        catnameEN: category.catnameEN,
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         setData({ ...data, [e.target.id]: e.target.value });
     };

     const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateCategory(category._id, data);
     }

    return (
        <dialog ref={modalRef} id="category-edit" className="modal">
            <div className="modal-box">
                <div>
                {/* if there is a button in form, it will close the modal */}
                <button onClick={() => modalRef.current?.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleEdit}>
                    <label htmlFor="catnameTH">หมวดหมู่วิชา (th)</label>
                    <input type="text" id='catnameTH' className='input input-neutral w-full border-theme ' value={data.catnameTH} onChange={handleChange} />
                    <label htmlFor="catnameEN">หมวดหมู่วิชา (en)</label>
                    <input type="text" id='catnameEN' className='input input-theme w-full border-theme' value={data.catnameEN} onChange={handleChange} />

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {success && <p className="text-green-500 mt-2">{success}</p>}

                    <div className='flex justify-end mt-4 gap-x-4'>
                        <button type='submit' className="btn bg-success text-base-100" disabled={loading}>
                            {loading ? 'Loading...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

    )
}

export default Caedit