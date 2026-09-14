/**
 * carousel-prices — live-prices ticker.
 * A horizontally-scrolling row of price tiles. Each authored row becomes one
 * tile; the cells within a row map to instrument name, price and change in
 * order. Extra cells are appended as additional detail lines.
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  const track = document.createElement('ul');
  track.className = 'carousel-prices-track';

  rows.forEach((row) => {
    const cells = [...row.children];
    const tile = document.createElement('li');
    tile.className = 'carousel-prices-tile';

    cells.forEach((cell, index) => {
      const part = document.createElement('div');
      if (index === 0) part.className = 'carousel-prices-instrument';
      else if (index === 1) part.className = 'carousel-prices-price';
      else if (index === 2) part.className = 'carousel-prices-change';
      else part.className = 'carousel-prices-detail';
      while (cell.firstChild) part.append(cell.firstChild);
      tile.append(part);
    });

    track.append(tile);
  });

  block.textContent = '';
  block.append(track);
}
