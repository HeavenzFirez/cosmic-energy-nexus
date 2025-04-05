
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import EnergyGenerator from './pages/EnergyGenerator';
import SacredGeometry from './pages/SacredGeometry';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/energy-generator" element={<EnergyGenerator />} />
        <Route path="/sacred-geometry" element={<SacredGeometry />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
