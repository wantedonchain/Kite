// Quiz Configuration
const QUIZ_CONFIG = {
    timePerQuestion: 20,
    xpPerQuestion: 100,
    totalQuestions: 25,
    resetHours: 2,
    leaderboardSize: 50
};

// Game State
let gameState = {
    players: new Map(),
    currentQuestion: 0,
    currentPlayer: '',
    score: 0
};

// ALL 25 KITE AI QUESTIONS
const QUIZ_QUESTIONS = [
    {
        question: "What was the current Kite AI project (founded in 2024) formerly known as?",
        options: ["AgenticBlock", "Zettablock", "CodeBlocker", "AgentCore"],
        correct: 1
    },
    {
        question: "Who is the Co-founder and Chief Executive Officer (CEO) of the current Kite AI?",
        options: ["Adam Smith", "Justin Potts", "Scott Shi", "Chi Zhang"],
        correct: 3
    },
    {
        question: "Which major financial institution co-led Kite AI's $18 million Series A funding round in September 2025?",
        options: ["Goldman Sachs", "Citi Ventures", "PayPal Ventures", "SBI US Gateway Fund"],
        correct: 2
    },
    {
        question: "What is the total cumulative funding raised by Kite AI, as of the September 2025 Series A announcement?",
        options: ["$15 million", "$18 million", "$33 million", "$40 million"],
        correct: 2
    },
    {
        question: "Which two companies did Kite AI Co-founder and CTO Scott Shi previously build real-time AI infrastructure or serve as a founding engineer for?",
        options: ["Databricks and NEAR", "Uber and Salesforce Einstein AI", "OpenAI and Google", "Polygon and Chainlink"],
        correct: 1
    },
    {
        question: "Kite AI is categorized as an infrastructure platform primarily built for which market segment?",
        options: ["Web2 E-commerce Micro-payments", "AI Code Completion", "Infra Layer1 AI platform", "Traditional Web Services"],
        correct: 2
    },
    {
        question: "In what year was the current Kite AI project officially founded?",
        options: ["2014", "2022", "2024", "2025"],
        correct: 2
    },
    {
        question: "What is the name of Kite AI's flagship product that enables autonomous agents to authenticate and transact in real-world environments?",
        options: ["Agent App Store", "Agent Passport", "Kite AIR (Agent Identity Resolution)", "Kite CodeX"],
        correct: 2
    },
    {
        question: "The Seed funding round of $15 million for Kite AI was announced in which month of 2025?",
        options: ["January", "February", "September", "October"],
        correct: 1
    },
    {
        question: "Which core component of Kite AIR provides a verifiable identity for each agent along with operational guardrails?",
        options: ["Policy Enforcer", "Agent Passport", "Via Protocol Bridge", "Kite Smart Wallet"],
        correct: 1
    },
    {
        question: "Which partner provides an AI-enhanced oracle infrastructure for Real-World Asset (RWA) and DeFi data on the Kite AI network?",
        options: ["Codatta", "BitMind", "APRO", "Masa"],
        correct: 2
    },
    {
        question: "The partnership with which company involves Kite AI providing identity authentication and on-chain settlement for access to 500 million healthcare data points?",
        options: ["OpenAI", "Codatta", "CARV", "Nubila"],
        correct: 1
    },
    {
        question: "Which concept did CEO Chi Zhang state would become the 'dominant UI to digital economies of the future,' necessitating Kite AI's infrastructure?",
        options: ["Decentralized Applications (dApps)", "Large Language Models (LLMs)", "Autonomous agents", "Web3 Gaming"],
        correct: 2
    },
    {
        question: "Kite AI's core infrastructure is designed to facilitate transactions using which method to reduce reliance on legacy card rails?",
        options: ["Fiat currency transfers", "Native stablecoin payments", "Tokenized securities", "Credit lines"],
        correct: 1
    },
    {
        question: "On what date was the Kite Validator Program officially launched?",
        options: ["February 1, 2025", "September 2, 2025", "October 1, 2024", "October 1, 2025"],
        correct: 3
    },
    {
        question: "Which firm, besides PayPal Ventures, was a lead investor in both the Seed and Series A rounds for Kite AI?",
        options: ["Samsung Next", "General Catalyst", "HashKey Capital", "LayerZero"],
        correct: 1
    },
    {
        question: "What key feature is offered by the Kite Agent App Store component of Kite AIR?",
        options: ["Code completion for agents", "Secure API key generation", "Agent discovery and paid access to services (APIs, data, commerce tools)", "Deepfake detection services"],
        correct: 2
    },
    {
        question: "Where did Kite AI Co-founder and CEO Chi Zhang earn his PhD in AI?",
        options: ["MIT", "Harvard", "University of Tokyo", "UC Berkeley"],
        correct: 3
    },
    {
        question: "What specific service does the partner BitMind offer to enhance trust and security on the Kite AI network?",
        options: ["Policy enforcement auditing", "Cryptographic identity verification", "Deepfake detection services", "RWA data streaming"],
        correct: 2
    },
    {
        question: "The historical Kite (2014) AI coding assistant was founded by which individual?",
        options: ["Chi Zhang", "Scott Shi", "Adam Smith", "Justin Potts"],
        correct: 2
    },
    {
        question: "Before shutting down in 2022, the historical Kite (2014) was acquired by which financial technology company for $24.8 million?",
        options: ["PayPal", "Affirm", "Databricks", "General Catalyst"],
        correct: 1
    },
    {
        question: "According to its founder, the historical Kite (2014) failed because the AI technology was not 'tech ready,' requiring what level of improvement to break into the market?",
        options: ["2x improvement", "5x improvement", "10x improvement", "100x improvement"],
        correct: 2
    },
    {
        question: "Which major commerce platform, besides PayPal, is Kite AIR currently integrated with for merchant discoverability by AI shopping agents?",
        options: ["Amazon", "eBay", "Shopify", "Etsy"],
        correct: 2
    },
    {
        question: "The core thesis of Kite AI is to provide a foundational layer that includes real-time payments, programmable governance, cryptographic identity, and what other key capability?",
        options: ["Open-source code library", "Verifiable attribution", "Universal data catalog", "Quantum computing access"],
        correct: 1
    },
    {
        question: "Kite AI was named a 'Top 100 Project' in 2025 at an annual summit hosted by which two entities?",
        options: ["Coinbase and Sequoia", "Silicon Valley 101 x RootData", "PayPal and General Catalyst", "Databricks and Uber"],
        correct: 1
    }
];

