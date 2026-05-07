import * as Tone from 'tone';
import { Soundfont } from 'smplr';

// The baseUrl containing samples
const BASE_URL = 'https://nbrosowsky.github.io/tonejs-instruments/samples/';

const SMPLR_MAP: Record<string, string> = {
  'electric-piano': 'electric_piano_1',
  'harp': 'orchestral_harp',
  'vibraphone': 'vibraphone',
  'strings': 'string_ensemble_1',
  'celeste': 'celesta'
};

class AudioEngine {
  sampler: Tone.Sampler | any | null = null;
  panVol: Tone.PanVol | null = null;
  splitter: Tone.Split | null = null;
  meterL: Tone.Meter | null = null;
  meterR: Tone.Meter | null = null;
  reverb: Tone.Reverb | null = null;
  
  isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    
    await Tone.start();
    Tone.context.lookAhead = 0.01;
    
    // The Chain: Sampler -> PanVol -> ChannelSplitter -> MeterL / MeterR
    //                            \-> Reverb -> Destination

    this.panVol = new Tone.PanVol(0, 0); // pan 0, vol 0 (dB)
    this.splitter = new Tone.Split(2);
    this.meterL = new Tone.Meter();
    this.meterR = new Tone.Meter();
    this.reverb = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.01,
      wet: 0,
    });
    
    await this.reverb.generate(); // Ensure impulse response is created

    this.panVol.connect(this.splitter);
    this.splitter.connect(this.meterL, 0, 0);
    this.splitter.connect(this.meterR, 1, 0);
    this.panVol.chain(this.reverb, Tone.Destination);

    // Create a dummy sampler just to have the chain setup
    this.sampler = new Tone.Sampler().connect(this.panVol);

    this.isInitialized = true;
  }

  async loadInstrument(instrument: string): Promise<void> {
    if (!this.isInitialized) return;

    return new Promise((resolve) => {
      // Disconnect and dispose old sampler
      if (this.sampler) {
        if (typeof (this.sampler as any).disconnect === 'function') {
          (this.sampler as any).disconnect();
        }
        if (typeof (this.sampler as any).dispose === 'function') {
          (this.sampler as any).dispose();
        }
      }

      if (SMPLR_MAP[instrument]) {
        const smplr = new Soundfont(Tone.context.rawContext as AudioContext, {
          instrument: SMPLR_MAP[instrument] as any,
          destination: (this.panVol as any)?.input || Tone.context.rawContext.destination
        });
        
        this.sampler = smplr;
        
        smplr.load.then(() => {
          console.log(`Loaded ${instrument} (smplr: ${SMPLR_MAP[instrument]})`);
          resolve();
        });
        return;
      }

      const sampleMap = this.getSampleMap(instrument);
      const baseUrl = `${BASE_URL}${instrument}/`;

      this.sampler = new Tone.Sampler({
        urls: sampleMap,
        baseUrl: baseUrl,
        onload: () => {
          if (this.sampler && this.panVol) {
             this.sampler.connect(this.panVol);
             console.log(`Loaded ${instrument}`);
          }
          resolve();
        }
      });
    });
  }

  noteOn(note: string, velocity?: number) {
    if (!this.sampler || !this.isInitialized) return;
    if (this.sampler instanceof Tone.Sampler) {
      this.sampler.triggerAttack(note, Tone.now(), velocity);
    } else if (typeof this.sampler.start === 'function') {
      this.sampler.start({
        note: note,
        velocity: (velocity ?? 1) * 127
      });
    }
  }

  releaseNote(note: string | number) {
    if (!this.sampler || !this.isInitialized) return;
    
    // If the instrument is a smplr Soundfont
    if (typeof this.sampler.stop === 'function') { 
        // Pass the primitive note directly. Do NOT use { note: note }
        this.sampler.stop(note); 
    } 
    // If the instrument is a Tone.Sampler
    else if (typeof this.sampler.triggerRelease === 'function') {
        this.sampler.triggerRelease(note, Tone.now());
    }
  }

  releaseAll() {
    if (!this.sampler || !this.isInitialized) return;
    if (this.sampler instanceof Tone.Sampler) {
      this.sampler.releaseAll();
    } else if (typeof this.sampler.stop === 'function') {
      this.sampler.stop();
    }
  }

  setVolume(db: number) {
    if (!this.panVol) return;
    this.panVol.volume.value = db; // ranges from -60 to 0
    if (db <= -60) {
      this.panVol.volume.value = -Infinity;
    }
  }

  setPan(pan: number) {
    if (!this.panVol) return;
    this.panVol.pan.value = pan;
  }

  setReverbWet(wet: number) {
    if (!this.reverb) return;
    this.reverb.wet.value = wet;
  }

  getMeterLevels(): { l: number, r: number } {
    if (!this.meterL || !this.meterR) return { l: -100, r: -100 };
    const l = this.meterL.getValue();
    const r = this.meterR.getValue();
    return {
      l: typeof l === 'number' ? l : l[0],
      r: typeof r === 'number' ? r : r[0]
    };
  }

  setTuningOffset(cents: number) {
    if (!this.sampler) return;
    const samplerAny = this.sampler as any;
    if (samplerAny._detune) {
       samplerAny._detune.value = cents;
    } else if (samplerAny.detune) {
       samplerAny.detune.value = cents;
    }
  }

  setAttack(attack: number) {
    if (!this.sampler || !(this.sampler instanceof Tone.Sampler)) return;
    this.sampler.attack = attack;
  }

  setDecay(decay: number) {
    if (!this.sampler || !(this.sampler instanceof Tone.Sampler)) return;
    this.sampler.decay = decay;
  }

  setSustain(sustain: number) {
    if (!this.sampler || !(this.sampler instanceof Tone.Sampler)) return;
    this.sampler.sustain = sustain;
  }

  setRelease(release: number) {
    if (!this.sampler || !(this.sampler instanceof Tone.Sampler)) return;
    this.sampler.release = release;
  }

  public getSampleMap(instrument: string): Record<string, string> {
    if (instrument === 'piano') {
      return {
        'A1': 'A1.mp3', 'A2': 'A2.mp3', 'A3': 'A3.mp3', 'A4': 'A4.mp3', 'A5': 'A5.mp3', 'A6': 'A6.mp3',
        'C1': 'C1.mp3', 'C2': 'C2.mp3', 'C3': 'C3.mp3', 'C4': 'C4.mp3', 'C5': 'C5.mp3', 'C6': 'C6.mp3',
        'D#1': 'Ds1.mp3', 'D#2': 'Ds2.mp3', 'D#3': 'Ds3.mp3', 'D#4': 'Ds4.mp3', 'D#5': 'Ds5.mp3', 'D#6': 'Ds6.mp3',
        'F#1': 'Fs1.mp3', 'F#2': 'Fs2.mp3', 'F#3': 'Fs3.mp3', 'F#4': 'Fs4.mp3', 'F#5': 'Fs5.mp3', 'F#6': 'Fs6.mp3',
      };
    }
    
    if (instrument === 'electric-piano') {
        return {
            'C2': 'C2.mp3',
            'C3': 'C3.mp3',
            'C4': 'C4.mp3',
            'C5': 'C5.mp3'
        };
    }

    if (instrument === 'guitar-acoustic') {
        return {
             'A2': 'A2.mp3', 'A3': 'A3.mp3', 'A4': 'A4.mp3',
             'C3': 'C3.mp3', 'C4': 'C4.mp3', 'C5': 'C5.mp3',
             'D#2': 'Ds2.mp3', 'D#3': 'Ds3.mp3', 'D#4': 'Ds4.mp3',
             'F#2': 'Fs2.mp3', 'F#3': 'Fs3.mp3', 'F#4': 'Fs4.mp3',
        };
    }

    if (instrument === 'bass-electric') {
        return {
            'A#1': 'As1.mp3', 'A#2': 'As2.mp3', 'A#3': 'As3.mp3', 'A#4': 'As4.mp3',
            'C#1': 'Cs1.mp3', 'C#2': 'Cs2.mp3', 'C#3': 'Cs3.mp3', 'C#4': 'Cs4.mp3',
            'E1': 'E1.mp3', 'E2': 'E2.mp3', 'E3': 'E3.mp3', 'E4': 'E4.mp3',
            'G1': 'G1.mp3', 'G2': 'G2.mp3', 'G3': 'G3.mp3', 'G4': 'G4.mp3',
        };
    }

    return { 'C4': 'C4.mp3' };
  }
}

export const audioEngine = new AudioEngine();
