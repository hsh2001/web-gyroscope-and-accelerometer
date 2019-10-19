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

window.addEventListener('deviceorientation', event => {
  const dx = event.beta / 300 + parseFloat(ball.style.top);
  const dy = event.gamma / 300 + parseFloat(ball.style.left);

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
