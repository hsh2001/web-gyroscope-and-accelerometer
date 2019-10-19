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

window.addEventListener('deviceorientation', event => {
  ax += event.beta / 600;
  ay += event.gamma / 300;
  const dx = ax + parseFloat(ball.style.top);
  const dy = ay + parseFloat(ball.style.left);

  [
    'alpha',
    'beta',
    'gamma',
  ].forEach(key => {
    document.getElementById(key).innerHTML = event[key];
  });

  ball.style.top = `${dx.toFixed(2)}px`;
  ball.style.left = `${dy.toFixed(2)}px`;
}, true);

window.addEventListener('devicemotion', event => {
  const acc = event.accelerationIncludingGravity;
  Array.from("xyz").forEach(key => {
    document.getElementById(key).innerHTML = acc[key];
  });
}, true);
