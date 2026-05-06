import { useState, useEffect } from 'react';

export interface MidiInputInfo {
  id: string;
  name: string;
}

export function useMidi() {
  const [inputs, setInputs] = useState<MidiInputInfo[]>([]);
  const [selectedInputId, setSelectedInputId] = useState<string>('');
  const [midiAccess, setMidiAccess] = useState<any>(null);

  useEffect(() => {
    const updateInputs = (access: any) => {
      const inputArr: MidiInputInfo[] = [];
      access.inputs.forEach((input: any) => {
        inputArr.push({
          id: input.id,
          name: input.name || 'Unknown',
        });
      });
      setInputs(inputArr);
      if (inputArr.length > 0 && selectedInputId === '') {
         setSelectedInputId(inputArr[0].id);
      }
    };

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(
        (access) => {
          setMidiAccess(access);
          updateInputs(access);
          
          access.onstatechange = () => {
             updateInputs(access);
          };
        },
        (err) => console.error('MIDI Access Failed', err)
      );
    }
  }, [selectedInputId]);

  return { inputs, selectedInputId, setSelectedInputId, midiAccess };
}