// SIMPLE INITIALIZATION THAT DEFINITELY WORKS
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Page loaded!');
    initializeQuiz();
});

function initializeQuiz() {
    console.log('🎯 Initializing quiz...');
    
    // Load saved players
    loadPlayers();
    updatePlayerDisplay();
    
    // Get buttons and inputs
    const joinBtn = document.getElementById('joinBtn');
    const usernameInput = document.getElementById('usernameInput');
    const playAgainBtn = document.getElementById('playAgainBtn');
    
    console.log('Join button found:', !!joinBtn);
    console.log('Username input found:', !!usernameInput);
    
    // Add click event to join button
    if (joinBtn) {
        joinBtn.onclick = function() {
            console.log('👉 Join button clicked!');
            handleStartQuiz();
        };
    }
    
    // Add enter key support
    if (usernameInput) {
        usernameInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                handleStartQuiz();
            }
        };
    }
    
    // Play again button
    if (playAgainBtn) {
        playAgainBtn.onclick = function() {
            showScreen('username');
            const usernameInput = document.getElementById('usernameInput');
            if (usernameInput) {
                usernameInput.value = '';
                usernameInput.focus();
            }
        };
    }
    
    // Start reset timer display
    startResetTimer();
    
    console.log('✅ Quiz initialized!');
}

