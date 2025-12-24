# Professional Music Player

A modern, feature-rich music player built with React, TypeScript, and Vite. Designed with professional UI/UX principles and software engineering best practices.

## 🎵 Features

- **Modern UI/UX**: Glassmorphism design with smooth animations
- **Full Playback Controls**: Play, pause, next, previous, seek, volume control
- **Advanced Features**: Shuffle, repeat modes (off/all/one), playlist management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Persistent State**: Remembers volume, repeat mode, and last played track
- **Visual Feedback**: Animated album art, progress bars, and playing indicators
- **Accessibility**: Full keyboard navigation and ARIA labels

## 🏗️ Software Engineering Principles Applied

### 1. **SOLID Principles**
- **Single Responsibility**: Each component/hook has one clear purpose
- **Open-Closed**: Easy to extend with new features without modifying existing code
- **Liskov Substitution**: Components are interchangeable through props interfaces
- **Interface Segregation**: Minimal, focused TypeScript interfaces
- **Dependency Inversion**: Components depend on abstractions (Context API)

### 2. **Design Patterns**
- **Component Composition**: Breaking down UI into reusable components
- **Context API**: Centralized state management
- **Custom Hooks**: Encapsulated business logic (useAudioPlayer, usePlaylist)
- **Container/Presentational**: Separation of logic and UI

### 3. **Code Quality**
- **TypeScript**: Full type safety throughout the application
- **DRY (Don't Repeat Yourself)**: Reusable utilities and constants
- **Separation of Concerns**: Clear folder structure and file organization
- **Error Handling**: Graceful degradation and error boundaries
- **Performance**: Memoization, debouncing, and optimized re-renders

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MusicPlayer/    # Main player container
│   ├── NowPlaying/     # Track display and album art
│   ├── PlayerControls/ # Playback buttons
│   ├── ProgressBar/    # Seek and time display
│   ├── VolumeControl/  # Volume slider and mute
│   └── Playlist/       # Track list management
├── context/            # React Context for state management
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── data/               # Music library data
├── utils/              # Utility functions
├── constants/          # Configuration constants
└── main.tsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 🎨 UI/UX Highlights

- **Glassmorphism**: Modern frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Dynamic, animated gradient backgrounds
- **Smooth Animations**: 60fps animations for rotating album art and controls
- **Visual Hierarchy**: Clear focus on current track with supporting elements
- **Interactive Elements**: Hover states, active states, and visual feedback
- **Responsive Typography**: Adapts to different screen sizes
- **Color Theory**: Purple-blue gradient theme for calm, modern aesthetic

## 🔧 Technical Highlights

- **Custom Audio Hook**: Encapsulated Web Audio API logic
- **Playlist Management**: Smart shuffle algorithm and track navigation
- **LocalStorage Integration**: Persistent user preferences
- **Type Safety**: Full TypeScript coverage with strict mode
- **CSS Modules**: Scoped styles per component
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: Lazy loading images, optimized re-renders

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Lucide React**: Modern icon library
- **CSS3**: Advanced styling with animations and effects

## 📝 License

This project is open source and available for educational purposes.

---

Built with ❤️ using modern web technologies and best practices.
