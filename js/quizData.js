// Expanded quiz question pool (75 questions)
const QUIZ_QUESTIONS = [
    // Basic Theory Questions (1-15)
    {
        id: 1,
        type: 'multiple-choice',
        question: 'How many notes are in the diatonic scale system?',
        options: ['5', '7', '8', '12'],
        correctAnswer: '7',
        explanation: 'The diatonic scale system consists of seven notes: Do, Re, Mi, Fa, Sol, La, Ti (or A, B, C, D, E, F, G).',
        category: 'basic'
    },
    {
        id: 2,
        type: 'true-false',
        question: 'Standard guitar tuning from thickest to thinnest string is E-A-D-G-B-E.',
        correctAnswer: 'True',
        explanation: 'Yes! Standard guitar tuning is E (6th/thickest) - A (5th) - D (4th) - G (3rd) - B (2nd) - E (1st/thinnest).',
        category: 'basic'
    },
    {
        id: 3,
        type: 'multiple-choice',
        question: 'Which scale contains no sharps or flats?',
        options: ['G Major', 'C Major', 'D Major', 'F Major'],
        correctAnswer: 'C Major',
        explanation: 'C Major scale (C-D-E-F-G-A-B) contains only natural notes with no sharps or flats.',
        category: 'basic'
    },
    {
        id: 4,
        type: 'fretboard-identify',
        question: 'What note is on the 3rd fret of the A string (5th string)?',
        correctAnswer: 'C',
        explanation: 'The A string open is A. Count up 3 semitones: A# (1st fret), B (2nd fret), C (3rd fret).',
        category: 'fretboard'
    },
    {
        id: 5,
        type: 'multiple-choice',
        question: 'What is the solfege name for the 5th degree of a major scale?',
        options: ['Fa', 'Sol', 'La', 'Ti'],
        correctAnswer: 'Sol',
        explanation: 'The 5th degree of the major scale is "Sol" in solfege (or "G" in C major scale).',
        category: 'basic'
    },
    {
        id: 6,
        type: 'true-false',
        question: 'Minor scales sound generally brighter and happier than major scales.',
        correctAnswer: 'False',
        explanation: 'False. Minor scales typically sound darker and more melancholic, while major scales sound brighter and happier.',
        category: 'basic'
    },
    {
        id: 7,
        type: 'multiple-choice',
        question: 'How many frets are typically on a standard acoustic guitar?',
        options: ['12', '15', '20', '24'],
        correctAnswer: '20',
        explanation: 'Most standard acoustic guitars have 20 frets, though some may have 19 or 21.',
        category: 'basic'
    },
    {
        id: 8,
        type: 'fretboard-identify',
        question: 'What note is on the 5th fret of the low E string (6th string)?',
        correctAnswer: 'A',
        explanation: 'The low E string open is E. The 5th fret of the E string produces an A note.',
        category: 'fretboard'
    },
    {
        id: 9,
        type: 'multiple-choice',
        question: 'What interval is between the root and the 5th in a major scale?',
        options: ['Perfect 4th', 'Perfect 5th', 'Major 6th', 'Perfect Octave'],
        correctAnswer: 'Perfect 5th',
        explanation: 'The interval between the root (1st degree) and the 5th degree of a major scale is a Perfect 5th.',
        category: 'intervals'
    },
    {
        id: 10,
        type: 'true-false',
        question: 'The guitar is a transposing instrument.',
        correctAnswer: 'False',
        explanation: 'False. The guitar is not a transposing instrument - it sounds at the same pitch as written.',
        category: 'basic'
    },
    {
        id: 11,
        type: 'multiple-choice',
        question: 'Which note comes after G in the musical alphabet?',
        options: ['H', 'A', 'F', 'B'],
        correctAnswer: 'A',
        explanation: 'The musical alphabet goes A-B-C-D-E-F-G, then repeats. So after G comes A.',
        category: 'basic'
    },
    {
        id: 12,
        type: 'fretboard-identify',
        question: 'What note is on the 7th fret of the D string (4th string)?',
        correctAnswer: 'A',
        explanation: 'The D string open is D. Counting up 7 semitones: D# (1st), E (2nd), F (3rd), F# (4th), G (5th), G# (6th), A (7th).',
        category: 'fretboard'
    },
    {
        id: 13,
        type: 'multiple-choice',
        question: 'What is the relative minor of C Major?',
        options: ['A Minor', 'E Minor', 'D Minor', 'G Minor'],
        correctAnswer: 'A Minor',
        explanation: 'A Minor is the relative minor of C Major. They share the same notes but start from different roots.',
        category: 'scales'
    },
    {
        id: 14,
        type: 'true-false',
        question: 'All major scales follow the same pattern of whole and half steps.',
        correctAnswer: 'True',
        explanation: 'True. All major scales follow the pattern: W-W-H-W-W-W-H (where W=whole step, H=half step).',
        category: 'scales'
    },
    {
        id: 15,
        type: 'multiple-choice',
        question: 'How many semitones are in a perfect octave?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
        explanation: 'A perfect octave contains 12 semitones (half steps).',
        category: 'intervals'
    },

    // Intermediate Questions (16-45)
    {
        id: 16,
        type: 'multiple-choice',
        question: 'Which mode starts on the 2nd degree of the major scale?',
        options: ['Ionian', 'Dorian', 'Phrygian', 'Lydian'],
        correctAnswer: 'Dorian',
        explanation: 'Dorian mode starts on the 2nd degree of the major scale and has a minor quality.',
        category: 'modes'
    },
    {
        id: 17,
        type: 'fretboard-identify',
        question: 'What note is on the 12th fret of the G string (3rd string)?',
        correctAnswer: 'G',
        explanation: 'The 12th fret is always an octave higher than the open string. So 12th fret of G string is G.',
        category: 'fretboard'
    },
    {
        id: 18,
        type: 'multiple-choice',
        question: 'What chord is built on the 5th degree of C Major?',
        options: ['F Major', 'G Major', 'A Minor', 'D Minor'],
        correctAnswer: 'G Major',
        explanation: 'The 5th degree of C Major is G, and the chord built on G in the key of C Major is G Major.',
        category: 'chords'
    },
    {
        id: 19,
        type: 'true-false',
        question: 'The pentatonic scale contains 5 notes.',
        correctAnswer: 'True',
        explanation: 'True. "Pentatonic" means five tones, so the pentatonic scale contains 5 notes.',
        category: 'scales'
    },
    {
        id: 20,
        type: 'multiple-choice',
        question: 'What is the formula for a major triad?',
        options: ['1-3-5', '1-b3-5', '1-3-b5', '1-b3-b5'],
        correctAnswer: '1-3-5',
        explanation: 'A major triad consists of the root (1), major third (3), and perfect fifth (5).',
        category: 'chords'
    },
    {
        id: 21,
        type: 'fretboard-identify',
        question: 'What note is on the 2nd fret of the B string (2nd string)?',
        correctAnswer: 'C#',
        explanation: 'The B string open is B. The 2nd fret is C# (or Db).',
        category: 'fretboard'
    },
    {
        id: 22,
        type: 'multiple-choice',
        question: 'Which scale degree is called the "leading tone"?',
        options: ['6th', '7th', '2nd', '4th'],
        correctAnswer: '7th',
        explanation: 'The 7th degree of the major scale is called the leading tone because it leads to the octave.',
        category: 'theory'
    },
    {
        id: 23,
        type: 'true-false',
        question: 'The circle of fifths shows the relationship between different keys.',
        correctAnswer: 'True',
        explanation: 'True. The circle of fifths is a visual representation of key signatures and their relationships.',
        category: 'theory'
    },
    {
        id: 24,
        type: 'multiple-choice',
        question: 'What interval is between C and F?',
        options: ['Major 3rd', 'Perfect 4th', 'Perfect 5th', 'Major 6th'],
        correctAnswer: 'Perfect 4th',
        explanation: 'The interval between C and F is a Perfect 4th (5 semitones).',
        category: 'intervals'
    },
    {
        id: 25,
        type: 'fretboard-identify',
        question: 'What note is on the 9th fret of the high E string (1st string)?',
        correctAnswer: 'C#',
        explanation: 'The high E string open is E. Counting up 9 semitones gets you to C#.',
        category: 'fretboard'
    },
    {
        id: 26,
        type: 'multiple-choice',
        question: 'How many sharps does G Major have?',
        options: ['0', '1', '2', '3'],
        correctAnswer: '1',
        explanation: 'G Major has one sharp: F#.',
        category: 'key-signatures'
    },
    {
        id: 27,
        type: 'true-false',
        question: 'A diminished chord contains a minor third and a diminished fifth.',
        correctAnswer: 'True',
        explanation: 'True. A diminished chord has a minor third (b3) and diminished fifth (b5).',
        category: 'chords'
    },
    {
        id: 28,
        type: 'multiple-choice',
        question: 'What is the enharmonic equivalent of F#?',
        options: ['E#', 'Gb', 'G', 'Ab'],
        correctAnswer: 'Gb',
        explanation: 'F# and Gb are enharmonic equivalents - they sound the same but are spelled differently.',
        category: 'theory'
    },
    {
        id: 29,
        type: 'fretboard-identify',
        question: 'What note is on the 4th fret of the A string (5th string)?',
        correctAnswer: 'C#',
        explanation: 'The A string open is A. The 4th fret is C# (A-A#-B-C-C#).',
        category: 'fretboard'
    },
    {
        id: 30,
        type: 'multiple-choice',
        question: 'Which chord progression is known as the "vi-IV-I-V" in C Major?',
        options: ['Am-F-C-G', 'F-C-G-Am', 'C-G-Am-F', 'G-Am-F-C'],
        correctAnswer: 'Am-F-C-G',
        explanation: 'In C Major, vi-IV-I-V translates to Am-F-C-G, a very popular chord progression.',
        category: 'progressions'
    },

    // Advanced Questions (31-60)
    {
        id: 31,
        type: 'multiple-choice',
        question: 'What mode is built on the 4th degree of the major scale?',
        options: ['Dorian', 'Phrygian', 'Lydian', 'Mixolydian'],
        correctAnswer: 'Lydian',
        explanation: 'Lydian mode is built on the 4th degree of the major scale and has a raised 4th.',
        category: 'modes'
    },
    {
        id: 32,
        type: 'true-false',
        question: 'The tritone is exactly half an octave.',
        correctAnswer: 'True',
        explanation: 'True. The tritone is 6 semitones, which is exactly half of the 12 semitones in an octave.',
        category: 'intervals'
    },
    {
        id: 33,
        type: 'multiple-choice',
        question: 'What is the relative major of E Minor?',
        options: ['C Major', 'G Major', 'D Major', 'A Major'],
        correctAnswer: 'G Major',
        explanation: 'G Major is the relative major of E Minor. They share the same key signature (one sharp).',
        category: 'scales'
    },
    {
        id: 34,
        type: 'fretboard-identify',
        question: 'What note is on the 8th fret of the D string (4th string)?',
        correctAnswer: 'A#',
        explanation: 'The D string open is D. Counting up 8 semitones: D-D#-E-F-F#-G-G#-A-A#.',
        category: 'fretboard'
    },
    {
        id: 35,
        type: 'multiple-choice',
        question: 'Which interval creates the most consonant sound?',
        options: ['Major 2nd', 'Perfect 5th', 'Major 7th', 'Minor 2nd'],
        correctAnswer: 'Perfect 5th',
        explanation: 'The Perfect 5th is considered one of the most consonant intervals in music.',
        category: 'intervals'
    },
    {
        id: 36,
        type: 'true-false',
        question: 'The Mixolydian mode has a flattened 7th degree.',
        correctAnswer: 'True',
        explanation: 'True. Mixolydian mode is like a major scale but with a flattened 7th degree.',
        category: 'modes'
    },
    {
        id: 37,
        type: 'multiple-choice',
        question: 'How many flats does F Major have?',
        options: ['0', '1', '2', '3'],
        correctAnswer: '1',
        explanation: 'F Major has one flat: Bb.',
        category: 'key-signatures'
    },
    {
        id: 38,
        type: 'fretboard-identify',
        question: 'What note is on the 6th fret of the G string (3rd string)?',
        correctAnswer: 'C#',
        explanation: 'The G string open is G. Counting up 6 semitones: G-G#-A-A#-B-C-C#.',
        category: 'fretboard'
    },
    {
        id: 39,
        type: 'multiple-choice',
        question: 'What chord is typically built on the 7th degree of a major scale?',
        options: ['Major', 'Minor', 'Diminished', 'Augmented'],
        correctAnswer: 'Diminished',
        explanation: 'The chord built on the 7th degree of a major scale is diminished.',
        category: 'chords'
    },
    {
        id: 40,
        type: 'true-false',
        question: 'An augmented chord contains a major third and an augmented fifth.',
        correctAnswer: 'True',
        explanation: 'True. An augmented chord has a major third and an augmented (raised) fifth.',
        category: 'chords'
    },
    {
        id: 41,
        type: 'multiple-choice',
        question: 'What is the interval between C and A?',
        options: ['Perfect 5th', 'Major 6th', 'Minor 6th', 'Major 7th'],
        correctAnswer: 'Major 6th',
        explanation: 'The interval between C and A is a Major 6th (9 semitones).',
        category: 'intervals'
    },
    {
        id: 42,
        type: 'fretboard-identify',
        question: 'What note is on the 10th fret of the B string (2nd string)?',
        correctAnswer: 'A',
        explanation: 'The B string open is B. Counting up 10 semitones gets you to A.',
        category: 'fretboard'
    },
    {
        id: 43,
        type: 'multiple-choice',
        question: 'Which scale has the pattern W-H-W-W-H-W-W?',
        options: ['Major', 'Natural Minor', 'Harmonic Minor', 'Melodic Minor'],
        correctAnswer: 'Natural Minor',
        explanation: 'The natural minor scale follows the pattern W-H-W-W-H-W-W.',
        category: 'scales'
    },
    {
        id: 44,
        type: 'true-false',
        question: 'The Phrygian mode starts on the 3rd degree of the major scale.',
        correctAnswer: 'True',
        explanation: 'True. Phrygian mode is built on the 3rd degree of the major scale.',
        category: 'modes'
    },
    {
        id: 45,
        type: 'multiple-choice',
        question: 'What is the dominant chord in the key of A Major?',
        options: ['A Major', 'D Major', 'E Major', 'F# Minor'],
        correctAnswer: 'E Major',
        explanation: 'The dominant (5th degree) chord in A Major is E Major.',
        category: 'chords'
    },

    // Expert Questions (46-75)
    {
        id: 46,
        type: 'multiple-choice',
        question: 'What mode is also known as the "natural minor scale"?',
        options: ['Dorian', 'Phrygian', 'Aeolian', 'Locrian'],
        correctAnswer: 'Aeolian',
        explanation: 'Aeolian mode, built on the 6th degree of the major scale, is the same as the natural minor scale.',
        category: 'modes'
    },
    {
        id: 47,
        type: 'fretboard-identify',
        question: 'What note is on the 11th fret of the low E string (6th string)?',
        correctAnswer: 'D#',
        explanation: 'The low E string open is E. Counting up 11 semitones gets you to D#.',
        category: 'fretboard'
    },
    {
        id: 48,
        type: 'multiple-choice',
        question: 'Which chord contains the notes C-E-G-B?',
        options: ['C Major', 'C Major 7', 'C Minor 7', 'C Diminished'],
        correctAnswer: 'C Major 7',
        explanation: 'C Major 7 contains the notes C-E-G-B (root, major 3rd, perfect 5th, major 7th).',
        category: 'chords'
    },
    {
        id: 49,
        type: 'true-false',
        question: 'The Locrian mode is the only mode with a diminished 5th.',
        correctAnswer: 'True',
        explanation: 'True. Locrian mode, built on the 7th degree, is the only mode with a diminished 5th.',
        category: 'modes'
    },
    {
        id: 50,
        type: 'multiple-choice',
        question: 'What is the interval between F and B?',
        options: ['Perfect 4th', 'Tritone', 'Perfect 5th', 'Major 6th'],
        correctAnswer: 'Tritone',
        explanation: 'The interval between F and B is a tritone (6 semitones), also called a diminished 5th.',
        category: 'intervals'
    },
    {
        id: 51,
        type: 'fretboard-identify',
        question: 'What note is on the 1st fret of the G string (3rd string)?',
        correctAnswer: 'G#',
        explanation: 'The G string open is G. The 1st fret is G# (or Ab).',
        category: 'fretboard'
    },
    {
        id: 52,
        type: 'multiple-choice',
        question: 'How many sharps does E Major have?',
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
        explanation: 'E Major has four sharps: F#, C#, G#, and D#.',
        category: 'key-signatures'
    },
    {
        id: 53,
        type: 'true-false',
        question: 'A suspended chord replaces the third with either the 2nd or 4th.',
        correctAnswer: 'True',
        explanation: 'True. Suspended chords (sus2 or sus4) replace the third with the 2nd or 4th degree.',
        category: 'chords'
    },
    {
        id: 54,
        type: 'multiple-choice',
        question: 'What is the subdominant chord in C Major?',
        options: ['C Major', 'D Minor', 'F Major', 'G Major'],
        correctAnswer: 'F Major',
        explanation: 'The subdominant (4th degree) chord in C Major is F Major.',
        category: 'chords'
    },
    {
        id: 55,
        type: 'fretboard-identify',
        question: 'What note is on the 15th fret of the high E string (1st string)?',
        correctAnswer: 'G#',
        explanation: 'The high E string open is E. The 15th fret is G# (same as 3rd fret + octave).',
        category: 'fretboard'
    },
    {
        id: 56,
        type: 'multiple-choice',
        question: 'Which mode has a raised 4th degree?',
        options: ['Dorian', 'Phrygian', 'Lydian', 'Mixolydian'],
        correctAnswer: 'Lydian',
        explanation: 'Lydian mode has a raised 4th degree, giving it a bright, dreamy quality.',
        category: 'modes'
    },
    {
        id: 57,
        type: 'true-false',
        question: 'The harmonic minor scale has a raised 7th degree compared to natural minor.',
        correctAnswer: 'True',
        explanation: 'True. Harmonic minor raises the 7th degree, creating a leading tone.',
        category: 'scales'
    },
    {
        id: 58,
        type: 'multiple-choice',
        question: 'What chord progression is I-V-vi-IV in the key of G Major?',
        options: ['G-D-Em-C', 'C-G-Am-F', 'D-A-Bm-G', 'A-E-F#m-D'],
        correctAnswer: 'G-D-Em-C',
        explanation: 'In G Major, I-V-vi-IV translates to G-D-Em-C.',
        category: 'progressions'
    },
    {
        id: 59,
        type: 'fretboard-identify',
        question: 'What note is on the 14th fret of the A string (5th string)?',
        correctAnswer: 'A#',
        explanation: 'The A string open is A. The 14th fret is A# (same as 2nd fret + octave).',
        category: 'fretboard'
    },
    {
        id: 60,
        type: 'multiple-choice',
        question: 'What is the interval between G and F?',
        options: ['Major 7th', 'Minor 7th', 'Major 6th', 'Minor 6th'],
        correctAnswer: 'Minor 7th',
        explanation: 'The interval between G and F is a minor 7th (10 semitones).',
        category: 'intervals'
    },
    {
        id: 61,
        type: 'true-false',
        question: 'The blues scale is a pentatonic scale with an added blue note.',
        correctAnswer: 'True',
        explanation: 'True. The blues scale adds a "blue note" (flattened 5th) to the minor pentatonic scale.',
        category: 'scales'
    },
    {
        id: 62,
        type: 'multiple-choice',
        question: 'Which chord is built on the 2nd degree of a major scale?',
        options: ['Major', 'Minor', 'Diminished', 'Augmented'],
        correctAnswer: 'Minor',
        explanation: 'The chord built on the 2nd degree of a major scale is minor.',
        category: 'chords'
    },
    {
        id: 63,
        type: 'fretboard-identify',
        question: 'What note is on the 13th fret of the D string (4th string)?',
        correctAnswer: 'D#',
        explanation: 'The D string open is D. The 13th fret is D# (same as 1st fret + octave).',
        category: 'fretboard'
    },
    {
        id: 64,
        type: 'multiple-choice',
        question: 'How many flats does Bb Major have?',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: 'Bb Major has two flats: Bb and Eb.',
        category: 'key-signatures'
    },
    {
        id: 65,
        type: 'true-false',
        question: 'The Mixolydian mode is commonly used in blues and rock music.',
        correctAnswer: 'True',
        explanation: 'True. Mixolydian mode, with its flattened 7th, is very common in blues and rock.',
        category: 'modes'
    },
    {
        id: 66,
        type: 'multiple-choice',
        question: 'What is the mediant chord in A Major?',
        options: ['A Major', 'B Minor', 'C# Minor', 'D Major'],
        correctAnswer: 'C# Minor',
        explanation: 'The mediant (3rd degree) chord in A Major is C# Minor.',
        category: 'chords'
    },
    {
        id: 67,
        type: 'fretboard-identify',
        question: 'What note is on the 16th fret of the B string (2nd string)?',
        correctAnswer: 'D#',
        explanation: 'The B string open is B. The 16th fret is D# (same as 4th fret + octave).',
        category: 'fretboard'
    },
    {
        id: 68,
        type: 'multiple-choice',
        question: 'Which scale degree is called the "supertonic"?',
        options: ['1st', '2nd', '3rd', '4th'],
        correctAnswer: '2nd',
        explanation: 'The 2nd degree of the scale is called the supertonic.',
        category: 'theory'
    },
    {
        id: 69,
        type: 'true-false',
        question: 'A half-diminished chord contains a minor 3rd, diminished 5th, and minor 7th.',
        correctAnswer: 'True',
        explanation: 'True. A half-diminished chord (m7b5) has a minor 3rd, diminished 5th, and minor 7th.',
        category: 'chords'
    },
    {
        id: 70,
        type: 'multiple-choice',
        question: 'What is the interval between D and B?',
        options: ['Perfect 5th', 'Major 6th', 'Minor 6th', 'Major 7th'],
        correctAnswer: 'Major 6th',
        explanation: 'The interval between D and B is a Major 6th (9 semitones).',
        category: 'intervals'
    },
    {
        id: 71,
        type: 'fretboard-identify',
        question: 'What note is on the 17th fret of the G string (3rd string)?',
        correctAnswer: 'D',
        explanation: 'The G string open is G. The 17th fret is D (same as 5th fret + octave).',
        category: 'fretboard'
    },
    {
        id: 72,
        type: 'multiple-choice',
        question: 'Which mode starts on the 6th degree of the major scale?',
        options: ['Mixolydian', 'Aeolian', 'Locrian', 'Ionian'],
        correctAnswer: 'Aeolian',
        explanation: 'Aeolian mode starts on the 6th degree of the major scale.',
        category: 'modes'
    },
    {
        id: 73,
        type: 'true-false',
        question: 'The melodic minor scale has different ascending and descending forms.',
        correctAnswer: 'True',
        explanation: 'True. The melodic minor scale traditionally has different ascending and descending forms.',
        category: 'scales'
    },
    {
        id: 74,
        type: 'multiple-choice',
        question: 'What chord contains the notes F-A-C-E?',
        options: ['F Major', 'F Major 7', 'F Minor 7', 'F Diminished 7'],
        correctAnswer: 'F Major 7',
        explanation: 'F Major 7 contains the notes F-A-C-E (root, major 3rd, perfect 5th, major 7th).',
        category: 'chords'
    },
    {
        id: 75,
        type: 'fretboard-identify',
        question: 'What note is on the 19th fret of the high E string (1st string)?',
        correctAnswer: 'B',
        explanation: 'The high E string open is E. The 19th fret is B (same as 7th fret + octave).',
        category: 'fretboard'
    }
];

