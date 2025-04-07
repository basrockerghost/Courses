import React, { useState } from 'react'
import { useUserContext } from '../../../api/UserProvider';


interface SEditProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
    user: any;
}

const Sedit:React.FC<SEditProps> = ({ modalRef, user }) => {

    const { updateUser, loading, success, error } = useUserContext();
    const [data, setData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateUser(user._id, data);
    };

    return (
        <dialog ref={modalRef} id="student-edit" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleEdit}>
                    <label htmlFor="name">ชื่อ</label>
                    <input type="text" id='firstname' className='input input-neutral w-full border-theme ' value={data.firstname} onChange={handleChange} />
                    <label htmlFor="lastname">นามสกุล</label>
                    <input type="text" id='lastname' className='input input-theme w-full border-theme' value={data.lastname} onChange={handleChange} />

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

export default Sedit