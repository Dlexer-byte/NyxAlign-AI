import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { supabase } from './lib/supabase'; // Ensure this import is present

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
