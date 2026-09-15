# Project handover — IG.com homepage migration

Adobe-branded handover documentation for the IG.com homepage migration to
AEM Edge Delivery Services (org `agnesl-adobe`, site `iggroup`, Universal Editor / xwalk).

| Guide | Audience | File |
| --- | --- | --- |
| Authoring | Content authors & managers | `AUTHOR-GUIDE.pdf` (`AUTHOR-GUIDE.html` = summary/download page) |
| Developer | Developers & technical team | `DEVELOPER-GUIDE.pdf` (`DEVELOPER-GUIDE.html`) |
| Admin | Site administrators & operations | `ADMIN-GUIDE.pdf` (`ADMIN-GUIDE.html`) |

## Go-live status

Everything on the repo / Edge Delivery side is complete: content migrated, 8 custom
blocks built and styled, import infrastructure, model fixes, and an installed JCR content
package (page exists at `/content/iggroup/language-masters/en` and renders in the
Universal Editor).

**One blocker remains — an AEM instance-side provisioning task, not a repo change.**
The Edge Delivery content-services servlet is not installed on author environment
`p179457-e1900808`: `…/bin/franklin.delivery/agnesl-adobe/iggroup/main/en.html` returns a
Sling default 404, so nothing serves on `main--iggroup--agnesl-adobe.aem.page/`. See the
**Admin guide** for full proof, the Cloud Manager action item, and the done-when
criterion. Preview + publish is staged and runs immediately once that endpoint returns 200.
