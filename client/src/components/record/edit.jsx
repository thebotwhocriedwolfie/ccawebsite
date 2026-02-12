import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        year: "",
        school: "",
        belt: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                return;
            }

            setForm(record);
        }
        fetchData();
    }, [params.id]);

    function updateForm(value) {
        return setForm((prev) => ({ ...prev, ...value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            email: form.email,
            year: form.year,
            school: form.school,
            belt: form.belt,
        };

        await fetch(`http://localhost:5000/record/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPerson),
            headers: {
                "Content-Type": "application/json",
            },
        });

        navigate("/record");
    }

    return (
        <div className="container">
            <h3>Update Record</h3>
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <select
                        id="year"
                        className="form-control"
                        value={form.year}
                        onChange={(e) => updateForm({ year: e.target.value })}
                    >
                        <option value="">Select Year</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="PFP">PFP</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="school">School</label>
                    <select
                        id="school"
                        className="form-control"
                        value={form.school}
                        onChange={(e) => updateForm({ school: e.target.value })}
                    >
                        <option value="">Select School</option>
                        <option value="Applied Sciences">Applied Sciences</option>
                        <option value="Business">Business</option>
                        <option value="Design">Design</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Informatics and IT">Informatics and IT</option>
                        <option value="Humanities">Humanities</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="belt">Belt</label>
                    <select
                        id="belt"
                        className="form-control"
                        value={form.belt}
                        onChange={(e) => updateForm({ belt: e.target.value })}
                    >
                        <option value="">Select Belt</option>
                        <option value="Black">Black</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                        <option value="White">White</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
