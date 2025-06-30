/* CSS Custom Properties */
:root {
  /* Futuristic Colors */
  --primary-color: #00d9ff;
  --primary-dark: #00a8cc;
  --primary-light: #33e0ff;
  --secondary-color: #ff00ff;
  --accent-color: #00ff88;
  --neon-purple: #b000ff;
  --neon-pink: #ff0080;
  --cyber-yellow: #ffea00;
  --success-color: #00ff00;
  --warning-color: #ff9500;
  --error-color: #ff0040;
  
  /* Dark Theme Colors */
  --bg-primary: #000000;
  --bg-secondary: #0a0a0a;
  --bg-tertiary: #151515;
  --text-primary: #ffffff;
  --text-secondary: #b8b8b8;
  --text-muted: #666666;
  --border-color: #222222;
  --card-bg: rgba(10, 10, 10, 0.8);
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.02);
  --glass-border: rgba(255, 255, 255, 0.1);
  
  /* Typography */
  --font-primary: 'Orbitron', 'Inter', monospace;
  --font-secondary: 'Rajdhani', 'Lora', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  
  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 1rem;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 217, 255, 0.1);
  --shadow-md: 0 4px 16px rgba(0, 217, 255, 0.15);
  --shadow-lg: 0 8px 32px rgba(0, 217, 255, 0.2);
  --shadow-xl: 0 16px 64px rgba(0, 217, 255, 0.25);
  --shadow-neon: 0 0 20px rgba(0, 217, 255, 0.5);
  
  /* Transitions */
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
}

/* Futuristic Background Grid */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: -1;
}

/* Animated Cyber Grid */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
  z-index: -1;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-primary);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

h1 {
  font-size: 3.5rem;
  font-weight: 900;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
}

h2 {
  font-size: 2.5rem;
  font-weight: 800;
}

h3 {
  font-size: 1.875rem;
  font-weight: 700;
}

h4 {
  font-size: 1.5rem;
}

p {
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
  font-family: var(--font-secondary);
  font-weight: 400;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

a:hover {
  color: var(--primary-light);
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.8);
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--neon-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease infinite;
  filter: drop-shadow(0 0 20px rgba(0, 217, 255, 0.5));
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Glassmorphism Card */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(0, 217, 255, 0.1);
}

/* Neon Glow Effect */
.neon-glow {
  box-shadow: 
    0 0 10px rgba(0, 217, 255, 0.8),
    0 0 20px rgba(0, 217, 255, 0.6),
    0 0 30px rgba(0, 217, 255, 0.4),
    0 0 40px rgba(0, 217, 255, 0.2);
}

/* Cyber Lines */
.cyber-lines::before,
.cyber-lines::after {
  content: '';
  position: absolute;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  height: 1px;
  width: 100%;
  animation: scan-line 3s linear infinite;
}

@keyframes scan-line {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 217, 255, 0.2);
  z-index: 1000;
  transition: all var(--transition-normal);
  overflow: hidden;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  animation: scan-nav 4s linear infinite;
}

@keyframes scan-nav {
  0% { left: -100%; }
  100% { left: 100%; }
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
}

.nav-logo {
  width: 45px;
  height: 45px;
  filter: drop-shadow(0 0 10px rgba(0, 217, 255, 0.8));
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 600;
  font-family: var(--font-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-fast);
  position: relative;
  padding: var(--spacing-sm) 0;
}

.nav-link:hover {
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.8);
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  transition: transform var(--transition-fast);
}

.nav-link:hover::before {
  transform: translateX(-50%) scaleX(1);
}

.nav-link::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  width: 3px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 50%;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.nav-link:hover::after {
  opacity: 1;
  animation: pulse-dot 1s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.5); }
}

.nav-hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.nav-hamburger span {
  width: 25px;
  height: 3px;
  background: var(--text-primary);
  transition: all var(--transition-fast);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  border: 1px solid var(--primary-color);
  border-radius: 0;
  font-family: var(--font-secondary);
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: rgba(0, 217, 255, 0.05);
  color: var(--primary-color);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 30%, 100% 100%, 10px 100%, 0 70%);
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 217, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.btn:hover::after {
  transform: translateX(100%);
}

