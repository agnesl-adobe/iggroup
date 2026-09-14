/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-stats.
 * Base block: cards. Model: blocks/cards-stats/_cards-stats.json (xwalk container; card model).
 * Source: https://www.ig.com/en (migration-work/block-context/cards-stats/source.html)
 *
 * The trust-stats panel has no per-stat images, so following the cards model (image, text)
 * each stat row is emitted with an empty image cell (kept, per the library note) and a text
 * cell (field:text) holding the figure as a heading plus its label. The panel title
 * ("Join 400,000+ traders who trust us") is section-level default content and excluded.
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('.cmp-usp-display__content__item'));
  const cells = [];

  items.forEach((item) => {
    const values = item.querySelector('.cmp-usp-display__content__values');
    const label = item.querySelector('.cmp-usp-display__content__text');

    // Empty image cell — no icon in this variant, but the cell must still exist.
    const imageCell = [''];

    const textCell = [document.createComment(' field:text ')];
    if (values) {
      const figure = (values.textContent || '').replace(/\s+/g, ' ').trim();
      if (figure) {
        const h = document.createElement('h3');
        h.textContent = figure;
        textCell.push(h);
      }
    }
    if (label) {
      const p = document.createElement('p');
      p.textContent = (label.textContent || '').trim();
      textCell.push(p);
    }

    cells.push([imageCell, textCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
