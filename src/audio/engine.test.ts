import { describe, it, expect, vi, beforeEach } from 'vitest';
import { audioEngine } from './engine';
import * as Tone from 'tone';
import { Soundfont } from 'smplr';

// Mock Tone.js and smplr
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
    now: vi.fn().mockReturnValue(0),
    Destination: {},
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
