import { Dropdown } from "bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [notifications, setNotifications] = useState([]);
    
    const addNotification = (message) => {
        setNotifications(prev => [...prev, message]);
    };

    const [form, setForm] = useState({
        name: "",
        description: "",
        date: ""
    });

    const navigate = useNavigate();

    // Update form state
    function updateForm(value) {
        return setForm(prev => ({
            ...prev,
            ...value
        }));
    }

    // Function to check for special characters
    function specialChar(name) {
        const forbiddenChars = ['@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '/'];
        return name.split("").some(char => forbiddenChars.includes(char));
    }

    // Form submission handler
    async function onSubmit(e) {
        e.preventDefault();

        // Get current date (normalized)
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); 

        // Convert input to a Date object (normalized)
        var selectedDate = new Date(form.date);
        selectedDate.setHours(0, 0, 0, 0);

        // Validation checks
        if (!form.name || !form.date) {
            window.alert("Please fill in all required fields.");
            return;
        }

        if (selectedDate < currentDate) { // Compare selected date correctly
            window.alert("The chosen date has already passed.");
            return;
        }

        if (form.name.length > 80) {
            window.alert("Maximum length for name is 80 characters.");
            return;
        }

        if (specialChar(form.name)) {
            window.alert("Name contains special characters. Accepts letters, spaces, and ! or - only.");
            return;
        }

        // Prepare event data
        const newEvent = { ...form };

        try {
            // Send POST request
            const response = await fetch("http://localhost:5000/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });

            // Check if response is OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            // Success - Reset form and navigate
            setForm({ name: "", description: "", date: "" });
            addNotification("New event created!");
            navigate("/event");

        } catch (error) {
            // Display error message
            window.alert(error.message);
        }
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="container">
            <h3>Add an Event</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={form.description}
                        onChange={(e) => updateForm({ description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={form.date}
                        onChange={(e) => updateForm({ date: e.target.value })}  
                />
                </div>
        
                <div className="form-group">
                    <input
                        type="submit"
                        value="Add"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}