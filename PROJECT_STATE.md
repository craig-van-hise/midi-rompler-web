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

