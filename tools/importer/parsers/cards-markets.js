/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-markets.
 * Base block: cards. Model: blocks/cards-markets/_cards-markets.json (xwalk container; card model).
 * Source: https://www.ig.com/en (migration-work/block-context/cards-markets/source.html)
 *
 * Library structure: container with one row per card. Each card row has 2 cells:
 *   cell 1 = image/icon (field:image, imageAlt collapses to alt attr)
 *   cell 2 = text richtext (field:text) — title (heading link) + description.
 * The intro heading/paragraph and trailing CTAs are section-level default content, not part
 * of the cards block, so they are intentionally excluded here.
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.news-card'));
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.cmp-news-card__image img, picture img, img');
    const titleP = card.querySelector('.cmp-news-card__text__title');
    const descP = card.querySelector('.cmp-news-card__text__text');

    const imageCell = [document.createComment(' field:image ')];
    if (image) imageCell.push(image);

    const textCell = [document.createComment(' field:text ')];
    // Promote the title to a heading so semantics survive (source uses <p><a>…</a></p>).
    if (titleP) {
      const link = titleP.querySelector('a');
      const h = document.createElement('h3');
      if (link) {
        const a = document.createElement('a');
        a.setAttribute('href', link.getAttribute('href') || '#');
        a.textContent = (link.textContent || '').trim();
        h.appendChild(a);
      } else {
        h.textContent = (titleP.textContent || '').trim();
      }
      textCell.push(h);
    }
    if (descP) textCell.push(descP);

    cells.push([imageCell, textCell]);
  });

  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-markets', cells });
  element.replaceWith(block);
}
