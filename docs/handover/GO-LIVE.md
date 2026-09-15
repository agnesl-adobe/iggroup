# Go-Live blocker & Adobe support request

**Status:** The site is fully built and renders correctly in the aemcoder preview
(`preview-aemcoder.adobe.io/content/en`). Public EDS URLs
(`main--iggroup--agnesl-adobe.aem.page/`) are blocked by **one** AEM-side
onboarding gap, diagnosed below. Everything on the repo/code side is verified
correct and needs no change.

Copy the section below into an Adobe support ticket (or send to the Adobe SC /
Cloud Manager admin).

---

## Subject
Edge Delivery site not resolving — `iggroup` never registered as EDS site
(missing `/conf`); `franklin.delivery` 404s while other sites on the same
instance serve.

## Environment
- AEM Cloud Service — Program `p179457`, Environment `e1900808`
  (author `author-p179457-e1900808.adobeaemcloud.com`)
- EDS org / site / branch: `agnesl-adobe` / `iggroup` / `main`
- Repo: `https://github.com/agnesl-adobe/iggroup`
- Working reference site on the **same** instance/org: `al-wknd`

## Summary
The `iggroup` Edge Delivery site never serves — `main--iggroup--agnesl-adobe.aem.page/`
and all preview/publish return 404. The page exists and edits fine in the
Universal Editor, but EDS cannot fetch content because the `franklin.delivery`
content-services servlet does not resolve the site. Root cause: **`iggroup` was
never fully registered as an EDS site** — it has no `/conf/iggroup` cloud
configuration and no site setup-wizard registration, unlike our working sites.
The page/site was produced by a migration/automation flow that created the
content but skipped the AEM-side EDS site registration.

## Evidence (servlet works; iggroup just isn't wired)
- Working site resolves: `…/bin/franklin.delivery/agnesl-adobe/al-wknd/main/index.html` → **200** (renders)
- iggroup does not: `…/bin/franklin.delivery/agnesl-adobe/iggroup/main/index.html` → **404** ("Cannot serve request … on this server")
- `iggroup` site root (`/content/iggroup/language-masters/en/jcr:content`) has
  **`cq:conf = /conf/global`** and `cq:allowedTemplates` still referencing
  **`jlr-demo`** — whereas `al-wknd` has **`cq:conf = /conf/al-wknd`** and its own templates.
- **`/conf/iggroup` does not exist** (`/conf/iggroup.1.json` → "No resource found").
- Empty API keys for `iggroup` in aem.live Admin Tools (setup-wizard never run);
  `al-wknd` was set up via the wizard.
- EDS preview job returns `errorCode: AEM_BACKEND_FETCH_FAILED`,
  `source.location: …/bin/franklin.delivery/agnesl-adobe/iggroup/main/`, `status: 404`.

## Requested action
Run the **AEM Edge Delivery Services site registration/setup for `iggroup`**,
mirroring the working `al-wknd` site:
1. Create `/conf/iggroup` Edge Delivery cloud configuration with content root
   `/content/iggroup/language-masters`.
2. Set `cq:conf` on the `iggroup` site to `/conf/iggroup` (and scope
   `cq:allowedTemplates` to iggroup, not `jlr-demo`).
3. Complete any setup-wizard/registration steps so `franklin.delivery` resolves
   the site (same as al-wknd).

## Done when
`https://author-p179457-e1900808.adobeaemcloud.com/bin/franklin.delivery/agnesl-adobe/iggroup/main/index.html`
returns page markup, after which `https://main--iggroup--agnesl-adobe.aem.page/` serves.

## Already verified — no change needed on our side
- Code bus serves correctly: `main--iggroup--agnesl-adobe.aem.page/{blocks,scripts,styles}/*` → 200.
- `tools.aem.live` Source Config correct (Git URL + Content Source URL match the mountpoint).
- `fstab.yaml` and `paths.json` are byte-for-byte the same structure as the
  working `al-wknd` (only the site name differs).
- Ruled out as causes: a `/content/<site>/configuration` node (not required —
  working sites don't have one) and API keys (al-wknd delivers with an expired key).

---

## Notes for whoever runs it
- The home page is mapped to web path `/` (served as `index`), per `paths.json`
  (`/content/iggroup/language-masters/en : /`). So the correct test URL is
  `…/main/index.html`, **not** `…/main/en.html` (`en` is not a valid web path —
  even the working `al-wknd` 404s on `en.html`).
- A manual CRXDE copy of `/conf/al-wknd` → `/conf/iggroup` plus repointing
  `cq:conf` got the servlet to *engage* (bare `…/iggroup/main` shifted from 404
  to `400 Bad Request`) but content still 404s — a raw node copy does not fully
  replicate the setup-wizard's wiring. Use the official EDS site setup/registration.
