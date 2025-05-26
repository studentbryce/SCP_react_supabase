import React, { useState } from 'react';
import { supabase } from './supabaseClient';  // Import Supabase client
import './App.css'; // Optional: separate file if preferred

// Create component for adding new SCP records
const Create = ({ onCreate }) => {
    const [formData, setFormData] = useState({  // Initialize form data state
        title: '',
        object_class: '',
        image: '',
        special_containment_procedures: '',
        description: ''
    });

    const [error, setError] = useState('');  // State to hold error messages
    const [showPopup, setShowPopup] = useState(false);  // State to control success popup visibility

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });  // Update form data state with input values
        setError('');  // Clear error message on input change
        setSuccess('');  // Clear success message on input change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        // Basic validation to check if all fields are filled
        if (Object.values(formData).some(value => value.trim() === '')) {
            setError("Please fill out all fields.");  // Set error message if any field is empty, then exit function
            return;
        }

        const { data, error } = await supabase  // Insert new SCP record into the database table
            .from('scp_files')
            .insert([formData])  // Insert form data as a new record
            .select()  // Select the newly created record
            .single();  // Use .single() to return a single object instead of an array

        if (error) {  // If there's an error during insertion
            setError(error.message);  // Set the error message to state
        } else {
            setError(null);  // Clear any previous error message
            setShowPopup(true);  // Show success popup

            setTimeout(() => {  // Hide the popup after 3 seconds
                setShowPopup(false);
                onCreate(data);  // Call the onCreate callback with the newly created record
            }, 3000);
        }
    };

    // Render the form for creating a new SCP record
    return (
        <div className="form">
            <h2>Create New SCP Record</h2>

            {error && <div className="error-message">{error}</div>}  {/* Display error message if exists */}
            {showPopup && (  // Display success message popup if showPopup is true
                <div className="success-message">
                    <p>✅ SCP record created successfully!</p>
                </div>
            )}
            {/* Form for creating a new SCP record */}
            <form onSubmit={handleSubmit}>  
                <input className="form-input" type="text" name="title" placeholder="Title" onChange={handleChange} />
                <input className="form-input" type="text" name="object_class" placeholder="Object Class" onChange={handleChange} />
                <input className="form-input" type="text" name="image" placeholder="Image URL" onChange={handleChange} />
                <textarea className="form-textarea" name="special_containment_procedures" placeholder="Special Containment Procedures" onChange={handleChange}></textarea>
                <textarea className="form-textarea" name="description" placeholder="Description" onChange={handleChange}></textarea>
                <button className="submit-button" type="submit">Submit New Record</button>
            </form>
        </div>
    );
};

export default Create;
