import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * cards-markets — market-category grid.
 * Each authored row becomes a card with an icon image, a title and a short
 * description. Rendered as a responsive multi-column grid.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div, index) => {
      if (index === 0) div.className = 'cards-markets-icon';
      else div.className = 'cards-markets-body';
    });

    ul.append(li);
  });

  // The icon field may be delivered as a bare link to the (external) asset URL
  // rather than a <picture> — turn image-links in the icon cell into <img>.
  const IMG_URL = /\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)|\/is\/image\/|jcr:content\/renditions/i;
  ul.querySelectorAll('.cards-markets-icon a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (!IMG_URL.test(href)) return;
    const img = document.createElement('img');
    img.src = href;
    img.alt = (a.getAttribute('title') || a.textContent || '').trim();
    img.setAttribute('loading', 'lazy');
    a.replaceWith(img);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
