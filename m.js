// Promise.all(
//   [
//     DeviceMotionEvent,
//     DeviceOrientationEvent,
//   ].map(
//     eve => eve.requestPermission()
//   )
// ).then(permissions => {
//   permissions.map(alert);
// });

const ball = document.getElementById('ball');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const speedList = [];
let [ax, ay] = [ 0, 0 ];

initCanvas();
function initCanvas() {
  Object.assign(ctx, {
    fillStyle: '#eee',
    strokeStyle: '#f00',
    lineWidth: 3,
  });
}

function drawPointInCanvas() {
  const dataSize = 100;
  const ratio = canvas.width / dataSize;

  while (speedList.length > dataSize) {
    speedList.shift();
  }

  initCanvas();
  ctx.fillRect(0, 0, 800, 800);
  ctx.closePath();
  ctx.beginPath();
  speedList.map(
    (e,i) => [i * ratio, (1 - e / 6) * canvas.height]
  ).forEach((e, i) => {
    i? ctx.lineTo(...e) : ctx.moveTo(...e);
  });
  ctx.stroke();
}

Object.assign(ball.style, {
  background: '#000',
  width: '30px',
  height: '30px',
  borderRadius: '100%',
  position: 'fixed',
  top: `${innerHeight / 2}px`,
  left: `${innerWidth / 2}px`,
});

const evHandler = event => {
  ax += event.gamma / 1500;
  ay += event.beta / 750;

  let dx = ax + parseFloat(ball.style.left);
  let dy = ay + parseFloat(ball.style.top);

  [
    'alpha',
    'beta',
    'gamma',
  ].forEach(key => {
    document.getElementById(key).innerHTML = event[key];
  });

  if (dx <= 0) {
    dx = 0;
    ax *= -0.5
    if (Math.abs(ax) < 0.05) {
      ax = 0;
    }
  }

  if (dy <= 0) {
    dy = 0;
    ay *= -0.5;
    if (Math.abs(ay) < 0.05) {
      ay = 0;
    }
  }

  if (dx + 30 >= innerWidth) {
    dx = innerWidth - 30;
    ax *= -0.5;
    if (Math.abs(ax) < 0.05) {
      ax = 0;
    }
  }

  if (dy + 30 >= innerHeight) {
    dy = innerHeight - 30;
    ay *= -0.5;
    if (Math.abs(ay) < 0.05) {
      ay = 0;
    }
  }

  ball.style.top = `${dy.toFixed(2)}px`;
  ball.style.left = `${dx.toFixed(2)}px`;

  document.getElementById('ball-s').innerHTML
    = `(${[ax, ay].map(n => n.toFixed(2)).join()})`;

  document.getElementById('ball-p').innerHTML
    = `(${[dx, dy].map(n => n.toFixed(2)).join()})`;

  speedList.push(Math.sqrt(ax ** 2 + ay ** 2));
  drawPointInCanvas();
};

window.addEventListener('deviceorientation', evHandler, true);

window.addEventListener('devicemotion', event => {
  const acc = event.accelerationIncludingGravity;
  Array.from("xyz").forEach(key => {
    document.getElementById(key).innerHTML = acc[key];
  });
}, true);

let interval;
window.testEv = testEv;
testEv();
function testEv(n = 1) {
  if (interval) clearInterval(interval);
  n *= 30;
  interval = setInterval(() => {
    evHandler({
      alpha: n,
      beta: n,
      gamma: n,
    });
  }, 1);
}
