# Playora 🎬

**Your personal video player — private, local-first, and offline.**

Playora is a single-page Progressive Web App (PWA) that lets you import, organise, and watch videos stored entirely on your own device. There is no account, no server, and no cloud upload — every byte stays in your browser's local storage.

---

## ✨ Features

### 📚 Library Management
- **Import videos** via file picker, drag & drop, or the native File System Access API
- **Duplicate detection** — matched by exact file name + size, with the option to skip or import anyway
- **Watch folders** (Chromium desktop only) — pick a folder once and Playora keeps it in sync. New files appear automatically, removed files get flagged as *missing*
- **Grid & list layouts**, searchable, with five filters (All, Unwatched, In progress, Watched, Favorites) and six sort orders
- **Bulk select** — long-press any card (or tap the *Select* pill) to multi-select for favoriting, playlist adding, or deleting
- **Automatic thumbnail generation** from the first frames of each video
- **Rename** any video; display names are cleaned from filenames by default

### ▶️ Player
- Custom controls with **auto-hide**, tap-to-toggle, and a **5-second "Up Next" countdown** for playlists
- **Gesture controls**: vertical swipe on the left for volume, on the right for brightness; double-tap to seek; long-press for 2× speed
- **Live scrub preview** — hover or drag the seek bar to see a thumbnail frame at that timestamp
- **Playback settings sheet**: speed (0.25×–2×), aspect ratio (fit / fill / stretch / original), rotation (0° / 90° / 180° / 270°), repeat, sleep timer, Picture-in-Picture
- **Subtitle support** — load `.srt` / `.vtt` files, auto-converted and displayed
- **Resume playback** from where you left off, per video
- **Lock controls** to prevent accidental taps during playback
- **Media Session integration** — lock-screen / notification controls on mobile, hardware media keys
- **Wake Lock** — optional, prevents screen sleep during playback
- **Keyboard shortcuts**: `Space`/`K` play-pause, `←`/`→` seek, `↑`/`↓` volume, `M` mute, `F` fullscreen, `0` restart

### 🎨 Themes
Eight built-in colour themes with live preview in the picker:
**Dark · Midnight · Neon · Lime · Forest · Sunset · Rose · Amethyst**

### 📁 Organisation
- **Playlists** — ordered, reorderable, with auto-advance playback
- **Favorites** — one-tap save, searchable
- **History** — grouped by day, with stats (total watched, in progress, completed), per-video progress, and "Continue watching" shelf
- **Recently deleted** — 30-day recycle bin with per-item restore, permanent delete, and automatic expiry

### 🗑️ Trash & Storage
- Deleted videos are **recoverable for 30 days**
- Automatic purge of expired trash on app launch
- Storage usage bar with browser quota estimate (falls back gracefully when unavailable)
- Clear-cache tools for history and thumbnails

### 📱 PWA
- Installable to home screen on Android, iOS, and desktop
- Works **fully offline** once loaded
- Full-screen standalone mode
- Custom install banner (with iOS-specific "Add to Home Screen" instructions)

---

## 🚀 Getting Started

### Requirements
- A modern browser: **Chrome / Edge / Brave 86+** for the best experience (folder watching, file handles)
- Firefox and Safari work for import + playback, but **do not support watched folders**
- Must be served over **HTTPS** or **localhost** for full feature parity (File System Access API requirement)

### Deploy

Playora is a static site — drop the files on **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**, or any web host. No build step.

---

## 🌐 Browser Support

| Feature | Chrome / Edge / Brave | Firefox | Safari (incl. iOS) |
|---|---|---|---|
| Import & play | ✅ | ✅ | ✅ |
| PWA install | ✅ | ⚠️ manual | ⚠️ manual (Share → Add to Home Screen) |
| Watched folders | ✅ (86+) | ❌ | ❌ |
| File handles (persist across restarts) | ✅ | ❌ | ❌ |
| Subtitle loading | ✅ | ✅ | ✅ |
| Picture-in-Picture | ✅ | ✅ | ⚠️ partial |

On **iOS**, every browser uses Safari's engine, so folder watching is unavailable there regardless of browser.

---

## 🔒 Privacy

- **No analytics, no tracking, no network calls** after initial load (fonts/Tailwind/Lucide are fetched from CDNs on first visit).
- **No accounts, no servers** — everything is client-side.
- Videos are read from your disk via the file picker or File System Access API and stored in your browser's IndexedDB.
- Deleting from the library **never** touches the original file on your disk.

---

## 🧠 Known Limitations

- **Browser storage quota** — large libraries can hit the browser's IndexedDB limit (~1 GB+ depending on device). Playora warns you when imports fail due to quota.
- **File access is temporary in some cases** — files added via the picker without a handle (e.g. on Firefox or iOS) are stored as blobs. If the blob is lost (browser clears storage), the video becomes unplayable until you **relink** it.
- **Codec support depends on the browser** — MP4 (H.264 / AAC) plays almost everywhere. MKV, AVI, and some HEVC files may not decode.
- **Missing-file detection** only works for watched folders, not standalone imports.

---

## 🗺 Roadmap Ideas

- [ ] Subtitle styling controls (size, colour, background)
- [ ] Multi-audio-track selection (browser support permitting)
- [ ] Chromecast / AirPlay support
- [ ] Chapter markers from MKV
- [ ] Export / import library metadata (playlists, history) as JSON
- [ ] Batch thumbnail regeneration
- [ ] Custom keyboard shortcut remapping

---

## 👤 Author

**Shankar Prasad Pyke**

---

<p align="center">
  <em>Playora — because your videos should stay yours.</em>
</p>
