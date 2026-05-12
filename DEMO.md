# Provenance — Demo

**This is what audit-grade output looks like in a Wrapper Era world where the foundation model is the workpaper drafting interface and Optro is the evidence-of-truth backend.**

The Controller never opens an app. They ask Claude Desktop questions and expect SOX-defensible artifacts back — every claim traceable to an `optro_record_id`, every gap surfaced explicitly, every spot where the agent applied judgment flagged with `REQUIRES HUMAN REVIEW`.

The three prompts below exercise the full chain. Each shows what a pre-IPO Controller would actually type and what the Provenance MCP layer hands back to the model.

---

## Prompt 1 — Drafting the management assertion

> **Controller (Anton Dam):** "Draft the management assertion section for Helios's S-1 based on current testing status. Make sure anything that needs disclosure is called out explicitly with a citation."

**What Claude should do:**

1. Call `list_management_assertion_inputs()` to retrieve scope, must-have universe, testing completeness, open findings (by severity), remediation status, disclosure recommendation.
2. For each significant deficiency in the response (F-001 / FR-007, F-002 / FR-002, F-003 / IT-001), call `validate_audit_trail(control_id)` to surface the specific blocking issues.
3. Optionally call `get_evidence_chain(control_id)` to retrieve the full chain for any SD the user asks Claude to elaborate on.
4. Draft the assertion in prose, **disclosing the 3 significant deficiencies explicitly**, citing each fact back to its `optro_record_id`, and preserving the proposed caveats verbatim.

**What "audit-grade" looks like in the output:**
- Scope language matches the consolidation scope returned by Optro (including the Helios Robotics Singapore exclusion with reference to memo M-2026-04).
- Every numeric claim — *"60% of must-have controls have been tested"* — points to `rec_mgmt_assertion_inputs_helios_2026_05`.
- Each significant deficiency disclosure cites its finding record (`rec_finding_001/002/003`) and the underlying control chain (`rec_chain_fr_007/fr_002/it_001`).
- The compressed-testing-window risk is disclosed with the caveat language Provenance returned, not paraphrased.

---

## Prompt 2 — Drilling into one control

> **Controller:** "Show me the evidence chain for control RC-047 in workpaper form. I want to send a summary to the audit committee chair tomorrow."

**What Claude should do:**

1. Call `get_evidence_chain(control_id="RC-047")` for the full chain.
2. Call `get_tickmark_legend(control_id="RC-047")` for the symbols actually used in this control's workpapers.
3. Call `draft_workpaper_section(control_id="RC-047", section="narrative")` and `section="testing"` to get structured slots.
4. Render the slots as prose, annotating procedures with the right tickmark symbols (§, b, c, ¶, ‡ — Deloitte standard).

**What "audit-grade" looks like in the output:**
- A workpaper header showing company, period (Q1 2026), framework (COSO 2013 / AS 2201), control id, preparer (Controller), reviewer, and a `WP-RC-047-Q12026` reference.
- Test procedures listed with tickmark annotations matching the legend.
- Each artifact (`art_rc047_q1`, `art_rc047_s1`, `art_rc047_a1`, `art_rc047_r1`, `art_rc047_q2`) cited with its `optro_record_id`.
- Reviewer attestation (Anton Dam, 2026-04-16, signed; Deloitte walkthrough by Naomi Wilkes on 2026-04-22) rendered verbatim.
- `defensibility_score: 100` quoted as the assurance level.
- No invented evidence. If the agent wants to say something Optro didn't return, it has to flag `REQUIRES HUMAN REVIEW`.

---

## Prompt 3 — Defensibility sweep before the deadline

> **Controller:** "The management assertion package is due to Deloitte 2026-11-30. Run a defensibility check across our three open significant deficiencies and tell me what specifically I need to fix before I can sign the assertion."

**What Claude should do:**

1. Call `validate_audit_trail(control_id)` for each of FR-007, FR-002, IT-001.
2. For each, surface the `issues` array — every blocking issue maps to a concrete remediation step (capture missing evidence, document override reason, refresh attestation, etc.).
3. Tie each issue to its `target_close_date` from `list_management_assertion_inputs()` and flag any that won't make 2026-11-30.

**What "audit-grade" looks like in the output:**
- A table with one row per control: `defensibility_score`, blocking-issue count, the specific missing-evidence steps, target close, on-track/off-track.
- For FR-002 (deferred revenue): explicitly names the 3 missing months (Sep 2025, Nov 2025, Feb 2026) and the remediation owner (Pranav Iyer, backfill in progress, target close 2026-08-30 — green).
- For IT-001 (production access): names the missed Q4 2025 cycle and the 4 orphaned accounts, with the override (`ovr_it001_q4_2025`) and reason quoted from Optro.
- For FR-007 (JE approval): names entries JE-2026-0188 and JE-2026-0214, target close 2026-07-15.
- A bottom line: *"All three SDs are on-track for close before the assertion package deadline. Disclose all three in the assertion regardless of close status, per the proposed caveat language."*

---

## Why this matters

A foundation-model agent that drafts an S-1 management assertion from chat alone is a liability. A foundation-model agent that calls Provenance and stitches together a defensible output — with citations, with explicit `REQUIRES HUMAN REVIEW` where judgment was applied, with the right tickmark vocabulary — is the workpaper-drafting interface of the Wrapper Era.

The structured response shape is the moat. Anyone can wrap an LLM around a chat box; what stops the assertion from being fabricated is the evidence-of-truth backend returning *exactly the citations the agent is allowed to use*. That's Optro.