.btn-primary {
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(255, 0, 255, 0.2));
  border-color: var(--primary-color);
  color: var(--text-primary);
  box-shadow: 
    0 0 20px rgba(0, 217, 255, 0.3),
    inset 0 0 20px rgba(0, 217, 255, 0.1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 0 30px rgba(0, 217, 255, 0.5),
    inset 0 0 30px rgba(0, 217, 255, 0.2),
    0 10px 40px rgba(0, 217, 255, 0.3);
  border-color: var(--primary-light);
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.8);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(0, 217, 255, 0.3);
  color: var(--text-secondary);
}

.btn-secondary:hover {
  background: rgba(0, 217, 255, 0.1);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-large {
  padding: var(--spacing-lg) var(--spacing-2xl);
  font-size: 1.1rem;
  font-weight: 800;
}

.btn-full {
  width: 100%;
  justify: center;
}

/* Cyber Button Corners */
.btn span {
  position: relative;
  z-index: 1;
}

.nav-cta {
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%);
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 var(--spacing-3xl);
  background: 
    radial-gradient(ellipse at 20% 80%, rgba(0, 217, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(255, 0, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 40%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
    linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

/* Animated Grid Background */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px);
  background-size: 100px 100px;
  animation: grid-move 20s linear infinite;
  pointer-events: none;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(100px, 100px); }
}

/* Cyber Scan Lines */
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 217, 255, 0.03) 2px,
      rgba(0, 217, 255, 0.03) 4px
    );
  animation: scan 8s linear infinite;
  pointer-events: none;
}

@keyframes scan {
  0% { background-position: 0 0; }
  100% { background-position: 0 10px; }
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-3xl);
}

.hero-stats {
  display: flex;
  gap: var(--spacing-2xl);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-visual {
  position: relative;
  height: 500px;
}

.hero-graphic {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-card {
  position: absolute;
  background: rgba(0, 217, 255, 0.02);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 217, 255, 0.3);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  box-shadow: 
    0 0 30px rgba(0, 217, 255, 0.2),
    inset 0 0 20px rgba(0, 217, 255, 0.05);
  animation: float-3d 10s ease-in-out infinite;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  clip-path: polygon(
    0 15%,
    15% 0,
    85% 0,
    100% 15%,
    100% 85%,
    85% 100%,
    15% 100%,
    0 85%
  );
}

.floating-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(0, 217, 255, 0.1),
    transparent
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.floating-card:hover {
  transform: scale(1.1) rotateY(10deg) rotateX(10deg);
  box-shadow: 
    0 0 50px rgba(0, 217, 255, 0.4),
    inset 0 0 30px rgba(0, 217, 255, 0.1);
  border-color: var(--primary-color);
}

.floating-card i {
  font-size: 2.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(0, 217, 255, 0.5));
  animation: icon-pulse 2s ease-in-out infinite;
}

@keyframes icon-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.floating-card span {
  font-size: 0.875rem;
  color: var(--primary-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  transform-style: preserve-3d;
}

.card-2 {
  top: 50%;
  right: 20%;
  animation-delay: 3.3s;
  transform-style: preserve-3d;
}

.card-3 {
  bottom: 20%;
  left: 30%;
  animation-delay: 6.6s;
  transform-style: preserve-3d;
}

@keyframes float-3d {
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateY(0deg);
  }
  25% { 
    transform: translateY(-20px) rotateX(5deg) rotateY(5deg);
  }
  50% { 
    transform: translateY(-10px) rotateX(-5deg) rotateY(-5deg);
  }
  75% { 
    transform: translateY(-30px) rotateX(5deg) rotateY(-5deg);
  }
}

/* Features Section */
.features {
  padding: var(--spacing-3xl) 0;
  background: 
    linear-gradient(180deg, transparent 0%, rgba(0, 217, 255, 0.02) 50%, transparent 100%),
    var(--bg-primary);
  position: relative;
}

