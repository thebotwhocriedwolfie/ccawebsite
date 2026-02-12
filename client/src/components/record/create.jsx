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
        email: "",
        year: "",
        school: "",
        belt: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    //special character check function
    //define special character function
function specialChar(name) {
    var operators = ['!','@','#','$','%',"^",'&','*','(',')','-','_','+','=','/'];

    for (var i = 0; i < name.length; i++) {
        if (operators.includes(name[i])) {
            return true; 
        }
    }

    return false; 
}
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
        
        //validation checks
        if (!form.name || !form.email || !form.year || !form.school || !form.belt) {
            window.alert("Please fill in all fields.");
            return;
        }

        if (form.name.length > 80) {
            window.alert("Maximum length for name is 80 characters.");
            return;
        }

        if (specialChar(form.name)) { // Check for special characters
            window.alert("Name contains special characters. Use letters and spaces only.");
            return;
        }

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch("http://localhost:5000/record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        setForm({ name: "", email: "", year: "" , school:"", belt:""});
        addNotification("New member created!");
        navigate("/record");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="container">
            <h3>Create New Record</h3>
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
                    <label htmlFor="position">Email</label>
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
                <select id="year" name="year" className="form-control" value={form.year} onChange={(e) => updateForm({ year: e.target.value })}>
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
          name="school"
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
          name="belt"
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
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}