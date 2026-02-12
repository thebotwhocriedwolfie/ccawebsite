import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notif({ events }) {
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];

        events.forEach(event => {
            const eventDate = new Date(event.date).toISOString().split("T")[0];

            if (eventDate === today) { 
                toast.info(`Reminder: ${event.name} is happening today!`, { 
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        });
    }, [events]);

    return <ToastContainer />;
}

