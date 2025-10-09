import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login_new'
import Ocr from './pages/scan/ocr';
import EvsReport from './pages/Report/Evsreport';
import Register from './pages/Register';    
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ocr" element={<Ocr />} />
        <Route path="/report" element={<EvsReport />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );  
}
