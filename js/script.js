const particles = document.querySelector('#particles');
const petals = document.querySelector('#petals');
const sparkles = document.querySelector('#sparkles');
const loginScreen = document.querySelector('#loginScreen');
const revealScreen = document.querySelector('#revealScreen');
const message = document.querySelector('#message');
const phrase = 'A bouquet of blue tulips just for my babyyyy 💙';
let typingTimer;

function makeDecorations(parent, className, amount) {
  for (let i = 0; i < amount; i++) {
    const item = document.createElement('i');
    item.className = className;
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `${Math.random() * 100}%`;
    item.style.setProperty('--size', `${3 + Math.random() * 8}px`);
    item.style.setProperty('--duration', `${4 + Math.random() * 8}s`);
    item.style.setProperty('--delay', `${-Math.random() * 10}s`);
    item.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
    parent.append(item);
  }
}
makeDecorations(particles, 'particle', 34);
makeDecorations(sparkles, 'sparkle', 28);
makeDecorations(petals, 'petal', 18);

function burstHearts(origin) {
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.textContent = '♥'; heart.className = 'burst-heart';
    heart.style.cssText = `position:fixed;left:${origin.x}px;top:${origin.y}px;color:#ff9dc8;pointer-events:none;z-index:5;font-size:${12 + Math.random()*15}px;transition:transform .85s ease-out,opacity .85s ease-out;`;
    document.body.append(heart);
    requestAnimationFrame(() => { heart.style.transform = `translate(${(Math.random()-.5)*180}px,${-30-Math.random()*150}px) rotate(${(Math.random()-.5)*180}deg)`; heart.style.opacity = '0'; });
    setTimeout(() => heart.remove(), 900);
  }
}

document.querySelectorAll('.flower-card').forEach(card => card.addEventListener('click', event => {
  if (card.classList.contains('wrong')) {
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    message.textContent = "Oops! That's not my babyy's favorite flower, Try again.";
    const r = card.getBoundingClientRect(); burstHearts({ x:r.left + r.width/2, y:r.top + r.height/2 });
    return;
  }
  message.textContent = 'A perfect choice…';
  loginScreen.classList.add('is-leaving');
  setTimeout(() => { revealScreen.classList.add('active'); revealScreen.setAttribute('aria-hidden', 'false'); typeMessage(); }, 650);
}));

function typeMessage() {
  clearInterval(typingTimer); const target = document.querySelector('#typewriter'); target.textContent = ''; let i = 0;
  typingTimer = setInterval(() => { target.textContent += phrase[i++]; if (i === phrase.length) clearInterval(typingTimer); }, 58);
}
document.querySelector('#restart').addEventListener('click', () => {
  revealScreen.classList.remove('active'); revealScreen.setAttribute('aria-hidden', 'true');
  loginScreen.classList.remove('is-leaving'); message.textContent = '';
});

document.querySelector('#bouquetButton').addEventListener('click', event => {
  const r = event.currentTarget.getBoundingClientRect();
  burstHearts({ x: r.left + r.width / 2, y: r.top + r.height * .42 });
  for (let i = 0; i < 26; i++) {
    const sparkle = document.createElement('i');
    sparkle.textContent = i % 4 === 0 ? '💙' : '✦';
    sparkle.style.cssText = `position:fixed;z-index:6;left:${r.left+r.width/2}px;top:${r.top+r.height*.43}px;color:${i%4 === 0 ? '#99eaff' : '#fff4bd'};font-size:${10+Math.random()*18}px;pointer-events:none;transition:transform 1s cubic-bezier(.15,.7,.2,1),opacity 1s;`;
    document.body.append(sparkle);
    requestAnimationFrame(() => { sparkle.style.transform = `translate(${(Math.random()-.5)*390}px,${(Math.random()-.5)*280}px) rotate(${Math.random()*360}deg) scale(.2)`; sparkle.style.opacity = '0'; });
    setTimeout(() => sparkle.remove(), 1050);
  }
});
