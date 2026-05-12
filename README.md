# provenance-borb

Audit-grade workpaper viewer for the **System-of-Record Premium** scenario in the Optro pre-IPO scenario plan. A Big-4-style workpaper with live, hover-citable provenance on every value — and a peer-defensibility benchmark that only the system of record can produce.

**Live demo:** [sandersonboard.github.io/provenance-borb](https://sandersonboard.github.io/provenance-borb/) (BORB-gated)

**Family:** [Velocity](https://sandersonboard.github.io/velocity-borb/) · [Benchmark](https://sandersonboard.github.io/benchmark-borb/) · [Practice](https://sandersonboard.github.io/practice-borb/) · [Context](https://sandersonboard.github.io/context-borb/) · **Provenance**

## What is in this repo

Two products hedging two different scenarios, sharing one data model:

1. **Static frontend prototype** — the System-of-Record Premium hedge — deployed as GitHub Pages and visible above. Plain HTML/CSS/JS, no build step. Pattern matches the rest of the Optro demo family.
2. **MCP server (`server.ts`, `provenance.ts`)** — the Wrapper-Era hedge — preserved from an earlier session. Run `npm install && npm run smoke` to exercise the five tools.

The GitHub Pages site serves the frontend prototype. The MCP server is not deployed; it ships as source for anyone who wants to wire it into Claude Desktop locally.

## The frontend prototype (what the live demo shows)

A workpaper-centric application built around one hero control (RC-047 — manual journal entry approval, revenue recognition) plus an index of 175 mock controls for Helios Robotics. Three demo formats, every one starting from `index.html`:

- **Option A** (`option-1.html` → `option-1-viewer.html` → `-chain` → `-peers` → `-walkthrough`) — the click-through. The product as a Controller would actually use it before a Big-4 walkthrough.
- **Option B** (`option-2.html`) — the condensed Big-4 pitch. Three frames stacked vertically for screensharing during the walkthrough.
- **Option C** (`option-3.html`) — the long-scroll. Eight scenes of the Tuesday morning that Helios's Q1 walkthrough stopped being a document.

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
