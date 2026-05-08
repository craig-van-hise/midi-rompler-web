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
