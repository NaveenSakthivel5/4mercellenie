
import "./App.css";
import Header from "./header";
import Home from "./home";
import Contact1 from "./Contact";
import About from "./About";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Features from './Features';
import VideoOverlay from "./BlendVideo";
import VideoComponent from "./VideoBike";
import Blend from './blend'
import Battery from "./battery";
import BatteryRotation from './batteryrotation';
import Gear from "./gear";
import Section from "./section";

function App() {
  return (
    <div style={{backgroundColor:"black"}}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact1 />} />
        </Routes>
      </Router>
      {/* <Section /> */}
      {/* <BatteryRotation /> */}
      {/* <Battery /> */}
      {/* <VideoOverlay /> */}
      {/* <VideoComponent /> */}
      {/* <Blend /> */}
      {/* <Features /> */}
      {/* <Gear /> */}

    </div>
  );
}

export default App;
