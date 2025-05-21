import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

const Update = ({ item, onUpdateComplete }) => {
    const [formData, setFormData] = useState({ ...item });
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setFormData({ ...item });
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldsToValidate = [
            formData.title,
            formData.object_class,
            formData.image,
            formData.special_containment_procedures,
            formData.description
        ];

        if (fieldsToValidate.some(value => value.trim() === '')) {
            setError('Please fill out all fields.');
            return;
        }

        const { data: updatedItem, error } = await supabase
            .from('scp_files')
            .update({
                title: formData.title,
                object_class: formData.object_class,
                image: formData.image,
                special_containment_procedures: formData.special_containment_procedures,
                description: formData.description
            })
            .eq('id', item.id)
            .select()
            .single();

        if (error) {
            setError(error.message);
        } else {
            setError(null);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                onUpdateComplete(updatedItem);  // ✅ Triggers view change in App.jsx
            }, 3000);
        }
    };



    return (
        <div className="form">
            <h2>Update SCP Record</h2>

            {error && <div className="error-message">{error}</div>}
            {showPopup && (
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
