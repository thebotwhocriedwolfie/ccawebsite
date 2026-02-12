import { useEffect } from "react";
import emailjs from '@emailjs/browser';

const sendEmailReminder = (event) => {
    emailjs.send(
        "service_dtl8xdm",  // Service ID
        "template_g72hnrn", // Template ID
        {
            event_name: event.name,
            event_date: event.date,
            message: `${event.name} is happening today!`,
        },
        "6j7wpaIAsMbmzfEZt" // Public key
    ).then((response) => {
        console.log("Email sent!", response.status, response.text);
    }).catch((err) => console.error("Failed to send email", err));
};

export default function EmailReminder({ events }) {
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];

        events.forEach(event => {
            const eventDate = new Date(event.date).toISOString().split("T")[0];

            if (eventDate === today) { 
                sendEmailReminder(event);
            }
        });
    }, [events]);

    return null; //no design
}
