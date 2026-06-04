/* Navbar scroll + mobile sheet logic */
      const nav      = document.getElementById('site-nav');
      const toggle   = document.getElementById('nav-toggle');
      const close    = document.getElementById('nav-close');
      const sheet    = document.getElementById('nav-sheet');
      const backdrop = document.getElementById('nav-backdrop');

      let lastY   = 0;
      let ticking = false;
      const SCROLL_THRESHOLD = 60;

      function handleScroll() {
        const currentY = window.scrollY;
        if (currentY > SCROLL_THRESHOLD) { nav.classList.add('scrolled'); }
        else { nav.classList.remove('scrolled'); }
        if (currentY < 80) { nav.style.transform = 'translateY(0)'; }
        else if (currentY > lastY + 4) { nav.style.transform = 'translateY(-120%)'; }
        else if (currentY < lastY - 4) { nav.style.transform = 'translateY(0)'; }
        lastY   = currentY;
        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(handleScroll); ticking = true; }
      }, { passive: true });

      function openSheet() {
        sheet.classList.remove('translate-x-full');
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        document.body.classList.add('sheet-open');
      }
      function closeSheet() {
        sheet.classList.add('translate-x-full');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('sheet-open');
      }

      toggle.addEventListener('click', openSheet);
      close.addEventListener('click', closeSheet);
      backdrop.addEventListener('click', closeSheet);
      document.querySelectorAll('.sheet-link').forEach(l => l.addEventListener('click', closeSheet));