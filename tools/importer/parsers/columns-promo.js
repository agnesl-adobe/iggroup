/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-promo.
 * Base block: columns. Model: blocks/columns-promo/_columns-promo.json (xwalk columns block).
 * Source: https://www.ig.com/en (migration-work/block-context/columns-promo/source.html)
 *
 * Columns blocks use NO field hints (per hinting.md) — each column is one cell of default
 * content in a single row. Here the two promotional panels (.image-background) become the
 * two columns. The section title/intro and trailing CTAs are section-level default content
 * and are excluded from the block.
 */
export default function parse(element, { document }) {
  const panels = Array.from(element.querySelectorAll(':scope .cmp-flex-container .image-background, .image-background'));

  const columns = panels.map((panel) => {
    const cell = [];
    // Pull the inner text blocks (heading paragraph + copy + link) from the panel wrapper.
    const textBlocks = Array.from(panel.querySelectorAll('.simple-text.theme--light, .simple-text.theme--dark'));
    if (textBlocks.length) {
      textBlocks.forEach((tb) => {
        Array.from(tb.children).forEach((child) => cell.push(child));
      });
    } else {
      Array.from(panel.children).forEach((child) => cell.push(child));
    }
    return cell.length ? cell : [''];
  });

  if (columns.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [columns];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
