import React, { useState } from 'react';
import './styles.css'; 
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' }); // State for messages
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await fetch('http://localhost:3000/api/login', { // Update to the correct API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
                setTimeout(() => {
                    navigate('/my-hotmails'); // Redirect to My Hotmails page
                }, 2000); // Redirect after 2 seconds
            } else {
                const data = await response.json();
                setMessage({ text: data.message || 'Login failed! Check your username and password.', type: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="container">
            <h1 className="title">Hotmail Login</h1>
            {message.text && (
                <p className={message.type === 'success' ? 'success' : 'error'}>
                    {message.text}
                </p>
            )}
            <form className="login-form" onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username"
                    placeholder="Enter your username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <button type="submit" className="login-button">Login</button>
            </form>
            <Link to="/signup">Don't have an account? Sign up here.</Link>
        </div>
    );
};

export default Login;