function handleStartQuiz() {
    console.log('🎯 Handling start quiz...');
    
    const usernameInput = document.getElementById('usernameInput');
    const usernameError = document.getElementById('usernameError');
    
    if (!usernameInput) {
        console.error('❌ Username input not found!');
        return;
    }
    
    const username = usernameInput.value.trim();
    console.log('Username entered:', username);
    
    // Validation
    if (!username) {
        if (usernameError) {
            usernameError.textContent = 'Please enter a username!';
            usernameError.style.color = '#ff6b6b';
        }
        return;
    }
    
    if (username.length < 3) {
        if (usernameError) {
            usernameError.textContent = 'Username must be at least 3 characters!';
            usernameError.style.color = '#ff6b6b';
        }
        return;
    }
    
    // Clean up old players
    cleanupOldPlayers();
    
    // Check if username exists
    if (gameState.players.has(username)) {
        if (usernameError) {
            usernameError.textContent = 'Username used recently. Try after 2 hours.';
            usernameError.style.color = '#ff6b6b';
        }
        return;
    }
    
    // Clear error
    if (usernameError) {
        usernameError.textContent = '';
    }
    
    // START THE QUIZ
    startQuiz(username);
}

function startQuiz(username) {
    console.log('🚀 Starting quiz for:', username);
    
    // Add player
    gameState.players.set(username, {
        username: username,
        score: 0,
        joinedAt: new Date().toISOString()
    });
    
    savePlayers();
    updatePlayerDisplay();
    
    // Set current player
    gameState.currentPlayer = username;
    gameState.score = 0;
    gameState.currentQuestion = 0;
    
    // Update UI
    const quizUsername = document.getElementById('quizUsername');
    const currentScore = document.getElementById('currentScore');
    
    if (quizUsername) quizUsername.textContent = username;
    if (currentScore) currentScore.textContent = '0';
    
    // Show quiz screen
    showScreen('quiz');
    
    // Load first question
    loadQuestion();
}

function showScreen(screenName) {
    console.log('🔄 Showing screen:', screenName);
    
    // Hide all screens
    const screens = ['usernameScreen', 'quizScreen', 'leaderboardScreen'];
    screens.forEach(screenId => {
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log('✅ Screen shown:', screenName);
    }
}

function loadQuestion() {
    console.log('📝 Loading question:', gameState.currentQuestion + 1);
    
    if (gameState.currentQuestion >= QUIZ_CONFIG.totalQuestions) {
        endQuiz();
        return;
    }
    
    const question = QUIZ_QUESTIONS[gameState.currentQuestion];
    const questionText = document.getElementById('questionText');
    const currentQuestion = document.getElementById('currentQuestion');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedback = document.getElementById('feedback');
    
    if (currentQuestion) currentQuestion.textContent = gameState.currentQuestion + 1;
    if (questionText) questionText.textContent = question.question;
    if (feedback) {
        feedback.textContent = '';
        feedback.className = 'feedback';
    }
    
    // Clear and create options
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.onclick = function() {
                selectAnswer(index);
            };
            optionsContainer.appendChild(button);
        });
    }
    
    // Start timer
    startTimer();
}

// TIMER - FIXED
let currentTimer = null;

