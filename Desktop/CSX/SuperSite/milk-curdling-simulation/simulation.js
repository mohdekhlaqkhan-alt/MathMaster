/**
 * Milk Curdling Simulation
 * An interactive chemistry simulation demonstrating protein-acid reactions
 */

// ===== Configuration =====
const CONFIG = {
    caseinCount: 25,
    acidIonCount: 0,
    maxAcidIons: 40,
    caseinRadius: 18,
    acidRadius: 8,
    repelForce: 800,
    attractForce: 200,
    friction: 0.95,
    brownianMotion: 0.3,
    simulationSpeed: 1,
    temperature: 25,
    pH: 6.8,
    targetPH: 6.8
};

// ===== State =====
let state = {
    isRunning: false,
    currentStage: 1,
    selectedAcid: null,
    caseinParticles: [],
    acidIons: [],
    curds: [],
    animationId: null,
    lastTime: 0
};

// ===== Canvas Setup =====
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

// ===== Particle Classes =====
class Particle {
    constructor(x, y, radius, type) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.type = type;
        this.charge = type === 'casein' ? -1 : 1;
        this.neutralized = false;
        this.clumped = false;
        this.clumpTarget = null;
        this.glow = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update(deltaTime) {
        // Apply Brownian motion
        const brownianScale = CONFIG.brownianMotion * (CONFIG.temperature / 25);
        this.vx += (Math.random() - 0.5) * brownianScale;
        this.vy += (Math.random() - 0.5) * brownianScale;

        // Apply friction
        this.vx *= CONFIG.friction;
        this.vy *= CONFIG.friction;

        // Update position
        this.x += this.vx * CONFIG.simulationSpeed;
        this.y += this.vy * CONFIG.simulationSpeed;

        // Boundary collision
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -0.5;
        }
        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.vx *= -0.5;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy *= -0.5;
        }
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy *= -0.5;
        }

        // Update pulse phase
        this.pulsePhase += 0.05 * CONFIG.simulationSpeed;
    }

    draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.1 + 1;
        const drawRadius = this.radius * pulse;

        ctx.save();

        if (this.type === 'casein') {
            // Casein protein
            const gradient = ctx.createRadialGradient(
                this.x - drawRadius * 0.3, this.y - drawRadius * 0.3, 0,
                this.x, this.y, drawRadius
            );

            if (this.neutralized) {
                gradient.addColorStop(0, '#c4b5fd');
                gradient.addColorStop(0.7, '#a78bfa');
                gradient.addColorStop(1, '#8b5cf6');
            } else {
                gradient.addColorStop(0, '#93c5fd');
                gradient.addColorStop(0.7, '#4a90d9');
                gradient.addColorStop(1, '#2563eb');
            }

            // Glow effect
            if (this.glow > 0) {
                ctx.shadowColor = this.neutralized ? '#a78bfa' : '#4a90d9';
                ctx.shadowBlur = 20 * this.glow;
            }

            ctx.beginPath();
            ctx.arc(this.x, this.y, drawRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Charge indicator
            if (!this.clumped) {
                ctx.fillStyle = 'white';
                ctx.font = `bold ${Math.floor(drawRadius * 0.8)}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.neutralized ? '0' : '−', this.x, this.y);
            }

        } else if (this.type === 'acid') {
            // Acid H+ ion
            const gradient = ctx.createRadialGradient(
                this.x - drawRadius * 0.3, this.y - drawRadius * 0.3, 0,
                this.x, this.y, drawRadius
            );
            gradient.addColorStop(0, '#86efac');
            gradient.addColorStop(0.7, '#4ade80');
            gradient.addColorStop(1, '#22c55e');

            ctx.shadowColor = '#4ade80';
            ctx.shadowBlur = 15;

            ctx.beginPath();
            ctx.arc(this.x, this.y, drawRadius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Plus sign
            ctx.fillStyle = 'white';
            ctx.font = `bold ${Math.floor(drawRadius * 1.2)}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('+', this.x, this.y + 1);
        }

        ctx.restore();
    }
}

// ===== Curd Class =====
class Curd {
    constructor(particles) {
        this.particles = particles;
        this.x = 0;
        this.y = 0;
        this.calculateCenter();
        this.radius = Math.sqrt(particles.length) * CONFIG.caseinRadius * 1.2;
        this.vy = 0;
        this.settled = false;
    }

    calculateCenter() {
        let sumX = 0, sumY = 0;
        this.particles.forEach(p => {
            sumX += p.x;
            sumY += p.y;
        });
        this.x = sumX / this.particles.length;
        this.y = sumY / this.particles.length;
    }

