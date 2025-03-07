import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Regisform:React.FC = () => {

    const navigate = useNavigate();

    const[data, setData] = useState({
        personalID: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        con_password: ''
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
            const response = await axios.post('http://localhost:5000/api/auth/register', data);
            setSuccess(response.data.message);
            setData({
                personalID: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                con_password: ''
            });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <p className='md:text-2xl text-xl md:font-medium mb-4'>Register</p>

            <div className='flex gap-x-4'>
                <div className='w-full'>
                    <label className="block mb-1">Student ID</label>
                    <input type="text" id='personalID' className="input border-theme w-full" placeholder="Student ID" value={data.personalID} onChange={handleChange} required />
                    
                </div>
                <div className='w-full'>
                    <label className="block mb-1">Email</label>
                    <input type="email" id='email' className="input border-theme w-full" placeholder="Email" value={data.email} onChange={handleChange} required />
                </div>
            </div>

            <div className='flex gap-x-4'>
                <div className='w-full'>
                    <label className="block mt-2 mb-1">First Name</label>
                    <input type="text" id='firstname' className="input border-theme w-full" placeholder="First Name" value={data.firstname} onChange={handleChange} required />
                </div>
                <div className='w-full'>
                    <label className="block mt-2 mb-1">Last Name</label>
                    <input type="text" id='lastname' className="input border-theme w-full" placeholder="Last Name" value={data.lastname} onChange={handleChange} required />
                </div>
            </div>

            <div className='flex gap-x-4'>
                <div className='w-full'>
                    <label className="block mt-2 mb-1">Password</label>
                    <input type="password" id='password' className="input border-theme w-full" placeholder="Password" value={data.password} onChange={handleChange} required />
                </div>
                <div className='w-full'>
                    <label className="block mt-2 mb-1">Confirm Password</label>
                    <input type="password" id='con_password' className="input border-theme w-full" placeholder="Confirm Password" value={data.con_password} onChange={handleChange} required />
                </div>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}

            <button type="submit" className="btn mt-4 bg-theme text-white w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}

export default Regisform