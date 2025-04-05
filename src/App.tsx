
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnifiedPowerSystem from './pages/UnifiedPowerSystem';
import EnergyGenerator from './pages/EnergyGenerator';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<UnifiedPowerSystem />} />
        <Route path="/energy-generator" element={<EnergyGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
