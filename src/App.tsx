
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnifiedPowerSystem from './pages/UnifiedPowerSystem';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnifiedPowerSystem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
