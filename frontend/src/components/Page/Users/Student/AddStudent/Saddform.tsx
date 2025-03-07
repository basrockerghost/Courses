import axios from 'axios';
import React, { useState } from 'react'

const Saddform:React.FC = () => {

    const [data, setData] = useState({
        personalID: '',
        firstname: '',
        lastname: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:5000/api/add/student', data);
            setSuccess(response.data.message);
            setData({
                personalID: '',
                firstname: '',
                lastname: '',
                password: '',
            });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <form className='flex flex-col gap-y-2 mt-4' onSubmit={handleSubmit}>
            <label htmlFor="name">ชื่อ</label>
            <input type="text" id='firstname' className='input input-neutral w-full border-theme ' value={data.firstname} onChange={handleChange} required/>
            <label htmlFor="lastname">นามสกุล</label>
            <input type="text" id='lastname' className='input input-theme w-full border-theme' value={data.lastname} onChange={handleChange} required />
            <label htmlFor="scode">รหัสนักศึกษา</label>
            <input type="scode" id='personalID' className='input input-theme w-full border-theme' value={data.personalID} onChange={handleChange} required />
            <label htmlFor="password">รหัสผ่าน</label>
            <input type="password" id='password' className='input input-theme w-full border-theme' value={data.password} onChange={handleChange} required />
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

export default Saddform