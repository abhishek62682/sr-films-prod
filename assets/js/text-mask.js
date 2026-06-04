(() => {
  gsap.registerPlugin(SplitText);

  const revealTargets = document.querySelectorAll(".reveal-text");

  gsap.set(revealTargets, { opacity: 0 });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      observer.unobserve(entry.target);

      gsap.set(entry.target, { opacity: 1 });

      const split = SplitText.create(entry.target, {
        type: "lines",
        mask: "lines",
      });

      gsap.from(split.lines, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: "expo.out",
      });
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px"
  });

  revealTargets.forEach(el => observer.observe(el));
})();