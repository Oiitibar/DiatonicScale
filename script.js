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
        type: 'multiple-choice',
        question: 'How many sharps does the D major scale have?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: 'D major has 2 sharps: F# and C#. The notes are D-E-F#-G-A-B-C#.'
    },
    {
        id: 5,
        type: 'multiple-choice',
        question: 'Which note is the relative minor of C major?',
        options: ['A', 'E', 'F', 'D'],
        correctAnswer: 'A',
        explanation: 'A minor is the relative minor of C major. They share the same notes but start from different root notes.'
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
    },
    {
        id: 9,
        type: 'multiple-choice',
        question: 'What is the interval between C and E?',
        options: ['Minor third', 'Major third', 'Perfect fourth', 'Perfect fifth'],
        correctAnswer: 'Major third',
        explanation: 'C to E is a major third interval, consisting of 4 semitones.'
    },
    {
        id: 10,
        question: "What is the first note of the C major scale called?",
        options: ["Tonic", "Dominant", "Subdominant", "Leading tone"],
        correct: 0,
        explanation: "The first note of any scale is called the tonic or root note."
    },
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
let timeLeft = 240; // 7.5 minutes for 15 questions
let timerActive = false;

// ===== AUDIO FUNCTIONS =====
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playNote(frequency, duration = 0.5) {
    const context = initAudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
}

function playChord(frequencies, duration = 0.5) {
    frequencies.forEach(freq => playNote(freq, duration));
}

// ===== UTILITY FUNCTIONS =====
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

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== NAVIGATION FUNCTIONS =====
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll(`[data-section="${targetSection}"]`).forEach(btn => {
                btn.classList.add('active');
            });
            
            // Show target section
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
        
        if (darkMode) {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    });
}

// ===== NOTES SECTION FUNCTIONS =====
function initNotesSection() {
    createNoteWheel();
    createNoteList();
}

function createNoteWheel() {
    const noteWheel = document.getElementById('noteWheel');
    const activeNoteDisplay = document.getElementById('activeNoteDisplay');
    
    const noteColors = [
        'note-c', 'note-d', 'note-e', 'note-f', 'note-g', 'note-a', 'note-b'
    ];
    
    DIATONIC_NOTES.forEach((note, index) => {
        const angle = (index * 360) / 7 - 90; // Start from top
        const radius = 120;
        const x = Math.cos((angle * Math.PI) / 180) * radius + 160;
        const y = Math.sin((angle * Math.PI) / 180) * radius + 160;
        
        const button = document.createElement('button');
        button.className = `note-btn ${noteColors[index]}`;
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        button.textContent = note;
        
        button.addEventListener('click', () => {
            handleNoteClick(note, button);
        });
        
        noteWheel.appendChild(button);
    });
}