    update() {
        if (!this.settled) {
            // Gravity effect - curds sink
            this.vy += 0.1 * CONFIG.simulationSpeed;
            this.vy *= 0.98;
            this.y += this.vy;

            // Settle at bottom (leaving space for whey)
            const settleY = canvas.height * 0.75;
            if (this.y > settleY) {
                this.y = settleY;
                this.vy = 0;
                this.settled = true;
            }

            // Update particle positions
            this.particles.forEach(p => {
                const angle = Math.atan2(p.y - this.y, p.x - this.x);
                const dist = Math.min(this.radius * 0.8,
                    Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2));
                p.x = this.x + Math.cos(angle) * dist * 0.5;
                p.y = this.y + Math.sin(angle) * dist * 0.5;
            });
        }
    }

    draw() {
        ctx.save();

        // Draw curd blob
        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.2, this.y - this.radius * 0.2, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, '#fef3c7');
        gradient.addColorStop(0.5, '#fcd34d');
        gradient.addColorStop(1, '#f59e0b');

        ctx.shadowColor = 'rgba(252, 211, 77, 0.5)';
        ctx.shadowBlur = 20;

        // Draw organic blob shape
        ctx.beginPath();
        const points = 8;
        for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const wobble = Math.sin(angle * 3 + Date.now() / 500) * 0.1 + 1;
            const r = this.radius * wobble;
            const x = this.x + Math.cos(angle) * r;
            const y = this.y + Math.sin(angle) * r;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
    }
}

// ===== Initialization =====
function initSimulation() {
    resizeCanvas();
    state.caseinParticles = [];
    state.acidIons = [];
    state.curds = [];

    // Create casein particles
    for (let i = 0; i < CONFIG.caseinCount; i++) {
        const x = CONFIG.caseinRadius + Math.random() * (canvas.width - 2 * CONFIG.caseinRadius);
        const y = CONFIG.caseinRadius + Math.random() * (canvas.height - 2 * CONFIG.caseinRadius);
        state.caseinParticles.push(new Particle(x, y, CONFIG.caseinRadius, 'casein'));
    }

    CONFIG.pH = 6.8;
    CONFIG.targetPH = 6.8;
    updatePHDisplay();
}

// ===== Physics =====
function applyForces() {
    const particles = [...state.caseinParticles, ...state.acidIons];

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p1.radius + p2.radius;

            if (dist < minDist * 4) {
                const nx = dx / dist;
                const ny = dy / dist;

                // Determine force based on charges
                let force = 0;

                if (p1.type === 'casein' && p2.type === 'casein') {
                    if (!p1.neutralized && !p2.neutralized) {
                        // Both negative - repel
                        force = -CONFIG.repelForce / (dist * dist);
                    } else if (p1.neutralized && p2.neutralized) {
                        // Both neutral - attract (clumping)
                        force = CONFIG.attractForce / (dist * dist);
                    }
                } else if (p1.type === 'acid' && p2.type === 'casein' && !p2.neutralized) {
                    // Acid attracts to non-neutralized casein
                    force = CONFIG.attractForce * 2 / (dist * dist);

                    // Neutralization check
                    if (dist < minDist * 1.5) {
                        p2.neutralized = true;
                        p2.glow = 1;
                        // Remove acid ion
                        const idx = state.acidIons.indexOf(p1);
                        if (idx > -1) state.acidIons.splice(idx, 1);
                    }
                } else if (p1.type === 'casein' && p2.type === 'acid' && !p1.neutralized) {
                    force = CONFIG.attractForce * 2 / (dist * dist);

                    if (dist < minDist * 1.5) {
                        p1.neutralized = true;
                        p1.glow = 1;
                        const idx = state.acidIons.indexOf(p2);
                        if (idx > -1) state.acidIons.splice(idx, 1);
                    }
                }

                // Apply force
                const fx = force * nx * 0.01;
                const fy = force * ny * 0.01;

                p1.vx -= fx;
                p1.vy -= fy;
                p2.vx += fx;
                p2.vy += fy;

                // Collision response
                if (dist < minDist) {
                    const overlap = minDist - dist;
                    p1.x -= nx * overlap * 0.5;
                    p1.y -= ny * overlap * 0.5;
                    p2.x += nx * overlap * 0.5;
                    p2.y += ny * overlap * 0.5;
                }
            }
        }
    }
}

function checkClumping() {
    // Check if enough casein is neutralized to form curds
    const neutralized = state.caseinParticles.filter(p => p.neutralized && !p.clumped);

    if (neutralized.length >= 3) {
        // Find clusters
        const visited = new Set();

        for (const particle of neutralized) {
            if (visited.has(particle)) continue;

            const cluster = [particle];
            visited.add(particle);

            // Find nearby neutralized particles
            for (const other of neutralized) {
                if (visited.has(other)) continue;

                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.caseinRadius * 4) {
                    cluster.push(other);
                    visited.add(other);
                }
            }

            // Form curd if cluster is big enough
            if (cluster.length >= 3) {
                cluster.forEach(p => p.clumped = true);
                state.curds.push(new Curd(cluster));
            }
        }
    }
}

