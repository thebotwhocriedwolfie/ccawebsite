import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        date: "",
        events: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/events/${id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const event = await response.json();
            if (!event) {
                window.alert(`Event with id ${id} not found`);
                return;
            }

            setForm(event);
        }
        fetchData();
    }, [params.id]);

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedEvent = {
            name: form.name,
            description: form.description,
            date: form.date
        };

        await fetch(`http://localhost:5000/events/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedEvent),
            headers: {
                "Content-Type": "application/json",
            },
        });

        navigate("/event");
    }

    return (
        <div className="container">
            <h3>Edit an Event</h3>
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
