(function () {
  var pct = 0;
  var fill = document.getElementById('loader-fill');
  var loader = document.getElementById('loader');

  // Start progress immediately
  var interval = setInterval(function () {
    var inc = pct < 70 ? Math.random() * 4 + 1 : Math.random() * 1.5 + 0.5;
    pct = Math.min(pct + inc, 98);
    fill.style.width = pct + '%';
  }, 80);

  window.addEventListener('load', function () {
    clearInterval(interval);
    fill.style.width = '100%';
    setTimeout(function () {
      loader.style.transition = 'opacity 0.6s ease';
      loader.style.opacity = '0';
      setTimeout(function () { loader.style.display = 'none'; }, 600);
    }, 400);
  });
})();