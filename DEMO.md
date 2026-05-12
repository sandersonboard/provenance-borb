# Provenance — Demo

**Two scenario hedges, one data backbone, six demos.**

**Group A (Options 1–3) — System-of-Record Premium.** *This is what audit-grade output looks like when Optro's data lineage IS the product. Every hover reveals provenance no other vendor can produce. The peer-defensibility benchmark is the moat made visible.* The Controller and Big-4 partner read the workpaper directly; every value is hover-citable to its source record.

**Group B (Options 4–6) — Wrapper Era.** *Optro is the evidence-of-truth backend; the foundation-model agent is the workpaper-drafting interface.* An MCP server exposes five tools; the agent calls them and gets back audit-grade structured responses with optro_record_id citations and explicit REQUIRES HUMAN REVIEW markers where judgment was applied.

Same Helios Robotics fixture. Same Optro Provenance v1 signature. Different consumer.

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

## The six demo formats

**System-of-Record Premium hedge — the Controller sees the workpaper**

- **Option A** (`option-1.html`) — the click-through. Acceptance path. A Controller walking the workpaper end-to-end. Hover any value to see provenance.
- **Option B** (`option-2.html`) — the Big-4 one-pager. Three frames stacked vertically for screensharing during the walkthrough.
- **Option C** (`option-3.html`) — the long-scroll. Eight scenes of a Tuesday morning at Helios when the workpaper stopped being a document.

**Wrapper-Era hedge — the agent sees the workpaper**

- **Option D** (`option-4.html`) — Wire Provenance into Claude Desktop. Install walkthrough + five MCP tools + npm run smoke.
- **Option E** (`option-5.html`) — Watch Claude draft an assertion. Simulated three-prompt transcript with collapsible tool calls and optro_record_id citations.
- **Option F** (`option-6.html`) — See workpaper-grade output. The rendered artifact with tickmark annotations and REQUIRES HUMAN REVIEW callouts.

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
- Not deployed as live infrastructure. The MCP server behind Options D–F runs locally via `npm install && npm run smoke`. The static demos above are the smoke-and-mirrors surface of both hedges.

---

## Why this prototype matters (the strategic frame)

This is **no-regret move #2 (audit-grade output layer)** from the four-scenario plan — and it pays out across two scenarios, not one.

- In **System-of-Record Premium** (Options A–C), the moat is the live citation chain on every value in the workpaper. The peer-defensibility benchmark — a number Helios can compute only because Optro sits on the actual data of 47 consented pre-IPO peers — is the moat made visible.
- In the **Wrapper Era** (Options D–F), the moat is the structured citation envelope around every tool response the agent receives. The MCP server is the proof that the underlying data shape works for either consumer.

Defensibility holds across all four scenarios; the audit firm cares about the chain whether the agent drafts the workpaper or the Controller does. Build the audit-grade output layer once; ship it under whatever GTM motion wins.

The note Naomi Wilkes writes in her engagement file at the end of Option C is the goal: *"Defensibility evidence is rendered live against the underlying source-of-record systems at the point of review. Reduces substantive testing requirement on selected revenue-cycle controls."* That note becomes the management-letter line either way — whether the workpaper was rendered by Optro's UI or drafted by Claude calling Optro's MCP. That is what we are selling.
