import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Checkin from "./pages/Checkin";
import Report from "./pages/Report/Evsreport";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Checkin" element={<Checkin />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}