function handleNoteClick(note, button) {
    const frequency = NOTE_FREQUENCIES[note];
    if (frequency) {
        playNote(frequency, 1);
        
        // Update active note display
        document.getElementById('activeNoteDisplay').textContent = note;
        
        // Update button states
        document.querySelectorAll('.note-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update note list
        document.querySelectorAll('.note-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-note="${note}"]`).classList.add('active');
        
        // Reset after animation
        setTimeout(() => {
            button.classList.remove('active');
            document.getElementById('activeNoteDisplay').textContent = '♪';
            document.querySelectorAll('.note-item').forEach(item => item.classList.remove('active'));
        }, 1000);
    }
}

function createNoteList() {
    const noteList = document.getElementById('noteList');
    const noteColors = [
        'note-c', 'note-d', 'note-e', 'note-f', 'note-g', 'note-a', 'note-b'
    ];
    
    DIATONIC_NOTES.forEach((note, index) => {
        const item = document.createElement('div');
        item.className = 'note-item';
        item.setAttribute('data-note', note);
        
        item.innerHTML = `
            <div class="note-item-content">
                <div class="note-item-left">
                    <div class="note-icon ${noteColors[index]}">${note}</div>
                    <div class="note-details">
                        <h4>${note} - ${SOLFEGE[index]}</h4>
                        <p>Position ${index + 1} in the diatonic scale</p>
                    </div>
                </div>
                <div class="note-frequency">${NOTE_FREQUENCIES[note]}Hz</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            const frequency = NOTE_FREQUENCIES[note];
            if (frequency) {
                playNote(frequency, 1);
                item.classList.add('active');
                document.getElementById('activeNoteDisplay').textContent = note;
                
                setTimeout(() => {
                    item.classList.remove('active');
                    document.getElementById('activeNoteDisplay').textContent = '♪';
                }, 1000);
            }
        });
        
        noteList.appendChild(item);
    });
}

// ===== TUNING SECTION FUNCTIONS =====
function initTuningSection() {
    createGuitarStrings();
    createTuningList();
}

function createGuitarStrings() {
    const guitarStrings = document.getElementById('guitarStrings');
    
    GUITAR_TUNING.strings.forEach((string, index) => {
        const stringElement = document.createElement('div');
        stringElement.className = `guitar-string string-${index + 1}`;
        stringElement.setAttribute('data-string', index);
        
        stringElement.innerHTML = `
            <div class="string-line"></div>
            <div class="string-label">${string.name}</div>
            <div class="string-note">${string.note}</div>
        `;
        
        stringElement.addEventListener('click', () => {
            handleStringClick(index, string.frequency, stringElement);
        });
        
        guitarStrings.appendChild(stringElement);
    });
}

function handleStringClick(stringIndex, frequency, element) {
    playNote(frequency, 2);
    
    // Update active string
    document.querySelectorAll('.guitar-string').forEach(str => str.classList.remove('active'));
    element.classList.add('active');
    
    // Update tuning list
    document.querySelectorAll('.tuning-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-tuning-string="${stringIndex}"]`).classList.add('active');
    
    // Reset after animation
    setTimeout(() => {
        element.classList.remove('active');
        document.querySelectorAll('.tuning-item').forEach(item => item.classList.remove('active'));
    }, 2000);
}

function createTuningList() {
    const tuningList = document.getElementById('tuningList');
    
    GUITAR_TUNING.strings.forEach((string, index) => {
        const item = document.createElement('div');
        item.className = 'tuning-item';
        item.setAttribute('data-tuning-string', index);
        
        item.innerHTML = `
            <div class="tuning-item-content">
                <div class="tuning-item-left">
                    <div class="tuning-icon string-${index + 1}">${string.note}</div>
                    <div class="tuning-details">
                        <h4>${string.name}</h4>
                        <p>Open string note: ${string.note}</p>
                    </div>
                </div>
                <div class="tuning-frequency">${string.frequency}Hz</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            handleStringClick(index, string.frequency, document.querySelector(`[data-string="${index}"]`));
        });
        
        tuningList.appendChild(item);
    });
}

// ===== FRETBOARD SECTION FUNCTIONS =====
function initFretboardSection() {
    createFretboard();
    updateScaleInfo();
    
    const scaleSelect = document.getElementById('scaleSelect');
    scaleSelect.addEventListener('change', (e) => {
        selectedScale = e.target.value;
        updateFretboard();
        updateScaleInfo();
    });
}

function createFretboard() {
    const fretboard = document.getElementById('fretboard');
    const stringNames = ['E', 'B', 'G', 'D', 'A', 'E'];
    const fretNumbers = Array.from({ length: 13 }, (_, i) => i); // 0-12 frets
    
    // Create fret numbers header
    const fretNumbersRow = document.createElement('div');
    fretNumbersRow.className = 'fret-numbers';
    
    const emptyCell = document.createElement('div');
    emptyCell.className = 'fret-number';
    fretNumbersRow.appendChild(emptyCell);
    
    fretNumbers.forEach(fret => {
        const fretNumber = document.createElement('div');
        fretNumber.className = 'fret-number';
        fretNumber.textContent = fret;
        fretNumbersRow.appendChild(fretNumber);
    });
    
    fretboard.appendChild(fretNumbersRow);
    
    // Create fretboard strings
    stringNames.forEach((stringName, stringIndex) => {
        const stringRow = document.createElement('div');
        stringRow.className = 'fretboard-string';
        
        const stringNameElement = document.createElement('div');
        stringNameElement.className = 'string-name';
        stringNameElement.textContent = stringName;
        stringRow.appendChild(stringNameElement);
        
        fretNumbers.forEach(fret => {
            const fretElement = document.createElement('button');
            fretElement.className = 'fret';
            fretElement.setAttribute('data-string', stringIndex);
            fretElement.setAttribute('data-fret', fret);
            
            const note = getFretboardNote(stringIndex, fret);
            const inScale = isNoteInScale(note, selectedScale);
            const scaleType = SCALES[selectedScale].type;
            
            if (inScale) {
                fretElement.classList.add('in-scale', scaleType);
            }
            
            fretElement.innerHTML = `
                <span class="fret-note">${note}</span>
                ${inScale ? '<i class="fas fa-volume-down fret-icon"></i>' : ''}
            `;
            
            fretElement.addEventListener('click', () => {
                handleFretClick(stringIndex, fret, note);
            });
            
            fretElement.addEventListener('mouseenter', () => {
                fretElement.classList.add('hovered');
            });
            
            fretElement.addEventListener('mouseleave', () => {
                fretElement.classList.remove('hovered');
            });
            
            // Add fret markers
            if ((fret === 3 || fret === 5 || fret === 7 || fret === 9) && stringIndex === 2) {
                const marker = document.createElement('div');
                marker.className = 'fret-marker';
                fretElement.appendChild(marker);
            }
            
            if (fret === 12 && stringIndex === 2) {
                const marker1 = document.createElement('div');
                marker1.className = 'fret-marker double';
                const marker2 = document.createElement('div');
                marker2.className = 'fret-marker double';
                fretElement.appendChild(marker1);
                fretElement.appendChild(marker2);
            }
            
            stringRow.appendChild(fretElement);
        });
        
        fretboard.appendChild(stringRow);
    });
}

function handleFretClick(stringIndex, fret, note) {
    const frequency = NOTE_FREQUENCIES[note];
    if (frequency) {
        // Adjust frequency for octave based on string
        const octaveMultiplier = Math.pow(2, Math.floor(stringIndex / 2));
        playNote(frequency * octaveMultiplier, 1);
    }
}

function updateFretboard() {
    const frets = document.querySelectorAll('.fret');
    const scaleType = SCALES[selectedScale].type;
    
    frets.forEach(fret => {
        const stringIndex = parseInt(fret.getAttribute('data-string'));
        const fretNumber = parseInt(fret.getAttribute('data-fret'));
        const note = getFretboardNote(stringIndex, fretNumber);
        const inScale = isNoteInScale(note, selectedScale);
        
        // Reset classes
        fret.classList.remove('in-scale', 'major', 'minor');
        
        if (inScale) {
            fret.classList.add('in-scale', scaleType);
        }
        
        // Update icon
        const icon = fret.querySelector('.fret-icon');
        if (inScale && !icon) {
            fret.innerHTML += '<i class="fas fa-volume-down fret-icon"></i>';
        } else if (!inScale && icon) {
            icon.remove();
        }
    });
    
    // Update scale type indicator
    const indicator = document.getElementById('scaleTypeIndicator');
    const span = indicator.querySelector('span');
    span.textContent = `${scaleType.toUpperCase()} SCALE`;
    indicator.className = `scale-type-indicator ${scaleType}`;
}

function updateScaleInfo() {
    const scaleDetails = document.getElementById('scaleDetails');
    const scale = SCALES[selectedScale];
    
    scaleDetails.innerHTML = `
        <div class="scale-detail">
            <span class="scale-detail-label">Scale:</span>
            <span class="scale-detail-value">
                ${selectedScale}
                <span class="scale-type-badge ${scale.type}">${scale.type.toUpperCase()}</span>
            </span>
        </div>
        <div class="scale-detail">
            <span class="scale-detail-label">Notes:</span>
            <span class="scale-detail-value">${scale.notes.join(' - ')}</span>
        </div>
        <div class="scale-detail">
            <span class="scale-detail-label">Root Note:</span>
            <span class="scale-detail-value">${scale.root}</span>
        </div>
    `;
}

// ===== SCALES SECTION FUNCTIONS =====
function initScalesSection() {
    createPatternButtons();
    updatePatternDisplay();
    
    const tabsToggle = document.getElementById('tabsToggle');
    tabsToggle.addEventListener('click', toggleTabNotation);
}

function createPatternButtons() {
    const patternButtons = document.querySelectorAll('.pattern-btn');
    
    patternButtons.forEach(button => {
        button.addEventListener('click', () => {
            const patternName = button.getAttribute('data-pattern');
            activePattern = patternName;
            
            // Update active button
            patternButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update pattern display
            updatePatternDisplay();
            
            // Play demo sound
            const frequencies = [261.63, 329.63, 392.00]; // C, E, G
            playChord(frequencies, 2);
        });
    });
}

function updatePatternDisplay() {
    const pattern = SCALE_PATTERNS[activePattern];
    const scale = SCALES[pattern.scale];
    
    // Update title and description
    document.getElementById('patternTitle').textContent = `${activePattern} Pattern`;
    document.getElementById('patternDescription').textContent = pattern.description;
    
    // Create pattern fretboard
    createPatternFretboard();
    
    // Update pattern details
    updatePatternDetails();
    
    // Update tab notation
    updateTabNotation();
}

function createPatternFretboard() {
    const patternFretboard = document.getElementById('patternFretboard');
    const pattern = SCALE_PATTERNS[activePattern];
    const scale = SCALES[pattern.scale];
    const stringNames = ['E', 'B', 'G', 'D', 'A', 'E'];
    
    patternFretboard.innerHTML = '';
    
    stringNames.forEach((stringName, stringIndex) => {
        const stringRow = document.createElement('div');
        stringRow.className = 'pattern-string';
        
        const stringNameElement = document.createElement('div');
        stringNameElement.className = 'pattern-string-name';
        stringNameElement.textContent = stringName;
        stringRow.appendChild(stringNameElement);
        
        const fretsContainer = document.createElement('div');
        fretsContainer.className = 'pattern-frets';
        
        // Show 12 frets
        for (let fret = 1; fret <= 12; fret++) {
            const fretElement = document.createElement('div');
            fretElement.className = 'pattern-fret';
            
            const isInPattern = pattern.frets[stringIndex].includes(fret);
            
            if (isInPattern) {
                fretElement.classList.add('in-pattern', scale.type);
                fretElement.textContent = fret;
            } else {
                fretElement.textContent = '·';
            }
            
            fretsContainer.appendChild(fretElement);
        }
        
        stringRow.appendChild(fretsContainer);
        patternFretboard.appendChild(stringRow);
    });
}

function updatePatternDetails() {
    const pattern = SCALE_PATTERNS[activePattern];
    const scale = SCALES[pattern.scale];
    const patternDetailsInfo = document.getElementById('patternDetailsInfo');
    
    patternDetailsInfo.innerHTML = `
        <div class="pattern-details">
            <h3>Scale Information</h3>
            <div class="scale-detail">
                <span class="scale-detail-label">Scale Type:</span>
                <span class="scale-type-badge ${scale.type}">${scale.type.toUpperCase()}</span>
            </div>
            <div class="scale-detail">
                <span class="scale-detail-label">Starting Position:</span>
                <span class="scale-detail-value">${pattern.startingFret}th fret</span>
            </div>
            <div class="scale-detail">
                <span class="scale-detail-label">Scale Notes:</span>
                <span class="scale-detail-value">${scale.notes.join(' - ')}</span>
            </div>
        </div>
    `;
}

function updateTabNotation() {
    const pattern = SCALE_PATTERNS[activePattern];
    const stringNames = ['E', 'B', 'G', 'D', 'A', 'E'];
    const tabContent = document.getElementById('tabContent');
    
    tabContent.innerHTML = '';
    
    stringNames.forEach((stringName, stringIndex) => {
        const tabLine = document.createElement('div');
        tabLine.className = 'tab-line';
        
        const frets = pattern.frets[stringIndex];
        const tabString = `${stringName}|${frets.join('---')}---|`;
        
        tabLine.textContent = tabString;
        tabContent.appendChild(tabLine);
    });
}

function toggleTabNotation() {
    const tabNotation = document.getElementById('tabNotation');
    const tabsToggle = document.getElementById('tabsToggle');
    const toggleText = tabsToggle.querySelector('span');
    
    if (tabNotation.classList.contains('hidden')) {
        tabNotation.classList.remove('hidden');
        toggleText.textContent = 'Hide Tabs';
    } else {
        tabNotation.classList.add('hidden');
        toggleText.textContent = 'Show Tabs';
    }
}

// ===== PRACTICE SECTION FUNCTIONS =====
function initPracticeSection() {
    initMetronome();
    createExercises();
}

function initMetronome() {
    const bpmSlider = document.getElementById('bpmSlider');
    const bpmDisplay = document.getElementById('bpmDisplay');
    const metronomeBtn = document.getElementById('metronomeBtn');
    
    bpmSlider.addEventListener('input', (e) => {
        bpm = parseInt(e.target.value);
        bpmDisplay.textContent = bpm;
    });
    
    metronomeBtn.addEventListener('click', toggleMetronome);
}

function toggleMetronome() {
    const metronomeBtn = document.getElementById('metronomeBtn');
    const btnIcon = metronomeBtn.querySelector('i');
    const btnText = metronomeBtn.querySelector('span');
    
    if (!metronomeActive) {
        metronomeActive = true;
        metronomeBtn.classList.add('active');
        btnIcon.className = 'fas fa-pause';
        btnText.textContent = 'Stop Metronome';
        
        // Start metronome
        const interval = 60000 / bpm;
        metronomeInterval = setInterval(() => {
            playNote(800, 0.1); // High frequency click
        }, interval);
        
        // Auto-stop after 30 seconds for demo
        setTimeout(() => {
            if (metronomeActive) {
                toggleMetronome();
            }
        }, 30000);
    } else {
        metronomeActive = false;
        metronomeBtn.classList.remove('active');
        btnIcon.className = 'fas fa-play';
        btnText.textContent = 'Start Metronome';
        
        if (metronomeInterval) {
            clearInterval(metronomeInterval);
            metronomeInterval = null;
        }
    }
}

function createExercises() {
    const exercisesContainer = document.getElementById('exercisesContainer');
    
    EXERCISES.forEach((exercise, index) => {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'exercise-card';
        exerciseCard.setAttribute('data-exercise', index);
        
        exerciseCard.innerHTML = `
            <div class="exercise-content">
                <div class="exercise-info">
                    <div class="exercise-header">
                        <h3 class="exercise-title">${exercise.title}</h3>
                        <span class="difficulty-badge ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                    </div>
                    
                    <p class="exercise-description">${exercise.description}</p>
                    
                    <div class="exercise-details">
                        <div class="exercise-detail">
                            <span class="exercise-detail-label">Tempo:</span>
                            <span class="exercise-detail-value">${exercise.tempo}</span>
                        </div>
                        <div class="exercise-detail">
                            <span class="exercise-detail-label">Pattern:</span>
                            <span class="exercise-detail-value exercise-pattern">${exercise.pattern}</span>
                        </div>
                    </div>
                    
                    <div class="exercise-tip">
                        <span class="exercise-tip-text">💡 Tip: ${exercise.tips}</span>
                    </div>
                </div>
                
                <div class="exercise-actions">
                    <button class="exercise-btn play-btn" onclick="playExercise(${index})">
                        <i class="fas fa-play"></i>
                        <span>Play</span>
                    </button>
                    <button class="exercise-btn reset-btn" onclick="resetExercise(${index})">
                        <i class="fas fa-redo"></i>
                        <span>Reset</span>
                    </button>
                </div>
            </div>
        `;
        
        exercisesContainer.appendChild(exerciseCard);
    });
}

function playExercise(index) {
    const exercise = EXERCISES[index];
    const exerciseCard = document.querySelector(`[data-exercise="${index}"]`);
    const playBtn = exerciseCard.querySelector('.play-btn');
    
    // Update UI
    document.querySelectorAll('.exercise-card').forEach(card => card.classList.remove('active'));
    exerciseCard.classList.add('active');
    
    playBtn.disabled = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i><span>Playing</span>';
    
    // Play demo notes
    const frequencies = [261.63, 293.66, 329.63, 349.23]; // C, D, E, F
    frequencies.forEach((freq, i) => {
        setTimeout(() => {
            playNote(freq, 0.5);
        }, i * 500);
    });
    
    // Reset UI after playing
    setTimeout(() => {
        playBtn.disabled = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i><span>Play</span>';
        exerciseCard.classList.remove('active');
    }, frequencies.length * 500);
}

function resetExercise(index) {
    const exerciseCard = document.querySelector(`[data-exercise="${index}"]`);
    exerciseCard.classList.remove('active');
}

// ===== QUIZ SECTION FUNCTIONS =====
function initQuizSection() {
    const startQuizBtn = document.getElementById('startQuizBtn');
    startQuizBtn.addEventListener('click', startQuiz);
}

function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
    selectedAnswer = null;
    showResults = false;
    timeLeft = 240;
    timerActive = true;
    
    // Hide start screen, show questions
    document.getElementById('quizStart').classList.add('hidden');
    document.getElementById('quizQuestions').classList.remove('hidden');
    
    // Start timer
    startQuizTimer();
    
    // Show first question
    showQuestion();
}

function startQuizTimer() {
    quizTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timeDisplay = document.getElementById('timeDisplay');
    const timerElement = document.querySelector('.quiz-timer');
    
    timeDisplay.textContent = formatTime(timeLeft);
    
    if (timeLeft < 60) {
        timerElement.classList.add('warning');
    }
}

function showQuestion() {
    const question = QUIZ_QUESTIONS[currentQuestion];
    
    // Update progress
    document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${QUIZ_QUESTIONS.length}`;
    const progressFill = document.getElementById('progressFill');
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Show question
    document.getElementById('questionText').textContent = question.question;
    
    // Create answer options
    createAnswerOptions(question);
    
    // Update next button
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.classList.add('disabled');
    nextBtn.textContent = currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question';
}

function createAnswerOptions(question) {
    const answerOptions = document.getElementById('answerOptions');
    answerOptions.innerHTML = '';
    
    if (question.type === 'multiple-choice') {
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.innerHTML = `
                <span class="answer-option-label">${String.fromCharCode(65 + index)}.</span>
                ${option}
            `;
            
            button.addEventListener('click', () => selectAnswer(option, button));
            answerOptions.appendChild(button);
        });
    } else if (question.type === 'true-false') {
        const container = document.createElement('div');
        container.className = 'tf-options';
        
        ['True', 'False'].forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = option;
            
            button.addEventListener('click', () => selectAnswer(option, button));
            container.appendChild(button);
        });
        
        answerOptions.appendChild(container);
    } else if (question.type === 'fretboard-identify') {
        const container = document.createElement('div');
        container.className = 'fretboard-options';
        
        DIATONIC_NOTES.forEach(note => {
            const button = document.createElement('button');
            button.className = 'fretboard-option';
            button.textContent = note;
            
            button.addEventListener('click', () => selectAnswer(note, button));
            container.appendChild(button);
        });
        
        answerOptions.appendChild(container);
    }
}

function selectAnswer(answer, button) {
    selectedAnswer = answer;
    
    // Update button states
    document.querySelectorAll('.answer-option, .fretboard-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    
    // Enable next button
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.classList.remove('disabled');
    nextBtn.onclick = nextQuestion;
}

function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Save answer
    userAnswers[currentQuestion] = selectedAnswer;
    selectedAnswer = null;
    
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    timerActive = false;
    if (quizTimer) {
        clearInterval(quizTimer);
    }
    
    // Save current answer if exists
    if (selectedAnswer !== null) {
        userAnswers[currentQuestion] = selectedAnswer;
    }
    
    showResults = true;
    
    // Hide questions, show results
    document.getElementById('quizQuestions').classList.add('hidden');
    showQuizResults();
}

function showQuizResults() {
    const quizResults = document.getElementById('quizResults');
    const score = calculateScore();
    const isPass = score.percentage >= 70;
    
    quizResults.innerHTML = `
        <div class="quiz-results-header ${isPass ? 'pass' : 'fail'}">
            <div class="results-icon-title">
                <i class="fas fa-${isPass ? 'trophy' : 'brain'}"></i>
                <h1>${isPass ? 'Congratulations!' : 'Keep Practicing!'}</h1>
            </div>

            <div class="results-score">
                <div class="score-percentage">${score.percentage}%</div>
                <p class="score-details">${score.correct} out of ${score.total} questions correct</p>
            </div>

            <div class="results-summary">
                <div class="summary-card">
                    <h3>Your Score</h3>
                    <div class="summary-value">${score.correct}/${score.total}</div>
                </div>
                <div class="summary-card">
                    <h3>Grade</h3>
                    <div class="summary-value grade">${getGrade(score.percentage)}</div>
                </div>
            </div>

            <p class="results-message">
                ${isPass 
                    ? "Excellent! You have a solid understanding of guitar theory basics. Keep practicing and exploring more advanced concepts!"
                    : "Don't worry! Music theory takes time to master. Review the lessons and try again when you're ready."
                }
            </p>

            <button class="retry-btn" onclick="resetQuiz()">
                <i class="fas fa-redo"></i>
                <span>Try Again</span>
            </button>
        </div>

        <div class="question-review">
            <h2>Question Review</h2>
            <div class="review-questions">
                ${createQuestionReview()}
            </div>
        </div>
    `;
    
    quizResults.classList.remove('hidden');
}

function calculateScore() {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            correct++;
        }
    });
    return { 
        correct, 
        total: QUIZ_QUESTIONS.length, 
        percentage: Math.round((correct / QUIZ_QUESTIONS.length) * 100) 
    };
}

function getGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    return 'F';
}

function createQuestionReview() {
    return QUIZ_QUESTIONS.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        const status = userAnswer === null ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect');
        
        return `
            <div class="review-question ${status}">
                <div class="review-header">
                    <span class="review-question-number">Question ${index + 1}:</span>
                    <div class="review-status">
                        <i class="fas fa-${userAnswer === null ? 'question' : (isCorrect ? 'check-circle' : 'times-circle')} ${status}"></i>
                    </div>
                </div>
                <p class="review-question-text">${question.question}</p>
                <div class="review-answers">
                    <div class="review-answer">
                        <span class="review-answer-label">Your answer:</span>
                        <span class="review-answer-value ${status}">${userAnswer || 'No answer'}</span>
                    </div>
                    <div class="review-answer">
                        <span class="review-answer-label">Correct answer:</span>
                        <span class="review-answer-value correct">${question.correctAnswer}</span>
                    </div>
                </div>
                <p class="review-explanation">${question.explanation}</p>
            </div>
        `;
    }).join('');
}

function resetQuiz() {
    quizStarted = false;
    currentQuestion = 0;
    selectedAnswer = null;
    userAnswers = [];
    selectedQuestions = [];
    showResults = false;
    timerActive = false;
    timeLeft = 240;
    
    if (quizTimer) {
        clearInterval(quizTimer);
        quizTimer = null;
    }
    
    // Reset UI
    document.getElementById('quizStart').classList.remove('hidden');
    document.getElementById('quizQuestions').classList.add('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    
    // Reset timer display
    document.getElementById('timeDisplay').textContent = '5:00';
    document.querySelector('.quiz-timer').classList.remove('warning');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initNavigation();
    initThemeToggle();
    initNotesSection();
    initTuningSection();
    initFretboardSection();
    initScalesSection();
    initPracticeSection();
    initQuizSection();
    
    console.log('Guitar Theory App initialized successfully!');
});

// Make functions available globally for onclick handlers
window.playExercise = playExercise;
window.resetExercise = resetExercise;
window.resetQuiz = resetQuiz;
