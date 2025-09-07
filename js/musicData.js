// Music theory data and constants
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SOLFEGE = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'];
const DIATONIC_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const NOTE_FREQUENCIES = {
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

const GUITAR_TUNING = {
    strings: [
        { name: 'E (1st)', note: 'E', frequency: 329.63, fret: 0 },
        { name: 'B (2nd)', note: 'B', frequency: 246.94, fret: 0 },
        { name: 'G (3rd)', note: 'G', frequency: 196.00, fret: 0 },
        { name: 'D (4th)', note: 'D', frequency: 146.83, fret: 0 },
        { name: 'A (5th)', note: 'A', frequency: 110.00, fret: 0 },
        { name: 'E (6th)', note: 'E', frequency: 82.41, fret: 0 },
    ]
};

const MAJOR_SCALE_PATTERN = [2, 2, 1, 2, 2, 2, 1]; // Whole and half steps
const MINOR_SCALE_PATTERN = [2, 1, 2, 2, 1, 2, 2];

const SCALES = {
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

function getFretboardNote(string, fret) {
    const openNotes = ['E', 'A', 'D', 'G', 'B', 'E']; // From 6th to 1st string
    const openNote = openNotes[5 - string]; // Reverse for 0-indexed
    const noteIndex = NOTES.indexOf(openNote);
    const resultIndex = (noteIndex + fret) % 12;
    return NOTES[resultIndex];
}

function isNoteInScale(note, scaleName) {
    const scale = SCALES[scaleName];
    if (!scale) return false;
    
    // Handle both sharp and flat equivalents
    const normalizedNote = note.replace('b', '#');
    const normalizedScaleNotes = scale.notes.map(n => n.replace('b', '#'));
    
    return normalizedScaleNotes.includes(normalizedNote);
}

// Note color gradients for visual representation
const NOTE_COLORS = [
    'linear-gradient(135deg, #ef4444, #dc2626)', // C - Red
    'linear-gradient(135deg, #f97316, #ea580c)', // D - Orange  
    'linear-gradient(135deg, #eab308, #ca8a04)', // E - Yellow
    'linear-gradient(135deg, #22c55e, #16a34a)', // F - Green
    'linear-gradient(135deg, #3b82f6, #2563eb)', // G - Blue
    'linear-gradient(135deg, #6366f1, #4f46e5)', // A - Indigo
    'linear-gradient(135deg, #8b5cf6, #7c3aed)', // B - Purple
];

function getNoteColor(note) {
    const index = DIATONIC_NOTES.indexOf(note);
    return index !== -1 ? NOTE_COLORS[index] : 'linear-gradient(135deg, #6b7280, #4b5563)';
}