import React, { useState } from 'react'
import { useUserContext } from '../../../../api/UserProvider';

const Taddform:React.FC = () => {

    const { addUser, loading, success, error } = useUserContext();

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        personalID: '',
        password: '',
        role: 'teacher'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        await addUser({
            firstname: data.firstname,
            lastname: data.lastname,
            personalID: data.personalID,
            email: '',
            password: data.password,
            role: data.role as "student" | "teacher" | "admin"
        })
        setData({
            firstname: "",
            lastname: "",
            personalID: "",
            password: "",
            role: "teacher"
        })
    }

    return (
        <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleAdd}>
            <label htmlFor="name">ชื่อ</label>
            <input type="text" id='firstname' className='input input-neutral w-full border-theme ' value={data.firstname} onChange={handleChange} required />
            <label htmlFor="lastname">นามสกุล</label>
            <input type="text" id='lastname' className='input input-theme w-full border-theme' value={data.lastname} onChange={handleChange} required />
            <label htmlFor="tcode">รหัสอาจารย์</label>
            <input type="tcode" id='personalID' className='input input-theme w-full border-theme' value={data.personalID} onChange={handleChange} required />
            <label htmlFor="password">รหัสผ่าน</label>
            <input type="password" id='password' className='input input-theme w-full border-theme' value={data.password} onChange={handleChange} required />

            <input type="text" id='role' className='hidden input input-theme w-full border-theme' value={data.role} onChange={handleChange} required />

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}

            <div className='flex justify-end mt-4'>
                <button type='submit' className="btn bg-green-500 text-white" disabled={loading}>
                    {loading ? 'Loading...' : 'Save'}
                </button>
            </div>
        </form>
    )
}

export default Taddform