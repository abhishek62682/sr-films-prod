/* ── HERO SWIPER + PROGRESS BAR ── */
(function () {
  const DUR = 5000, TICK = 60;
  let sw, timer, elapsed = 0;
  const segs = document.querySelectorAll(".prog-seg");
  const fills = document.querySelectorAll(".prog-fill");

  function setSegs(idx) {
    segs.forEach((s, i) => {
      s.classList.remove("done", "inactive");
      fills[i].style.transition = "none";
      if (i < idx) {
        s.classList.add("done");
        fills[i].style.width = "100%";
      } else if (i > idx) {
        s.classList.add("inactive");
        fills[i].style.width = "0%";
      } else {
        fills[i].style.width = "0%";
      }
    });
  }

  function startProg(idx) {
    clearInterval(timer);
    elapsed = 0;
    setSegs(idx);
    const fill = fills[idx];
    timer = setInterval(() => {
      elapsed += TICK;
      const pct = Math.min((elapsed / DUR) * 100, 100);
      fill.style.transition = "width 0.06s linear";
      fill.style.width = pct + "%";
      if (elapsed >= DUR) {
        clearInterval(timer);
        segs[idx].classList.add("done");
        sw.slideNext();
      }
    }, TICK);
  }

  sw = new Swiper(".hero-swiper", {
    loop: true,
    speed: 1100,
    effect: "fade",
    fadeEffect: { crossFade: true },
    allowTouchMove: true,
    on: {
      init() { startProg(0); },
      slideChangeTransitionStart() {
        clearInterval(timer);
        startProg(this.realIndex);
      },
    },
  });

  segs.forEach((seg, i) =>
    seg.addEventListener("click", () => {
      clearInterval(timer);
      sw.slideToLoop(i, 900);
    })
  );
})();


/* ── PROJECT CARD SWIPERS (Expertise section) ── */
document.querySelectorAll(".projectSwiper").forEach((el) => {
  const swiper = new Swiper(el, {
    loop: true,
    slidesPerView: 1,
    autoplay: false,
    speed: 650, // Medium smooth - 0.65 seconds
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: el.querySelector(".swiper-pagination"),
      clickable: true,
    },
  });

  let autoSlideInterval = null;

  el.addEventListener("mouseenter", () => {
    swiper.slideNext();
    autoSlideInterval = setInterval(() => {
      swiper.slideNext();
    }, 1700); // 1.7s interval
  });

  el.addEventListener("mouseleave", () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  });
});


new Swiper('.portfolioSwiper', {
  slidesPerView: 1, // mobile default
  spaceBetween: 12,
  grabCursor: true,

  pagination: {
    el: '.portfolio-pagination',
    clickable: true,
  },

  navigation: {
    prevEl: '.portfolio-prev',
    nextEl: '.portfolio-next',
  },

  breakpoints: {
    480:  { slidesPerView: 2.2, spaceBetween: 12 },
    768:  { slidesPerView: 3.2, spaceBetween: 16 },
    1024: { slidesPerView: 4,   spaceBetween: 16 },
  },
});



var galleryCF = new Swiper(".gallery-cf-swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  initialSlide: 3,
  speed: 800,
  slidesPerView: "auto",
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 80,
    depth: 350,
    modifier: 1,
    slideShadows: true,
  },
  on: {
    click() {
      galleryCF.slideTo(this.clickedIndex);
    },
  },
  navigation: {
    nextEl: ".gallery-cf-next",
    prevEl: ".gallery-cf-prev",
  },
  breakpoints: {
    0: {
      coverflowEffect: { rotate: 0, stretch: 30, depth: 150, modifier: 1, slideShadows: true },
    },
    640: {
      coverflowEffect: { rotate: 0, stretch: 55, depth: 240, modifier: 1, slideShadows: true },
    },
    1024: {
      coverflowEffect: { rotate: 0, stretch: 80, depth: 350, modifier: 1, slideShadows: true },
    },
  },
});