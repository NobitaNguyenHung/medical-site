(function () {
  'use strict';

  var OVERLAY_ID = 'svg-zoom-overlay';

  function getOrCreateOverlay() {
    var existing = document.getElementById(OVERLAY_ID);
    if (existing) return existing;

    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Hình phóng to');

    overlay.innerHTML =
      '<div class="szl-backdrop"></div>' +
      '<div class="szl-modal">' +
      '  <button class="szl-close" aria-label="Đóng (Esc)">&times;</button>' +
      '  <div class="szl-content"></div>' +
      '</div>';

    document.body.appendChild(overlay);

    overlay.querySelector('.szl-backdrop').addEventListener('click', closeOverlay);
    overlay.querySelector('.szl-close').addEventListener('click', closeOverlay);

    return overlay;
  }

  function closeOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) return;
    overlay.classList.remove('szl-active');
    document.body.classList.remove('szl-no-scroll');
  }

  function openOverlay(svgEl) {
    var overlay = getOrCreateOverlay();
    var content = overlay.querySelector('.szl-content');
    content.innerHTML = '';

    var cloned = svgEl.cloneNode(true);
    cloned.removeAttribute('width');
    cloned.removeAttribute('height');
    cloned.style.width = '100%';
    cloned.style.height = 'auto';
    cloned.style.display = 'block';
    content.appendChild(cloned);

    overlay.classList.add('szl-active');
    document.body.classList.add('szl-no-scroll');
    overlay.querySelector('.szl-close').focus();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeOverlay();
  }

  function isDecorativeSvg(svg) {
    // skip tiny icons / decorative SVGs
    var w = svg.getAttribute('width');
    var h = svg.getAttribute('height');
    if (w && parseInt(w) < 40) return true;
    if (h && parseInt(h) < 40) return true;
    var rect = svg.getBoundingClientRect();
    // If not yet rendered, check viewBox
    if (rect.width === 0 && rect.height === 0) {
      var vb = svg.getAttribute('viewBox');
      if (!vb) return true;
      var parts = vb.split(/[\s,]+/);
      if (parts.length >= 4 && parseFloat(parts[2]) < 40) return true;
    }
    if (rect.width > 0 && rect.width < 60) return true;
    return false;
  }

  function initSvg(svg) {
    if (svg.dataset.zoomInit) return;
    if (isDecorativeSvg(svg)) return;
    svg.dataset.zoomInit = '1';

    // Find closest meaningful wrapper
    var wrapper = svg.closest('figure, .mermaid, [class*="mermaid"], pre') || svg.parentElement;
    if (!wrapper || wrapper === document.body) wrapper = svg;

    wrapper.classList.add('szl-zoomable');
    wrapper.setAttribute('title', 'Bấm để phóng to');
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');

    function handler(e) {
      e.stopPropagation();
      openOverlay(svg);
    }

    wrapper.addEventListener('click', handler);
    wrapper.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openOverlay(svg);
      }
    });
  }

  function scanAndInit() {
    var contentArea = document.querySelector(
      '.sl-markdown-content, [data-pagefind-body], article.content, main article'
    );
    if (!contentArea) return;
    var svgs = contentArea.querySelectorAll('svg');
    svgs.forEach(initSvg);
  }

  // Global keydown once
  document.removeEventListener('keydown', onKeyDown);
  document.addEventListener('keydown', onKeyDown);

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndInit);
  } else {
    scanAndInit();
  }

  // Astro View Transitions
  document.addEventListener('astro:page-load', scanAndInit);

  // MutationObserver for async Mermaid render
  var mo = new MutationObserver(function (mutations) {
    var hasSvg = mutations.some(function (m) {
      return Array.from(m.addedNodes).some(function (n) {
        return n.nodeType === 1 && (n.tagName === 'svg' || n.querySelector('svg'));
      });
    });
    if (hasSvg) scanAndInit();
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();