function startTimer() {
    // Clear any existing timer
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    
    let timeLeft = QUIZ_CONFIG.timePerQuestion;
    const timeLeftEl = document.getElementById('timeLeft');
    const timerProgress = document.getElementById('timerProgress');
    
    if (timeLeftEl) timeLeftEl.textContent = `${timeLeft}s`;
    if (timerProgress) timerProgress.style.width = '100%';
    
    currentTimer = setInterval(() => {
        timeLeft--;
        if (timeLeftEl) timeLeftEl.textContent = `${timeLeft}s`;
        if (timerProgress) timerProgress.style.width = `${(timeLeft / QUIZ_CONFIG.timePerQuestion) * 100}%`;
        
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    const options = document.querySelectorAll('.option-btn');
    const question = QUIZ_QUESTIONS[gameState.currentQuestion];
    const feedback = document.getElementById('feedback');
    
    options.forEach(btn => btn.disabled = true);
    if (options[question.correct]) {
        options[question.correct].classList.add('correct');
    }
    
    if (feedback) {
        feedback.textContent = 'Time\'s up! No points.';
        feedback.className = 'feedback incorrect';
    }
    
    setTimeout(() => {
        gameState.currentQuestion++;
        loadQuestion();
    }, 2000);
}

function selectAnswer(selectedIndex) {
    // Clear timer
    if (currentTimer) {
        clearInterval(currentTimer);
    }
    
    const question = QUIZ_QUESTIONS[gameState.currentQuestion];
    const options = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    const currentScore = document.getElementById('currentScore');
    
    options.forEach(btn => btn.disabled = true);
    options[selectedIndex].classList.add('selected');
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        if (feedback) {
            feedback.textContent = 'Correct! +100 XP 🎉';
            feedback.className = 'feedback correct';
        }
        
        gameState.score += QUIZ_CONFIG.xpPerQuestion;
        if (currentScore) currentScore.textContent = gameState.score;
        
        if (gameState.players.has(gameState.currentPlayer)) {
            const player = gameState.players.get(gameState.currentPlayer);
            player.score += QUIZ_CONFIG.xpPerQuestion;
            savePlayers();
        }
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        if (feedback) {
            feedback.textContent = 'Wrong! No points.';
            feedback.className = 'feedback incorrect';
        }
    }
    
    setTimeout(() => {
        gameState.currentQuestion++;
        loadQuestion();
    }, 2000);
}

function endQuiz() {
    console.log('🏁 Quiz ended');
    showLeaderboard();
    showScreen('leaderboard');
}

function showLeaderboard() {
    cleanupOldPlayers();
    
    const playersArray = Array.from(gameState.players.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, QUIZ_CONFIG.leaderboardSize);
    
    const leaderboard = document.getElementById('leaderboard');
    if (leaderboard) {
        leaderboard.innerHTML = '';
        
        if (playersArray.length === 0) {
            leaderboard.innerHTML = '<div class="leaderboard-item"><div class="player-name">No active players</div></div>';
            return;
        }
        
        playersArray.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = `leaderboard-item ${index < 3 ? 'rank-' + (index + 1) : ''}`;
            item.innerHTML = `
                <div class="rank">#${index + 1}</div>
                <div class="player-name">${player.username}</div>
                <div class="player-score">${player.score} XP</div>
            `;
            leaderboard.appendChild(item);
        });
    }
}

// UTILITY FUNCTIONS
function cleanupOldPlayers() {
    const now = new Date();
    gameState.players.forEach((player, username) => {
        const joinedAt = new Date(player.joinedAt);
        const hoursSinceJoin = (now - joinedAt) / (1000 * 60 * 60);
        if (hoursSinceJoin >= QUIZ_CONFIG.resetHours) {
            gameState.players.delete(username);
        }
    });
    savePlayers();
}

function updatePlayerDisplay() {
    const currentPlayers = document.getElementById('currentPlayers');
    if (currentPlayers) currentPlayers.textContent = gameState.players.size;
}

function savePlayers() {
    const playersArray = Array.from(gameState.players.entries());
    localStorage.setItem('quizPlayers', JSON.stringify(playersArray));
}

function loadPlayers() {
    const saved = localStorage.getItem('quizPlayers');
    if (saved) {
        try {
            const playersArray = JSON.parse(saved);
            gameState.players = new Map(playersArray);
        } catch (e) {
            gameState.players = new Map();
        }
    }
}

function startResetTimer() {
    const resetTimer = document.getElementById('resetTimer');
    if (!resetTimer) return;
    
    function updateResetTimer() {
        const now = new Date();
        const nextReset = new Date(now);
        nextReset.setHours(now.getHours() + QUIZ_CONFIG.resetHours);
        nextReset.setMinutes(0, 0, 0);
        
        const diff = nextReset - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        resetTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateResetTimer();
    setInterval(updateResetTimer, 1000);
}
