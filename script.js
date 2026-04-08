const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('score');
const healthEl = document.getElementById('health');
const levelEl = document.getElementById('level');
const highScoreEl = document.getElementById('high-score');
const finalScoreEl = document.getElementById('final-score');
const finalHighScoreEl = document.getElementById('final-high-score');

const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const soundToggle = document.getElementById('sound-toggle');

const groundY = canvas.height - 65;

const game = {
  running: false,
  score: 0,
  health: 100,
  level: 1,
  drones: [],
  interceptors: [],
  explosions: [],
  powerUps: [],
  lastSpawn: 0,
  spawnGap: 1200,
  lastAutoShot: 0,
  slowUntil: 0,
  autoUntil: 0,
  soundOn: true,
  baseX: canvas.width / 2,
  highScore: Number(localStorage.getItem('skyShieldHighScore') || 0),
};

highScoreEl.textContent = game.highScore;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function beep(freq, duration, volume = 0.05, type = 'sine') {
  if (!game.soundOn) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function updateHUD() {
  scoreEl.textContent = game.score;
  healthEl.textContent = game.health;
  levelEl.textContent = game.level;
  highScoreEl.textContent = game.highScore;
}

function createDrone() {
  const x = random(25, canvas.width - 25);
  const y = -20;
  const speed = random(0.45, 1.15) + game.level * 0.09;
  const size = random(13, 19);

  game.drones.push({ x, y, speed, size });
}

function fireInterceptor(targetX, targetY) {
  const x = game.baseX;
  const y = groundY;
  const angle = Math.atan2(targetY - y, targetX - x);
  const speed = 5.6;

  game.interceptors.push({
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 4,
    life: 150,
  });

  beep(510, 0.06, 0.04, 'triangle');
}

function spawnPowerUp(x, y) {
  const list = ['emp', 'slow', 'auto', 'repair'];
  const kind = list[Math.floor(random(0, list.length))];
  game.powerUps.push({ x, y, kind, radius: 10, life: 200 });
}

function applyPowerUp(kind, x, y) {
  if (kind === 'emp') {
    const blastRadius = 110;
    game.drones = game.drones.filter((drone) => {
      const hit = Math.hypot(drone.x - x, drone.y - y) < blastRadius;
      if (hit) {
        game.score += 1;
        game.explosions.push({ x: drone.x, y: drone.y, life: 24, color: '#f97316' });
      }
      return !hit;
    });
    game.explosions.push({ x, y, life: 36, color: '#67e8f9', radius: blastRadius });
    beep(190, 0.2, 0.06, 'square');
  }

  if (kind === 'slow') {
    game.slowUntil = performance.now() + 3000;
    beep(220, 0.15, 0.06);
  }

  if (kind === 'auto') {
    game.autoUntil = performance.now() + 5000;
    beep(780, 0.18, 0.06);
  }

  if (kind === 'repair') {
    game.health = Math.min(100, game.health + 18);
    beep(420, 0.2, 0.06);
  }
}

function getDifficultyLevel() {
  return Math.floor(game.score / 20) + 1;
}

function runAutoBattery(time) {
  if (time > game.autoUntil) return;
  if (time - game.lastAutoShot < 230) return;

  let nearest = null;
  let best = Infinity;
  for (const drone of game.drones) {
    const distance = Math.hypot(drone.x - game.baseX, drone.y - groundY);
    if (distance < best) {
      best = distance;
      nearest = drone;
    }
  }

  if (nearest) {
    fireInterceptor(nearest.x, nearest.y);
    game.lastAutoShot = time;
  }
}

function updateEntities(time) {
  game.level = getDifficultyLevel();
  game.spawnGap = Math.max(360, 1200 - (game.level - 1) * 75);

  if (time - game.lastSpawn > game.spawnGap) {
    createDrone();
    game.lastSpawn = time;
  }

  runAutoBattery(time);

  const slowFactor = time < game.slowUntil ? 0.4 : 1;

  for (const drone of game.drones) {
    drone.y += drone.speed * slowFactor;
  }

  for (const interceptor of game.interceptors) {
    interceptor.x += interceptor.vx;
    interceptor.y += interceptor.vy;
    interceptor.life -= 1;
  }

  for (const boom of game.explosions) {
    boom.life -= 1;
  }

  for (const power of game.powerUps) {
    power.life -= 1;
  }

  // Interceptor vs drone
  for (let i = game.interceptors.length - 1; i >= 0; i -= 1) {
    const shot = game.interceptors[i];

    for (let j = game.drones.length - 1; j >= 0; j -= 1) {
      const drone = game.drones[j];
      const dist = Math.hypot(shot.x - drone.x, shot.y - drone.y);

      if (dist < shot.radius + drone.size * 0.8) {
        game.interceptors.splice(i, 1);
        game.drones.splice(j, 1);
        game.explosions.push({ x: drone.x, y: drone.y, life: 20, color: '#facc15' });
        game.score += 1;
        beep(860, 0.07, 0.05, 'sawtooth');

        if (Math.random() < 0.14) {
          spawnPowerUp(drone.x, drone.y);
        }
        break;
      }
    }
  }

  // Reaching city
  for (let i = game.drones.length - 1; i >= 0; i -= 1) {
    if (game.drones[i].y > groundY - 8) {
      game.drones.splice(i, 1);
      game.health -= 10;
      game.explosions.push({ x: random(90, canvas.width - 90), y: groundY + 4, life: 24, color: '#fb7185' });
      beep(120, 0.18, 0.08, 'square');
    }
  }

  // Pickup power-up by shooting it
  for (let p = game.powerUps.length - 1; p >= 0; p -= 1) {
    const power = game.powerUps[p];
    for (let i = game.interceptors.length - 1; i >= 0; i -= 1) {
      const shot = game.interceptors[i];
      if (Math.hypot(shot.x - power.x, shot.y - power.y) < 13) {
        game.interceptors.splice(i, 1);
        applyPowerUp(power.kind, power.x, power.y);
        game.powerUps.splice(p, 1);
        break;
      }
    }
  }

  game.interceptors = game.interceptors.filter(
    (shot) => shot.life > 0 && shot.y > -20 && shot.x > -20 && shot.x < canvas.width + 20,
  );
  game.explosions = game.explosions.filter((boom) => boom.life > 0);
  game.powerUps = game.powerUps.filter((power) => power.life > 0);

  if (game.health <= 0) {
    endGame();
  }
}

function drawCity() {
  ctx.fillStyle = '#111827';
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

  ctx.fillStyle = '#334155';
  const buildings = [
    { x: 80, w: 70, h: 95 },
    { x: 190, w: 110, h: 70 },
    { x: 360, w: 90, h: 120 },
    { x: 510, w: 80, h: 80 },
    { x: 650, w: 120, h: 105 },
  ];

  for (const b of buildings) {
    ctx.fillRect(b.x, groundY - b.h, b.w, b.h);
  }

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(game.baseX - 18, groundY);
  ctx.lineTo(game.baseX, groundY - 20);
  ctx.lineTo(game.baseX + 18, groundY);
  ctx.closePath();
  ctx.fill();
}

function drawDrone(drone) {
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.moveTo(drone.x, drone.y - drone.size);
  ctx.lineTo(drone.x - drone.size, drone.y + drone.size * 0.5);
  ctx.lineTo(drone.x + drone.size, drone.y + drone.size * 0.5);
  ctx.closePath();
  ctx.fill();
}

function drawPowerUp(power) {
  const styles = {
    emp: { color: '#67e8f9', label: 'E' },
    slow: { color: '#a78bfa', label: 'S' },
    auto: { color: '#f59e0b', label: 'A' },
    repair: { color: '#4ade80', label: 'R' },
  };
  const style = styles[power.kind];

  ctx.fillStyle = style.color;
  ctx.beginPath();
  ctx.arc(power.x, power.y, power.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(style.label, power.x, power.y + 4);
}

function draw(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sky = ctx.createLinearGradient(0, 0, 0, groundY);
  sky.addColorStop(0, '#0b1228');
  sky.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, groundY);

  if (time < game.slowUntil) {
    ctx.fillStyle = 'rgba(167, 139, 250, 0.15)';
    ctx.fillRect(0, 0, canvas.width, groundY);
  }

  drawCity();

  for (const drone of game.drones) drawDrone(drone);

  ctx.fillStyle = '#f8fafc';
  for (const shot of game.interceptors) {
    ctx.beginPath();
    ctx.arc(shot.x, shot.y, shot.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const boom of game.explosions) {
    const alpha = boom.life / 36;
    ctx.globalAlpha = Math.max(alpha, 0.12);
    ctx.strokeStyle = boom.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(boom.x, boom.y, boom.radius || (36 - boom.life), 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  for (const power of game.powerUps) drawPowerUp(power);

  if (time < game.autoUntil) {
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 14px system-ui';
    ctx.fillText('Auto Battery Active', 20, 24);
  }
}

function loop(time) {
  if (!game.running) return;
  updateEntities(time);
  draw(time);
  updateHUD();
  requestAnimationFrame(loop);
}

function startGame() {
  game.running = true;
  game.score = 0;
  game.health = 100;
  game.level = 1;
  game.drones = [];
  game.interceptors = [];
  game.explosions = [];
  game.powerUps = [];
  game.lastSpawn = 0;
  game.lastAutoShot = 0;
  game.slowUntil = 0;
  game.autoUntil = 0;

  startScreen.classList.remove('visible');
  gameOverScreen.classList.remove('visible');
  updateHUD();
  requestAnimationFrame(loop);
}

function endGame() {
  game.running = false;
  if (game.score > game.highScore) {
    game.highScore = game.score;
    localStorage.setItem('skyShieldHighScore', String(game.highScore));
  }

  finalScoreEl.textContent = game.score;
  finalHighScoreEl.textContent = game.highScore;
  highScoreEl.textContent = game.highScore;
  gameOverScreen.classList.add('visible');
}

function pointerToCanvas(event) {
  const rect = canvas.getBoundingClientRect();
  const clientX = event.clientX ?? event.touches?.[0]?.clientX;
  const clientY = event.clientY ?? event.touches?.[0]?.clientY;

  return {
    x: ((clientX - rect.left) / rect.width) * canvas.width,
    y: ((clientY - rect.top) / rect.height) * canvas.height,
  };
}

function onFire(event) {
  if (!game.running) return;
  event.preventDefault();
  const point = pointerToCanvas(event);
  fireInterceptor(point.x, point.y);
}

startBtn.addEventListener('click', () => {
  audioCtx.resume();
  startGame();
});

restartBtn.addEventListener('click', () => {
  audioCtx.resume();
  startGame();
});

soundToggle.addEventListener('click', () => {
  game.soundOn = !game.soundOn;
  soundToggle.textContent = game.soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});

canvas.addEventListener('click', onFire);
canvas.addEventListener('touchstart', onFire, { passive: false });

draw(0);
updateHUD();
