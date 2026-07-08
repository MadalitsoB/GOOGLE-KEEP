# Google Keep Clone

A note-taking app built with vanilla HTML, CSS, and JavaScript. This project recreates the core functionality of Google Keep with a clean interface and persistent storage.

## Features

- Create, edit, and delete notes
- Archive notes to remove them from the main view
- Notes are saved automatically to browser storage
- Responsive design that works on desktop and mobile
- Simple, intuitive interface

## Getting Started

### Quick Start

Just open `index.html` in your browser. That's it.

### Using a Local Server

If you want to run a local server (recommended for better performance):

**Python 3:**

```bash
cd path/to/GOOGLE\ KEEP
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

**Python 2:**

```bash
cd path/to/GOOGLE\ KEEP
python -m SimpleHTTPServer 8000
```

**Node.js:**

```bash
npm install -g http-server
cd path/to/GOOGLE\ KEEP
http-server -p 8000
```

## How to Use

**Creating a Note**

1. Click "Take a note..." at the top
2. Enter a title and your content
3. Click "Save"

**Editing a Note**

1. Click on any note
2. Make your changes
3. Click "Save"

**Archiving a Note**

1. Hover over a note
2. Click the archive icon
3. The note will be hidden

**Deleting a Note**

1. Hover over a note
2. Click the delete icon
3. The note is permanently removed

## What's Inside

- `index.html` - Main structure and layout
- `styles.css` - Styling and responsive design
- `script.js` - Core functionality (create, edit, delete, archive, storage)
- `assets/` - Icon files

## Technology

- HTML5 for structure
- CSS3 for styling (flexbox, grid, media queries)
- Vanilla JavaScript (no frameworks)
- Browser localStorage for saving notes

## Storage

Notes are saved in your browser's local storage, so they persist between sessions. Clearing your browser cache will delete all notes.

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge) on desktop and mobile.

## Notes

- This is a simplified version of Google Keep focusing on core features
- All data is stored locally in your browser
- No accounts or sign-in required
