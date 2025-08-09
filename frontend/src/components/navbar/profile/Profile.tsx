import React, { useState } from 'react'
import { useUserContext } from '../../api/UserProvider';

interface ProfileProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

const Profile:React.FC<ProfileProps> = ({ modalRef }) => {

    const {user, updateUser} = useUserContext();
    const [data, setData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        personalID: user.personalID,
    })

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
        <dialog ref={modalRef} id="profile" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูลส่วนตัว</h3>
                <div className='flex flex-col gap-y-2 mt-4'>
                    <label htmlFor="firstname">ชื่อ</label>
                    <input type="text" id='firstname' className='input input-neutral w-full border-theme ' value={data.firstname} onChange={handleChange} />
                    <label htmlFor="lastname">นามสกุล</label>
                    <input type="text" id='lastname' className='input input-theme w-full border-theme' value={data.lastname} onChange={handleChange} />
                    <label htmlFor="personalID">รหัสประจำตัว</label>
                    <input type="text" id='personalID' className='input input-theme w-full border-theme' value={data.personalID} onChange={handleChange} />
                    <div className='flex justify-end mt-4 gap-x-4'>
                        <button type='submit' className="btn bg-success text-base-100" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>

            </div>
        </dialog>
    )
}

export default Profile