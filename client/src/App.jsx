import React from 'react'
// We use Route in order to define the different routes of our application
import{Route,Routes, useLocation} from "react-router-dom"
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/record/telephoneList";
import Create from "./components/record/create";
import Edit from "./components/record/edit";
import Home from "./components/home"
import Login from "./components/login/login"
import Signup from "./components/login/signup"
import Event from "./components/event/event"
import AddEvent from "./components/event/createEvent"
import EditEvent from "./components/event/editEvent";
import SingleEvent from "./components/event/singleEvent";
//guest page
import Guest from "./components/guesthome";
import Record2 from"./components/record/guestTele";



const App = () => {
  const location=useLocation()
  return (
    <div>
      {location.pathname !=='/login' && location.pathname!=='/'&& location.pathname !=='/signup' &&<Navbar />}
      <Routes>
        <Route path="/" element={<Guest />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/record" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/event" element={<Event />} />
        <Route path="/createEvent" element={<AddEvent />} />
        <Route path="/editEvent/:id" element={<EditEvent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/record2" element={<Record2 />} />
        <Route path="/events/:id" element={<SingleEvent/>} />
      </Routes>
    </div>
  );
};

export default App;
