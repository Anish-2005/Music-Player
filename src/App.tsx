import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Update document title dynamically
    document.title = 'Music Maniac | Professional Music Player - Stream Your Favorite Tracks';
    
    // Add semantic HTML attributes
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.setAttribute('role', 'application');
      rootElement.setAttribute('aria-label', 'Music Maniac - Professional Music Player Application');
    }
  }, []);

  return (
    <MusicPlayerProvider>
      <Dashboard />
    </MusicPlayerProvider>
  );
}

export default App;
