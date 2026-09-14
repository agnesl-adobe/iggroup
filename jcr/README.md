# JCR content packages

Generated JCR XML for importing migrated pages into AEM author (xwalk / Universal Editor).

## Homepage — `/content/iggroup/language-masters/en`

`content/iggroup/language-masters/en/.content.xml` is the JCR representation of the
migrated IG.com homepage (`/en`). It was produced from `content/en.plain.html` via
`@adobe/helix-md2jcr`, using this project's `component-models.json`,
`component-definition.json`, and `component-filters.json`.

Contents: 11 sections, all 8 homepage block variants (`hero-product`,
`carousel-prices`, `cards-markets`, `cards-stats`, `columns-promo`,
`columns-feature`, `columns-links`, `columns-steps`), section styles
(`accent` on the trust-stats section, `grey` on the Join IG section), and page metadata.

### To ingest into AEM

This XML must be installed into the AEM author instance (it is not delivered from
git). Either:

- wrap it in a content package (`jcr_root/content/iggroup/language-masters/en/.content.xml`
  plus `META-INF/vault/filter.xml` scoped to that path) and install via Package Manager, or
- open the page in the Universal Editor against the author instance and author/save it.

Once the page exists in AEM at that path, `admin.hlx.page` `preview` + `publish` will
surface it to `*.aem.page` / `*.aem.live`.

### Note on columns variants

The four `columns-*` blocks serialize to AEM's native `columns` component (correct
2-column structure and content) but do not carry a per-variant class in JCR, because
they were generated as forked blocks rather than option-classes on the base `columns`
block. Structure and content are intact; to hook the variant-specific brand CSS in AEM,
model them as a `classes` option on the base `columns` block.