.features::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent);
  animation: scan-line 4s linear infinite;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  position: relative;
}

.section-title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-lg);
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
  text-shadow: 0 0 40px rgba(0, 217, 255, 0.3);
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-2xl);
  position: relative;
}

.feature-card {
  background: rgba(0, 217, 255, 0.02);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 217, 255, 0.2);
  padding: var(--spacing-2xl);
  text-align: center;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  clip-path: polygon(
    0 0,
    calc(100% - 20px) 0,
    100% 20px,
    100% 100%,
    20px 100%,
    0 calc(100% - 20px)
  );
  cursor: pointer;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--neon-purple));
  opacity: 0;
  z-index: -1;
  transition: opacity var(--transition-normal);
  filter: blur(5px);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.feature-card:hover::after {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(0, 217, 255, 0.3),
    inset 0 0 30px rgba(0, 217, 255, 0.1);
  border-color: var(--primary-color);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  background: transparent;
  border: 2px solid var(--primary-color);
  position: relative;
  margin-bottom: var(--spacing-xl);
  transform: rotate(45deg);
  overflow: hidden;
}

.feature-icon::before {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(0, 217, 255, 0.3);
  animation: rotate-border 4s linear infinite;
}

@keyframes rotate-border {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.feature-icon i {
  font-size: 2.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: rotate(-45deg);
  filter: drop-shadow(0 0 10px rgba(0, 217, 255, 0.5));
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
  font-weight: 800;
  letter-spacing: 0.05em;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.7;
  font-family: var(--font-secondary);
  font-weight: 400;
}

/* Solutions Section */
.solutions {
  padding: var(--spacing-3xl) 0;
  background: var(--bg-primary);
}

.solutions-content {
  max-width: 800px;
  margin: 0 auto;
}

.solutions-tabs {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-2xl);
  border-bottom: 1px solid var(--border-color);
}

.tab-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
}

.tab-btn.active {
  color: var(--primary-color);
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
  transform: scaleX(0);
  transition: transform var(--transition-fast);
}

.tab-btn.active::after {
  transform: scaleX(1);
}

.tab-content {
  display: none;
  animation: fadeIn 0.5s ease-in-out;
}

.tab-content.active {
  display: block;
}

.solution-details h3 {
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.solution-details p {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-lg);
}

.solution-details ul {
  list-style: none;
  padding: 0;
}

.solution-details li {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  color: var(--text-secondary);
}

.solution-details li i {
  color: var(--success-color);
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-3xl) 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  color: white;
  margin-bottom: var(--spacing-lg);
}

.cta-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-2xl);
}

/* Footer */
.footer {
  background: var(--bg-secondary);
  padding: var(--spacing-3xl) 0 var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.footer-logo {
  width: 40px;
  height: 40px;
}

.footer-brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.7;
}

.footer-title {
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--spacing-sm);
}

.footer-links a {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 2000;
  align-items: center;
  justify-content: center;
}

.modal.active {
  display: flex;
}

