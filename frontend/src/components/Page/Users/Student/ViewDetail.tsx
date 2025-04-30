import React, { useRef } from 'react'
import { useUserContext } from '../../../api/UserProvider'

interface Props {
    userId: string
}

const ViewDetail:React.FC<Props> = ({ userId }) => {

    const modalRef = useRef<HTMLDialogElement | null>(null)
    const {users} = useUserContext();

    const user = users.find((user: any) => user._id === userId);

    const openModal = () => {
        modalRef.current?.showModal()
    }

    return (
        <div>
            <button onClick={openModal} className="btn btn-sm bg-info/75 text-base-100"> View</button>
            <dialog ref={modalRef}  className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {user ? (
                        <div className="space-y-2">
                            <p><strong>รหัสนักเรียน:</strong> {user.personalID}</p>
                            <p><strong>ชื่อ:</strong> {user.firstname}</p>
                            <p><strong>นามสกุล:</strong> {user.lastname}</p>
                            <p><strong>ตำแหน่ง:</strong> {user.role}</p>
                            <p><strong>หน่วยกิตทั้งหมด:</strong> {user.totalCredits}</p>
                            <p><strong>GPA:</strong> {user.GPA}</p>
                        </div>
                    ) : (
                        <p className="text-error">User not found.</p>
                    )}
                </div>
            </dialog>
        </div>
    )
}

export default ViewDetail