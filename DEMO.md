# Provenance — Demo (System-of-Record Premium frontend)

**This is what audit-grade output looks like when Optro's data lineage IS the product. Every hover reveals provenance no other vendor can produce. The peer-defensibility benchmark is the System-of-Record-Premium moat made visible.**

A Big-4-style workpaper viewer for the System-of-Record Premium scenario in the four-scenario plan. The Controller uses the surface to prepare for the Deloitte walkthrough; the engagement partner uses it during the walkthrough to verify defensibility. The thing every other vendor renders as a flat document, Provenance renders as a live read against the source system — every value hover-citable, every sign-off time-stamped, every override carrying a documented reason.

## The single demo claim

> A flat document is a finding waiting to happen. A live workpaper is a defense already mounted.

That's the bet, in one sentence. Provenance is the proof artifact.

---

## The four routes (Option A · the click-through)

| Route | Page | What it proves |
|---|---|---|
| `/workpapers` | `option-1.html` | 175-control universe, status badges, Big-4 filter — the inventory of provenance Optro owns |
| `/workpapers/RC-047` | `option-1-viewer.html` | Hero workpaper · **every value is hover-citable** |
| `/workpapers/RC-047/chain` | `option-1-chain.html` | SVG graph · 7 procedures × 7 artifacts × 3 sign-offs, all linked |
| `/workpapers/RC-047/peers` | `option-1-peers.html` | Helios vs 47 pre-IPO peers · the SoR Premium moat made visible |
| `/workpapers/RC-047/walkthrough` | `option-1-walkthrough.html` | Large-type, screenshare-ready, print to PDF for the Deloitte handout |

(Smoke-and-mirrors HTML — no Next.js, no router. The PRD's `/workpapers/[id]/chain` becomes `option-1-chain.html`.)

## The three demo formats

- **Option A — the click-through.** Acceptance-path. A Controller walking the workpaper end-to-end. Hover any value to see provenance.
- **Option B — the Big-4 one-pager.** Three frames stacked vertically for screensharing during the walkthrough.
- **Option C — the long-scroll.** Eight scenes of a Tuesday morning at Helios when the workpaper stopped being a document.

---

## The acceptance script (per PRD)

1. Open `option-1.html` — see 175 controls, filter to `chain_broken` and `Big-4 visible`.
2. Click into RC-047 — `option-1-viewer.html` — hover the **$250,000 threshold**, the **218 population count**, the **JE-2026-0214 override**, and the **defensibility 100/100** signature. Each one returns the source system, the capture timestamp, the captor, and the override history.
3. Switch to the chain — `option-1-chain.html` — see the control at the center, 7 procedures around it, 7 artifacts on the outer ring, sign-off edges connecting back to the center.
4. Switch to peers — `option-1-peers.html` — see Helios at P22 on reviewer sign-off depth (the remediation priority that just surfaced inside the walkthrough), P8 on override-reason capture, P30 on evidence depth.
5. Switch to walkthrough mode — `option-1-walkthrough.html` — larger type, hover provenance still live. Click **Print to PDF** for the audit-ready handout (the print stylesheet strips the demo chrome).

That's the acceptance loop. Everything else is supporting cast.

---

## What this prototype is NOT

- Not a real Next.js app. It is the smoke-and-mirrors version of the PRD, optimized for fast positioning conversations with AuditBoard leadership.
- Not authenticated. The BORB gate protects the static demo from casual sharing only.
- Not editable. Phase-0 is read-only.
- Not the Wrapper-Era version. That hedge is the MCP server preserved in this same repo (`server.ts`, `provenance.ts`, `npm run smoke`) and is what's deployed at [sandersonboard.github.io/context-borb](https://sandersonboard.github.io/context-borb/). Provenance hedges the **System-of-Record Premium** scenario specifically.

---

## Why this prototype matters (the strategic frame)

This is the **System-of-Record Premium bet** in the four-scenario plan. If reasoning commoditizes and the moat shifts from "best chat UX" to "only one who can produce the underlying record," Optro wins by being the only vendor whose workpapers ship with verifiable provenance. The peer-defensibility benchmark — a number Helios can compute only because Optro sits on the actual data of 47 consented pre-IPO peers — is the moat made visible.

This is also **no-regret move #2 (audit-grade output layer)** from the same scenario plan. Defensibility holds across all four scenarios; the audit firm cares about the chain whether the agent drafts the workpaper or the Controller does. Build it once, ship it under whatever GTM motion wins.

The note Naomi Wilkes writes in her engagement file at the end of Option C is the goal: *"Defensibility evidence is rendered live against the underlying source-of-record systems at the point of review. Reduces substantive testing requirement on selected revenue-cycle controls."* That is what we are selling.
