### FILE: project_tree.txt


/Users/vv2024/Documents/Repos - vv2024/MIDI/WebApps/midi-rompler-web
├── # Prompts
|  ├── # 14.md
|  ├── # 15.md
|  ├── # 16.md
|  └── XOlder
|     ├── # 1.md
|     ├── # 10.md
|     ├── # 11.md
|     ├── # 12.md
|     ├── # 13.md
|     ├── # 2.md
|     ├── # 3.md
|     ├── # 4.md
|     ├── # 5.md
|     ├── # 6.md
|     ├── # 7.md
|     ├── # 8.md
|     └── # 9.md
├── PROJECT_CONTEXT_BUNDLE.md
├── PROJECT_STATE.md
├── README.md
├── index.html
├── llms.txt
├── metadata.json
├── package-lock.json
├── package.json
├── project_tree.txt
├── public
|  └── samples
|     └── electric-piano
├── src
|  ├── App.tsx
|  ├── audio
|  |  ├── engine.test.ts
|  |  ├── engine.ts
|  |  └── useMidi.ts
|  ├── components
|  |  ├── Knob.tsx
|  |  └── VUMeter.tsx
|  ├── index.css
|  ├── lib
|  |  ├── usePersistentState.ts
|  |  └── utils.ts
|  └── main.tsx
├── tsconfig.json
└── vite.config.ts

directory: 656 file: 4998

ignored: directory (73)


[2K[1G

### FILE: PROJECT_STATE.md

# Project State: MIDI Rompler Web

## 1. Architecture & Structure
```text
.
├── PROJECT_STATE.md
├── README.md
├── index.html
├── llms.txt
├── package.json
├── project_tree.txt
├── public
|  └── samples
|     └── electric-piano
├── src
|  ├── App.tsx
|  ├── audio
|  |  ├── engine.test.ts
|  |  ├── engine.ts
|  |  └── useMidi.ts
|  ├── components
|  |  ├── Knob.tsx
|  |  └── VUMeter.tsx
|  ├── index.css
|  ├── lib
|  |  ├── usePersistentState.ts
|  |  └── utils.ts
|  └── main.tsx
├── tsconfig.json
└── vite.config.ts
```

## 2. Tech Stack
- **Core:** React 19, Vite 6, TypeScript
- **Audio:** Tone.js v15.x, smplr (for orchestral instruments)
- **UI:** Tailwind CSS, Lucide React, Framer Motion
- **MIDI:** Web MIDI API
- **Persistence:** LocalStorage via custom hooks

## 3. System Capabilities
- **Audio Engine:** Professional hybrid engine using Tone.js Samplers and `smplr` for high-quality instrument patches. Features strict **Buffer Locks** to prevent crashes during instrument loading.
- **Dynamic Controls:** Features per-instrument gain staging, ADSR envelope controls, master volume, panning, and reverb.
- **Persistence Architecture:** Automatic synchronization of all UI parameters (Instrument, ADSR, Volume, Pan, Reverb, MIDI Channel) with `localStorage`.
- **MIDI Integration:** Real-time MIDI message handling with **OMNI** and port-specific routing. Supports note-on/off, velocity sensitivity, and a robust Sustain Pedal (CC 64) implementation.
- **Auto-Power Logic:** Intelligent interaction-based "Auto-Power" architecture to bypass browser autoplay restrictions with explicit UI guidance if the context is suspended.
- **Interface:** Retro rack-mount aesthetics with custom skeuomorphic controls (Knobs, VU Meters), LED status indicators, and a dedicated MIDI channel selector.
- **Safety:** Global MIDI panic functionality to flush all active voices and reset state.

## 4. Recent Evolution
- **Stability & UX Hardening:** Implemented engine guardrails to prevent playback during sample loading and added a UI warning system for suspended audio contexts.
- **Persistence & Routing:** Introduced `usePersistentState` for full session retention and implemented an OMNI MIDI routing mode with robust port fallback.
- **Instrument Expansion:** Integrated `smplr` for orchestral patches and finalized internal gain staging for balanced polyphony.


### FILE: README.md

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


