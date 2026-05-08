### FILE: project_tree.txt


/Users/vv2024/Documents/Repos - vv2024/MIDI/WebApps/midi-rompler-web
├── # Prompts
|  ├── # 14.md
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
|  |  └── utils.ts
|  └── main.tsx
├── tsconfig.json
└── vite.config.ts

directory: 656 file: 4995

ignored: directory (73)


[2K[1G

### FILE: PROJECT_STATE.md

# Project State: MIDI Rompler Web

## 1. Architecture & Structure
```text
.
├── PROJECT_CONTEXT_BUNDLE.md
├── PROJECT_STATE.md
├── README.md
├── index.html
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

## 3. System Capabilities
- **Audio Engine:** Professional hybrid engine using Tone.js Samplers and `smplr` for high-quality instrument patches. Supported instruments: Piano, E-Piano, Acoustic Guitar, Electric Bass, Harp, Vibraphone, Strings, and Celeste.
- **Dynamic Controls:** Features per-instrument gain staging, ADSR envelope controls, master volume, panning, and reverb.
- **MIDI Integration:** Real-time MIDI message handling with device selection and channel filtering. Supports note-on/off, velocity sensitivity, and a robust Sustain Pedal (CC 64) implementation with logical note tracking.
- **Interface:** Retro rack-mount aesthetics with custom skeuomorphic controls (Knobs, VU Meters), LED status indicators, and a dedicated MIDI channel selector.
- **Safety:** Global MIDI panic functionality to flush all active voices and reset state.

## 4. Recent Evolution
- **Instrument Expansion:** Integrated `smplr` library to add orchestral patches (Strings, Harp, Vibraphone, Celeste) and tuned instrument volumes for balanced gain staging.
- **Performance Hardening:** Refactored the MIDI hook to support proper sustain pedal logic and resolved polyphonic release routing issues to prevent voice clipping.
- **Infrastructure:** Finalized deployment workflows and synchronized project documentation for CI/CD readiness.



### FILE: README.md

# VV | MIDI Rompler

A professional, rack-mount inspired web-based MIDI Rompler built with React, Tone.js, and Tailwind CSS.

## 🚀 Features

- **High-Quality Instruments:** Piano, Electric Piano, Acoustic Guitar, Electric Bass, Harp, Vibraphone, Strings, and Celeste.
- **Web MIDI Support:** Plug in your external MIDI controller and play directly in the browser.
- **Skeuomorphic Interface:** Retro rack-mount design with interactive knobs and VU meters.
- **Full ADSR Control:** Precision envelope shaping for Attack, Decay, Sustain, and Release.
- **Built-in Effects:** Global Reverb, Pan, and Master Volume controls.
- **MIDI Sustain Support:** Full support for MIDI CC 64 (Sustain Pedal) with intelligent note holding.
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
|  ├── App.tsx          # Main UI and State
|  ├── audio
|  |  ├── engine.ts    # Tone.js/smplr hybrid engine
|  |  └── useMidi.ts   # Web MIDI Hook & Sustain Logic
|  ├── components      # Skeuomorphic UI Components
|  └── lib             # Utility functions
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

1. **Power On:** Click the power icon to initialize the audio engine.
2. **Select MIDI Input:** Use the dropdown to choose your connected MIDI device.
3. **Configure Channel:** Match the MIDI channel to your controller (default is Channel 1).
4. **Tweak Sound:** Use the knobs to adjust volume, panning, reverb, and ADSR settings.

---

Created by **Craig Van Hise** | [virtualvirgin.net](https://virtualvirgin.net)