// ===== Animation Loop =====
function animate(currentTime) {
    const deltaTime = currentTime - state.lastTime;
    state.lastTime = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (state.isRunning) {
        // Update pH
        if (CONFIG.pH !== CONFIG.targetPH) {
            const diff = CONFIG.targetPH - CONFIG.pH;
            CONFIG.pH += diff * 0.02;
            if (Math.abs(diff) < 0.01) CONFIG.pH = CONFIG.targetPH;
            updatePHDisplay();
        }

        // Apply physics
        applyForces();

        // Update particles
        state.caseinParticles.forEach(p => {
            if (!p.clumped) p.update(deltaTime);
            if (p.glow > 0) p.glow -= 0.02;
        });

        state.acidIons.forEach(p => p.update(deltaTime));

        // Check for clumping
        if (state.currentStage >= 3) {
            checkClumping();
        }

        // Update curds
        state.curds.forEach(c => c.update());

        // Check stage progression
        updateStage();
    }

    // Draw curds first (background)
    state.curds.forEach(c => c.draw());

    // Draw particles
    state.caseinParticles.forEach(p => {
        if (!p.clumped) p.draw();
    });
    state.acidIons.forEach(p => p.draw());

    state.animationId = requestAnimationFrame(animate);
}

// ===== Acid Injection =====
function injectAcid() {
    if (state.acidIons.length >= CONFIG.maxAcidIons) return;

    const count = CONFIG.temperature > 50 ? 3 : 2;

    for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = -CONFIG.acidRadius;
        const acid = new Particle(x, y, CONFIG.acidRadius, 'acid');
        acid.vy = 2 + Math.random() * 2;
        state.acidIons.push(acid);
    }

    // Lower pH
    const pHDrop = state.selectedAcid === 'bacteria' ? 0.15 : 0.25;
    CONFIG.targetPH = Math.max(3.5, CONFIG.targetPH - pHDrop);
}

// ===== pH Display =====
function updatePHDisplay() {
    const phValue = document.getElementById('phValue');
    const phIndicator = document.getElementById('phIndicator');

    phValue.textContent = CONFIG.pH.toFixed(1);

    // Position indicator (pH 0 = 0%, pH 14 = 100%)
    const position = (CONFIG.pH / 14) * 100;
    phIndicator.style.left = `${position}%`;
}

// ===== Stage Management =====
function updateStage() {
    const neutralizedCount = state.caseinParticles.filter(p => p.neutralized).length;
    const neutralizedRatio = neutralizedCount / state.caseinParticles.length;

    let newStage = 1;

    if (state.acidIons.length > 0 || neutralizedCount > 0) {
        newStage = 2;
    }

    if (neutralizedRatio > 0.3) {
        newStage = 3;
        document.getElementById('milkContainer').classList.add('curdling');
    }

    if (state.curds.length > 0 && state.curds.every(c => c.settled)) {
        newStage = 4;
        document.getElementById('wheyLayer').classList.add('visible');
    }

    if (newStage !== state.currentStage) {
        state.currentStage = newStage;
        updateStageIndicator();
        updateInfoCards();
    }
}

function updateStageIndicator() {
    document.querySelectorAll('.stage').forEach((el, idx) => {
        const stageNum = idx + 1;
        el.classList.remove('active', 'completed');

        if (stageNum < state.currentStage) {
            el.classList.add('completed');
        } else if (stageNum === state.currentStage) {
            el.classList.add('active');
        }
    });
}

function updateInfoCards() {
    document.querySelectorAll('.info-card').forEach(card => {
        const cardStage = parseInt(card.dataset.stage);
        card.classList.toggle('active', cardStage === state.currentStage);
    });
}

// ===== UI Controls =====
function setupControls() {
    // Acid buttons
    document.querySelectorAll('.acid-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.acid-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedAcid = btn.dataset.acid;
        });
    });

    // Temperature slider
    const tempSlider = document.getElementById('tempSlider');
    const tempValue = document.getElementById('tempValue');
    tempSlider.addEventListener('input', () => {
        CONFIG.temperature = parseInt(tempSlider.value);
        tempValue.textContent = `${CONFIG.temperature}°C`;
    });

    // Speed slider
    const speedSlider = document.getElementById('speedSlider');
    speedSlider.addEventListener('input', () => {
        CONFIG.simulationSpeed = parseInt(speedSlider.value) * 0.5;
    });

    // Start button
    document.getElementById('startBtn').addEventListener('click', () => {
        if (!state.selectedAcid) {
            alert('Please select an acid source first!');
            return;
        }

        state.isRunning = true;
        document.getElementById('startBtn').innerHTML = '<span class="btn-icon">⏸</span> Pause';

        // Start acid injection interval
        if (!state.acidInterval) {
            const interval = state.selectedAcid === 'bacteria' ? 800 : 400;
            state.acidInterval = setInterval(injectAcid, interval / CONFIG.simulationSpeed);

            // Stop after a while
            setTimeout(() => {
                clearInterval(state.acidInterval);
                state.acidInterval = null;
            }, 8000);
        }
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetSimulation);
}

