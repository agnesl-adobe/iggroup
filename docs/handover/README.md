# Project handover — IG.com homepage migration

Adobe-branded handover documentation for the IG.com homepage migration to
AEM Edge Delivery Services (org `agnesl-adobe`, site `iggroup`, Universal Editor / xwalk).

| Guide | Audience | File |
| --- | --- | --- |
| Authoring | Content authors & managers | `AUTHOR-GUIDE.pdf` (`AUTHOR-GUIDE.html` = summary/download page) |
| Developer | Developers & technical team | `DEVELOPER-GUIDE.pdf` (`DEVELOPER-GUIDE.html`) |
| Admin | Site administrators & operations | `ADMIN-GUIDE.pdf` (`ADMIN-GUIDE.html`) |

## Go-live status — ✅ LIVE

The homepage is **published and serving** at
`https://main--iggroup--agnesl-adobe.aem.live/` (preview at `…aem.page/`), mapped to the
site root `/`. The earlier blocker — `iggroup` not registered as an Edge Delivery site on
author `p179457-e1900808` — was resolved by completing the EDS site registration
(`/conf/iggroup` cloud config); preview + publish were then run successfully.

All blocks render with their brand styling, including the columns variants
(promo/feature/links/steps), which are applied at runtime by a signature-detection tag in
the base `columns` block (see the **Developer guide**).

**One operational item remains (not a code fix):** IG's image URLs
(`a.c-dn.net`, `www.ig.com/content/dam/…`) are hotlink-blocked (HTTP 403) from the
`aem.live` origin, so images don't display on the delivered site. Re-host the assets on the
IG production domain or migrate them into this project's DAM. See the **Admin guide**.
