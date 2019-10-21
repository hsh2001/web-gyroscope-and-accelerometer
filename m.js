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
let [ax, ay] = [ 0, 0 ];

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
  ax += event.gamma / 6000;
  ay += event.beta / 3000;

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
    dx = ax = 0;
  }

  if (dy <= 0) {
    dy = ay = 0;
  }

  if (dx + 30 >= innerWidth) {
    dx = innerWidth - 30;
    ax = 0;
  }

  if (dy + 30 >= innerHeight) {
    dy = innerHeight - 30;
    ay = 0;
  }

  ball.style.top = `${dy.toFixed(2)}px`;
  ball.style.left = `${dx.toFixed(2)}px`;

  document.getElementById('ball-s').innerHTML
    = `(${[ax, ay].map(n => n.toFixed(2)).join()})`;

  document.getElementById('ball-p').innerHTML
    = `(${[dx, dy].map(n => n.toFixed(2)).join()})`;
};

window.addEventListener('deviceorientation', evHandler, true);

window.addEventListener('devicemotion', event => {
  const acc = event.accelerationIncludingGravity;
  Array.from("xyz").forEach(key => {
    document.getElementById(key).innerHTML = acc[key];
  });
}, true);

let interval;
function testEv(n = 1) {
  if (interval) clearInterval(interval);
  n *= 30;
  interval = setInterval(() => {
    console.log(ax, ay);
    evHandler({
      alpha: n,
      beta: n,
      gamma: n,
    });
  }, 1);
}