function resetSimulation() {
    state.isRunning = false;
    state.currentStage = 1;
    state.selectedAcid = null;

    if (state.acidInterval) {
        clearInterval(state.acidInterval);
        state.acidInterval = null;
    }

    document.querySelectorAll('.acid-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('startBtn').innerHTML = '<span class="btn-icon">▶</span> Start Simulation';
    document.getElementById('milkContainer').classList.remove('curdling');
    document.getElementById('wheyLayer').classList.remove('visible');

    CONFIG.targetPH = 6.8;
    CONFIG.pH = 6.8;

    initSimulation();
    updateStageIndicator();
    updateInfoCards();
}

// ===== Navigation =====
function setupNavigation() {
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const section = pill.dataset.section;

            document.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            document.getElementById('simulation-section').classList.toggle('hidden', section !== 'simulation');
            document.getElementById('learn-section').classList.toggle('hidden', section !== 'learn');
            document.getElementById('quiz-section').classList.toggle('hidden', section !== 'quiz');
        });
    });
}

// ===== Quiz System =====
const quizQuestions = [
    {
        question: "What is the main protein in milk that causes curdling?",
        options: ["Whey", "Casein", "Albumin", "Collagen"],
        correct: 1
    },
    {
        question: "What type of electric charge do casein proteins have?",
        options: ["Positive", "Negative", "Neutral", "Variable"],
        correct: 1
    },
    {
        question: "What do acid molecules release that neutralizes casein?",
        options: ["Electrons", "Neutrons", "Hydrogen ions (H⁺)", "Oxygen atoms"],
        correct: 2
    },
    {
        question: "Why do casein proteins stay separated in fresh milk?",
        options: ["They are too heavy", "Their negative charges repel each other", "They are dissolved in fat", "They are frozen"],
        correct: 1
    },
    {
        question: "What is the liquid that separates from curds called?",
        options: ["Cream", "Whey", "Buttermilk", "Skim milk"],
        correct: 1
    }
];

let quizState = {
    currentQuestion: 0,
    score: 0,
    answered: false
};

function setupQuiz() {
    renderQuestion();
    document.getElementById('retryQuizBtn').addEventListener('click', resetQuiz);
}

function renderQuestion() {
    const q = quizQuestions[quizState.currentQuestion];

    document.getElementById('questionNumber').textContent = `Q${quizState.currentQuestion + 1}`;
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('quizProgressText').textContent =
        `Question ${quizState.currentQuestion + 1} of ${quizQuestions.length}`;
    document.getElementById('quizProgress').style.width =
        `${((quizState.currentQuestion + 1) / quizQuestions.length) * 100}%`;

    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${letters[idx]}</span><span>${option}</span>`;
        btn.addEventListener('click', () => selectAnswer(idx));
        container.appendChild(btn);
    });

    quizState.answered = false;
}

function selectAnswer(idx) {
    if (quizState.answered) return;
    quizState.answered = true;

    const q = quizQuestions[quizState.currentQuestion];
    const buttons = document.querySelectorAll('.option-btn');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) {
            btn.classList.add('correct');
        } else if (i === idx) {
            btn.classList.add('incorrect');
        }
    });

    if (idx === q.correct) {
        quizState.score++;
    }

    // Move to next question after delay
    setTimeout(() => {
        quizState.currentQuestion++;
        if (quizState.currentQuestion < quizQuestions.length) {
            renderQuestion();
        } else {
            showQuizResult();
        }
    }, 1500);
}

function showQuizResult() {
    document.getElementById('quizCard').classList.add('hidden');
    document.getElementById('quizResult').classList.remove('hidden');
    document.getElementById('finalScore').textContent = quizState.score;
}

function resetQuiz() {
    quizState = { currentQuestion: 0, score: 0, answered: false };
    document.getElementById('quizCard').classList.remove('hidden');
    document.getElementById('quizResult').classList.add('hidden');
    renderQuestion();
}

// ===== Initialize =====
window.addEventListener('load', () => {
    initSimulation();
    setupControls();
    setupNavigation();
    setupQuiz();
    updateStageIndicator();
    updateInfoCards();
    animate(0);
});

window.addEventListener('resize', resizeCanvas);
