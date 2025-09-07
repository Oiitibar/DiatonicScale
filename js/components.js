// Component rendering functions for different sections

function renderHero() {
    return `
        <div class="max-w-6xl mx-auto">
            <!-- Hero Section -->
            <div class="hero-gradient relative overflow-hidden rounded-3xl mb-12 p-8 md:p-16 text-center">
                <div class="relative z-10">
                    <div class="flex items-center justify-center mb-6">
                        <svg class="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                        </svg>
                        <h1 class="text-4xl md:text-6xl font-bold">Diatonic Scales</h1>
                    </div>
                    <p class="text-xl md:text-2xl font-light mb-8">
                        Master Guitar Theory Basics
                    </p>
                    <p class="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Discover the foundation of music theory through interactive learning. 
                        Explore the seven diatonic notes, understand guitar tuning, and master 
                        scale patterns that will unlock your musical potential.
                    </p>
                </div>
            </div>

            <!-- Introduction Content -->
            <div class="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 class="text-3xl font-bold mb-6 text-gray-900">
                        What Are Diatonic Scales?
                    </h2>
                    <div class="space-y-4 text-lg leading-relaxed text-gray-700">
                        <p>
                            Diatonic scales are the foundation of Western music theory. They consist of seven notes 
                            arranged in a specific pattern of whole and half steps, creating the familiar sounds 
                            we hear in countless songs.
                        </p>
                        <p>
                            On the guitar, understanding diatonic scales opens up a world of possibilities for 
                            improvisation, songwriting, and understanding how music works. Each scale has its 
                            own unique character and emotional quality.
                        </p>
                        <p>
                            Whether you're playing major scales that sound bright and happy, or minor scales 
                            that evoke more serious emotions, diatonic scales are your roadmap to musical expression.
                        </p>
                    </div>
                </div>

                <div class="card">
                    <h3 class="text-2xl font-bold mb-6 text-gray-900">
                        Why Learn Diatonic Scales?
                    </h3>
                    <div class="space-y-4">
                        ${[
                            { title: 'Musical Foundation', description: 'Build a solid understanding of how music works' },
                            { title: 'Fretboard Mastery', description: 'Navigate the guitar neck with confidence' },
                            { title: 'Theory Knowledge', description: 'Understand songs and communicate with other musicians' },
                            { title: 'Creative Expression', description: 'Unlock your ability to improvise and compose' }
                        ].map(item => `
                            <div class="flex items-start space-x-4">
                                <div class="p-2 rounded-lg bg-blue-100">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-semibold mb-1 text-gray-900">${item.title}</h4>
                                    <p class="text-sm text-gray-600">${item.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Getting Started Guide -->
            <div class="rounded-2xl p-8 bg-gradient-to-r from-purple-50 to-blue-50">
                <h3 class="text-2xl font-bold mb-6 text-center text-gray-900">
                    Your Learning Journey
                </h3>
                <div class="grid md:grid-cols-4 gap-6">
                    ${[
                        { step: 1, title: 'Learn the Notes', description: 'Start with the seven diatonic notes' },
                        { step: 2, title: 'Guitar Tuning', description: 'Understand standard guitar tuning' },
                        { step: 3, title: 'Fretboard Map', description: 'Explore notes across the fretboard' },
                        { step: 4, title: 'Practice Scales', description: 'Master scale patterns and shapes' }
                    ].map(item => `
                        <div class="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                            <div class="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold bg-blue-600 text-white">
                                ${item.step}
                            </div>
                            <h4 class="font-semibold mb-2 text-gray-900">${item.title}</h4>
                            <p class="text-sm text-gray-600">${item.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderFamilyNotes() {
    return `
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold mb-4 text-gray-900">
                    The Seven Diatonic Notes
                </h1>
                <p class="text-xl max-w-3xl mx-auto text-gray-600">
                    These seven notes form the foundation of Western music. Click on each note to hear its sound 
                    and learn both the letter name and solfege system.
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 mb-16">
                <!-- Interactive Note Wheel -->
                <div class="flex flex-col items-center">
                    <h2 class="text-2xl font-bold mb-8 text-gray-900">
                        Interactive Note Wheel
                    </h2>
                    
                    <div class="note-wheel">
                        <div class="note-wheel-bg"></div>
                        
                        ${DIATONIC_NOTES.map((note, index) => {
                            const angle = (index * 360) / 7 - 90; // Start from top
                            const radius = 120;
                            const x = Math.cos((angle * Math.PI) / 180) * radius + 160;
                            const y = Math.sin((angle * Math.PI) / 180) * radius + 160;
                            
                            return `
                                <button
                                    class="note-button"
                                    style="left: ${x}px; top: ${y}px; background: ${getNoteColor(note)}"
                                    onclick="playNoteAndHighlight('${note}', ${index})"
                                    data-note="${note}"
                                >
                                    <div class="flex flex-col items-center justify-center">
                                        <span class="text-lg font-bold">${note}</span>
                                        <svg class="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 14.142"></path>
                                        </svg>
                                    </div>
                                </button>
                            `;
                        }).join('')}
                        
                        <!-- Center circle -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100 text-gray-900 shadow-inner">
                                <span class="text-2xl font-bold" id="center-note">♪</span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="mt-6 text-center text-gray-600">
                        Click any note to hear its sound
                    </p>
                </div>

                <!-- Note Information -->
                <div class="space-y-6">
                    <h2 class="text-2xl font-bold mb-6 text-gray-900">
                        Note System Explanation
                    </h2>
                    
                    ${DIATONIC_NOTES.map((note, index) => `
                        <div class="card transition-all duration-200 cursor-pointer hover:scale-105" 
                             onclick="playNoteAndHighlight('${note}', ${index})"
                             data-note-card="${note}">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                                         style="background: ${getNoteColor(note)}">
                                        ${note}
                                    </div>
                                    <div>
                                        <div class="flex items-center space-x-3">
                                            <span class="text-lg font-bold text-gray-900">
                                                ${note} - ${SOLFEGE[index]}
                                            </span>
                                            <button class="p-1 rounded-full transition-colors hover:bg-gray-200">
                                                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 14.142"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <p class="text-sm text-gray-600">
                                            Position ${index + 1} in the diatonic scale
                                        </p>
                                    </div>
                                </div>
                                <div class="text-right text-sm text-gray-500">
                                    ${NOTE_FREQUENCIES[note]}Hz
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Educational Content -->
            <div class="rounded-2xl p-8 bg-gradient-to-r from-blue-50 to-purple-50">
                <h2 class="text-2xl font-bold mb-6 text-gray-900">
                    Understanding the Diatonic System
                </h2>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-900">
                            Letter Names (A-G)
                        </h3>
                        <p class="mb-4 text-gray-700">
                            The seven letter names represent the natural notes in music. These letters repeat 
                            in cycles: A, B, C, D, E, F, G, then back to A. This system has been used for 
                            centuries and forms the basis of musical notation.
                        </p>
                        <div class="p-4 rounded-lg bg-white">
                            <p class="font-mono text-lg text-gray-800">
                                C - D - E - F - G - A - B - C
                            </p>
                            <p class="text-sm mt-2 text-gray-600">
                                The C Major Scale (no sharps or flats)
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-semibold mb-4 text-gray-900">
                            Solfege System (Do-Ti)
                        </h3>
                        <p class="mb-4 text-gray-700">
                            Solfege is a method of teaching pitch and sight-singing using syllables. Each note 
                            has a specific syllable that helps you remember its sound and function within the scale. 
                            This system is incredibly useful for ear training.
                        </p>
                        <div class="p-4 rounded-lg bg-white">
                            <p class="font-mono text-lg text-gray-800">
                                Do - Re - Mi - Fa - Sol - La - Ti - Do
                            </p>
                            <p class="text-sm mt-2 text-gray-600">
                                Movable Do system (Do = tonic of any key)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderGuitarTuning() {
    return `
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold mb-4 text-gray-900">
                    Guitar Strings & Standard Tuning
                </h1>
                <p class="text-xl max-w-3xl mx-auto text-gray-600">
                    Learn the standard guitar tuning and hear how each string should sound. 
                    Click on any string to play its open note.
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 mb-16">
                <!-- Interactive Guitar Diagram -->
                <div class="flex flex-col items-center">
                    <h2 class="text-2xl font-bold mb-8 text-gray-900">
                        Interactive Guitar Tuner
                    </h2>
                    
                    <div class="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 shadow-2xl">
                        <!-- Guitar Body -->
                        <div class="relative">
                            <div class="w-80 h-96 rounded-t-full rounded-b-3xl border-4 border-amber-600 bg-gradient-to-b from-amber-200 to-amber-300 shadow-inner">
                                <!-- Sound Hole -->
                                <div class="absolute top-32 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-800 shadow-2xl"></div>
                                
                                <!-- Strings -->
                                <div class="absolute top-8 bottom-8 left-1/2 transform -translate-x-1/2">
                                    ${GUITAR_TUNING.strings.map((string, index) => {
                                        const colors = [
                                            'linear-gradient(135deg, #ef4444, #dc2626)',
                                            'linear-gradient(135deg, #f97316, #ea580c)',
                                            'linear-gradient(135deg, #eab308, #ca8a04)',
                                            'linear-gradient(135deg, #22c55e, #16a34a)',
                                            'linear-gradient(135deg, #3b82f6, #2563eb)',
                                            'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                                        ];
                                        
                                        return `
                                            <button
                                                class="block w-80 h-8 mb-2 relative group transition-all duration-200"
                                                onclick="playStringAndHighlight(${index}, ${string.frequency})"
                                                data-string="${index}"
                                                style="margin-top: ${index === 0 ? '0' : '8px'}"
                                            >
                                                <!-- String line -->
                                                <div class="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 transition-all duration-200 h-1 group-hover:h-1.5 rounded-full shadow-lg"
                                                     style="background: ${colors[index]}"></div>
                                                
                                                <!-- String label -->
                                                <div class="absolute -left-24 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg bg-white text-gray-800 shadow-md transition-all duration-200 text-sm font-medium">
                                                    ${string.name}
                                                </div>
                                                
                                                <!-- Note indicator -->
                                                <div class="absolute -right-16 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg transition-all duration-200 group-hover:scale-110"
                                                     style="background: ${colors[index]}">
                                                    ${string.note}
                                                </div>
                                            </button>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <p class="mt-6 text-center text-gray-600">
                        Click on any string to hear its open note
                    </p>
                </div>

                <!-- Tuning Information -->
                <div class="space-y-6">
                    <h2 class="text-2xl font-bold mb-6 text-gray-900">
                        Standard Tuning Reference
                    </h2>
                    
                    ${GUITAR_TUNING.strings.map((string, index) => {
                        const colors = [
                            'linear-gradient(135deg, #ef4444, #dc2626)',
                            'linear-gradient(135deg, #f97316, #ea580c)',
                            'linear-gradient(135deg, #eab308, #ca8a04)',
                            'linear-gradient(135deg, #22c55e, #16a34a)',
                            'linear-gradient(135deg, #3b82f6, #2563eb)',
                            'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                        ];
                        
                        return `
                            <div class="card transition-all duration-200 cursor-pointer hover:scale-105"
                                 onclick="playStringAndHighlight(${index}, ${string.frequency})"
                                 data-string-card="${index}">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                                             style="background: ${colors[index]}">
                                            ${string.note}
                                        </div>
                                        <div>
                                            <div class="flex items-center space-x-3">
                                                <span class="text-lg font-bold text-gray-900">
                                                    ${string.name}
                                                </span>
                                                <button class="p-1 rounded-full transition-colors hover:bg-gray-200">
                                                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 14.142"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <p class="text-sm text-gray-600">
                                                Open string note: ${string.note}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="text-right text-sm text-gray-500">
                                        ${string.frequency}Hz
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    
                    <!-- Tuning Tips -->
                    <div class="p-6 rounded-xl bg-yellow-50 border border-yellow-200">
                        <div class="flex items-start space-x-3">
                            <svg class="w-5 h-5 mt-0.5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold mb-2 text-yellow-800">
                                    Tuning Tips
                                </h3>
                                <ul class="space-y-1 text-sm text-yellow-700">
                                    <li>• Always tune up to the note (tune flat, then tighten)</li>
                                    <li>• Check your tuning frequently, especially when learning</li>
                                    <li>• Use a metronome when practicing to develop timing</li>
                                    <li>• New strings take time to settle - retune often at first</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Educational Content -->
            <div class="rounded-2xl p-8 bg-gradient-to-r from-green-50 to-blue-50">
                <h2 class="text-2xl font-bold mb-6 text-gray-900">
                    Why Standard Tuning Matters
                </h2>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <div>
                        <svg class="w-8 h-8 mb-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                        </svg>
                        <h3 class="text-xl font-semibold mb-3 text-gray-900">
                            Universal Standard
                        </h3>
                        <p class="text-gray-700">
                            Standard tuning (E-A-D-G-B-E) is used by virtually all guitarists worldwide. 
                            Learning this tuning allows you to play with others and follow standard tabs and chord charts.
                        </p>
                    </div>
                    
                    <div>
                        <svg class="w-8 h-8 mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 14.142"></path>
                        </svg>
                        <h3 class="text-xl font-semibold mb-3 text-gray-900">
                            Optimal Intervals
                        </h3>
                        <p class="text-gray-700">
                            The intervals between strings are carefully chosen to make chord shapes and scales 
                            comfortable to play, while providing good range across the fretboard.
                        </p>
                    </div>
                    
                    <div>
                        <svg class="w-8 h-8 mb-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <h3 class="text-xl font-semibold mb-3 text-gray-900">
                            Foundation for Learning
                        </h3>
                        <p class="text-gray-700">
                            Once you master standard tuning, you can explore alternate tunings with confidence. 
                            But start here - it's the foundation that all other guitar knowledge builds upon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFretboard() {
    const selectedScale = 'C Major'; // Default scale
    
    return `
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold mb-4 text-gray-900">
                    Interactive Guitar Fretboard
                </h1>
                <p class="text-xl max-w-3xl mx-auto text-gray-600">
                    Explore notes across the fretboard and see how different scales map to the guitar neck. 
                    Click any fret to hear the note.
                </p>
            </div>

            <!-- Scale Selection -->
            <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
                <label class="text-lg font-semibold text-gray-900">
                    Select Scale:
                </label>
                <select id="scale-selector" class="px-4 py-2 rounded-lg font-medium transition-colors bg-white text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    ${Object.keys(SCALES).map(scaleName => `
                        <option value="${scaleName}" ${scaleName === selectedScale ? 'selected' : ''}>
                            ${scaleName}
                        </option>
                    `).join('')}
                </select>
                
                <div class="px-4 py-2 rounded-lg bg-blue-100 text-blue-800" id="scale-type">
                    <span class="text-sm font-medium">
                        ${SCALES[selectedScale].type.toUpperCase()} SCALE
                    </span>
                </div>
            </div>

            <!-- Fretboard -->
            <div class="fretboard mb-8">
                <div class="min-w-max">
                    <!-- Fret Numbers -->
                    <div class="flex mb-4">
                        <div class="w-16"></div>
                        ${Array.from({ length: 13 }, (_, i) => `
                            <div class="w-16 text-center">
                                <span class="text-sm font-bold text-gray-700">${i}</span>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Fretboard Grid -->
                    ${['E', 'B', 'G', 'D', 'A', 'E'].map((stringName, stringIndex) => `
                        <div class="flex items-center mb-2">
                            <!-- String Name -->
                            <div class="w-16 text-center font-bold text-lg text-gray-900">
                                ${stringName}
                            </div>
                            
                            <!-- Frets -->
                            ${Array.from({ length: 13 }, (_, fret) => {
                                const note = getFretboardNote(stringIndex, fret);
                                const inScale = isNoteInScale(note, selectedScale);
                                const scaleType = SCALES[selectedScale].type;
                                
                                return `
                                    <button
                                        class="fret-button ${inScale ? (scaleType === 'major' ? 'major-scale in-scale' : 'minor-scale in-scale') : 'not-in-scale'}"
                                        onclick="playFretNote(${stringIndex}, ${fret})"
                                        data-string="${stringIndex}"
                                        data-fret="${fret}"
                                        data-note="${note}"
                                    >
                                        <div class="flex flex-col items-center justify-center">
                                            <span class="text-sm font-bold">${note}</span>
                                            ${inScale ? '<svg class="w-3 h-3 opacity-70 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.464 8.464a5 5 0 000 7.072m-2.828-9.9a9 9 0 000 14.142"></path></svg>' : ''}
                                        </div>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Scale Information -->
            <div class="grid lg:grid-cols-2 gap-8 mb-12">
                <div class="card">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">
                        Scale Information
                    </h3>
                    <div class="space-y-3" id="scale-info">
                        <div>
                            <span class="font-semibold text-gray-700">Scale: </span>
                            <span class="ml-2 px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
                                ${selectedScale}
                            </span>
                        </div>
                        <div>
                            <span class="font-semibold text-gray-700">Notes: </span>
                            <span class="ml-2 text-gray-900">
                                ${SCALES[selectedScale].notes.join(' - ')}
                            </span>
                        </div>
                        <div>
                            <span class="font-semibold text-gray-700">Root Note: </span>
                            <span class="ml-2 font-bold text-gray-900">
                                ${SCALES[selectedScale].root}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="text-xl font-bold mb-4 text-gray-900">
                        How to Use This Fretboard
                    </h3>
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li class="flex items-start">
                            <span class="text-blue-500 mr-2">•</span>
                            Highlighted notes belong to the selected scale
                        </li>
                        <li class="flex items-start">
                            <span class="text-blue-500 mr-2">•</span>
                            Click any fret to hear the note sound
                        </li>
                        <li class="flex items-start">
                            <span class="text-blue-500 mr-2">•</span>
                            Blue highlights indicate major scales
                        </li>
                        <li class="flex items-start">
                            <span class="text-blue-500 mr-2">•</span>
                            Red highlights indicate minor scales
                        </li>
                        <li class="flex items-start">
                            <span class="text-blue-500 mr-2">•</span>
                            Position markers show common reference points
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Practice Tips -->
            <div class="rounded-2xl p-8 bg-gradient-to-r from-purple-50 to-blue-50">
                <h2 class="text-2xl font-bold mb-6 text-center text-gray-900">
                    Fretboard Practice Tips
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    ${[
                        {
                            title: 'Start Simple',
                            description: 'Begin with one scale pattern at a time. Master C Major before moving to other keys.'
                        },
                        {
                            title: 'Practice Daily',
                            description: 'Spend 5-10 minutes daily exploring different areas of the fretboard.'
                        },
                        {
                            title: 'Memorize Patterns',
                            description: 'Learn the visual patterns of scales. Your fingers will remember the shapes.'
                        }
                    ].map(tip => `
                        <div class="p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                            <h3 class="font-bold mb-2 text-gray-900">${tip.title}</h3>
                            <p class="text-sm text-gray-600">${tip.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderQuizStart() {
    return `
        <div class="max-w-4xl mx-auto text-center">
            <div class="p-12 rounded-3xl bg-gradient-to-br from-purple-100 via-blue-100 to-gray-100 shadow-2xl">
                <div class="flex items-center justify-center mb-8">
                    <svg class="w-16 h-16 mr-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    <h1 class="text-4xl font-bold text-gray-900">
                        Guitar Theory Quiz
                    </h1>
                </div>
                
                <p class="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
                    Test your knowledge of diatonic scales, guitar tuning, and fretboard theory. 
                    Choose your quiz settings and challenge yourself!
                </p>

                <div class="grid md:grid-cols-3 gap-6 mb-10">
                    ${[
                        { title: 'Question Pool', value: '75 Questions', color: 'blue' },
                        { title: 'Customizable', value: '10-20 Questions', color: 'green' },
                        { title: 'Passing Score', value: '70%', color: 'yellow' }
                    ].map(item => `
                        <div class="p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                            <svg class="w-8 h-8 mx-auto mb-2 text-${item.color}-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 class="font-bold text-gray-900">${item.title}</h3>
                            <p class="text-lg font-semibold text-gray-600">${item.value}</p>
                        </div>
                    `).join('')}
                </div>

                <button
                    onclick="showQuizSettings()"
                    class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    `;
}

function renderQuizQuestion() {
    const question = quizManager.getCurrentQuestion();
    const progress = quizManager.getProgress();
    
    if (!question) return renderQuizStart();
    
    return `
        <div class="quiz-container">
            <!-- Quiz Header -->
            <div class="quiz-header">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-4">
                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                        <span class="font-bold text-lg text-gray-900">
                            Question ${progress.current} of ${progress.total}
                        </span>
                    </div>
                    <div class="flex items-center space-x-4 text-gray-600" id="timer-display">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="font-mono text-lg font-bold" id="quiz-timer">
                            ${Math.floor(quizManager.timeLeft / 60)}:${(quizManager.timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>
                
                <!-- Progress Bar -->
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
            </div>

            <!-- Question -->
            <div class="question-card">
                <h2 class="text-2xl font-bold mb-6 text-gray-900">
                    ${question.question}
                </h2>

                <!-- Answer Options -->
                <div class="space-y-4" id="answer-options">
                    ${renderAnswerOptions(question)}
                </div>

                <!-- Next Button -->
                <div class="flex justify-end mt-8">
                    <button
                        id="next-question-btn"
                        onclick="handleNextQuestion()"
                        disabled
                        class="px-6 py-3 rounded-lg font-bold transition-all duration-200 bg-gray-300 text-gray-500 cursor-not-allowed"
                    >
                        ${progress.current === progress.total ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderAnswerOptions(question) {
    if (question.type === 'multiple-choice' && question.options) {
        return question.options.map((option, index) => `
            <button
                class="answer-option"
                onclick="selectAnswer('${option}')"
                data-answer="${option}"
            >
                <span class="mr-3 font-bold">
                    ${String.fromCharCode(65 + index)}.
                </span>
                ${option}
            </button>
        `).join('');
    }
    
    if (question.type === 'true-false') {
        return ['True', 'False'].map(option => `
            <button
                class="answer-option"
                onclick="selectAnswer('${option}')"
                data-answer="${option}"
            >
                ${option}
            </button>
        `).join('');
    }
    
    if (question.type === 'fretboard-identify') {
        return `
            <div class="grid grid-cols-4 gap-3">
                ${DIATONIC_NOTES.map(note => `
                    <button
                        class="answer-option"
                        onclick="selectAnswer('${note}')"
                        data-answer="${note}"
                    >
                        ${note}
                    </button>
                `).join('')}
            </div>
        `;
    }
    
    return '';
}

function renderQuizResults(results) {
    const isPass = results.passed;
    
    return `
        <div class="max-w-4xl mx-auto">
            <div class="quiz-results ${isPass ? 'bg-gradient-to-br from-green-100 to-teal-100' : 'bg-gradient-to-br from-red-100 to-pink-100'} mb-8">
                <div class="flex items-center justify-center mb-6">
                    ${isPass ? `
                        <svg class="w-16 h-16 mr-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    ` : `
                        <svg class="w-16 h-16 mr-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    `}
                    <h1 class="text-4xl font-bold ${isPass ? 'text-green-800' : 'text-red-800'}">
                        ${isPass ? 'Congratulations!' : 'Keep Practicing!'}
                    </h1>
                </div>

                <div class="mb-8">
                    <div class="score-display ${isPass ? 'score-pass' : 'score-fail'}">
                        ${results.percentage}%
                    </div>
                    <p class="text-xl ${isPass ? 'text-green-600' : 'text-red-600'}">
                        ${results.correct} out of ${results.total} questions correct
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-6 mb-8">
                    <div class="p-4 rounded-xl bg-white/50">
                        <h3 class="font-bold text-lg mb-2 text-gray-800">Your Score</h3>
                        <div class="text-3xl font-bold ${isPass ? 'text-green-500' : 'text-red-500'}">
                            ${results.correct}/${results.total}
                        </div>
                    </div>
                    <div class="p-4 rounded-xl bg-white/50">
                        <h3 class="font-bold text-lg mb-2 text-gray-800">Grade</h3>
                        <div class="text-3xl font-bold ${
                            results.percentage >= 90 ? 'text-green-500' :
                            results.percentage >= 80 ? 'text-blue-500' :
                            results.percentage >= 70 ? 'text-yellow-500' : 'text-red-500'
                        }">
                            ${results.percentage >= 90 ? 'A' :
                              results.percentage >= 80 ? 'B' :
                              results.percentage >= 70 ? 'C' : 'F'}
                        </div>
                    </div>
                </div>

                <p class="text-lg mb-8 text-gray-700">
                    ${isPass 
                        ? "Excellent! You have a solid understanding of guitar theory basics. Keep practicing and exploring more advanced concepts!"
                        : "Don't worry! Music theory takes time to master. Review the lessons and try again when you're ready."
                    }
                </p>

                <div class="flex space-x-4 justify-center">
                    <button
                        onclick="resetQuiz()"
                        class="px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-800 shadow-lg hover:shadow-xl"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        <span>Try Again</span>
                    </button>
                    
                    <button
                        onclick="showQuizSettings()"
                        class="px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>New Quiz</span>
                    </button>
                </div>
            </div>

            <!-- Detailed Results -->
            <div class="card">
                <h2 class="text-2xl font-bold mb-6 text-gray-900">
                    Question Review
                </h2>
                <div class="space-y-4">
                    ${results.results.map((result, index) => `
                        <div class="p-4 rounded-lg border-l-4 ${
                            result.isCorrect 
                                ? 'border-green-500 bg-green-50' 
                                : result.userAnswer === 'No answer'
                                    ? 'border-gray-400 bg-gray-50'
                                    : 'border-red-500 bg-red-50'
                        }">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-2 mb-2">
                                        <span class="font-bold text-gray-900">
                                            Question ${index + 1}:
                                        </span>
                                        ${result.isCorrect ? `
                                            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        ` : `
                                            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        `}
                                    </div>
                                    <p class="mb-2 text-gray-700">${result.question}</p>
                                    <div class="space-y-1 text-sm">
                                        <div>
                                            <span class="font-medium">Your answer: </span>
                                            <span class="${
                                                result.isCorrect ? 'text-green-600' : 
                                                result.userAnswer === 'No answer' ? 'text-gray-500' : 'text-red-600'
                                            }">
                                                ${result.userAnswer}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="font-medium">Correct answer: </span>
                                            <span class="text-green-600">${result.correctAnswer}</span>
                                        </div>
                                        <p class="mt-2 italic text-gray-600">
                                            ${result.explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Simple components for other sections
function renderScalePatterns() {
    return `
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold mb-4 text-gray-900">Scale Shapes & Patterns</h1>
                <p class="text-xl max-w-3xl mx-auto text-gray-600">
                    Learn common diatonic scale patterns and shapes. These "box patterns" are essential 
                    building blocks for guitar playing and improvisation.
                </p>
            </div>
            <div class="card">
                <h2 class="text-2xl font-bold mb-4">Coming Soon</h2>
                <p class="text-gray-600">Interactive scale patterns and practice exercises will be available here.</p>
            </div>
        </div>
    `;
}

function renderPracticalApplication() {
    return `
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold mb-4 text-gray-900">Practical Application</h1>
                <p class="text-xl max-w-3xl mx-auto text-gray-600">
                    Apply your scale knowledge with practical exercises, riffs, and practice routines. 
                    Build real musical skills through structured practice.
                </p>
            </div>
            <div class="card">
                <h2 class="text-2xl font-bold mb-4">Coming Soon</h2>
                <p class="text-gray-600">Practice exercises and application examples will be available here.</p>
            </div>
        </div>
    `;
}