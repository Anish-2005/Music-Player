/**
 * Root App Component
 * Provides global context and renders dashboard
 */

import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <MusicPlayerProvider>
      <Dashboard />
    </MusicPlayerProvider>
  );
}

export default App;
