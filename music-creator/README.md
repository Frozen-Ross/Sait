# Music Creator - AI-Powered Music Generation

A full-featured web application inspired by SUNO for creating music using React.

## Features

- **Create Tab**: Generate music tracks with custom prompts
  - Text prompt input for describing desired music
  - Genre selection (Pop, Rock, Hip Hop, Electronic, Jazz, Classical, and more)
  - Mood selection (Happy, Sad, Energetic, Calm, Romantic, etc.)
  - Duration control (15-120 seconds)
  - Real-time generation progress indicator

- **Library Tab**: Manage your created tracks
  - View all generated tracks in a grid layout
  - Visual waveform representation for each track
  - Play/pause functionality with player bar
  - Delete tracks from library
  - Track metadata display (genre, mood, creation date)

- **Music Player**: Built-in audio player
  - Persistent player bar at bottom of screen
  - Play/pause controls
  - Previous/next track navigation
  - Progress bar with time display
  - Currently playing track info

- **Responsive Design**: Works on desktop and mobile devices
  - Modern gradient UI with glass-morphism effects
  - Smooth animations and transitions
  - Mobile-optimized layouts

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd music-creator
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
music-creator/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── dist/                # Production build output
```

## Usage

1. **Create Music**:
   - Go to the "Create" tab
   - Enter a description of the music you want
   - Select genre and mood
   - Adjust duration
   - Click "Generate Music"
   - Wait for the generation to complete (simulated)

2. **Manage Library**:
   - Switch to "Library" tab to see all created tracks
   - Click "Play" to listen to a track
   - Use the player controls to manage playback
   - Delete unwanted tracks

3. **Player Controls**:
   - Play/Pause button in the center
   - Previous/Next buttons for navigation
   - Close button to dismiss the player
   - Progress bar shows playback position

## Note

This is a frontend demonstration application. In a production environment, you would need to:

- Connect to a backend API for actual music generation (e.g., using AI models like MusicLM, Jukebox, or similar)
- Implement user authentication
- Add cloud storage for tracks
- Integrate real audio playback with streaming
- Add download/share functionality

## License

MIT
