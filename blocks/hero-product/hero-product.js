import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * hero-product — product-intro hero.
 * Centered text stack (heading, supporting copy, CTA buttons, chat/plain link)
 * with a large product image below. Authored order is normalised so the text
 * always renders first and the media second.
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
    block.append(textCell);
  }

  if (mediaCell) {
    mediaCell.classList.add('hero-product-media');
    const img = mediaCell.querySelector('img');
    if (img) {
      const optimized = createOptimizedPicture(img.src, img.alt, true, [{ width: '1200' }]);
      mediaCell.querySelector('picture')?.replaceWith(optimized);
    }
    block.append(mediaCell);
  }
}
