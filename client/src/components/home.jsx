import React from "react";
import "./Home.css"; // External CSS file for styles
//import tpImage from "./images/tp.png"; // Adjust the path to your image
import p1Image from "./images/p1.png";
import p3Image from "./images/p3.jpg";
import p2Image from "./images/p2.jpg";
import p4Image from "./images/p4.png";
import background from "./images/kick.png";


export default function Home() {
    const handleLogout = () => {
        localStorage.removeItem("token"); // remove token
        window.location.href = "/";  // redirect to guest page
      };
    return (
      <div>
      <button onClick={handleLogout} className="btn btn-outline-danger">
        Logout
      </button>
    
      {/* About Us Section */}
      <div className="about-container">
        <div className="about">
          <h2>About Us</h2>
          <p>
            Taekwondo is the oldest Korean martial art and is still included 
            in the Korean military training today. Taekwondo competitions 
            involve poomsae, a set of defined pattern defence and attack 
            techniques, and kyorugi, which involves sparring with an 
            opponent. TP Taekwondo Team competes in the Polytechnic-ITE 
            (POL-ITE) Taekwondo Games and external competitions annually.
          </p>
        </div>
        
        {/* Kick Image */}
        <div className="kick">
          <img src={background} alt="Kick Pose" />
        </div>
      </div>
    
      {/* Table Section */}
      <br />
      <table id="exco" border="1" className="center">
        <thead>
          <tr>
            <td><h3>Our Exco</h3></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src={p1Image} alt="Resource Manager" /></td>
            <td><img src={p3Image} alt="Vice Captain" /></td>
            <td><img src={p2Image} alt="Captain" /></td>
            <td><img src={p4Image} alt="Social Media Rep" /></td>
          </tr>
          <tr>
            <td><b>Resource Manager</b></td>
            <td><b>Vice Captain</b></td>
            <td><b>Captain</b></td>
            <td><b>Social Media Rep</b></td>
          </tr>
          <tr>
            <td>Daniel Tan</td>
            <td>Ashley Tay</td>
            <td>Bryan Teo</td>
            <td>Mei Loh</td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }