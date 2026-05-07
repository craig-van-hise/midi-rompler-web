import { describe, it, expect, vi, beforeEach } from 'vitest';
import { audioEngine } from './engine';
import * as Tone from 'tone';

// Mock Tone.js
vi.mock('tone', () => {
  const mockConnect = vi.fn().mockReturnThis();
  
  class MockSampler {
    connect = mockConnect;
    disconnect = vi.fn();
    dispose = vi.fn();
    attack = 0;
    decay = 0;
    sustain = 0;
    release = 0;
    constructor(options: any) {
      Object.assign(this, options);
      // Simulate onload being called
      if (options?.onload) {
        setTimeout(options.onload, 0);
      }
    }
  }

  class MockPanVol {
    connect = mockConnect;
    chain = vi.fn();
    volume = { value: 0 };
    pan = { value: 0 };
  }

  class MockSplit {
    connect = mockConnect;
  }

  class MockMeter {
    getValue = vi.fn().mockReturnValue(0);
    connect = mockConnect;
  }

  class MockReverb {
    generate = vi.fn().mockResolvedValue(undefined);
    connect = mockConnect;
    wet = { value: 0 };
  }

  return {
    Sampler: vi.fn().mockImplementation(function(options: any) {
      return new MockSampler(options);
    }),
    PanVol: vi.fn().mockImplementation(function() {
      return new MockPanVol();
    }),
    Split: vi.fn().mockImplementation(function() {
      return new MockSplit();
    }),
    Meter: vi.fn().mockImplementation(function() {
      return new MockMeter();
    }),
    Reverb: vi.fn().mockImplementation(function() {
      return new MockReverb();
    }),
    start: vi.fn().mockResolvedValue(undefined),
    context: {
      lookAhead: 0,
      rawContext: {
        destination: {},
      },
    },
    now: vi.fn().mockReturnValue(0),
    Destination: {},
  };
});

// Mock smplr
vi.mock('smplr', () => {
  class MockSoundfont {
    start = vi.fn();
    stop = vi.fn();
    disconnect = vi.fn();
    load = Promise.resolve();
  }
  return {
    Soundfont: vi.fn().mockImplementation(function() {
      return new MockSoundfont();
    }),
  };
});

describe('AudioEngine', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // Initialize the engine before each test
    await audioEngine.init();
  });

  it('Test Case 1: loadInstrument for strings uses string_ensemble_1', async () => {
    await audioEngine.loadInstrument('strings');
    
    const { Soundfont } = await import('smplr');
    expect(Soundfont).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ instrument: 'string_ensemble_1' })
    );
  });

  it('Test Case 2: loadInstrument for harp uses orchestral_harp', async () => {
    await audioEngine.loadInstrument('harp');
    
    const { Soundfont } = await import('smplr');
    expect(Soundfont).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ instrument: 'orchestral_harp' })
    );
  });

  it('Test Case 3: noteOn for electric-piano still works with scaled velocity', async () => {
    await audioEngine.loadInstrument('electric-piano');
    audioEngine.noteOn('C4', 0.5);
    expect(audioEngine.sampler.start).toHaveBeenCalledWith(
      expect.objectContaining({
        note: 'C4',
        velocity: 0.5 * 127
      })
    );
  });
});
