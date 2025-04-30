import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertLog from './AlertLog';
import { useUserContext } from '../../api/UserProvider';

const Loginform:React.FC = () => {

    const navigate = useNavigate();
    const {setUser} = useUserContext();

    const [data, setData] = useState({
        personalID: '',
        password: ''
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
            const response = await axios.post('http://localhost:5000/api/auth/login', data);
            setSuccess(response.data.message);
            setData({
                personalID: '',
                password: ''
            });
            const { token, user, message } = response.data;
            setSuccess(message);
            if (user.role === 'student') {
                // navigate('/home', { replace: true });
                navigate('/home');
            } else if (user.role === 'admin') {
                // navigate('/dashboard', { replace: true });
                navigate('/dashboard');
            } else if (user.role === 'teacher') {
                navigate('/homeT');
            } else {
                setError('User role is not recognized');
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            console.log('Save token in storage', token);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <AlertLog error={error} success={success} />
            <p className='md:text-2xl text-xl md:font-medium mb-4'>Login</p>

            <label className="block mb-2">Student ID</label>
            <input type="text" id='personalID' className="input border-theme w-full" placeholder="Student ID" value={data.personalID} onChange={handleChange} required />

            <label className="block mt-3 mb-2">Password</label>
            <input type="password" id='password' className="input border-theme w-full" placeholder="Password" value={data.password} onChange={handleChange} required />

            <div className='flex items-center justify-between mt-2'>
                <a href="/request-reset" className='link link-hover'>forget password</a>
                <a href="/register" className='link link-hover'>create account</a>
            </div>

            <button type="submit" className="btn mt-4 bg-theme text-white w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            
        </form>
    )
}

export default Loginform