// Quiz configuration and state management
class QuizManager {
    constructor() {
        this.allQuestions = QUIZ_QUESTIONS;
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.timeLeft = 300;
        this.timerInterval = null;
        this.quizSettings = {
            questionCount: 10,
            timeLimit: 300,
            shuffleQuestions: true
        };
    }

    selectRandomQuestions(count) {
        const shuffled = [...this.allQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    startQuiz(settings) {
        this.quizSettings = { ...this.quizSettings, ...settings };
        this.currentQuestions = this.selectRandomQuestions(this.quizSettings.questionCount);
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.currentQuestions.length).fill(null);
        this.timeLeft = this.quizSettings.timeLimit;
        
        if (this.quizSettings.timeLimit > 0) {
            this.startTimer();
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.finishQuiz();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('quiz-timer');
        if (timerElement) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (this.timeLeft < 60) {
                timerElement.style.color = '#ef4444';
            }
        }
    }

    submitAnswer(answer) {
        this.userAnswers[this.currentQuestionIndex] = answer;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    finishQuiz() {
        this.stopTimer();
        return this.calculateResults();
    }

    calculateResults() {
        let correct = 0;
        const results = [];
        
        this.currentQuestions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            if (isCorrect) correct++;
            
            results.push({
                question: question.question,
                userAnswer: userAnswer || 'No answer',
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
                explanation: question.explanation
            });
        });
        
        const total = this.currentQuestions.length;
        const percentage = Math.round((correct / total) * 100);
        
        return {
            correct,
            total,
            percentage,
            results,
            passed: percentage >= 70
        };
    }

    getCurrentQuestion() {
        return this.currentQuestions[this.currentQuestionIndex];
    }

    getProgress() {
        return {
            current: this.currentQuestionIndex + 1,
            total: this.currentQuestions.length,
            percentage: ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100
        };
    }
}

// Global quiz manager instance
const quizManager = new QuizManager();