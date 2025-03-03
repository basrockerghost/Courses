import React from 'react'

interface ProfileProps {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

const Profile:React.FC<ProfileProps> = ({ modalRef }) => {

    return (
        <dialog ref={modalRef} id="profile" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">แก้ไขข้อมูลส่วนตัว</h3>
                <div className='flex flex-col gap-y-2 mt-4'>
                    <label htmlFor="name">ชื่อ</label>
                    <input type="text" id='name' className='input input-neutral w-full border-theme ' />
                    <label htmlFor="lastname">นามสกุล</label>
                    <input type="text" id='lastname' className='input input-theme w-full border-theme' />
                    <label htmlFor="">รหัสประจำตัว</label>
                    <input type="text" id='self-id' className='input input-theme w-full border-theme' />
                    <label htmlFor="password">รหัสผ่าน</label>
                    <input type="password" id='password' className='input input-theme w-full border-theme' />
                    <div className="modal-action gap-x-4">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <div className='flex gap-x-4'>
                                <button className="btn bg-red-400 hover:bg-red-500 text-white">Close</button>
                                <button className="btn bg-green-400 hover:bg-green-500 text-white">Save</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </dialog>
    )
}

export default Profile