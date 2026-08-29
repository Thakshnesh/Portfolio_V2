# Thakshnesh B — 3D Interactive Portfolio Website 🚀

A full-stack 3D portfolio website for **Thakshnesh B** (Electronics Engineering Undergraduate specializing in VLSI Design & Technology, Embedded Systems, and AI).

---

## 🌟 Features & Highlights

- **3D Hero Holographic Avatar Card**:
  - Multi-layered 3D holographic tilt card featuring Thakshnesh's cutout portrait with realistic mouse parallax, specular sheen, and floating status indicators.
- **3D Silicon Matrix Background**:
  - Interactive Three.js WebGL canvas with pulsing silicon microchip wafer, circuit traces, particle stars, and mouse pan reaction.
- **Interactive 3D Hardware Lab**:
  - **Solar Tracking System 3D Simulator**: Interactive dual-axis solar tracker on a gimbal that rotates to follow a draggable or auto-orbiting 3D sun, calculating real-time azimuth/elevation angles, LDR differential lux (A0-A3), and live photovoltaic power efficiency.
  - **MQ-2 Smoke & Gas Chamber 3D Simulator**: Interactive electrochemical gas sensor station with 3D smoke particle generator, heating coil glow, oscilloscope waveform, and alert strobe alarms (>500 PPM).
- **3D Orbiting Skill Constellation**:
  - 3D galaxy of technologies (Python, C, Java, VLSI D&T, Embedded Systems, IoT, VS Code, Eclipse, Canva, MIT App Inventor) with interactive inspection and live code implementations.
- **Developer CLI Terminal**:
  - Command-line emulator with commands (`help`, `bio`, `skills`, `projects`, `solar`, `smoke`, `education`, `contact`, `stats`, `matrix`, `clear`).
- **Web Audio Sound Engine**:
  - Built-in procedural synthesizer for futuristic UI clicks, laser pulses, solar servo hum, and MQ-2 hazard siren with mute toggle.
- **Full-Stack Express + SQLite Backend**:
  - `POST /api/contact`: Persists contact submissions directly to local database.
  - `GET /api/messages`: Admin inbox viewer modal inside the app.
  - `GET /api/stats` & `POST /api/analytics/event`: Live visitor and interaction analytics.
  - `GET /api/resume/download`: Automated resume download.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Three.js, Tailwind CSS, Lucide Icons, Canvas Confetti, Web Audio API.
- **Backend**: Node.js, Express, SQLite-compatible persistent store, CORS.

---

## 🚀 Running the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development (Frontend + Backend concurrently)
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 👨‍💻 Author
**Thakshnesh B**
- Email: thakshnesh@gmail.com
- LinkedIn: [thakshnesh-b-585928381](https://www.linkedin.com/in/thakshnesh-b-585928381)
- College: K. S. Rangasamy College of Technology, Tiruchengode
