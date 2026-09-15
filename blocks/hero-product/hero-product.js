import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * hero-product — product-intro hero.
 * Centered text stack (heading, supporting copy, CTA buttons in a row, chat
 * link) with a large product image below. Authored order is normalised so the
 * text always renders first and the media second.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];

  // Identify which authored cell carries the product image vs. the text.
  const mediaCell = cells.find((c) => c.querySelector('picture, img'));
  const textCell = cells.find((c) => c !== mediaCell && c.querySelector('h1, h2, h3, h4, h5, h6, p'));

  // Rebuild the block so text precedes media regardless of authored order.
  block.textContent = '';

  if (textCell) {
    textCell.classList.add('hero-product-text');

    // Group consecutive CTA button-containers into a single horizontal row and
    // mark the second (and any later) CTA as the outlined secondary variant.
    const ctaParas = [...textCell.querySelectorAll(':scope > p.button-container')];
    if (ctaParas.length) {
      const ctaRow = document.createElement('div');
      ctaRow.className = 'hero-product-cta';
      ctaParas[0].before(ctaRow);
      ctaParas.forEach((p, i) => {
        if (i > 0) p.classList.add('secondary');
        ctaRow.append(p);
      });
      // Align hero CTA labels with ig.com wording (by CTA target).
      ctaRow.querySelectorAll('a').forEach((a) => {
        const href = a.getAttribute('href') || '';
        if (href.includes('application-form')) a.textContent = 'Create live account';
        else if (href.includes('demo-account')) a.textContent = 'Create demo account';
      });
    }

    block.append(textCell);
  }

  if (mediaCell) {
    mediaCell.classList.add('hero-product-media');
    const img = mediaCell.querySelector('img');
    // Only run through the EDS optimizer for same-origin assets. The authored
    // image may point at an absolute (external DAM) URL — rewriting that to a
    // relative path would 404, so leave external pictures untouched.
    if (img && img.src && img.src.startsWith(window.location.origin)) {
      const optimized = createOptimizedPicture(img.src, img.alt, true, [{ width: '1600' }]);
      mediaCell.querySelector('picture')?.replaceWith(optimized);
    }
    if (img) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    }
    block.append(mediaCell);
  }
}
