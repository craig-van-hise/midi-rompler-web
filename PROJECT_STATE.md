# Project State: MIDI Rompler Web

## 1. Architecture & Structure
```text
/Users/vv2024/Documents/Repos - vv2024/MIDI/WebApps/midi-rompler-web
├── README.md
├── index.html
├── metadata.json
├── package-lock.json
├── package.json
├── src
|  ├── App.tsx
|  ├── audio
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
- **Audio:** Tone.js v15.x
- **UI:** Tailwind CSS, Lucide React, Framer Motion
- **MIDI:** Web MIDI API

## 3. System Capabilities
- **Audio Engine:** Professional Tone.js-based rompler supporting multiple high-quality instrument patches (Piano, E-Piano, Acoustic Guitar, Electric Bass). Features ADSR envelope controls, master volume, panning, and reverb.
- **MIDI Integration:** Real-time MIDI message handling with device selection and channel filtering. Supports note-on/off, velocity sensitivity, and MIDI panic functionality.
- **Interface:** Retro rack-mount aesthetics with custom skeuomorphic controls (Knobs, VU Meters), LED status indicators, and a dedicated MIDI channel selector.
- **State Management:** React-based state for real-time parameter modulation and UI interactions.

## 4. Recent Evolution
- **Initial Setup:** Ported from AI Studio export.
- **Deployment Prep:** Configured Vite base path for GitHub Pages and created Node 24 deployment workflow.
- **Branding:** Updated application metadata and documentation to reflect the "VV | MIDI Rompler" identity.
