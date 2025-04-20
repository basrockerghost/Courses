import React from 'react'

interface Props {
    modalRef: React.RefObject<HTMLDialogElement | null>;
}

const ProfileModal:React.FC<Props> = ({modalRef}) => {

    return (
        
            <dialog ref={modalRef} id="category" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">
                        แก้ไขข้อมูลส่วนตัว
                    </h3>
                    <form className='flex flex-col gap-y-2 mt-4'>
                        
                    </form>
                </div>
            </dialog>
        
    )
}

export default ProfileModal