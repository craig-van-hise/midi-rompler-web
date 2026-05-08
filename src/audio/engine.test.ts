import { describe, it, expect, vi, beforeEach } from 'vitest';
import { audioEngine } from './engine';
import * as Tone from 'tone';
import { Soundfont } from 'smplr';

// Mock Tone.js and smplr
const { mockAmplitudeEnvelope } = vi.hoisted(() => {
  const mockEnv = vi.fn().mockImplementation(function() {
    this.connect = vi.fn();
    this.triggerAttack = vi.fn();
    this.triggerRelease = vi.fn();
    this.dispose = vi.fn();
  });

  return {
    mockAmplitudeEnvelope: mockEnv,
  }
})

vi.mock('tone', () => {
  class MockPanVol {
    connect = vi.fn();
    chain = vi.fn();
    volume = { value: 0 };
    pan = { value: 0 };
    input = {};
  }
  class MockSplit {
    connect = vi.fn();
  }
  class MockMeter {
    getValue = vi.fn().mockReturnValue(0);
  }
  class MockReverb {
    generate = vi.fn().mockResolvedValue(undefined);
    wet = { value: 0 };
  }
  class MockGain {
    connect = vi.fn();
    gain = { value: 1 };
    constructor(val: number) {
      this.gain.value = val;
    }
  }
  class MockVolume {
    connect = vi.fn();
    disconnect = vi.fn();
    dispose = vi.fn();
    volume = { value: 0 };
    constructor(val: number) {
      this.volume.value = val;
    }
  }
  class MockSampler {
    constructor(config: any) {
      if (config && config.onload) {
        setTimeout(config.onload, 0);
      }
    }
    connect = vi.fn();
    triggerAttack = vi.fn();
    triggerRelease = vi.fn();
    releaseAll = vi.fn();
    dispose = vi.fn();
    disconnect = vi.fn();
    attack = 0.1;
    decay = 0.2;
    sustain = 1.0;
    release = 1.0;
  }

  return {
    start: vi.fn().mockResolvedValue(undefined),
    context: {
      lookAhead: 0.01,
      rawContext: {
        destination: {}
      },
    },
    PanVol: MockPanVol,
    Split: MockSplit,
    Meter: MockMeter,
    Reverb: MockReverb,
    Sampler: MockSampler,
    Gain: MockGain,
    Volume: MockVolume,
    AmplitudeEnvelope: mockAmplitudeEnvelope,
    now: vi.fn().mockReturnValue(0),
    Destination: {},
    Frequency: (note: string) => ({
      toMidi: () => (note === 'C4' ? 60 : 64)
    }),
    Player: class {
      connect = vi.fn();
      start = vi.fn();
      dispose = vi.fn();
      set loop(val: boolean) {}
      set loopStart(val: number) {}
      set loopEnd(val: number) {}
      set playbackRate(val: number) {}
    },
    ToneAudioBuffers: class {
      constructor(urls: any, onload: any) {
        setTimeout(onload, 0);
      }
      get() { return { duration: 1 }; }
      dispose = vi.fn();
    }
  };
});

vi.mock('smplr', () => {
  class MockSoundfont {
    load = Promise.resolve();
    start = vi.fn();
    stop = vi.fn();
  }
  return {
    Soundfont: MockSoundfont,
  };
});

// Mock fetch for strings loading
global.fetch = vi.fn().mockResolvedValue({
  text: () => Promise.resolve('"C4": "data:audio/ogg;base64,AAA"')
});

describe('AudioEngine Voice Targeting', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    audioEngine.isInitialized = false;
    await audioEngine.init();
  });

  it('should target specific note during release for Tone.Sampler', async () => {
    // Load a Tone.Sampler instrument (e.g., piano)
    await audioEngine.loadInstrument('piano');
    
    const sampler = audioEngine.sampler;
    expect(sampler.triggerRelease).toBeDefined();

    // Trigger release for C4
    audioEngine.releaseNote('C4');

    // Verify triggerRelease was called with 'C4'
    expect(sampler.triggerRelease).toHaveBeenCalledWith('C4', expect.anything());
  });

  it('should target specific note during release for smplr Soundfont', async () => {
    // Load a smplr instrument
    await audioEngine.loadInstrument('electric-piano');
    
    const sampler = audioEngine.sampler;
    expect(sampler.stop).toBeDefined();

    // Trigger release for E4
    audioEngine.releaseNote('E4');

    // Verify stop was called with 'E4' directly
    expect(sampler.stop).toHaveBeenCalledWith('E4');
  });
});

describe('AudioEngine Gain Staging', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    audioEngine.isInitialized = false;
    await audioEngine.init();
  });

  it('should set internalTrim gain to 2.5 for harp', async () => {
    await audioEngine.loadInstrument('harp');
    expect(audioEngine.internalTrim?.gain.value).toBe(2.5);
  });

  it('should set internalTrim gain to 1.0 for piano', async () => {
    await audioEngine.loadInstrument('piano');
    expect(audioEngine.internalTrim?.gain.value).toBe(1.0);
  });
});

describe('AudioEngine LoopedSampler Velocity', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    audioEngine.isInitialized = false;
    await audioEngine.init();
  });

  it('should pass velocity to AmplitudeEnvelope in LoopedSampler', async () => {
    await audioEngine.loadInstrument('strings');
    
    // Trigger attack via noteOn
    audioEngine.noteOn('C4', 0.5);
    
    // We need to inspect the internal activeVoices map or the created envelope
    expect(mockAmplitudeEnvelope).toHaveBeenCalled();
    const mockEnvInstance = mockAmplitudeEnvelope.mock.instances[0];
    expect(mockEnvInstance.triggerAttack).toHaveBeenCalledWith(expect.any(Number), 0.5);
  });
});
