import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import background from "../images/kick.png";

const SingleEvent = () => {
  const { id } = useParams(); // Get the dynamic event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data when component mounts
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/events/${id}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{event?.name}</h1>
      <p>{event?.description}</p>
      <p>{event?.date}</p><br></br>
      <div className="kick">
        <img src={background} alt="Kick Pose" />
        <h4> SEE YOU THERE!</h4>
      </div>
    </div>
  );
};

export default SingleEvent;