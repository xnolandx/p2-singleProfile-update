import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb'




import HomePage from "./HomePage";
import MainSearch from "./MainSearch";
import EventSearch from './EventSearch';
import SingleProfile from "./SingleProfile";
import SingleEvent from './SingleEvent';
import Footer from "./Footer";

import CharacterContext from "./CharacterContext";
import EventContext from "./EventContext"
import AboutUs from "./AboutUs.js";
import MostWanted from "./MostWanted.js"

import './styling/app.css'
import Navbar2 from "./Navbar2";


function App() {
  const[characterCon, setCharacterCon] = useState([]);
  const value = {characterCon, setCharacterCon};
  const[eventCon, setEventCon] = useState([]);
  const value2 = {eventCon, setEventCon};

  return (
    <> 
    
    <Router>
    
    <Navbar2/>
    
    {/* <Navbar/> */}
    <div className="full-page-container">
    <CharacterContext.Provider value={value}>
      <EventContext.Provider value={value2}>
      {/* <Navbar2/> */}
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/characters" element={<MainSearch />} />
        <Route path="/characters/:characterid" element={<SingleProfile character={characterCon}/>} />
        <Route path="/events" element={<EventSearch />} />
        <Route path="/events/:eventid" element={<SingleEvent event={eventCon}/>} />
        { <Route path="/mostwanted" element={<MostWanted />}></Route> }
        <Route path="/about" element={<AboutUs />}></Route>
      </Routes>
      </EventContext.Provider>
      </CharacterContext.Provider>
      
      </div>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