.modal-content {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  max-width: 400px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.modal-title {
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.modal-close:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: var(--spacing-lg);
}

.modal-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.partner-help {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

.partner-help a {
  color: var(--primary-color);
  text-decoration: none;
}

.partner-help a:hover {
  text-decoration: underline;
}

.form-help {
  color: var(--text-muted);
  font-size: 0.8rem;
}

/* Forms */
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-label {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.form-input {
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
  text-align: right;
}

.forgot-password {
  font-size: 0.875rem;
  color: var(--primary-color);
}

.visitor-info {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.visitor-ip {
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: flex-start;
    padding: var(--spacing-2xl);
    transition: left var(--transition-normal);
    border-top: 1px solid rgba(0, 217, 255, 0.2);
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .nav-hamburger {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    gap: 4px;
    z-index: 1001;
  }
  
  .nav-hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .nav-hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .nav-hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-visual {
    display: none;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .hero-cta .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    clip-path: none;
    border-radius: var(--radius-lg);
  }
  
  .solutions-tabs {
    flex-wrap: wrap;
  }
  
  .tab-btn {
    font-size: 0.875rem;
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .btn {
    clip-path: none;
    border-radius: var(--radius-md);
  }
  
  .floating-card {
    display: none;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 var(--spacing-md);
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .btn-large {
    padding: var(--spacing-md);
    font-size: 0.875rem;
  }
  
  .floating-card {
    padding: var(--spacing-md);
    font-size: 0.75rem;
  }
  
  .floating-card i {
    font-size: 1.5rem;
  }
}

/* Keyframes */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Pricing Section */
.pricing {
  padding: var(--spacing-3xl) 0;
  background: var(--bg-secondary);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-2xl);
  margin-top: var(--spacing-3xl);
}

.pricing-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  position: relative;
  transition: all var(--transition-smooth);
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.pricing-featured {
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.pricing-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
}

.pricing-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.pricing-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.pricing-price {
  margin-bottom: var(--spacing-md);
}

.price-amount {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
}

.price-period {
  font-size: 1rem;
  color: var(--text-secondary);
}

.pricing-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.pricing-features {
  margin-bottom: var(--spacing-2xl);
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  color: var(--text-secondary);
}

.feature-list i {
  color: var(--success-color);
  font-size: 0.875rem;
}

.pricing-cta {
  width: 100%;
  justify-content: center;
}

/* Contact Section */
.contact {
  padding: var(--spacing-3xl) 0;
  background: var(--bg-primary);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  margin-top: var(--spacing-3xl);
}

.contact-info h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-2xl);
  font-size: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.contact-item i {
  color: var(--primary-color);
  font-size: 1.25rem;
  margin-top: 4px;
  flex-shrink: 0;
}

.contact-item h4 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-size: 1rem;
}

.contact-item p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.contact-form-container {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-full {
  width: 100%;
  justify-content: center;
}

/* Notification System */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  max-width: 400px;
  z-index: 3000;
  animation: slideInRight 0.3s ease-out;
}

.notification-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.notification-success .notification-content {
  background: var(--card-bg);
  border-left-color: var(--success-color);
}

.notification-error .notification-content {
  background: var(--card-bg);
  border-left-color: var(--error-color);
}

.notification-info .notification-content {
  background: var(--card-bg);
  border-left-color: var(--primary-color);
}

.notification-message {
  color: var(--text-primary);
  font-weight: 500;
  flex: 1;
}

.notification-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1rem;
  margin-left: var(--spacing-md);
  transition: color var(--transition-fast);
}

.notification-close:hover {
  color: var(--text-primary);
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design for New Sections */
@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  
  .pricing-featured {
    transform: none;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .notification {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}

/* Gallery Section */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-3xl);
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  transition: transform var(--transition-smooth);
}

.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Work Showcase */
.work-showcase {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-3xl);
}

.work-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3xl);
  max-width: 600px;
  text-align: center;
  transition: all var(--transition-smooth);
}

.work-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.work-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
}

.work-title {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.work-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-2xl);
}

.work-details {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.work-tag {
  background: var(--bg-tertiary);
  color: var(--primary-color);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
}

/* Support Section */
.support-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.support-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-3xl);
}

.support-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

.support-stat {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
}

.support-stat .stat-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
}

.support-stat .stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.support-benefits {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

.support-benefits h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.support-actions {
  margin-bottom: var(--spacing-2xl);
}

.support-upi {
  color: var(--text-secondary);
  margin-top: var(--spacing-md);
  font-size: 0.875rem;
}

.support-amounts {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.amount-btn {
  background: var(--card-bg);
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.amount-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-tertiary);
  border-radius: 50%;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.social-icons a:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

/* Contact Intro */
.contact-intro {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
}

/* About Content */
.about-content {
  max-width: 800px;
  margin: 0 auto var(--spacing-3xl);
  text-align: center;
}

.about-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}
