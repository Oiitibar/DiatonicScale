export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const SOLFEGE = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'];
export const DIATONIC_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const NOTE_FREQUENCIES: { [key: string]: number } = {
  'C': 261.63,
  'C#': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99,
  'G': 392.00,
  'G#': 415.30,
  'A': 440.00,
  'A#': 466.16,
  'B': 493.88,
};

export const GUITAR_TUNING = {
  strings: [
    { name: 'E (1st)', note: 'E', frequency: 329.63, fret: 0 },
    { name: 'B (2nd)', note: 'B', frequency: 246.94, fret: 0 },
    { name: 'G (3rd)', note: 'G', frequency: 196.00, fret: 0 },
    { name: 'D (4th)', note: 'D', frequency: 146.83, fret: 0 },
    { name: 'A (5th)', note: 'A', frequency: 110.00, fret: 0 },
    { name: 'E (6th)', note: 'E', frequency: 82.41, fret: 0 },
  ]
};

export const MAJOR_SCALE_PATTERN = [2, 2, 1, 2, 2, 2, 1]; // Whole and half steps
export const MINOR_SCALE_PATTERN = [2, 1, 2, 2, 1, 2, 2];

export const SCALES = {
  'C Major': { root: 'C', type: 'major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  'G Major': { root: 'G', type: 'major', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'] },
  'D Major': { root: 'D', type: 'major', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'] },
  'A Major': { root: 'A', type: 'major', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'] },
  'E Major': { root: 'E', type: 'major', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'] },
  'F Major': { root: 'F', type: 'major', notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'] },
  'A Minor': { root: 'A', type: 'minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  'E Minor': { root: 'E', type: 'minor', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'] },
  'B Minor': { root: 'B', type: 'minor', notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'] },
  'D Minor': { root: 'D', type: 'minor', notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'] },
};

export const getFretboardNote = (string: number, fret: number): string => {
  const openNotes = ['E', 'A', 'D', 'G', 'B', 'E']; // From 6th to 1st string
  const openNote = openNotes[5 - string]; // Reverse for 0-indexed
  const noteIndex = NOTES.indexOf(openNote);
  const resultIndex = (noteIndex + fret) % 12;
  return NOTES[resultIndex];
};

export const isNoteInScale = (note: string, scaleName: string): boolean => {
  const scale = SCALES[scaleName as keyof typeof SCALES];
  if (!scale) return false;
  
  // Handle both sharp and flat equivalents
  const normalizedNote = note.replace('b', '#');
  const normalizedScaleNotes = scale.notes.map(n => n.replace('b', '#'));
  
  return normalizedScaleNotes.includes(normalizedNote);
};