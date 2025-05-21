import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css'; // Optional: separate file if preferred

const Create = ({ onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        object_class: '',
        image: '',
        special_containment_procedures: '',
        description: ''
    });

    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (Object.values(formData).some(value => value.trim() === '')) {
            setError("Please fill out all fields.");
            return;
        }

        const { data, error } = await supabase
            .from('scp_files')
            .insert([formData])
            .select()
            .single();

        if (error) {
            setError(error.message);
        } else {
            setError(null);
            setShowPopup(true);

            setTimeout(() => {
                setShowPopup(false);
                onCreate(data);
            }, 3000);
        }
    };

    return (
        <div className="form">
            <h2>Create New SCP Record</h2>

            {error && <div className="error-message">{error}</div>}
            {showPopup && (
                <div className="success-message">
                    <p>✅ SCP record created successfully!</p>
                </div>
            )}
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
