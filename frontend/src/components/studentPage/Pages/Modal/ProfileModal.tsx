import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../api/UserProvider';

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

const ProfileModal:React.FC<Props> = ({modalRef}) => {

    const {user, updateUser} = useUserContext();
    const [data, setData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateUser(user._id, data);
        alert("Save successfully")
        modalRef.current?.close();
    }

    return (
        <dialog ref={modalRef} id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูล</h3>
                <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleSave}>
                    <label htmlFor="name">ชื่อ</label>
                    <input type="text" id='firstname' className='input input-neutral w-full border-theme ' value={data.firstname} onChange={handleChange} />
                    <label htmlFor="lastname">นามสกุล</label>
                    <input type="text" id='lastname' className='input input-theme w-full border-theme' value={data.lastname} onChange={handleChange} />
                    <label htmlFor="email">อีเมล</label>
                    <input type="text" id='email' className='input input-theme w-full border-theme' value={data.email} onChange={handleChange} />
                    <div className='flex justify-end mt-4 gap-x-4'>
                        <button type='submit' className="btn bg-success text-base-100">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default ProfileModal