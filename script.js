// Quantum Password Generator - Advanced Cyberpunk Edition
class QuantumPasswordGenerator {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeParticles();
        this.passwordHistory = [];
        this.quantumSeed = this.generateQuantumSeed();
        
        // Character sets
        this.charSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
            similar: 'il1Lo0O'
        };
        
        // Generate initial password
        this.generatePassword();
    }
    
    initializeElements() {
        // Input elements
        this.lengthSlider = document.getElementById('lengthSlider');
        this.lengthInput = document.getElementById('lengthInput');
        this.uppercaseCheck = document.getElementById('uppercase');
        this.lowercaseCheck = document.getElementById('lowercase');
        this.numbersCheck = document.getElementById('numbers');
        this.symbolsCheck = document.getElementById('symbols');
        this.quantumCheck = document.getElementById('quantum');
        this.excludeCheck = document.getElementById('exclude');
        
        // Output elements
        this.passwordOutput = document.getElementById('passwordOutput');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.entropyValue = document.getElementById('entropyValue');
        this.crackTime = document.getElementById('crackTime');
        this.combinations = document.getElementById('combinations');
        this.historyList = document.getElementById('historyList');
        
        // Strength elements
        this.strengthBars = document.querySelectorAll('.strength-bar');
        this.strengthText = document.querySelector('.strength-text');
        this.entropyFill = document.querySelector('.entropy-fill');
    }
    
    initializeEventListeners() {
        // Length controls
        this.lengthSlider.addEventListener('input', (e) => {
            this.lengthInput.value = e.target.value;
            this.generatePassword();
        });
        
        this.lengthInput.addEventListener('input', (e) => {
            const value = Math.max(8, Math.min(128, parseInt(e.target.value) || 8));
            this.lengthSlider.value = value;
            e.target.value = value;
            this.generatePassword();
        });
        
        // Checkbox controls
        [this.uppercaseCheck, this.lowercaseCheck, this.numbersCheck, 
         this.symbolsCheck, this.quantumCheck, this.excludeCheck].forEach(checkbox => {
            checkbox.addEventListener('change', () => this.generatePassword());
        });
        
        // Buttons
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        this.copyBtn.addEventListener('click', () => this.copyPassword());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.generatePassword();
            } else if (e.ctrlKey && e.key === 'c' && document.activeElement === this.passwordOutput) {
                this.copyPassword();
            }
        });
    }
    
    generateQuantumSeed() {
        // Create quantum-inspired seed using multiple entropy sources
        const sources = [
            Date.now(),
            Math.random() * 1000000,
            performance.now(),
            navigator.userAgent.length,
            screen.width * screen.height,
            new Date().getTimezoneOffset()
        ];
        
        let seed = 0;
        sources.forEach((source, index) => {
            seed += source * (index + 1) * Math.PI;
        });
        
        return seed;
    }
    
    quantumRandom() {
        // Enhanced pseudo-quantum random number generator
        this.quantumSeed = (this.quantumSeed * 9301 + 49297) % 233280;
        const base = this.quantumSeed / 233280;
        
        // Add additional entropy layers
        const entropy1 = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
        const entropy2 = Math.cos(performance.now() * 0.0001) * 0.5 + 0.5;
        
        return (base + entropy1 + entropy2) % 1;
    }
    
    getCharacterSet() {
        let charset = '';
        
        if (this.uppercaseCheck.checked) charset += this.charSets.uppercase;
        if (this.lowercaseCheck.checked) charset += this.charSets.lowercase;
        if (this.numbersCheck.checked) charset += this.charSets.numbers;
        if (this.symbolsCheck.checked) charset += this.charSets.symbols;
        
        // Remove similar characters if requested
        if (this.excludeCheck.checked) {
            charset = charset.split('').filter(char => 
                !this.charSets.similar.includes(char)
            ).join('');
        }
        
        return charset || this.charSets.lowercase; // Fallback
    }
    
    generatePassword() {
        const length = parseInt(this.lengthSlider.value);
        const charset = this.getCharacterSet();
        let password = '';
        
        // Quantum-enhanced generation
        if (this.quantumCheck.checked) {
            // Use quantum random for enhanced entropy
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(this.quantumRandom() * charset.length);
                password += charset[randomIndex];
            }
        } else {
            // Standard generation
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
        }
        
        // Ensure password meets requirements
        password = this.enforceRequirements(password, charset);
        
        this.passwordOutput.value = password;
        this.updateSecurityAnalysis(password, charset);
        this.addToHistory(password);
        this.animateGeneration();
    }
    
    enforceRequirements(password, charset) {
        const requirements = [];
        
        if (this.uppercaseCheck.checked) requirements.push(this.charSets.uppercase);
        if (this.lowercaseCheck.checked) requirements.push(this.charSets.lowercase);
        if (this.numbersCheck.checked) requirements.push(this.charSets.numbers);
        if (this.symbolsCheck.checked) requirements.push(this.charSets.symbols);
        
        // Ensure at least one character from each required set
        requirements.forEach((reqSet, index) => {
            if (!password.split('').some(char => reqSet.includes(char))) {
                const randomChar = reqSet[Math.floor(this.quantumRandom() * reqSet.length)];
                const replaceIndex = Math.floor(this.quantumRandom() * password.length);
                password = password.substring(0, replaceIndex) + randomChar + password.substring(replaceIndex + 1);
            }
        });
        
        return password;
    }
    
    updateSecurityAnalysis(password, charset) {
        // Calculate entropy
        const entropy = Math.log2(Math.pow(charset.length, password.length));
        this.entropyValue.textContent = Math.round(entropy);
        
        // Update entropy bar
        const maxEntropy = 512; // Maximum expected entropy
        const entropyPercentage = Math.min(entropy / maxEntropy * 100, 100);
        this.entropyFill.style.width = `${entropyPercentage}%`;
        
        // Calculate combinations
        const combinations = Math.pow(charset.length, password.length);
        this.combinations.textContent = this.formatLargeNumber(combinations);
        
        // Calculate crack time (assuming 1 billion attempts per second)
        const crackTime = combinations / (2 * 1000000000); // Average time in seconds
        this.crackTime.textContent = this.formatTime(crackTime);
        
        // Update strength visualization
        this.updateStrengthBars(entropy);
    }
    
    updateStrengthBars(entropy) {
        // Reset all bars
        this.strengthBars.forEach(bar => bar.classList.remove('active'));
        
        let strength = 0;
        let strengthText = '';
        
        if (entropy >= 128) {
            strength = 5;
            strengthText = 'QUANTUM SECURE';
        } else if (entropy >= 80) {
            strength = 4;
            strengthText = 'VERY STRONG';
        } else if (entropy >= 60) {
            strength = 3;
            strengthText = 'STRONG';
        } else if (entropy >= 40) {
            strength = 2;
            strengthText = 'MODERATE';
        } else if (entropy >= 20) {
            strength = 1;
            strengthText = 'WEAK';
        } else {
            strength = 0;
            strengthText = 'VERY WEAK';
        }
        
        // Activate strength bars
        for (let i = 0; i < strength; i++) {
            this.strengthBars[i].classList.add('active');
        }
        
        this.strengthText.textContent = strengthText;
    }
    
    formatLargeNumber(num) {
        if (num === Infinity) return '∞';
        if (num >= 1e100) return '10^' + Math.floor(Math.log10(num));
        if (num >= 1e15) return (num / 1e15).toFixed(1) + 'Q';
        if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
    }
    
    formatTime(seconds) {
        if (seconds === Infinity || seconds >= 1e20) return '∞ YEARS';
        
        const units = [
            { name: 'YEARS', value: 365.25 * 24 * 3600 },
            { name: 'DAYS', value: 24 * 3600 },
            { name: 'HOURS', value: 3600 },
            { name: 'MINUTES', value: 60 },
            { name: 'SECONDS', value: 1 }
        ];
        
        for (const unit of units) {
            const value = seconds / unit.value;
            if (value >= 1) {
                return `${this.formatLargeNumber(value)} ${unit.name}`;
            }
        }
        
        return '< 1 SECOND';
    }
    
    copyPassword() {
        this.passwordOutput.select();
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = this.copyBtn.innerHTML;
        this.copyBtn.innerHTML = '<span class="copy-icon">✓</span>';
        this.copyBtn.style.background = 'var(--neon-green)';
        this.copyBtn.style.color = 'var(--dark-bg)';
        
        setTimeout(() => {
            this.copyBtn.innerHTML = originalText;
            this.copyBtn.style.background = '';
            this.copyBtn.style.color = '';
        }, 1000);
    }
    
    addToHistory(password) {
        // Add to beginning of history
        this.passwordHistory.unshift({
            password: password,
            timestamp: new Date().toLocaleTimeString(),
            entropy: Math.round(Math.log2(Math.pow(this.getCharacterSet().length, password.length)))
        });
        
        // Keep only last 10 passwords
        if (this.passwordHistory.length > 10) {
            this.passwordHistory = this.passwordHistory.slice(0, 10);
        }
        
        this.updateHistoryDisplay();
    }
    
    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        
        this.passwordHistory.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span class="history-password" title="${item.password}">${item.password}</span>
                <button class="history-copy" onclick="navigator.clipboard.writeText('${item.password}')">COPY</button>
            `;
            this.historyList.appendChild(historyItem);
        });
    }
    
    animateGeneration() {
        // Add generation animation
        this.passwordOutput.style.animation = 'none';
        setTimeout(() => {
            this.passwordOutput.style.animation = 'quantumGlow 0.5s ease-in-out';
        }, 10);
        
        // Animate generate button
        this.generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.generateBtn.style.transform = '';
        }, 150);
    }
    
    initializeParticles() {
        const particlesContainer = document.querySelector('.cyber-particles');
        
        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-cyan);
                border-radius: 50%;
                opacity: 0.6;
                animation: float ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 6px var(--primary-cyan);
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 0.6; }
                90% { opacity: 0.6; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Advanced Features
class QuantumEnhancer {
    static addAdvancedFeatures() {
        // Add matrix rain effect
        this.createMatrixRain();
        
        // Add keyboard shortcuts display
        this.addKeyboardShortcuts();
        
        // Add sound effects (optional)
        this.initializeSoundEffects();
    }
    
    static createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff00';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 33);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    static addKeyboardShortcuts() {
        const shortcuts = document.createElement('div');
        shortcuts.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 20, 40, 0.9);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 15px;
            font-family: 'Orbitron', monospace;
            font-size: 0.8rem;
            color: var(--text-secondary);
            backdrop-filter: blur(10px);
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        
        shortcuts.innerHTML = `
            <div style="margin-bottom: 5px; color: var(--primary-cyan);">SHORTCUTS:</div>
            <div>Ctrl + Enter: Generate</div>
            <div>Ctrl + C: Copy (when focused)</div>
        `;
        
        shortcuts.addEventListener('mouseenter', () => shortcuts.style.opacity = '1');
        shortcuts.addEventListener('mouseleave', () => shortcuts.style.opacity = '0.7');
        
        document.body.appendChild(shortcuts);
    }
    
    static initializeSoundEffects() {
        // Create audio context for sound effects
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            window.playGenerateSound = () => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            };
        } catch (e) {
            // Audio not supported
            window.playGenerateSound = () => {};
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const generator = new QuantumPasswordGenerator();
    QuantumEnhancer.addAdvancedFeatures();
    
    // Add generate sound effect
    generator.generateBtn.addEventListener('click', () => {
        if (window.playGenerateSound) window.playGenerateSound();
    });
    
    console.log('🔐 Quantum Password Generator v2.077 Initialized');
    console.log('🌟 Cyberpunk Security Protocol Active');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuantumPasswordGenerator, QuantumEnhancer };
}
