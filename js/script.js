/* All Metro Painting — site interactions */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky nav shrink / solidify ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var hasHero = document.querySelector('.hero');
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('nav-solid');
        header.classList.remove('is-transparent');
      } else if (hasHero) {
        header.classList.remove('nav-solid');
        header.classList.add('is-transparent');
      }
    }
    if (hasHero) {
      header.classList.add('is-transparent');
    } else {
      header.classList.add('nav-solid');
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ---------- Desktop dropdown click-toggle (for touch/keyboard) ---------- */
  document.querySelectorAll('.has-dropdown > .nav-toplink').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.closest('.has-dropdown');
      document.querySelectorAll('.has-dropdown.open').forEach(function (o) {
        if (o !== li) o.classList.remove('open');
      });
      li.classList.toggle('open');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown.open').forEach(function (o) { o.classList.remove('open'); });
    }
  });

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.querySelector('.mobile-drawer');
  var backdrop = document.querySelector('.drawer-backdrop');
  var drawerClose = document.querySelector('.drawer-close');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }
  if (toggle) toggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.m-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sub = btn.nextElementSibling;
      if (sub) sub.classList.toggle('open');
      btn.classList.toggle('open');
    });
  });

  /* ---------- Quote modal ---------- */
  var overlay = document.querySelector('.modal-overlay');
  var openers = document.querySelectorAll('[data-open-quote]');
  var closers = document.querySelectorAll('[data-close-quote]');

  function openModal(service) {
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.classList.add('no-scroll');
    if (service) {
      var select = overlay.querySelector('#quote-service');
      if (select) select.value = service;
    }
  }
  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }
  openers.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(btn.getAttribute('data-open-quote') || '');
      closeDrawer();
    });
  });
  closers.forEach(function (btn) { btn.addEventListener('click', closeModal); });
  if (overlay) {
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeDrawer(); } });

  /* ---------- Quote / contact form submit (demo only, no backend) ---------- */
  document.querySelectorAll('.js-quote-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      var success = form.parentElement.querySelector('.form-success');
      if (success) success.classList.add('show');
    });
  });

  /* ---------- Review carousel ---------- */
  var track = document.querySelector('.reviews-track');
  var prevBtn = document.querySelector('[data-review-prev]');
  var nextBtn = document.querySelector('[data-review-next]');
  if (track && prevBtn && nextBtn) {
    var scrollAmt = 320;
    nextBtn.addEventListener('click', function () { track.scrollBy({ left: scrollAmt, behavior: 'smooth' }); });
    prevBtn.addEventListener('click', function () { track.scrollBy({ left: -scrollAmt, behavior: 'smooth' }); });
  }

  /* ---------- Before / After sliders ---------- */
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var beforeWrap = slider.querySelector('.ba-before-wrap');
    var handle = slider.querySelector('.ba-handle');
    var afterImg = slider.querySelector('.ba-after');
    var dragging = false;

    function setPos(pct) {
      pct = Math.max(0, Math.min(100, pct));
      beforeWrap.style.width = pct + '%';
      handle.style.left = pct + '%';
      var w = slider.getBoundingClientRect().width;
      var img = beforeWrap.querySelector('img');
      if (img) img.style.width = w + 'px';
    }

    function updateFromClientX(clientX) {
      var rect = slider.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      setPos(pct);
    }

    slider.addEventListener('mousedown', function (e) { dragging = true; updateFromClientX(e.clientX); });
    window.addEventListener('mousemove', function (e) { if (dragging) updateFromClientX(e.clientX); });
    window.addEventListener('mouseup', function () { dragging = false; });

    slider.addEventListener('touchstart', function (e) { dragging = true; updateFromClientX(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('touchmove', function (e) { if (dragging) updateFromClientX(e.touches[0].clientX); }, { passive: true });
    slider.addEventListener('touchend', function () { dragging = false; });

    window.addEventListener('resize', function () { setPos(50); });
    setPos(50);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

});
