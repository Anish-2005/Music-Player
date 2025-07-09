# 🎵 JavaScript Music Player

A modern, responsive web-based music player built with HTML, CSS, and JavaScript. Features a beautiful UI with dynamic background gradients and smooth animations.

## ✨ Features

### 🎮 Player Controls
- **Play/Pause**: Toggle music playback with smooth transitions
- **Next/Previous Track**: Navigate through your playlist seamlessly
- **Random Play**: Shuffle through songs randomly for variety
- **Repeat Track**: Loop your favorite song continuously
- **Seek Control**: Jump to any part of the song with the progress bar
- **Volume Control**: Adjust volume with an intuitive slider

### 🎨 Visual Features
- **Dynamic Backgrounds**: Auto-generated gradient backgrounds that change with each song
- **Rotating Album Art**: Animated circular album covers that rotate while playing
- **Audio Visualizer**: Animated wave bars that respond to playback status
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, minimalist interface with smooth hover effects

### 🎵 Music Library
Pre-loaded with a diverse collection of songs including:
- Bollywood hits from popular movies like Dunki and Fighter
- Regional songs in Hindi, Punjabi, and Bengali
- Popular artists like Arijit Singh, Pritam, Darshan Raval, and more

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation
1. Clone or download this repository
```bash
git clone https://github.com/yourusername/music-player.git
```

2. Navigate to the project directory
```bash
cd music-player
```

3. Open `index.html` in your web browser
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

## 📁 Project Structure
```
Music-Player/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with animations and responsive design
├── script.js           # JavaScript functionality and music data
├── README.md           # Project documentation
└── music/              # Audio files directory
    ├── banda.mp3
    ├── chal.mp3
    ├── chandni.mp3
    ├── dil.mp3
    ├── dilb.mp3
    ├── ishq.mp3
    ├── jhumka.mp3
    ├── jiya.mp3
    ├── kismat.mp3
    ├── lutt.mp3
    ├── main.mp3
    ├── mitti.mp3
    ├── nikle.mp3
    ├── o.mp3
    ├── saajan.mp3
    ├── vande.mp3
    └── waheguru.mp3
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and audio elements
- **CSS3**: Modern styling, flexbox, animations, and responsive design
- **Vanilla JavaScript**: Pure JS without any frameworks
- **Font Awesome**: Icons for player controls

### Key JavaScript Features
- Dynamic track loading and management
- Real-time progress tracking
- Random color generation for backgrounds
- Audio event handling
- Time formatting and display
- Responsive volume and seek controls

### CSS Highlights
- CSS Grid and Flexbox for layout
- Custom styled range sliders
- Smooth transitions and hover effects
- Rotating animations for album art
- Gradient background generation
- Mobile-responsive design

## 🎯 How to Use

1. **Starting the Player**: Open the application and click the play button
2. **Changing Songs**: Use the forward/backward buttons or let songs play automatically
3. **Random Mode**: Click the shuffle icon to enable random playback
4. **Volume Control**: Use the volume slider on the right
5. **Seeking**: Click anywhere on the progress bar to jump to that position
6. **Repeat**: Click the repeat icon to loop the current song

## 🎵 Adding Your Own Music

To add your own songs:

1. Add your audio files (MP3 format recommended) to the `music/` folder
2. Update the `music_list` array in `script.js`:

```javascript
{
    img: 'path/to/album/art.jpg',
    name: 'Song Title',
    artist: 'Artist Name',
    music: 'music/your-song.mp3'
}
```

## 🎨 Customization

### Changing Colors
- Modify the gradient colors in the `random_bg_color()` function
- Update the CSS variables for consistent theming

### Styling Updates
- Edit `style.css` to customize the appearance
- Modify button styles, fonts, and layout as needed

### Adding Features
- Extend the JavaScript functionality in `script.js`
- Add new controls or display elements in `index.html`

## 📱 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎵 Current Playlist

The player comes with these pre-loaded tracks:
1. **Lutt Putt Gaya** - Pritam, Arijit Singh (Dunki)
2. **Nikle The Kabhi Hum Ghar Se** - Pritam, Sonu Nigam (Dunki)
3. **Banda** - Pritam, Diljit Dosanjh (Dunki)
4. **O Maahi** - Pritam, Arijit Singh (Dunki)
5. **Main Tera Rasta Dekhunga** - Pritam, Vishal Mishra
6. **Waheguru** - Shekhar Ravjiani
7. **Mitti** - Suresh Wadkar (Fighter)
8. **Vande Mataram** - Vishal Dadlani (Fighter)
9. **Dil Chah Raha Hai** - Vishal Mishra & Shilpa Rao
10. **Saajan Ve** - Darshan Raval
11. **Chandni Raat** - Ali Sethi
12. **Jhumka** - Bijay Anand Sahu
13. **Jiya Tui Chara** - Arijit Singh
14. **Quismat ki hawa** - Bhagwan Dada
15. **Dil Banaane Waaleya** - Arijit Singh

## 🎸 Screenshots

### Main Player Interface
![Music Player Interface](https://user-images.githubusercontent.com/86345777/215935830-07cfc994-c4f7-421c-91c5-f2ad7a0d42d4.png)

## 🔧 Troubleshooting

**Audio not playing?**
- Ensure audio files are in the correct format (MP3 recommended)
- Check that file paths in `script.js` match your audio files
- Verify browser audio permissions

**Styling issues?**
- Clear browser cache and reload
- Check console for CSS/JS errors
- Ensure Font Awesome CDN is loading properly

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the browser console for error messages
- Ensure all files are properly linked

---

**Enjoy your music!** 🎵✨
