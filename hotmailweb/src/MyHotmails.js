// src/MyHotmails.js
import React, { useState, useEffect } from 'react';
import './MyHotmails.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MyHotmails = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({ title: '', message: '', category: '' });

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch suggestions from the database when the component mounts
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/suggestions');
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data); // Set suggestions from the API response
        } else {
          console.error('Failed to fetch suggestions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSuggestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/suggestions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuggestions(suggestions.filter(suggestion => suggestion.id !== id)); // Update state after deletion
      } else {
        console.error('Failed to delete suggestion');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddSuggestion = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSuggestion),
      });

      if (response.ok) {
        const addedSuggestion = await response.json();
        setSuggestions([...suggestions, addedSuggestion]); // Add the new suggestion to the state
        setNewSuggestion({ title: '', message: '', category: '' }); // Reset the form
        setIsModalOpen(false); // Close the modal
      } else {
        console.error('Failed to add suggestion');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSuggestion({ ...newSuggestion, [name]: value });
  };

  const handleLogout = () => {
    // Perform any logout logic if needed (e.g., clearing tokens)
    navigate('/signup'); // Redirect to Signup page
  };

  return (
    <div className="my-hotmails-container">
      <div className="header">
        <h2>My Hotmails</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <button className="add-suggestion-button" onClick={() => setIsModalOpen(true)}>Add Suggestion</button>

      <div className="suggestions">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-card">
            <h3>{suggestion.title}</h3>
            <p>{suggestion.message}</p> {/* Display the message here */}
            <p><strong>Category:</strong> {suggestion.category}</p> {/* Display the category here */}
            <button onClick={() => handleDelete(suggestion.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Modal for Adding Suggestion */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Suggestion</h3>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newSuggestion.title}
              onChange={handleInputChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              value={newSuggestion.message}
              onChange={handleInputChange}
            />
            <div>
              <label>Select Category:</label>
              <select name="category" value={newSuggestion.category} onChange={handleInputChange}>
                <option value="">--Select--</option>
                <option value="Crime">Crime</option>
                <option value="Complaint">Complaint</option>
                <option value="Abuse">Abuse</option>
              </select>
            </div>
            <button className="add-button" onClick={handleAddSuggestion}>Add</button>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHotmails;