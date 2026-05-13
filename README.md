# provenance-borb

Audit-grade output layer for Optro — hedging **all four** scenarios in the pre-IPO scenario plan from one codebase. A Big-4-style workpaper with live, hover-citable provenance on every value (Group A · System-of-Record Premium); an MCP server exposing the same data to a foundation-model agent so it can draft the workpaper for the Controller (Group B · Wrapper Era); a Practice-arm production console where an FDE pod reviews agent drafts and ships customer-signed deliverables to external auditors without rework (Group C · Agent Commodity Hell); a self-serve customer-facing wizard with workpaper generation, evidence mapping, defensibility scoring, and walkthrough rehearsal (Group D · AI-Native Newcomers).

**Live demo:** [sandersonboard.github.io/provenance-borb](https://sandersonboard.github.io/provenance-borb/) (BORB-gated)

**Family:** [Velocity](https://sandersonboard.github.io/velocity-borb/) · [Benchmark](https://sandersonboard.github.io/benchmark-borb/) · [Practice](https://sandersonboard.github.io/practice-borb/) · [Context](https://sandersonboard.github.io/context-borb/) · **Provenance**

## What is in this repo

Twelve demo formats — three per hedge — plus the runnable MCP server source:

1. **Static frontend prototype** — twelve HTML demos, deployed as GitHub Pages. Plain HTML/CSS/JS, no build step. Pattern matches the rest of the Optro demo family.
2. **MCP server (`server.ts`, `provenance.ts`)** — real, runnable code behind Options D–F. Run `npm install && npm run smoke` to exercise the five tools, or wire into Claude Desktop locally.

## The twelve demos

**Group A — System-of-Record Premium hedge — the Controller sees the workpaper**

- **Option A** (`option-1.html` → `option-1-viewer.html` → `-chain` → `-peers` → `-walkthrough`) — the click-through. The product as a Controller would actually use it before a Big-4 walkthrough.
- **Option B** (`option-2.html`) — the condensed Big-4 pitch. Three frames stacked vertically for screensharing during the walkthrough.
- **Option C** (`option-3.html`) — the long-scroll. Eight scenes of the Tuesday morning that Helios's Q1 walkthrough stopped being a document.

**Group B — Wrapper-Era hedge — the agent sees the workpaper**

- **Option D** (`option-4.html`) — Wire Provenance into Claude Desktop. Install walkthrough for the MCP server + five tools + smoke test.
- **Option E** (`option-5.html`) — Watch Claude draft an assertion. Simulated transcript with collapsible tool calls and citations.
- **Option F** (`option-6.html`) — See workpaper-grade output. The rendered artifact with tickmark annotations and REQUIRES HUMAN REVIEW markers.

**Group C — Agent Commodity Hell hedge — the FDE pod runs the production line**

- **Option G** (`option-7.html` → `option-7-editor.html` → `-scorer` → `-templates` → `-handoff`) — the production console. Engagement queue, split-pane workpaper editor with streaming agent drafts, defensibility scorer, Big-4 template library, customer handoff package with manifest + CSV export.
- **Option H** (`option-8.html`) — Practice principal portfolio. Higher-altitude exec view: three engagements, pod utilization, rework rate (4% vs 18% baseline).
- **Option I** (`option-9.html`) — Jamie's Tuesday. Day-in-the-life long-scroll: four workpapers shipped, one customer handoff, zero rework.

**Group D — AI-Native Newcomers hedge — the customer self-serves**

- **Option J** (`option-10.html` → `option-10-evidence.html` → `-check` → `-rehearsal` → `-package`) — the self-serve acceptance flow. Streaming Deloitte workpaper generator, evidence drag-drop with agent-suggested slot mapping, defensibility self-check (78→92 fix loop), walkthrough rehearsal (Big-4 senior persona, 5 question areas, grading rubric), package export with PDF/manifest/CSV.
- **Option K** (`option-11.html`) — Speed vs Big-4 advisory one-pager. End-to-end multipliers, walkthrough-rehearsal moat callout, shipped-X-days-after-request changelog.
- **Option L** (`option-12.html`) — Riya beats the walkthrough in 25 minutes. Day-in-the-life long-scroll closing with the real walkthrough six weeks later.

The acceptance script is in `DEMO.md`.

## Mock data

Single fictional company: **Helios Robotics, Inc.** Same Helios as the rest of the family. Engineered to tell one coherent audit-grade story:

- 175-control universe · 60% chain_complete · 30% chain_partial · 10% chain_broken (per PRD)
- RC-047 is the hero workpaper: 7 testing procedures, 5 evidence artifacts, 2 reviewer sign-offs, 1 Deloitte walkthrough, defensibility 100/100
- Reviewer roster: Anton Dam (Senior Accountant, Helios), Pranav Iyer (Controller, Helios), Tara Okoye (CAE, Helios), Naomi Wilkes (Engagement Partner, Deloitte)
- Tickmark conventions follow Deloitte standard (13 symbols)
- Peer cohort: 47 anonymized pre-IPO companies that filed S-1 between Jan 2024 and Apr 2025, technology vertical, Series D+
- All timestamps fall within the trailing 6 months of the 2026-05-12 as-of date

## Run locally

This is a static site with no build step. From the repo root:

```bash
# Any static server works. Examples:
python3 -m http.server 8000
# or
npx serve .
```

Open <http://localhost:8000> and enter the BORB code to unlock.

## MCP server (Wrapper-Era hedge — separate scope)

```bash
npm install
npm run smoke   # exercises every handler; should print all ✓
```

Wire into Claude Desktop by adding to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "optro-provenance-preipo": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/provenance-borb/server.ts"]
    }
  }
}
```

The MCP server exposes five tools — `get_evidence_chain`, `get_tickmark_legend`, `draft_workpaper_section`, `list_management_assertion_inputs`, `validate_audit_trail` — and is documented separately in code comments.

## Out of scope (Phase 0)

- Authentication beyond the BORB soft gate
- Real backend or persistence
- Admin console / editing workpapers
- Real Big-4 firm style guides beyond Deloitte conventions
- Other peer comparison categories (defensibility metrics only)

## License

UNLICENSED · private prototype · anonymized (Auditborb / Optro / Helios are not real entities)
