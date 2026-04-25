// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home ";
import Navbar from "./Navbar";
import HeroSlider from "./HeroSlider";
import Footer from "./Footer";
import BookASession from "./BookASession";
import About from "./About";
import Destination from "./Destination";
import TripCatalog from "./TripCatalog";
import Contact from "./Contact";
import RomanticDestination from'./RomanticDestination';
import Detail from "./Detail";
import AuthPage from "./AuthPage";
import Feedback from"./Feedback"

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/HeroSlider" element={<HeroSlider />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/BookASession" element={<BookASession />} />
        <Route path="/About" element={<About />} />
        <Route path="/Destination" element={<Destination/>} />
        <Route path="/TripCatalog" element={<TripCatalog/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/RomanticDestination" element={<RomanticDestination/>} />
         <Route path="/detail" element={<Detail />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/Feedback" element={<Feedback />} />

      

        
      </Routes>
    </Router>
  );
}

export default App;