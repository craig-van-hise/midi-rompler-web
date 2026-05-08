# VV | MIDI Rompler

A professional, rack-mount inspired web-based MIDI Rompler built with React, Tone.js, and Tailwind CSS.

## 🚀 Features

- **High-Quality Instruments:** Piano, Electric Piano, Acoustic Guitar, Electric Bass, Harp, Vibraphone, Strings, and Celeste.
- **Web MIDI Support:** Plug in your external MIDI controller and play directly in the browser with OMNI or port-specific routing.
- **State Persistence:** Automatically saves your knobs, sliders, and instrument selections across browser sessions.
- **Skeuomorphic Interface:** Retro rack-mount design with interactive knobs, VU meters, and LED status.
- **Full ADSR Control:** Precision envelope shaping for Attack, Decay, Sustain, and Release.
- **Built-in Effects:** Global Reverb, Pan, and Master Volume controls.
- **MIDI Sustain Support:** Full support for MIDI CC 64 (Sustain Pedal) with intelligent note holding.
- **Safety Locks:** Engine guardrails prevent crashes during instrument loading.
- **MIDI Panic:** One-click emergency release for all active notes.

## 🛠 Tech Stack

- **Framework:** React 19 (Vite)
- **Audio Engine:** Tone.js & smplr
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion

## 📂 Project Structure

```text
.
├── src
|  ├── App.tsx          # Main UI and State management
|  ├── audio
|  |  ├── engine.ts    # Tone.js/smplr hybrid engine with buffer locks
|  |  └── useMidi.ts   # Web MIDI Hook & Sustain Logic
|  ├── components      # Skeuomorphic UI Components (Knobs, VU Meters)
|  ├── lib             # Utility hooks and functions
|  |  └── usePersistentState.ts # LocalStorage sync hook
|  └── main.tsx        # App entry point
└── public             # Static assets and samples
```

## 🚦 Quick Start

1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Run Locally:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:5173`.

## 🎹 Usage

1. **Power On:** Click the power icon to initialize the audio engine. If prompted, click anywhere on the page to enable audio.
2. **Select MIDI Input:** Use the dropdown to choose your connected MIDI device or use OMNI mode.
3. **Configure Channel:** Match the MIDI channel to your controller (default is Channel 1).
4. **Tweak Sound:** Use the knobs to adjust volume, panning, reverb, and ADSR settings. Your changes are saved automatically.

---

Created by **Craig Van Hise** | [virtualvirgin.net](https://virtualvirgin.net)
