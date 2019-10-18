window.addEventListener('deviceorientation', event => {
  [
    'absolute',
    'alpha',
    'beta',
    'gamma',
  ].forEach(key => {
    document.getElementById(key).innerHTML = event[key];
  });
}, true);

window.addEventListener('devicemotion', event => {
  const acc = event.accelerationIncludingGravity;
  Array.from("xyzr").forEach(key => {
    document.getElementById(key).innerHTML = acc[key];
  });
}, true);
