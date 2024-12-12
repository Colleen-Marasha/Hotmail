import React, { useEffect, useState } from 'react';

const AdminSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const response = await fetch('http://localhost:3000/api/suggestions/admin', {
                headers: {
                    'Authorization': `Bearer ${yourToken}`, // Add token if needed
                },
            });
            const data = await response.json();
            setSuggestions(data);
        };

        fetchSuggestions();
    }, []);

    return (
        <div>
            <h2>All Suggestions</h2>
            <ul>
                {suggestions.map(suggestion => (
                    <li key={suggestion.id}>{suggestion.suggestion} (User ID: {suggestion.user_id})</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSuggestions;