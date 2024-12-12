import React, { useState } from 'react';
import './styles.css'; // Ensure your CSS file is imported
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' }); // State for messages
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage({ text: 'Passwords do not match!', type: 'error' });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Check if the response is OK
            if (response.ok) {
                setMessage({ text: 'Signup successful! Redirecting to login...', type: 'success' });
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after 2 seconds
                }, 2000);
            } else {
                const data = await response.json();
                setMessage({ text: data.message || 'Signup failed!', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="container">
            <h1 className="title">Hotmail Signup</h1>
            {message.text && (
                <p className={message.type === 'success' ? 'success' : 'error'}>
                    {message.text}
                </p>
            )}
            <form className="signup-form" onSubmit={handleSignup}>
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label>Confirm Password</label>
                <input 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />

                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <h4>Already have an account?</h4>
            <Link to="/login">Login here.</Link>
        </div>
    );
};

export default Signup;