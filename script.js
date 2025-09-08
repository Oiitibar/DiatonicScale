// ===== MUSIC DATA AND CONSTANTS =====
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

const SCALE_PATTERNS = {
    'C Major Position 1': {
        scale: 'C Major',
        frets: [
            [8, 10, 12], // High E string
            [8, 10, 12], // B string  
            [7, 9, 10],  // G string
            [7, 9, 10],  // D string
            [8, 10, 12], // A string
            [8, 10, 12]  // Low E string
        ],
        startingFret: 8,
        description: 'Box pattern starting at 8th fret'
    },
    'G Major Position 1': {
        scale: 'G Major',
        frets: [
            [3, 5, 7],   // High E string
            [3, 5, 7],   // B string  
            [2, 4, 5],   // G string
            [2, 4, 5],   // D string
            [3, 5, 7],   // A string
            [3, 5, 7]    // Low E string
        ],
        startingFret: 3,
        description: 'Box pattern starting at 3rd fret'
    },
    'A Minor Position 1': {
        scale: 'A Minor',
        frets: [
            [5, 7, 8],   // High E string
            [5, 6, 8],   // B string  
            [5, 7, 9],   // G string
            [5, 7, 9],   // D string
            [5, 7, 8],   // A string
            [5, 7, 8]    // Low E string
        ],
        startingFret: 5,
        description: 'Box pattern starting at 5th fret'
    }
};

const EXERCISES = [
    {
        title: "C Major Scale Warm-up",
        description: "Simple ascending and descending C major scale",
        tempo: "Slow (60-80 BPM)",
        pattern: "C-D-E-F-G-A-B-C-B-A-G-F-E-D-C",
        tips: "Focus on clean finger transitions and even timing",
        difficulty: "Beginner"
    },
    {
        title: "Scale in Thirds",
        description: "Play scale notes in intervals of thirds",
        tempo: "Medium (80-100 BPM)", 
        pattern: "C-E-D-F-E-G-F-A-G-B-A-C-B-D-C",
        tips: "Skip one note each time to create harmonic intervals",
        difficulty: "Intermediate"
    },
    {
        title: "Pentatonic Riff Pattern",
        description: "Blues-style riff using pentatonic scale",
        tempo: "Medium (90-120 BPM)",
        pattern: "A-C-D-E-G-E-D-C-A",
        tips: "Add bends and slides for authentic blues sound",
        difficulty: "Intermediate"
    },
    {
        title: "Chord Progression Practice",
        description: "Common I-vi-IV-V progression in C major",
        tempo: "Slow (70-90 BPM)",
        pattern: "C-Am-F-G-C",
        tips: "Practice smooth chord transitions",
        difficulty: "Beginner"
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 1,
        type: 'multiple-choice',
        question: 'How many notes are in the diatonic scale system?',
        options: ['5', '7', '8', '12'],
        correctAnswer: '7',
        explanation: 'The diatonic scale system consists of seven notes: Do, Re, Mi, Fa, Sol, La, Ti (or A, B, C, D, E, F, G).'
    },
    {
        id: 2,
        type: 'true-false',
        question: 'Standard guitar tuning from thickest to thinnest string is E-A-D-G-B-E.',
        correctAnswer: 'True',
        explanation: 'Yes! Standard guitar tuning is E (6th/thickest) - A (5th) - D (4th) - G (3rd) - B (2nd) - E (1st/thinnest).'
    },
    {
        id: 3,
        type: 'multiple-choice',
        question: 'Which scale contains no sharps or flats?',
        options: ['G Major', 'C Major', 'D Major', 'F Major'],
        correctAnswer: 'C Major',
        explanation: 'C Major scale (C-D-E-F-G-A-B) contains only natural notes with no sharps or flats.'
    },
    {
        id: 4,
        type: 'fretboard-identify',
        question: 'What note is on the 3rd fret of the A string (5th string)?',
        correctAnswer: 'C',
        explanation: 'The A string open is A. Count up 3 semitones: A# (1st fret), B (2nd fret), C (3rd fret).'
    },
    {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the solfege name for the 5th degree of a major scale?',
        options: ['Fa', 'Sol', 'La', 'Ti'],
        correctAnswer: 'Sol',
        explanation: 'The 5th degree of the major scale is "Sol" in solfege (or "G" in C major scale).'
    },
    {
        id: 6,
        type: 'true-false',
        question: 'Minor scales sound generally brighter and happier than major scales.',
        correctAnswer: 'False',
        explanation: 'False. Minor scales typically sound darker and more melancholic, while major scales sound brighter and happier.'
    },
    {
        id: 7,
        type: 'multiple-choice',
        question: 'How many frets are typically on a standard acoustic guitar?',
        options: ['12', '15', '20', '24'],
        correctAnswer: '20',
        explanation: 'Most standard acoustic guitars have 20 frets, though some may have 19 or 21.'
    },
    {
        id: 8,
        type: 'fretboard-identify',
        question: 'What note is on the 5th fret of the low E string (6th string)?',
        correctAnswer: 'A',
        explanation: 'The low E string open is E. The 5th fret of the E string produces an A note.'
    }
];

// ===== GLOBAL VARIABLES =====
let audioContext = null;
let darkMode = false;
let activeNote = null;
let activeString = null;
let selectedScale = 'C Major';
let activePattern = 'C Major Position 1';
let currentExercise = 0;
let isPlaying = false;
let metronomeActive = false;
let bpm = 80;
let metronomeInterval = null;

// Quiz variables
let quizStarted = false;
let currentQuestion = 0;
let selectedAnswer = null;
let userAnswers = [];
let showResults = false;
let timeLeft = 300; // 5 minutes
let timerActive = false;
let quizTimer = null;

// ===== AUDIO FUNCTIONS =====
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playNote(frequency, duration = 0.5) {
    const context = initAudioContext();
    
    // Create multiple oscillators for acoustic guitar harmonics
    const fundamental = context.createOscillator();
    const harmonic2 = context.createOscillator();
    const harmonic3 = context.createOscillator();
    const harmonic4 = context.createOscillator();
    
    // Create gain nodes for each harmonic
    const fundamentalGain = context.createGain();
    const harmonic2Gain = context.createGain();
    const harmonic3Gain = context.createGain();
    const harmonic4Gain = context.createGain();
    
    // Master gain node
    const gainNode = context.createGain();
    
    // Create a filter for acoustic guitar tone shaping
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, context.currentTime);
    filter.Q.setValueAtTime(1, context.currentTime);
    
    // Connect oscillators to their gain nodes
    fundamental.connect(fundamentalGain);
    harmonic2.connect(harmonic2Gain);
    harmonic3.connect(harmonic3Gain);
    harmonic4.connect(harmonic4Gain);
    
    // Connect gain nodes to filter
    fundamentalGain.connect(filter);
    harmonic2Gain.connect(filter);
    harmonic3Gain.connect(filter);
    harmonic4Gain.connect(filter);
    
    // Connect filter to master gain
    filter.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Set frequencies for acoustic guitar harmonics
    fundamental.frequency.setValueAtTime(frequency, context.currentTime);
    harmonic2.frequency.setValueAtTime(frequency * 2, context.currentTime);
    harmonic3.frequency.setValueAtTime(frequency * 3, context.currentTime);
    harmonic4.frequency.setValueAtTime(frequency * 4, context.currentTime);
    
    // Use sawtooth waves for more guitar-like timbre
    fundamental.type = 'sawtooth';
    harmonic2.type = 'sawtooth';
    harmonic3.type = 'triangle';
    harmonic4.type