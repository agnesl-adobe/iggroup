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
git). An installable FileVault content package is provided:

**`iggroup-en-homepage-1.0.0.zip`** — install via AEM **Package Manager**
(`/crx/packmgr` → Upload Package → Install), or with the vlt/oakpal CLI. Its filter is
scoped to `/content/iggroup` and the package carries the full page chain
(`iggroup` → `language-masters` → `en`, all `cq:Page`), so it creates the entire
hierarchy from scratch on an author instance where nothing under `/content/iggroup`
exists yet. The two ancestor pages are minimal placeholders; the homepage content lives
on the `en` page.

The unzipped package sources live under `package-build/`:

```
package-build/
├── META-INF/vault/{filter.xml, properties.xml, config.xml}
└── jcr_root/content/iggroup/language-masters/en/.content.xml
```

To rebuild the zip after editing `.content.xml`, re-zip the `package-build` contents so
that `META-INF/` and `jcr_root/` sit at the archive root.

Alternatively, open the page in the **Universal Editor** against the author instance and
author/save it.

Once the page exists in AEM at that path, `admin.hlx.page` `preview` + `publish` will
surface it to `*.aem.page` / `*.aem.live`.

### Note on columns variants

The four `columns-*` blocks serialize to AEM's native `columns` component (correct
2-column structure and content) but do not carry a per-variant class in JCR, because
they were generated as forked blocks rather than option-classes on the base `columns`
block. Structure and content are intact; to hook the variant-specific brand CSS in AEM,
model them as a `classes` option on the base `columns` block.

## Navigation — `/content/iggroup/language-masters/en/nav`

`iggroup-en-nav-1.0.0.zip` (sources under `nav-package/`) installs the **nav
document** the header block loads in the Universal Editor.

**Why:** in the author/UE environment, `blocks/header/header.js` fetches a nav
document at `/content/iggroup/language-masters/en/nav` and only falls back to its
built-in markup when that document is absent. If an **old** nav document exists there
(old logo, red "Log in" in the navbar), the UE renders it instead of the current code —
which is why the published site is correct but the UE header looks stale, and why
re-syncing block code does not change it.

This package provides a **correct** nav document — IG logo (`IG_LOGO.svg`), the five
top-level nav links, and a "Create live account" CTA — as three EDS sections
(brand / sections / tools), matching the header block's expected structure. Installing it
(merge mode, scoped to the `nav` node only) replaces the stale nav so the UE header
matches the published site.

Install via AEM Package Manager, then preview/publish `/en/nav` if you want it on the
delivered site too (the published header currently uses the code fallback, since
`/en/nav` returns 404 there).
