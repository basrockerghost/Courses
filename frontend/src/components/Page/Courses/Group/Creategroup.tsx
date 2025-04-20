import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import api from '../../../api/Api'
import { useGroupContext } from '../../../api/GroupProvider';

const Creategroup:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);

    const { addGroup, loading, success, error } = useGroupContext();

    const [data, setData] = useState({
        groupnameTH: '',
        groupnameEN: '',
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addGroup({
            groupnameTH: data.groupnameTH,
            groupnameEN: data.groupnameEN,
        });

        setData({
            groupnameTH: '',
            groupnameEN: '',
        });
    };

    const CreateGroupModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <div className='flex flex-rows gap-x-4 items-center'>
            <label className="input input-sm">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                <input type="search" className="grow" placeholder="Search" />
            </label>
            <button className="btn bg-blue-400 text-white rounded-2xl" onClick={CreateGroupModal}>Create +</button>
            <dialog ref={modalRef} id="group" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">สร้างกลุ่มวิชา</h3>
                    <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleSubmit}>
                        <label htmlFor="groupnameTH">ชื่อกลุ่มวิชา (th)</label>
                        <input type="text" id='groupnameTH' className='input input-neutral w-full border-theme ' value={data.groupnameTH} onChange={(e) => {
                            const thOnly = e.target.value.replace(/[^ก-๙\s]/g, "");
                            setData({ ...data, groupnameTH: thOnly });
                        }} required />
                        <label htmlFor="groupnameEN">ชื่อกลุ่มวิชา (en)</label>
                        <input type="text" id='groupnameEN' className='input input-neutral w-full border-theme ' value={data.groupnameEN} onChange={(e) => {
                            const enOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                            setData({ ...data, groupnameEN: enOnly });
                        }} required />

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">{success}</p>}

                        <div className='flex justify-end mt-4 gap-x-4'>
                            <button type='submit' className="btn bg-info/80 text-base-100" disabled={loading}>
                                {loading ? 'Loading...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default Creategroup