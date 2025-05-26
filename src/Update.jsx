import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';  // Import Supabase client
import './App.css';  // Import CSS for styling

// Update component to handle updating SCP records
const Update = ({ item, onUpdateComplete }) => {
    const [formData, setFormData] = useState({ ...item });  // Initialize form data with the item to be updated
    const [error, setError] = useState('');  // State to hold error messages
    const [showPopup, setShowPopup] = useState(false);  // State to control success popup visibility

    // Effect to update formData when item changes
    useEffect(() => {
        setFormData({ ...item });  // Update formData with the new item data when item prop changes
    }, [item]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });  // Update formData state with input values
        setError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        const fieldsToValidate = [  // Fields to validate before submission
            formData.title,
            formData.object_class,
            formData.image,
            formData.special_containment_procedures,
            formData.description
        ];

        if (fieldsToValidate.some(value => value.trim() === '')) {  // Check if any field is empty
            setError('Please fill out all fields.');  // Set error message if any field is empty, then exit function
            return;
        }

        const { data: updatedItem, error } = await supabase  // Update the SCP record in the database table
            .from('scp_files')
            .update({  // Update the fields with the new values from formData
                title: formData.title,
                object_class: formData.object_class,
                image: formData.image,
                special_containment_procedures: formData.special_containment_procedures,
                description: formData.description
            })
            .eq('id', item.id)  // Match the record by its ID
            .select()  // Select the updated record
            .single();  // Use .single() to return a single object instead of an array

        if (error) {  // If there's an error during update
            setError(error.message);  // Set the error message to state
        } else {  // If update is successful
            setError(null);  // Clear any previous error message
            setShowPopup(true);  // Show success popup
            setTimeout(() => {  // Hide the popup after 3 seconds
                setShowPopup(false);  // Hide the success popup
                onUpdateComplete(updatedItem);  // Call the onUpdateComplete callback with the updated record
            }, 3000);
        }
    };

    // Render the form for updating an SCP record
    return (
        <div className="form">
            <h2>Update SCP Record</h2>

            {error && <div className="error-message">{error}</div>}  {/* Display error message if exists */}
            {showPopup && (  // Display success message popup if showPopup is true
                <div className="success-message">
                    <p>✅ SCP record updated successfully!</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Title"
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    type="text"
                    name="object_class"
                    value={formData.object_class}
                    placeholder="Object Class"
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    type="text"
                    name="image"
                    value={formData.image}
                    placeholder="Image URL"
                    onChange={handleChange}
                />
                <textarea
                    className="form-textarea"
                    name="special_containment_procedures"
                    value={formData.special_containment_procedures}
                    placeholder="Special Containment Procedures"
                    onChange={handleChange}
                />
                <textarea
                    className="form-textarea"
                    name="description"
                    value={formData.description}
                    placeholder="Description"
                    onChange={handleChange}
                />
                <button className="submit-button" type="submit">Submit Update</button>
            </form>
        </div>
    );
};

export default Update;
