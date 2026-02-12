import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar styles
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Notif from "./notif";
import EmailReminder from "./email";
//import "./event.css";

// EventButton Component to display individual events
const EventButton = ({ event, onClick }) => {
    const colors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const formattedDate = new Date(event.date).toLocaleDateString(); // Format date


    return (
        <button id="eventButton"
            style={{
                backgroundColor: randomColor,
                border: 'none',
                padding: '10px',
                margin: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '80%',
                textAlign: 'left'
            }}
            onClick={onClick}
        >
            <strong>{event.name}</strong> - {formattedDate}
        </button>
    );
};

// EventList Component with Calendar Integration
export default function EventList() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // To show details when an event is clicked
    const [selectedDate, setSelectedDate] = useState(new Date()); // To track selected date
    const [error, setError] = useState(null);  // Handle errors

    // Fetch events from backend
    useEffect(() => {
        async function getEvents() {
            try {
                const response = await fetch("http://localhost:5000/events/");
                if (!response.ok) throw new Error("Network response was not ok");
                const eventsData = await response.json();
                console.log("Fetched events:", eventsData); // Log the fetched events
                setEvents(eventsData);
            } catch (error) {
                setError(error.message);
            }
        }
        getEvents();
    }, []);  // Fetch once on component mount

    // Delete event
    async function deleteEvent(id) {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await fetch(`http://localhost:5000/events/${id}`, { method: "DELETE" });
                setEvents(events.filter(event => event._id !== id));
                setSelectedEvent(null);  // Clear selected event if deleted
                window.alert("Event deleted successfully!");
                addNotification("Event Deleted!");
            } catch (error) {
                window.alert("Failed to delete the event.");
            }
        }
    }

    // Highlight event days on the calendar
    function tileClassName({ date, view }) {
        if (view === 'month') {
            const eventDates = events.map(event => new Date(event.date).toDateString());
            return eventDates.includes(date.toDateString()) ? "event-day" : null;
        }
    }

    // Render the list of events as buttons
    function renderEventButtons() {
        return events.length > 0 ? (
            events.map((event) => (
                <EventButton
                    key={event._id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                />
            ))
        ) : (
            <p>No events available.</p>
        );
    }

    return (
        <div>
             {/*Adding Notifications*/}
            <ToastContainer />
            <EmailReminder events={events} />
        <div className="container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

            {/* Show error if exists */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Calendar with event highlights */}
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={tileClassName}
            />

            {/* Event Buttons for all events */}
            <div style={{ width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ width: '80%', alignText: 'left' }}>
            <h3>Reminders</h3>
            <Notif events={events} />
            </div>
                {renderEventButtons()}
                </div>

            {/* event details section */}
            {selectedEvent && (
                <div style={{
                    backgroundColor: "#f0f0f0",
                    padding: "15px",
                    marginTop: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                    <h4>{selectedEvent.name}</h4>
                    <p><strong>Description:</strong> {selectedEvent.description}</p>
                    <p><strong>Date:</strong> {selectedEvent.date}</p>
                    {/* sharable link for event */}
                    <button className="btn btn-primary"
                    onClick={() => {
                        const eventLink = `${window.location.origin}/events/${selectedEvent._id}`;
                        navigator.clipboard.writeText(eventLink);
                        alert("Event link copied to clipboard!");
                    }}
                    style={{ marginRight: "10px" }}>
                         Share Event🔗
                         </button>

                    {/* edit and delete Buttons */}
                    <div>
                        <Link className="btn btn-link" to={`/editEvent/${selectedEvent._id}`} style={{  marginRight: "10px", marginTop: "10px"}}>Edit</Link>
                        <button className="btn btn-danger" onClick={() => deleteEvent(selectedEvent._id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
        <style>
            {`.event-day {
                background-color:rgb(221, 82, 51) !important;
                border-radius: 50%;
                color: white;
            }`}
        </style>
        </div>
    );
}



