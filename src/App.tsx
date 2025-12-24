import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import { Dashboard } from '@/components/Dashboard/Dashboard';

function App() {
  return (
    <MusicPlayerProvider>
      <Dashboard />
    </MusicPlayerProvider>
  );
}

export default App;
