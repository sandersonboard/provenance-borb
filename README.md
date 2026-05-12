# optro-provenance-preipo

MCP server that surfaces audit-grade SOX testing evidence chains, tickmark conventions, workpaper section scaffolds, management-assertion inputs, and a defensibility validator — for consumption by a foundation-model agent.

**The framing:** in the Wrapper Era, the agent (Claude Desktop, etc.) is the workpaper drafting interface. Optro is the evidence-of-truth backend. The Controller never opens the Optro UI — they ask Claude questions and expect audit-ready output with traceable citations.

This is a **prototype**. Trusts the local client, no auth, single fictional customer (Helios Robotics, Inc.).

**Family:** [Velocity](https://sandersonboard.github.io/velocity-borb/) · [Benchmark](https://sandersonboard.github.io/benchmark-borb/) · [Practice](https://sandersonboard.github.io/practice-borb/) · [Context](https://sandersonboard.github.io/context-borb/) · **Provenance**

## Tools

| Tool | Purpose |
|---|---|
| `get_evidence_chain` | Full evidence chain for one control · procedures, artifacts, reviewer, overrides, disposition, defensibility_score, issues |
| `get_tickmark_legend` | Tickmarks used in a control's workpapers (Deloitte standard) — both the subset used and the full legend |
| `draft_workpaper_section` | Structured slots (not prose) for narrative / testing / exception / remediation sections, with explicit `REQUIRES HUMAN REVIEW` markers |
| `list_management_assertion_inputs` | Inputs for the S-1 management assertion: scope, must-have universe, testing completeness, open findings by severity, remediation status, disclosure recommendation |
| `validate_audit_trail` | Defensibility check on one control · returns score 0-100 + issues array (severity, category, remediation_suggestion) |

Every response includes:
- A **provenance signature** (`generated_at`, `source_system`, `schema_version`, `optro_record_id`)
- Explicit **`optro_record_id`** citations the agent can surface back to the user
- A **`defensibility_score`** (0-100) wherever a chain is being assessed

## Install + run

```bash
cd provenance-borb
npm install
npm run smoke    # exercises every handler; should print all ✓
```

## Wire into Claude Desktop

Add this to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

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

Replace `/absolute/path/to/provenance-borb` with the full path. Restart Claude Desktop. The server registers as `optro-provenance-preipo` and exposes the 5 tools.

Both `optro-context-preipo` (sibling project) and `optro-provenance-preipo` can run side-by-side. Context answers "where are we"; Provenance answers "prove it."

## Try it

Three prompts that exercise the chain end-to-end (see `DEMO.md` for the framing):

1. *"Draft the management assertion section for our S-1 based on current testing status."*
2. *"Show me the evidence chain for control RC-047."*
3. *"Run a defensibility check across our three open significant deficiencies and tell me what to fix before the management assertion package is due to Deloitte."*

## Mock data

Single fictional company: **Helios Robotics, Inc.** Same Helios as the rest of the family. Engineered to tell one coherent audit-grade story:

- 175-control universe · 60% with complete chains · 40% with one or more gaps
- 12 hand-crafted high-fidelity chains (RC-047, the 3 SDs, plus other controls referenced by findings)
- Tickmark conventions follow Deloitte standard (13 symbols)
- 17 named reviewers · 4 Deloitte + 13 Helios
- Override reasons reflect realistic pre-IPO judgment calls
- 3 significant deficiencies (FR-007, FR-002, IT-001) surface via `validate_audit_trail`
- All timestamps fall within the trailing 6 months from the 2026-05-12 as-of date

## Out of scope (Phase 0)

- Web UI — the foundation-model client is the UI
- Auth — trusts local client
- HTTP transport — stdio only
- Real Optro integration — fixture only
- Multi-tenancy
- Tests beyond `npm run smoke`

## License

UNLICENSED · private prototype · anonymized (Auditborb / Optro / Helios are not real entities)
