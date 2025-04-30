import React, { useRef, useState } from 'react'
import { useUserContext } from '../../../../api/UserProvider'
import { useLocation } from 'react-router-dom'

const AddStd:React.FC = () => {
    
    const location = useLocation();
    const teacher = location.state?.teacher;

    const modalRef = useRef<HTMLDialogElement | null>(null)

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const {users, addStdToTeacher} = useUserContext();

    const alreadyHave = (student: any) => {
        return teacher.students.some((s: any) => s.studentsId === student._id)
    }

    const openModal = () => {
        modalRef.current?.showModal()
    }


    
    return (
        <div className='flex flex-rows gap-x-4 items-center'>
            <button className="btn btn-md bg-blue-400 text-white rounded-2xl" onClick={openModal}>Add +</button>
            <dialog ref={modalRef} id="teacher-add" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='flex font-semibold text-lg'>เพิ่มนักศึกษาสำหรับอาจารย์</h2>
                        <div>
                            {success && <p className="text-success mt-2">{success}</p>}
                            {error && <p className="text-error mt-2">{error}</p>}
                        </div>
                    </div>
                    <div className="overflow-x-visible rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>StudentID</th>
                                    <th>Name</th>
                                    <th>Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.filter((u: any) => u && u.role === 'student').map((u: any) => (
                                    <tr key={u._id} className='cursor-pointer hover:bg-base-200'>
                                        <td>{u.personalID}</td>
                                        <td>{u.firstname} {u.lastname}</td>
                                        <td>
                                            <button
                                                className={`btn btn-sm ${alreadyHave(u) ? 'btn-disabled' : 'bg-info/75 text-base-100'}`}
                                                onClick={async () => {
                                                    try {
                                                        await addStdToTeacher(teacher._id, u._id);
                                                        setSuccess("Student added successfully");
                                                        setError(null);
                                                        setTimeout(() => {
                                                            setSuccess(null);
                                                        }, 3000);
                                                    } catch (err: any) {
                                                        setError(err.response?.data?.message || "Failed to add student");
                                                        setSuccess(null);
                                                        setTimeout(() => {
                                                            setError(null);
                                                        }, 3000);
                                                    }
                                                }}
                                                disabled={alreadyHave(u)}
                                            >
                                                {alreadyHave(u) ? 'Added' : 'Add'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddStd