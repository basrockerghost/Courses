import React, { useState } from 'react'
import { useGroupContext } from '../../../api/GroupProvider';

interface GEditProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    group: any;
}

const Gedit:React.FC<GEditProps> = ({modalRef, group}) => {

    const { updateGroup, loading, error, success } = useGroupContext();
    
    const [data, setData] = useState({
        groupnameTH: group.groupnameTH,
        groupnameEN: group.groupnameEN,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateGroup(group._id, data);
    };

    return (
        <dialog ref={modalRef} id="group-edit" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <form className='flex flex-col gap-y-2 mt-4'  onSubmit={handleEdit} >
                    <label htmlFor="groupnameTH">ชื่อกลุ่มวิชา (th)</label>
                    <input type="text" id='groupnameTH' className='input input-neutral w-full border-theme ' value={data.groupnameTH} onChange={handleChange} />
                    <label htmlFor="groupnameEN">ชื่อกลุ่มวิชา (en)</label>
                    <input type="text" id='groupnameEN' className='input input-neutral w-full border-theme ' value={data.groupnameEN} onChange={handleChange} />

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

export default Gedit