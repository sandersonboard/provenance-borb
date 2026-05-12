// ===============================================================
// Provenance fixtures — Helios Robotics, Inc.
// ===============================================================
// Audit-grade evidence chains, tickmark conventions, and workpaper
// section scaffolds. Engineered so an agent can produce defensible
// SOX 404 output: every claim traceable to an optro_record_id,
// gaps surfaced explicitly, and "REQUIRES HUMAN REVIEW" markers
// wherever judgment was applied.
// ===============================================================

import { COMPANY, CONTROLS, CONTROL_UNIVERSE_TOTALS, type Control } from "./data.js";

export const SCHEMA_VERSION = "0.1.0";
export const SOURCE_SYSTEM = "optro-provenance-preipo";

// ===============================================================
// PROVENANCE SIGNATURE
// ===============================================================

export type ProvenanceSignature = {
  generated_at: string;
  source_system: string;
  schema_version: string;
  optro_record_id: string;
};

export function provenanceSignature(record_id: string): ProvenanceSignature {
  return {
    generated_at: new Date().toISOString(),
    source_system: SOURCE_SYSTEM,
    schema_version: SCHEMA_VERSION,
    optro_record_id: record_id,
  };
}

// ===============================================================
// TICKMARK LEGEND — Deloitte convention
// ===============================================================
// Standard Deloitte tickmarks used across Helios workpapers. The
// agent calling draft_workpaper_section should reference these
// symbols when annotating evidence; Big 4 reviewers expect them.

export type Tickmark = {
  symbol: string;
  definition: string;
  procedure: string;
  optro_record_id: string;
};

export const TICKMARK_LEGEND: Tickmark[] = [
  { symbol: "a", definition: "Agreed without exception",                    procedure: "Compared the figure to source documentation and noted no differences",       optro_record_id: "rec_tickmark_a" },
  { symbol: "b", definition: "Traced to general ledger",                    procedure: "Traced the balance from supporting schedule to the general ledger account",  optro_record_id: "rec_tickmark_b" },
  { symbol: "c", definition: "Examined for proper authorization",           procedure: "Reviewed evidence of approval by an authorized individual per the matrix",  optro_record_id: "rec_tickmark_c" },
  { symbol: "©", definition: "Confirmed with third party",                  procedure: "Independently confirmed balance or term with external counterparty",        optro_record_id: "rec_tickmark_confirm" },
  { symbol: "⊕", definition: "Footed / re-footed",                          procedure: "Recalculated the total of a column or schedule",                            optro_record_id: "rec_tickmark_foot" },
  { symbol: "†", definition: "Traced to source document",                   procedure: "Examined the underlying source document supporting the entry",             optro_record_id: "rec_tickmark_source" },
  { symbol: "‡", definition: "Tied to subledger",                           procedure: "Reconciled the balance to the subsidiary ledger detail",                    optro_record_id: "rec_tickmark_sub" },
  { symbol: "§", definition: "Sample selected per testing plan",            procedure: "Selected the item via the documented sampling methodology",                 optro_record_id: "rec_tickmark_sample" },
  { symbol: "¶", definition: "Recalculated",                                procedure: "Independently re-performed the calculation",                                optro_record_id: "rec_tickmark_recalc" },
  { symbol: "▲", definition: "Examined for proper period cutoff",           procedure: "Verified that the transaction was recorded in the correct accounting period", optro_record_id: "rec_tickmark_cutoff" },
  { symbol: "◊", definition: "Examined supporting documentation",           procedure: "Inspected supporting evidence retained in the workpaper file",              optro_record_id: "rec_tickmark_doc" },
  { symbol: "✓", definition: "Reviewed by preparer; no exceptions",         procedure: "Preparer-level review with no follow-up required",                          optro_record_id: "rec_tickmark_prep" },
  { symbol: "X", definition: "Exception noted — see finding reference",     procedure: "Exception identified; cross-reference the finding number",                  optro_record_id: "rec_tickmark_exception" },
];

// ===============================================================
// REVIEWERS — internal + external (Deloitte)
// ===============================================================

export type ReviewerProfile = {
  name: string;
  role: string;
  affiliation: "Helios Robotics" | "Deloitte & Touche LLP";
  optro_record_id: string;
};

export const REVIEWERS: Record<string, ReviewerProfile> = {
  anton_dam:         { name: "Anton Dam",          role: "Controller",                       affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_anton" },
  maya_chen:         { name: "Maya Chen",          role: "Senior Accountant",                affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_maya" },
  pranav_iyer:       { name: "Pranav Iyer",        role: "Senior Accountant",                affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_pranav" },
  kiera_patel:       { name: "Kiera Patel",        role: "Cost Accountant",                  affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_kiera" },
  yusuf_olamide:     { name: "Yusuf Olamide",      role: "IT Director",                      affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_yusuf" },
  diego_marquez:     { name: "Diego Marquez",      role: "Engineering Manager",              affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_diego" },
  david_cho:         { name: "David Cho",          role: "Chief Financial Officer",          affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_david" },
  rachel_sandberg:   { name: "Rachel Sandberg",    role: "General Counsel",                  affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_rachel" },
  helen_whitford:    { name: "Helen Whitford",     role: "Operations Lead",                  affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_helen" },
  marcus_ondrej:     { name: "Marcus Ondrej",      role: "AP Specialist",                    affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_marcus" },
  inez_faraday:      { name: "Inez Faraday",       role: "AR Lead",                          affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_inez" },
  beatrix_hannover:  { name: "Beatrix Hannover",   role: "Security Lead",                    affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_beatrix" },
  tom_akiyama:       { name: "Tom Akiyama",        role: "Internal Audit Manager",           affiliation: "Helios Robotics",        optro_record_id: "rec_reviewer_tom" },
  priya_ramanathan:  { name: "Priya Ramanathan",   role: "Senior Manager — External Audit",  affiliation: "Deloitte & Touche LLP",  optro_record_id: "rec_reviewer_priya" },
  charles_borman:    { name: "Charles Borman",     role: "Manager — External Audit",         affiliation: "Deloitte & Touche LLP",  optro_record_id: "rec_reviewer_charles" },
  naomi_wilkes:      { name: "Naomi Wilkes",       role: "Senior — External Audit",          affiliation: "Deloitte & Touche LLP",  optro_record_id: "rec_reviewer_naomi" },
  henrik_esterhazy:  { name: "Henrik Esterhazy",   role: "Partner — External Audit",         affiliation: "Deloitte & Touche LLP",  optro_record_id: "rec_reviewer_henrik" },
};

// ===============================================================
// TYPES — evidence chain
// ===============================================================

export type EvidenceArtifactType = "screenshot" | "query_output" | "attestation" | "sample" | "reconciliation" | "log_export";

export type EvidenceArtifact = {
  artifact_id: string;
  optro_record_id: string;
  type: EvidenceArtifactType;
  description: string;
  captured_by: string;            // reviewer key
  captured_at: string;            // ISO date
  storage_ref: string;            // mock storage handle
  tickmarks: string[];            // symbols applied
};

export type TestProcedure = {
  step: number;
  optro_record_id: string;
  description: string;
  expected_evidence: EvidenceArtifactType;
  artifact_ids: string[];         // populated artifacts; empty array = gap
};

export type ReviewerAttestation = {
  reviewer_key: string;
  attestation_timestamp: string;
  comments: string;
  optro_record_id: string;
};

export type Override = {
  override_id: string;
  optro_record_id: string;
  applied_at: string;
  applied_by: string;             // reviewer key
  reason: string;                 // empty string = missing reason (gap)
  affected_steps: number[];
};

export type EvidenceChain = {
  control_id: string;
  optro_record_id: string;
  control_name: string;
  category: string;
  owner_role: string;
  frequency: string;
  pre_ipo_priority: string;
  big4_visibility: boolean;
  cycle_period: string;
  test_procedures: TestProcedure[];
  artifacts: EvidenceArtifact[];
  reviewer: ReviewerAttestation | null;
  overrides: Override[];
  disposition: "passed" | "passed_with_exception" | "exception" | "incomplete" | "scoped_out";
  final_disposition_note: string;
  finding_refs: string[];         // F-XXX references when applicable
};

// ===============================================================
// HAND-CRAFTED EVIDENCE CHAINS
// ===============================================================
// These are the controls a Controller is most likely to ask about
// in a demo. Built with realistic depth so the agent has something
// to summarize. The synthesized chains (below) cover the rest of
// the 175-control universe at lower fidelity.

const HAND_CRAFTED_CHAINS: EvidenceChain[] = [
  // -----------------------------------------------------------------
  // RC-047 — Revenue contract modification approval (Big 4 high-touch)
  // Demo example: "show me the evidence chain for control RC-047"
  // -----------------------------------------------------------------
  {
    control_id: "RC-047",
    optro_record_id: "rec_chain_rc_047",
    control_name: "Revenue contract modification approval (>$100K ARR delta)",
    category: "financial_reporting",
    owner_role: "Controller",
    frequency: "Per contract modification",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026 (Jan–Mar)",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_rc047_1", description: "Identify population of contract modifications with ARR delta > $100K from CRM export",                  expected_evidence: "query_output",    artifact_ids: ["art_rc047_q1"] },
      { step: 2, optro_record_id: "rec_step_rc047_2", description: "Select sample of 25 modifications (95% confidence, materiality threshold $50K)",                       expected_evidence: "sample",          artifact_ids: ["art_rc047_s1"] },
      { step: 3, optro_record_id: "rec_step_rc047_3", description: "For each sample item, examine Controller approval evidence (DocuSign + memo)",                         expected_evidence: "attestation",     artifact_ids: ["art_rc047_a1"] },
      { step: 4, optro_record_id: "rec_step_rc047_4", description: "Reconcile approved ARR delta to revenue accounting memo (ASC 606 modification analysis)",              expected_evidence: "reconciliation",  artifact_ids: ["art_rc047_r1"] },
      { step: 5, optro_record_id: "rec_step_rc047_5", description: "Trace 5 highest-impact modifications to general ledger journal entries",                               expected_evidence: "query_output",    artifact_ids: ["art_rc047_q2"] },
    ],
    artifacts: [
      { artifact_id: "art_rc047_q1", optro_record_id: "rec_art_rc047_q1", type: "query_output",   description: "Salesforce export of all contract modifications Q1 2026 with ARR delta > $100K (47 records)", captured_by: "maya_chen",      captured_at: "2026-04-08T14:22:00Z", storage_ref: "s3://optro-evidence/helios/rc-047/q1-2026/sf_export.csv",    tickmarks: ["§", "b"] },
      { artifact_id: "art_rc047_s1", optro_record_id: "rec_art_rc047_s1", type: "sample",         description: "Selected 25 of 47 modifications using stratified random sampling per testing plan",            captured_by: "maya_chen",      captured_at: "2026-04-08T15:10:00Z", storage_ref: "s3://optro-evidence/helios/rc-047/q1-2026/sample_selection.xlsx", tickmarks: ["§"] },
      { artifact_id: "art_rc047_a1", optro_record_id: "rec_art_rc047_a1", type: "attestation",    description: "DocuSign approval records + Controller memos for 25 sampled modifications",                     captured_by: "anton_dam",      captured_at: "2026-04-12T09:45:00Z", storage_ref: "s3://optro-evidence/helios/rc-047/q1-2026/approvals.zip",     tickmarks: ["c", "◊"] },
      { artifact_id: "art_rc047_r1", optro_record_id: "rec_art_rc047_r1", type: "reconciliation", description: "ASC 606 modification analysis worksheets reconciled to approved ARR deltas",                     captured_by: "maya_chen",      captured_at: "2026-04-14T16:30:00Z", storage_ref: "s3://optro-evidence/helios/rc-047/q1-2026/asc606_recon.xlsx", tickmarks: ["¶", "‡"] },
      { artifact_id: "art_rc047_q2", optro_record_id: "rec_art_rc047_q2", type: "query_output",   description: "NetSuite GL trace of top-5 modifications to journal entries",                                    captured_by: "maya_chen",      captured_at: "2026-04-15T10:15:00Z", storage_ref: "s3://optro-evidence/helios/rc-047/q1-2026/gl_trace.csv",       tickmarks: ["b", "†"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-16T17:20:00Z",
      comments: "All 25 sampled modifications had documented Controller approval and reconciled ASC 606 analysis. No exceptions. Deloitte (Naomi Wilkes) walked through this control on 2026-04-22; no follow-up requested.",
      optro_record_id: "rec_attest_rc047",
    },
    overrides: [],
    disposition: "passed",
    final_disposition_note: "Control operated effectively for Q1 2026 cycle. Big 4 walkthrough complete; no findings.",
    finding_refs: [],
  },

  // -----------------------------------------------------------------
  // FR-007 — JE approval >$25K (SIGNIFICANT DEFICIENCY)
  // -----------------------------------------------------------------
  {
    control_id: "FR-007",
    optro_record_id: "rec_chain_fr_007",
    control_name: "Journal entry approval — over $25K",
    category: "financial_reporting",
    owner_role: "Controller",
    frequency: "Per entry",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026 (Jan–Mar)",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_fr007_1", description: "Extract all manual journal entries >$25K from NetSuite for the period",       expected_evidence: "query_output", artifact_ids: ["art_fr007_q1"] },
      { step: 2, optro_record_id: "rec_step_fr007_2", description: "For each entry, verify documented approval by Controller per authority matrix", expected_evidence: "attestation",  artifact_ids: ["art_fr007_a1"] },
      { step: 3, optro_record_id: "rec_step_fr007_3", description: "Confirm approval timestamp precedes posting date",                              expected_evidence: "log_export",   artifact_ids: ["art_fr007_l1"] },
      { step: 4, optro_record_id: "rec_step_fr007_4", description: "Investigate any entries lacking approval evidence",                             expected_evidence: "attestation",  artifact_ids: [] /* GAP: 2 unapproved entries */ },
    ],
    artifacts: [
      { artifact_id: "art_fr007_q1", optro_record_id: "rec_art_fr007_q1", type: "query_output", description: "NetSuite JE query, manual entries >$25K, Jan–Mar 2026 (134 entries)",                   captured_by: "maya_chen", captured_at: "2026-04-05T11:00:00Z", storage_ref: "s3://optro-evidence/helios/fr-007/q1-2026/je_query.csv",     tickmarks: ["§", "‡"] },
      { artifact_id: "art_fr007_a1", optro_record_id: "rec_art_fr007_a1", type: "attestation",  description: "DocuSign approval records for 132 of 134 entries. 2 entries ($31,200 and $42,800) lack approval evidence — flagged as exception", captured_by: "maya_chen", captured_at: "2026-04-06T15:30:00Z", storage_ref: "s3://optro-evidence/helios/fr-007/q1-2026/approvals.zip",     tickmarks: ["c", "X"] },
      { artifact_id: "art_fr007_l1", optro_record_id: "rec_art_fr007_l1", type: "log_export",   description: "NetSuite audit log for posted vs approved timestamps on 132 approved entries — all preceding",  captured_by: "yusuf_olamide", captured_at: "2026-04-07T09:15:00Z", storage_ref: "s3://optro-evidence/helios/fr-007/q1-2026/ns_audit_log.csv",  tickmarks: ["▲"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-11T16:00:00Z",
      comments: "Exception identified: 2 entries between $25K-$50K range posted without documented Controller approval (entries JE-2026-0188 and JE-2026-0214, Mar 2026). Tracked as finding F-001 / significant deficiency. Deloitte (Priya Ramanathan) concurred 2026-04-22. Remediation: NetSuite approval workflow being tightened to enforce mandatory pre-post approval at $25K threshold; target close 2026-07-15.",
      optro_record_id: "rec_attest_fr007",
    },
    overrides: [],
    disposition: "exception",
    final_disposition_note: "Control failed during Q1 2026 — JE approval threshold not consistently enforced for entries in the $25K-$50K range. Significant deficiency. Remediation in progress; will re-test post-fix in Q3 2026 cycle.",
    finding_refs: ["F-001"],
  },

  // -----------------------------------------------------------------
  // FR-002 — Deferred revenue rollforward (SIGNIFICANT DEFICIENCY)
  // -----------------------------------------------------------------
  {
    control_id: "FR-002",
    optro_record_id: "rec_chain_fr_002",
    control_name: "Deferred revenue rollforward",
    category: "financial_reporting",
    owner_role: "Senior Accountant",
    frequency: "Monthly",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Trailing 12 months (May 2025–Apr 2026)",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_fr002_1", description: "Obtain monthly deferred revenue rollforward schedules for the trailing 12 months",     expected_evidence: "reconciliation", artifact_ids: ["art_fr002_r1"] },
      { step: 2, optro_record_id: "rec_step_fr002_2", description: "Reconcile opening + additions − recognized − adjustments = closing for each month",     expected_evidence: "reconciliation", artifact_ids: ["art_fr002_r2"] },
      { step: 3, optro_record_id: "rec_step_fr002_3", description: "Tie closing deferred revenue balance to general ledger account 2200 each month",        expected_evidence: "query_output",   artifact_ids: ["art_fr002_q1"] },
      { step: 4, optro_record_id: "rec_step_fr002_4", description: "Examine retention of supporting workpaper for each monthly close",                      expected_evidence: "attestation",    artifact_ids: [] /* GAP: 3 of 12 months missing */ },
    ],
    artifacts: [
      { artifact_id: "art_fr002_r1", optro_record_id: "rec_art_fr002_r1", type: "reconciliation", description: "Deferred revenue rollforward schedules — 9 of 12 months retained. Missing: Sep 2025, Nov 2025, Feb 2026.", captured_by: "pranav_iyer", captured_at: "2026-04-18T13:45:00Z", storage_ref: "s3://optro-evidence/helios/fr-002/tt12m/rollforward.xlsx", tickmarks: ["¶", "X"] },
      { artifact_id: "art_fr002_r2", optro_record_id: "rec_art_fr002_r2", type: "reconciliation", description: "Per-month rollforward arithmetic verified for the 9 retained months. No arithmetic exceptions.",         captured_by: "pranav_iyer", captured_at: "2026-04-19T10:30:00Z", storage_ref: "s3://optro-evidence/helios/fr-002/tt12m/recompute.xlsx",  tickmarks: ["¶", "⊕"] },
      { artifact_id: "art_fr002_q1", optro_record_id: "rec_art_fr002_q1", type: "query_output",   description: "GL 2200 closing balance trace for 9 retained months — all tied.",                                          captured_by: "pranav_iyer", captured_at: "2026-04-19T11:50:00Z", storage_ref: "s3://optro-evidence/helios/fr-002/tt12m/gl_tie.csv",      tickmarks: ["b", "‡"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-22T14:10:00Z",
      comments: "Significant gap: monthly workpapers for Sep 2025, Nov 2025, and Feb 2026 not retained (prior Senior Accountant transition). Math on the 9 retained months reconciles cleanly to GL. Backfill underway — Pranav is reconstructing the 3 missing months from CRM contract data + invoice ledger. Deloitte (Priya Ramanathan) flagged this on 2026-02-10; tracked as F-002 / significant deficiency.",
      optro_record_id: "rec_attest_fr002",
    },
    overrides: [],
    disposition: "exception",
    final_disposition_note: "Significant deficiency — evidence retention failure. Control design is sound; operating effectiveness not demonstrable for 3 of 12 months. Remediation: backfill in progress, target close 2026-08-30; new evidence-retention SOP rolled out 2026-04-25.",
    finding_refs: ["F-002"],
  },

  // -----------------------------------------------------------------
  // IT-001 — Production access review (SIGNIFICANT DEFICIENCY)
  // -----------------------------------------------------------------
  {
    control_id: "IT-001",
    optro_record_id: "rec_chain_it_001",
    control_name: "Production access review",
    category: "itgc",
    owner_role: "IT Director",
    frequency: "Quarterly",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q4 2025 + Q1 2026",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_it001_1", description: "Generate quarterly active-user report from production identity provider (Okta)",   expected_evidence: "query_output", artifact_ids: ["art_it001_q1"] },
      { step: 2, optro_record_id: "rec_step_it001_2", description: "Distribute access list to system owners for review and certification",            expected_evidence: "attestation",  artifact_ids: ["art_it001_a1"] },
      { step: 3, optro_record_id: "rec_step_it001_3", description: "Track and revoke accounts flagged for removal; document closure",                  expected_evidence: "log_export",   artifact_ids: ["art_it001_l1"] },
      { step: 4, optro_record_id: "rec_step_it001_4", description: "Perform the review on a quarterly cadence with no missed cycles",                  expected_evidence: "attestation",  artifact_ids: [] /* GAP: Q4 2025 cycle missed entirely */ },
    ],
    artifacts: [
      { artifact_id: "art_it001_q1", optro_record_id: "rec_art_it001_q1", type: "query_output", description: "Okta active-user export, Q1 2026 production scope (218 accounts). Q4 2025 export not generated — cycle missed.", captured_by: "yusuf_olamide", captured_at: "2026-02-04T10:00:00Z", storage_ref: "s3://optro-evidence/helios/it-001/q1-2026/okta_export.csv", tickmarks: ["§", "X"] },
      { artifact_id: "art_it001_a1", optro_record_id: "rec_art_it001_a1", type: "attestation",  description: "System owner certifications for Q1 2026 cycle — 218 accounts reviewed, 12 flagged for removal, 4 identified as orphaned (former employees, departed prior to Q4 2025).", captured_by: "yusuf_olamide", captured_at: "2026-02-19T15:30:00Z", storage_ref: "s3://optro-evidence/helios/it-001/q1-2026/owner_certs.zip", tickmarks: ["c", "X"] },
      { artifact_id: "art_it001_l1", optro_record_id: "rec_art_it001_l1", type: "log_export",   description: "Okta removal log: 12 accounts deprovisioned Feb 2026, including 1 orphaned account that retained active production database credentials for 4 months post-departure.", captured_by: "yusuf_olamide", captured_at: "2026-02-25T09:45:00Z", storage_ref: "s3://optro-evidence/helios/it-001/q1-2026/removal_log.csv", tickmarks: ["†", "X"] },
    ],
    reviewer: {
      reviewer_key: "yusuf_olamide",
      attestation_timestamp: "2026-02-26T17:00:00Z",
      comments: "Q4 2025 cycle missed entirely — no access review performed Oct–Dec 2025. Identified during Q1 2026 cycle: 4 orphaned accounts, 1 with active production DB credentials (revoked 2026-02-22, no evidence of misuse per Okta + DB audit logs). Tracked as F-003 / significant deficiency. Internal Audit (Tom Akiyama) reviewed root cause: scheduling oversight during IT Director transition. Quarterly cadence reinstated; calendar reminders + SOC 2 cross-check process added.",
      optro_record_id: "rec_attest_it001",
    },
    overrides: [
      {
        override_id: "ovr_it001_q4_2025",
        optro_record_id: "rec_override_it001_q4",
        applied_at: "2026-02-26T17:05:00Z",
        applied_by: "yusuf_olamide",
        reason: "Q4 2025 review cycle was not performed. No retrospective evidence can be reconstructed — control did not operate. Disclosed as significant deficiency F-003.",
        affected_steps: [4],
      },
    ],
    disposition: "exception",
    final_disposition_note: "Significant deficiency — missed Q4 2025 cycle with 4 orphaned production accounts. Remediation: quarterly cadence reinstated, SOC 2 cross-check added, target close 2026-06-30.",
    finding_refs: ["F-003"],
  },

  // -----------------------------------------------------------------
  // FR-001 — Revenue recognition performance obligation review
  // -----------------------------------------------------------------
  {
    control_id: "FR-001",
    optro_record_id: "rec_chain_fr_001",
    control_name: "Revenue recognition — performance obligation review",
    category: "financial_reporting",
    owner_role: "Controller",
    frequency: "Monthly",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026 (Jan–Mar)",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_fr001_1", description: "Identify new + modified contracts requiring ASC 606 performance obligation analysis", expected_evidence: "query_output", artifact_ids: ["art_fr001_q1"] },
      { step: 2, optro_record_id: "rec_step_fr001_2", description: "For each in-scope contract, examine allocation memo prepared by Senior Accountant",  expected_evidence: "attestation",  artifact_ids: ["art_fr001_a1"] },
      { step: 3, optro_record_id: "rec_step_fr001_3", description: "Verify Controller sign-off on each allocation memo",                                   expected_evidence: "attestation",  artifact_ids: ["art_fr001_a2"] /* partially populated */ },
    ],
    artifacts: [
      { artifact_id: "art_fr001_q1", optro_record_id: "rec_art_fr001_q1", type: "query_output", description: "Salesforce + CPQ extract: 18 new/modified contracts Q1 2026 requiring ASC 606 analysis.",                  captured_by: "maya_chen", captured_at: "2026-04-03T14:00:00Z", storage_ref: "s3://optro-evidence/helios/fr-001/q1-2026/contracts.csv",   tickmarks: ["§", "b"] },
      { artifact_id: "art_fr001_a1", optro_record_id: "rec_art_fr001_a1", type: "attestation",  description: "Allocation memos for all 18 contracts (prepared by Maya Chen). All memos complete.",                       captured_by: "maya_chen", captured_at: "2026-04-09T11:20:00Z", storage_ref: "s3://optro-evidence/helios/fr-001/q1-2026/memos.zip",       tickmarks: ["◊"] },
      { artifact_id: "art_fr001_a2", optro_record_id: "rec_art_fr001_a2", type: "attestation",  description: "Controller sign-offs: 16 of 18 memos signed. 2 memos (contracts C-2026-0042 and C-2026-0061) lack signature.", captured_by: "anton_dam", captured_at: "2026-04-11T16:45:00Z", storage_ref: "s3://optro-evidence/helios/fr-001/q1-2026/signoffs.zip",     tickmarks: ["c", "X"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-12T09:00:00Z",
      comments: "Exception: 2 of 18 allocation memos lack documented Controller sign-off (Q1 2026). No misstatement identified; preparer-level review was complete and conclusions appear sound. Pattern flagged: signature step skipped during compressed close. Tracked as F-006. Process control reinforced 2026-04-15.",
      optro_record_id: "rec_attest_fr001",
    },
    overrides: [],
    disposition: "passed_with_exception",
    final_disposition_note: "Deficiency only — no misstatement. Sign-off discipline reinforced. Re-test in Q2 2026 cycle.",
    finding_refs: ["F-006"],
  },

  // -----------------------------------------------------------------
  // FR-014 — Accruals completeness review
  // -----------------------------------------------------------------
  {
    control_id: "FR-014",
    optro_record_id: "rec_chain_fr_014",
    control_name: "Accruals — completeness review",
    category: "financial_reporting",
    owner_role: "Controller",
    frequency: "Monthly",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_fr014_1", description: "Obtain monthly accrual schedules for review",                                     expected_evidence: "reconciliation", artifact_ids: ["art_fr014_r1"] },
      { step: 2, optro_record_id: "rec_step_fr014_2", description: "Reviewer initials each accrual line item indicating substantive review performed", expected_evidence: "attestation",    artifact_ids: ["art_fr014_a1"] },
    ],
    artifacts: [
      { artifact_id: "art_fr014_r1", optro_record_id: "rec_art_fr014_r1", type: "reconciliation", description: "Q1 2026 monthly accrual schedules (Jan, Feb, Mar) — all retained.",                                                                   captured_by: "anton_dam", captured_at: "2026-04-04T10:15:00Z", storage_ref: "s3://optro-evidence/helios/fr-014/q1-2026/accrual_schedules.xlsx", tickmarks: ["¶"] },
      { artifact_id: "art_fr014_a1", optro_record_id: "rec_art_fr014_a1", type: "attestation",    description: "Jan 2026 schedule missing reviewer initials on 4 of 12 accrual lines. Feb and Mar schedules fully initialed.",                          captured_by: "anton_dam", captured_at: "2026-04-04T10:30:00Z", storage_ref: "s3://optro-evidence/helios/fr-014/q1-2026/initialed_schedules.pdf", tickmarks: ["c", "X"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-14T15:20:00Z",
      comments: "Jan 2026 review documentation incomplete (missing initials on 4 lines). Deloitte (Charles Borman) identified during 2026-02 walkthrough. Tracked as F-010 / deficiency. Re-performed review documented 2026-04-16; documentation SOP updated.",
      optro_record_id: "rec_attest_fr014",
    },
    overrides: [],
    disposition: "passed_with_exception",
    final_disposition_note: "Documentation deficiency, no misstatement. Remediated within cycle.",
    finding_refs: ["F-010"],
  },

  // -----------------------------------------------------------------
  // FR-008 — Bank reconciliations (clean)
  // -----------------------------------------------------------------
  {
    control_id: "FR-008",
    optro_record_id: "rec_chain_fr_008",
    control_name: "Bank reconciliations",
    category: "financial_reporting",
    owner_role: "Senior Accountant",
    frequency: "Monthly",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_fr008_1", description: "Obtain monthly bank reconciliations for each operating account (4 accounts × 3 months = 12 recs)", expected_evidence: "reconciliation", artifact_ids: ["art_fr008_r1"] },
      { step: 2, optro_record_id: "rec_step_fr008_2", description: "Verify Senior Accountant preparer initials + Controller reviewer initials",                       expected_evidence: "attestation",    artifact_ids: ["art_fr008_a1"] },
      { step: 3, optro_record_id: "rec_step_fr008_3", description: "Confirm completion within 10 business days of period close",                                       expected_evidence: "log_export",     artifact_ids: ["art_fr008_l1"] },
    ],
    artifacts: [
      { artifact_id: "art_fr008_r1", optro_record_id: "rec_art_fr008_r1", type: "reconciliation", description: "12 monthly bank recs (4 accounts × 3 months) Q1 2026. All recs prepared.",                                            captured_by: "pranav_iyer", captured_at: "2026-04-05T09:00:00Z", storage_ref: "s3://optro-evidence/helios/fr-008/q1-2026/bank_recs.zip", tickmarks: ["¶", "©"] },
      { artifact_id: "art_fr008_a1", optro_record_id: "rec_art_fr008_a1", type: "attestation",    description: "Preparer + reviewer initials present on all 12 recs.",                                                                  captured_by: "anton_dam", captured_at: "2026-04-07T11:30:00Z", storage_ref: "s3://optro-evidence/helios/fr-008/q1-2026/initials.pdf",     tickmarks: ["c"] },
      { artifact_id: "art_fr008_l1", optro_record_id: "rec_art_fr008_l1", type: "log_export",     description: "Completion timestamps: 11 of 12 within 10 business days. Dec 2025 operating-account rec completed 12 business days post-close.", captured_by: "pranav_iyer", captured_at: "2026-04-07T12:00:00Z", storage_ref: "s3://optro-evidence/helios/fr-008/q1-2026/timestamps.csv",     tickmarks: ["▲", "X"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-08T13:15:00Z",
      comments: "Dec 2025 operating-account rec late (12 BD vs 10 BD target). No misstatement. Tracked as F-008. Year-end close timeline pressure. Process control: close calendar revised for 2026 year-end.",
      optro_record_id: "rec_attest_fr008",
    },
    overrides: [],
    disposition: "passed_with_exception",
    final_disposition_note: "Timeliness deficiency only. Substantively complete and accurate.",
    finding_refs: ["F-008"],
  },

  // -----------------------------------------------------------------
  // IT-002 — Change management code deploy (clean-ish)
  // -----------------------------------------------------------------
  {
    control_id: "IT-002",
    optro_record_id: "rec_chain_it_002",
    control_name: "Change management — code deploy approval",
    category: "itgc",
    owner_role: "Engineering Manager",
    frequency: "Per change",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_it002_1", description: "Extract Q1 2026 production deployments from GitHub Actions deploy logs",        expected_evidence: "query_output", artifact_ids: ["art_it002_q1"] },
      { step: 2, optro_record_id: "rec_step_it002_2", description: "Sample 25 deploys per testing plan",                                            expected_evidence: "sample",       artifact_ids: ["art_it002_s1"] },
      { step: 3, optro_record_id: "rec_step_it002_3", description: "Examine pull-request review evidence for each sampled deploy",                  expected_evidence: "attestation",  artifact_ids: ["art_it002_a1"] },
    ],
    artifacts: [
      { artifact_id: "art_it002_q1", optro_record_id: "rec_art_it002_q1", type: "query_output", description: "GitHub Actions deploy log, prod environment, Jan–Mar 2026 (412 deploys).",                                                              captured_by: "diego_marquez", captured_at: "2026-04-08T14:00:00Z", storage_ref: "s3://optro-evidence/helios/it-002/q1-2026/deploys.csv",      tickmarks: ["§"] },
      { artifact_id: "art_it002_s1", optro_record_id: "rec_art_it002_s1", type: "sample",       description: "Stratified random sample of 25 deploys across normal + hotfix workflows.",                                                              captured_by: "diego_marquez", captured_at: "2026-04-08T14:30:00Z", storage_ref: "s3://optro-evidence/helios/it-002/q1-2026/sample.xlsx",      tickmarks: ["§"] },
      { artifact_id: "art_it002_a1", optro_record_id: "rec_art_it002_a1", type: "attestation",  description: "PR review records: 23 of 25 deploys had documented PR review. 2 emergency hotfix deploys (incident-driven, Feb 2026) bypassed PR review per emergency workflow.", captured_by: "diego_marquez", captured_at: "2026-04-09T10:15:00Z", storage_ref: "s3://optro-evidence/helios/it-002/q1-2026/pr_reviews.zip",  tickmarks: ["c", "X"] },
    ],
    reviewer: {
      reviewer_key: "diego_marquez",
      attestation_timestamp: "2026-04-10T17:00:00Z",
      comments: "2 of 25 sampled deploys (both emergency hotfix workflow, Feb 2026 incident response) lacked standard PR review. Both retrospectively reviewed and approved per emergency procedure but documentation thin. Tracked as F-011. Emergency workflow being tightened to require retro-approval within 4 hours.",
      optro_record_id: "rec_attest_it002",
    },
    overrides: [
      {
        override_id: "ovr_it002_hotfix",
        optro_record_id: "rec_override_it002_hf",
        applied_at: "2026-02-15T03:22:00Z",
        applied_by: "diego_marquez",
        reason: "Emergency hotfix — production database connection pool exhaustion incident. Deployed without PR review per emergency response runbook section 4.2. Retro-reviewed within 24 hours.",
        affected_steps: [3],
      },
    ],
    disposition: "passed_with_exception",
    final_disposition_note: "Operating effectively except emergency hotfix documentation gap. Remediation in progress.",
    finding_refs: ["F-011"],
  },

  // -----------------------------------------------------------------
  // FR-003 — Inventory standard cost variance (deficiency)
  // -----------------------------------------------------------------
  {
    control_id: "FR-003",
    optro_record_id: "rec_chain_fr_003",
    control_name: "Inventory standard-cost variance review",
    category: "financial_reporting",
    owner_role: "Controller",
    frequency: "Quarterly",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_fr003_1", description: "Obtain quarterly standard-cost variance analysis memo",                                     expected_evidence: "reconciliation", artifact_ids: ["art_fr003_r1"] },
      { step: 2, optro_record_id: "rec_step_fr003_2", description: "Examine supporting calculation worksheet (variance roll by SKU class)",                     expected_evidence: "reconciliation", artifact_ids: [] /* GAP: Feb 2026 worksheet missing */ },
      { step: 3, optro_record_id: "rec_step_fr003_3", description: "Verify Controller sign-off",                                                                 expected_evidence: "attestation",    artifact_ids: ["art_fr003_a1"] },
    ],
    artifacts: [
      { artifact_id: "art_fr003_r1", optro_record_id: "rec_art_fr003_r1", type: "reconciliation", description: "Q1 2026 standard-cost variance memo (Jan, Mar). Feb 2026 memo present but supporting worksheet missing.", captured_by: "kiera_patel", captured_at: "2026-04-12T09:30:00Z", storage_ref: "s3://optro-evidence/helios/fr-003/q1-2026/memos.zip",       tickmarks: ["◊", "X"] },
      { artifact_id: "art_fr003_a1", optro_record_id: "rec_art_fr003_a1", type: "attestation",    description: "Controller sign-off on all 3 monthly memos.",                                                              captured_by: "anton_dam",   captured_at: "2026-04-13T11:00:00Z", storage_ref: "s3://optro-evidence/helios/fr-003/q1-2026/signoffs.pdf",    tickmarks: ["c"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-14T16:45:00Z",
      comments: "Feb 2026 supporting calculation worksheet missing from workpaper file. Memo conclusions stand and tie to GL. Variance amounts immaterial. Tracked as F-007. Kiera reconstructing worksheet from JD Edwards extract.",
      optro_record_id: "rec_attest_fr003",
    },
    overrides: [],
    disposition: "passed_with_exception",
    final_disposition_note: "Evidence-retention deficiency. No misstatement.",
    finding_refs: ["F-007"],
  },

  // -----------------------------------------------------------------
  // FR-009 — AP cutoff (deficiency)
  // -----------------------------------------------------------------
  {
    control_id: "FR-009",
    optro_record_id: "rec_chain_fr_009",
    control_name: "Accounts payable cutoff",
    category: "financial_reporting",
    owner_role: "AP Specialist",
    frequency: "Period-end",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026 period-end (Mar 2026)",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_fr009_1", description: "Extract AP invoices booked in 7 days before + after period close",       expected_evidence: "query_output",   artifact_ids: ["art_fr009_q1"] },
      { step: 2, optro_record_id: "rec_step_fr009_2", description: "Sample 30 invoices and verify proper period assignment based on receipt date", expected_evidence: "sample",     artifact_ids: ["art_fr009_s1"] },
      { step: 3, optro_record_id: "rec_step_fr009_3", description: "Document cutoff conclusion",                                              expected_evidence: "attestation",    artifact_ids: ["art_fr009_a1"] },
    ],
    artifacts: [
      { artifact_id: "art_fr009_q1", optro_record_id: "rec_art_fr009_q1", type: "query_output", description: "NetSuite AP extract, Mar 24 – Apr 6, 2026 (218 invoices).",                                                                                            captured_by: "marcus_ondrej", captured_at: "2026-04-07T10:00:00Z", storage_ref: "s3://optro-evidence/helios/fr-009/q1-2026/ap_extract.csv", tickmarks: ["§"] },
      { artifact_id: "art_fr009_s1", optro_record_id: "rec_art_fr009_s1", type: "sample",       description: "30-invoice sample examined. 1 invoice dated Mar 30 booked Apr 2 (receipt date Mar 31, immaterial $4,200).",                                              captured_by: "marcus_ondrej", captured_at: "2026-04-08T14:15:00Z", storage_ref: "s3://optro-evidence/helios/fr-009/q1-2026/sample.xlsx",   tickmarks: ["▲", "X"] },
      { artifact_id: "art_fr009_a1", optro_record_id: "rec_art_fr009_a1", type: "attestation",  description: "AP Specialist cutoff conclusion memo. Notes 1 cutoff exception, immaterial.",                                                                            captured_by: "marcus_ondrej", captured_at: "2026-04-09T09:20:00Z", storage_ref: "s3://optro-evidence/helios/fr-009/q1-2026/conclusion.pdf", tickmarks: ["c"] },
    ],
    reviewer: {
      reviewer_key: "anton_dam",
      attestation_timestamp: "2026-04-10T15:00:00Z",
      comments: "1 cutoff exception identified ($4,200, immaterial). Pattern flagged for testing-design review — recurring small cutoff slips suggest receipt-date discipline. Tracked as F-012.",
      optro_record_id: "rec_attest_fr009",
    },
    overrides: [],
    disposition: "passed_with_exception",
    final_disposition_note: "Immaterial cutoff slip. Process pattern noted for design review.",
    finding_refs: ["F-012"],
  },

  // -----------------------------------------------------------------
  // IT-003 — Database backup (remediated — clean)
  // -----------------------------------------------------------------
  {
    control_id: "IT-003",
    optro_record_id: "rec_chain_it_003",
    control_name: "Database backup & restore testing",
    category: "itgc",
    owner_role: "IT Director",
    frequency: "Monthly + semi-annual",
    pre_ipo_priority: "must_have",
    big4_visibility: true,
    cycle_period: "Q1 2026",
    test_procedures: [
      { step: 1, optro_record_id: "rec_step_it003_1", description: "Examine monthly backup completion logs",                expected_evidence: "log_export",   artifact_ids: ["art_it003_l1"] },
      { step: 2, optro_record_id: "rec_step_it003_2", description: "Examine semi-annual restore-test results",              expected_evidence: "log_export",   artifact_ids: ["art_it003_l2"] },
      { step: 3, optro_record_id: "rec_step_it003_3", description: "Verify Security Lead sign-off on restore-test outcomes", expected_evidence: "attestation",  artifact_ids: ["art_it003_a1"] },
    ],
    artifacts: [
      { artifact_id: "art_it003_l1", optro_record_id: "rec_art_it003_l1", type: "log_export",  description: "Backup completion logs Q1 2026 — all 3 months green.",                                            captured_by: "yusuf_olamide",     captured_at: "2026-04-05T11:00:00Z", storage_ref: "s3://optro-evidence/helios/it-003/q1-2026/backup_logs.csv",   tickmarks: ["a"] },
      { artifact_id: "art_it003_l2", optro_record_id: "rec_art_it003_l2", type: "log_export",  description: "Semi-annual restore test, Feb 2026 — restored to staging within 47 min RTO (target 60 min).",   captured_by: "beatrix_hannover",  captured_at: "2026-02-22T16:30:00Z", storage_ref: "s3://optro-evidence/helios/it-003/q1-2026/restore_test.pdf",  tickmarks: ["¶", "a"] },
      { artifact_id: "art_it003_a1", optro_record_id: "rec_art_it003_a1", type: "attestation", description: "Security Lead sign-off on restore test.",                                                          captured_by: "beatrix_hannover",  captured_at: "2026-02-22T17:00:00Z", storage_ref: "s3://optro-evidence/helios/it-003/q1-2026/signoff.pdf",       tickmarks: ["c"] },
    ],
    reviewer: {
      reviewer_key: "yusuf_olamide",
      attestation_timestamp: "2026-04-06T14:20:00Z",
      comments: "Control operating effectively post-remediation. Prior cycle (Q3 2025) had documentation gap; resolved with new template + automated log capture. No exceptions Q1 2026. Deloitte (Naomi Wilkes) walked through 2026-03-08; satisfied with remediation.",
      optro_record_id: "rec_attest_it003",
    },
    overrides: [],
    disposition: "passed",
    final_disposition_note: "Remediated control — operating effectively.",
    finding_refs: [],
  },
];

// ===============================================================
// SYNTHESIZED CHAINS — fill out the 175-control universe
// ===============================================================
// For controls in CONTROLS not hand-crafted above, generate a
// lower-fidelity chain template based on testing_status. Also
// generate synthetic IDs (RC-XXX, PC-XXX, FC-XXX) and additional
// FR/IT/EL controls to reach 175 total.

function syntheticChainFromControl(c: Control): EvidenceChain {
  const baseRecord = `rec_chain_${c.id.toLowerCase().replace("-", "_")}`;
  const reviewerKey = pickReviewerForCategory(c.category);
  const isClean = c.testing_status === "tested" || c.testing_status === "remediated";
  const hasException = c.testing_status === "exception";
  const inProgress = c.testing_status === "in_progress";
  const notTested = c.testing_status === "not_tested";

  const steps: TestProcedure[] = [
    {
      step: 1,
      optro_record_id: `${baseRecord}_step_1`,
      description: `Identify population in scope for ${c.name}`,
      expected_evidence: "query_output",
      artifact_ids: notTested ? [] : [`art_${c.id.toLowerCase()}_q1`],
    },
    {
      step: 2,
      optro_record_id: `${baseRecord}_step_2`,
      description: `Sample / examine evidence per testing plan`,
      expected_evidence: c.category === "itgc" ? "log_export" : "sample",
      artifact_ids: notTested || inProgress ? [] : [`art_${c.id.toLowerCase()}_s1`],
    },
    {
      step: 3,
      optro_record_id: `${baseRecord}_step_3`,
      description: `Reviewer sign-off on procedure outcome`,
      expected_evidence: "attestation",
      artifact_ids: notTested ? [] : [`art_${c.id.toLowerCase()}_a1`],
    },
  ];

  const artifacts: EvidenceArtifact[] = [];
  if (!notTested) {
    artifacts.push({
      artifact_id: `art_${c.id.toLowerCase()}_q1`,
      optro_record_id: `rec_art_${c.id.toLowerCase()}_q1`,
      type: "query_output",
      description: `Population extract for ${c.name} — Q1 2026 cycle`,
      captured_by: reviewerKey,
      captured_at: "2026-04-05T10:00:00Z",
      storage_ref: `s3://optro-evidence/helios/${c.id.toLowerCase()}/q1-2026/population.csv`,
      tickmarks: ["§"],
    });
  }
  if (!notTested && !inProgress) {
    artifacts.push({
      artifact_id: `art_${c.id.toLowerCase()}_s1`,
      optro_record_id: `rec_art_${c.id.toLowerCase()}_s1`,
      type: c.category === "itgc" ? "log_export" : "sample",
      description: `Sampled items / log evidence for ${c.name}`,
      captured_by: reviewerKey,
      captured_at: "2026-04-07T14:00:00Z",
      storage_ref: `s3://optro-evidence/helios/${c.id.toLowerCase()}/q1-2026/sample.xlsx`,
      tickmarks: hasException ? ["§", "X"] : ["§", "a"],
    });
    artifacts.push({
      artifact_id: `art_${c.id.toLowerCase()}_a1`,
      optro_record_id: `rec_art_${c.id.toLowerCase()}_a1`,
      type: "attestation",
      description: `Reviewer attestation for ${c.name}`,
      captured_by: reviewerKey,
      captured_at: "2026-04-09T16:30:00Z",
      storage_ref: `s3://optro-evidence/helios/${c.id.toLowerCase()}/q1-2026/attestation.pdf`,
      tickmarks: ["c"],
    });
  }

  const reviewer: ReviewerAttestation | null = notTested
    ? null
    : {
        reviewer_key: reviewerKey,
        attestation_timestamp: "2026-04-10T17:00:00Z",
        comments: hasException
          ? "Exception identified — see linked finding. Tracking remediation."
          : inProgress
          ? "Testing in progress for Q1 2026 cycle; procedures not yet complete."
          : "No exceptions identified. Control operating effectively for the cycle.",
        optro_record_id: `rec_attest_${c.id.toLowerCase()}`,
      };

  const disposition: EvidenceChain["disposition"] =
    notTested ? "incomplete" :
    inProgress ? "incomplete" :
    hasException ? "exception" :
    "passed";

  return {
    control_id: c.id,
    optro_record_id: baseRecord,
    control_name: c.name,
    category: c.category,
    owner_role: c.owner_role,
    frequency: c.frequency,
    pre_ipo_priority: c.pre_ipo_priority,
    big4_visibility: c.big4_visibility,
    cycle_period: "Q1 2026 (Jan–Mar)",
    test_procedures: steps,
    artifacts,
    reviewer,
    overrides: [],
    disposition,
    final_disposition_note:
      notTested ? "Control not yet tested in current cycle — testing scheduled per filing calendar." :
      inProgress ? "Testing procedures in progress." :
      hasException ? "Exception noted; remediation tracked." :
      "Control operated effectively for the cycle.",
    finding_refs: [],
  };
}

function pickReviewerForCategory(category: string): string {
  if (category === "itgc") return "yusuf_olamide";
  if (category === "entity_level") return "rachel_sandberg";
  return "anton_dam";
}

// ===============================================================
// EVIDENCE CHAIN INDEX
// ===============================================================
// Build a Map keyed by control_id. Hand-crafted chains take
// precedence; everything else is synthesized from CONTROLS.

const CHAIN_MAP: Map<string, EvidenceChain> = new Map();

for (const ch of HAND_CRAFTED_CHAINS) {
  CHAIN_MAP.set(ch.control_id, ch);
}

for (const c of CONTROLS) {
  if (!CHAIN_MAP.has(c.id)) {
    CHAIN_MAP.set(c.id, syntheticChainFromControl(c));
  }
}

export function getChain(control_id: string): EvidenceChain | null {
  return CHAIN_MAP.get(control_id) ?? null;
}

export function listDocumentedControlIds(): string[] {
  return Array.from(CHAIN_MAP.keys()).sort();
}

// ===============================================================
// DEFENSIBILITY SCORE + VALIDATION
// ===============================================================

export type AuditIssue = {
  optro_record_id: string;
  severity: "blocking" | "high" | "medium" | "low";
  category: "missing_evidence" | "missing_reviewer" | "missing_override_reason" | "missed_cycle" | "stale_attestation";
  step?: number;
  description: string;
  remediation_suggestion: string;
};

export function validateChain(chain: EvidenceChain): { score: number; issues: AuditIssue[] } {
  const issues: AuditIssue[] = [];
  let score = 100;

  for (const step of chain.test_procedures) {
    if (step.artifact_ids.length === 0) {
      issues.push({
        optro_record_id: `rec_issue_${chain.control_id.toLowerCase()}_step${step.step}`,
        severity: "blocking",
        category: "missing_evidence",
        step: step.step,
        description: `Test step ${step.step} has no evidence artifact. Expected: ${step.expected_evidence}. Procedure: "${step.description}".`,
        remediation_suggestion: `Capture ${step.expected_evidence} evidence per the testing plan and link it via artifact_id, or document a justified override with reason.`,
      });
      score -= 25;
    }
  }

  if (!chain.reviewer) {
    issues.push({
      optro_record_id: `rec_issue_${chain.control_id.toLowerCase()}_reviewer`,
      severity: "blocking",
      category: "missing_reviewer",
      description: `Chain has no reviewer attestation. Required: reviewer name, role, attestation timestamp, and comments.`,
      remediation_suggestion: `Have the control owner (${chain.owner_role}) attest in writing to procedure outcomes and timestamp the attestation.`,
    });
    score -= 20;
  } else if (!chain.reviewer.comments || chain.reviewer.comments.trim().length === 0) {
    issues.push({
      optro_record_id: `rec_issue_${chain.control_id.toLowerCase()}_reviewer_comments`,
      severity: "medium",
      category: "missing_reviewer",
      description: `Reviewer attested but did not record substantive comments.`,
      remediation_suggestion: `Capture reviewer rationale and any exceptions in the attestation comments field.`,
    });
    score -= 10;
  }

  for (const ov of chain.overrides) {
    if (!ov.reason || ov.reason.trim().length === 0) {
      issues.push({
        optro_record_id: `rec_issue_${chain.control_id.toLowerCase()}_override_${ov.override_id}`,
        severity: "high",
        category: "missing_override_reason",
        description: `Override ${ov.override_id} applied without a documented reason.`,
        remediation_suggestion: `Document why the override was applied, what it affected, and whether it constitutes a finding.`,
      });
      score -= 15;
    }
  }

  // Cycle completeness — look for "missed cycle" language in reviewer comments
  if (chain.reviewer?.comments?.toLowerCase().includes("missed entirely") || chain.reviewer?.comments?.toLowerCase().includes("missed q") || chain.reviewer?.comments?.toLowerCase().includes("not retained")) {
    issues.push({
      optro_record_id: `rec_issue_${chain.control_id.toLowerCase()}_cycle`,
      severity: "high",
      category: "missed_cycle",
      description: `Reviewer comments indicate a missed cycle or non-retained evidence — operating effectiveness not demonstrable for affected periods.`,
      remediation_suggestion: `Reconstruct evidence where possible; otherwise disclose the operating-effectiveness gap as a deficiency or significant deficiency.`,
    });
    score -= 15;
  }

  // Stale attestation — older than 90 days
  if (chain.reviewer) {
    const attested = new Date(chain.reviewer.attestation_timestamp).getTime();
    const asOf = new Date(COMPANY.as_of_date).getTime();
    const daysOld = Math.floor((asOf - attested) / (1000 * 60 * 60 * 24));
    if (daysOld > 90) {
      issues.push({
        optro_record_id: `rec_issue_${chain.control_id.toLowerCase()}_stale`,
        severity: "medium",
        category: "stale_attestation",
        description: `Last attestation is ${daysOld} days old.`,
        remediation_suggestion: `Re-perform the control or refresh reviewer attestation for the current period.`,
      });
      score -= 5;
    }
  }

  if (score < 0) score = 0;
  return { score, issues };
}

// ===============================================================
// MANAGEMENT ASSERTION INPUTS
// ===============================================================
// Snapshot the inputs a Controller needs to draft the management
// assertion section of the S-1. The agent summarizes these into
// actual assertion language.

export const MANAGEMENT_ASSERTION_INPUTS = {
  optro_record_id: "rec_mgmt_assertion_inputs_helios_2026_05",
  as_of: COMPANY.as_of_date,
  company_name: COMPANY.name,
  external_auditor: COMPANY.external_auditor,
  target_filing: COMPANY.target_s1_filing_date,
  framework: "COSO 2013 Internal Control — Integrated Framework",
  scope_of_program: {
    description: "Internal control over financial reporting (ICFR) covering financial reporting, IT general controls, and entity-level controls for Helios Robotics, Inc. on a consolidated basis. Excludes equity-method investments and the recently dissolved Helios Robotics Singapore Pte. Ltd. subsidiary.",
    consolidation_scope: "Helios Robotics, Inc. and wholly-owned operating subsidiaries (Helios Robotics International Holdings B.V., Helios Robotics Manufacturing LLC). Excludes Helios Robotics Singapore Pte. Ltd. (dissolved Q1 2026 — see scope memo M-2026-04).",
    exclusions: [
      "Helios Robotics Singapore Pte. Ltd. — entity dissolved Q1 2026, no material operating activity post-dissolution",
      "Equity-method investment in Aurora Optics Inc. — outside ICFR scope per SEC guidance",
    ],
  },
  controls_in_scope: {
    universe_total: CONTROL_UNIVERSE_TOTALS.total,
    must_have_total: CONTROL_UNIVERSE_TOTALS.must_have,
    must_have_tested: 58,        // representative; aligns with overall 35% testing rate concentrated in must_haves
    must_have_finalized_design: 92,
    by_category: CONTROL_UNIVERSE_TOTALS.by_category,
  },
  testing_completeness: {
    overall_percent_tested: 35,
    must_have_percent_tested: 60,
    big4_walkthrough_percent: 40,
    cycles_complete: 1,
    cycles_target_at_filing: 2,
    headline_risk:
      "Testing history projected at 4 months of operating effectiveness at S-1 filing vs peer median of 7 months. Year-1 testing cycle scheduled to complete 2026-10-31; second cycle compressed into Nov–Dec 2026.",
  },
  open_findings: {
    by_severity: {
      material_weakness: 0,
      significant_deficiency: 3,
      deficiency: 9,
    },
    significant_deficiencies: [
      { id: "F-001", control_id: "FR-007", optro_record_id: "rec_finding_001", description: "JE approval threshold not enforced for entries $25K-$50K range. 2 unapproved entries identified (Q1 2026).", remediation_target: "2026-07-15", remediation_status: "in_progress" },
      { id: "F-002", control_id: "FR-002", optro_record_id: "rec_finding_002", description: "Deferred revenue rollforward evidence not retained for 3 of last 12 months.",                                          remediation_target: "2026-08-30", remediation_status: "in_progress" },
      { id: "F-003", control_id: "IT-001", optro_record_id: "rec_finding_003", description: "Production access review missed Q4 2025 cycle; 4 orphaned accounts identified after the fact.",                          remediation_target: "2026-06-30", remediation_status: "in_progress" },
    ],
    deficiencies_in_aggregate: "9 individual deficiencies tracked; none aggregating to a material weakness when evaluated per AS 2201 severity framework.",
  },
  remediation_status: {
    overall: "active",
    significant_deficiencies_remediated_ytd: 0,
    significant_deficiencies_target_close_pre_filing: 3,
    on_track: true,
    risk: "Three significant deficiencies must be remediated and re-tested at sufficient duration before the management assertion can be signed clean. Compressed timeline is the headline operational risk.",
  },
  disclosure_recommendation: {
    severity_to_disclose: "significant_deficiency",
    rationale:
      "Three significant deficiencies are open. Each is individually mitigable, but the combination — JE approval enforcement (FR-007), deferred revenue evidence retention (FR-002), and a missed Q4 2025 production-access review cycle (IT-001) — represents an aggregated operating-effectiveness concern that should be disclosed transparently in the management assertion. None rise to the level of material weakness when evaluated against AS 2201 severity criteria.",
    proposed_assertion_caveats: [
      "Management is unable to attest to operating effectiveness for the full T-12-month testing window due to the missed Q4 2025 production access review and the 3-month deferred revenue evidence retention gap. Both items are tracked, remediating, and will be re-performed prior to filing.",
      "The compressed Year-1 testing schedule means certain controls will have less than 6 months of demonstrated operating effectiveness at the time of filing. Disclosure should describe the testing cadence and the expected coverage as of the comfort-letter response date.",
    ],
  },
};

// ===============================================================
// WORKPAPER SECTION TEMPLATES
// ===============================================================
// Returns structured slots — never prose. The agent renders prose
// downstream, using the slot text + tickmarks + REQUIRES HUMAN
// REVIEW markers verbatim.

export type WorkpaperSection = "narrative" | "testing" | "exception" | "remediation";

export type WorkpaperSlot = {
  slot_id: string;
  label: string;
  value: string;
  citations: string[];                 // optro_record_id list
  requires_human_review: boolean;
  reviewer_prompt?: string;
};

export type WorkpaperDraft = {
  control_id: string;
  section: WorkpaperSection;
  optro_record_id: string;
  header: {
    company: string;
    period: string;
    framework: string;
    control_id: string;
    control_name: string;
    preparer_role: string;
    reviewer_role: string;
    workpaper_ref: string;
  };
  slots: WorkpaperSlot[];
  tickmark_legend_ref: string;
  citations_summary: string[];
};

export function draftWorkpaperSection(control_id: string, section: WorkpaperSection): WorkpaperDraft | null {
  const chain = getChain(control_id);
  if (!chain) return null;

  const baseHeader: WorkpaperDraft["header"] = {
    company: COMPANY.name,
    period: chain.cycle_period,
    framework: "COSO 2013 ICFR · AS 2201",
    control_id: chain.control_id,
    control_name: chain.control_name,
    preparer_role: chain.owner_role,
    reviewer_role: chain.reviewer ? REVIEWERS[chain.reviewer.reviewer_key]?.role ?? chain.owner_role : chain.owner_role,
    workpaper_ref: `WP-${chain.control_id}-${chain.cycle_period.replace(/[^A-Za-z0-9]/g, "").slice(0, 6)}`,
  };

  const baseRecord = `rec_wp_${chain.control_id.toLowerCase()}_${section}`;

  let slots: WorkpaperSlot[] = [];

  if (section === "narrative") {
    slots = [
      {
        slot_id: "control_objective",
        label: "Control objective",
        value: `Document the objective of "${chain.control_name}" with reference to the relevant financial statement assertion(s).`,
        citations: [chain.optro_record_id],
        requires_human_review: true,
        reviewer_prompt: "Confirm financial statement assertion mapping (existence / completeness / valuation / cutoff / rights & obligations / presentation).",
      },
      {
        slot_id: "control_description",
        label: "Control description",
        value: `${chain.control_name} performed ${chain.frequency.toLowerCase()} by ${chain.owner_role}.`,
        citations: [chain.optro_record_id],
        requires_human_review: false,
      },
      {
        slot_id: "design_assessment",
        label: "Design assessment",
        value: `Control design assessed as ${chain.disposition === "scoped_out" ? "scoped out of program" : "appropriately designed to address the related risk"}. [REQUIRES HUMAN REVIEW: confirm design assessment language matches Deloitte walkthrough conclusions.]`,
        citations: [chain.optro_record_id],
        requires_human_review: true,
        reviewer_prompt: "Cross-reference Deloitte walkthrough memo for this control.",
      },
    ];
  } else if (section === "testing") {
    slots = chain.test_procedures.map((step) => ({
      slot_id: `step_${step.step}`,
      label: `Test step ${step.step}`,
      value:
        step.artifact_ids.length === 0
          ? `[REQUIRES HUMAN REVIEW: step ${step.step} has no evidence artifact captured. Document the procedure outcome and link supporting evidence before workpaper sign-off.] Procedure: "${step.description}".`
          : `Performed: ${step.description}. Evidence: ${step.artifact_ids.join(", ")}.`,
      citations: [step.optro_record_id, ...step.artifact_ids.map((id) => {
        const a = chain.artifacts.find((art) => art.artifact_id === id);
        return a?.optro_record_id ?? id;
      })],
      requires_human_review: step.artifact_ids.length === 0,
      reviewer_prompt: step.artifact_ids.length === 0 ? `Capture ${step.expected_evidence} evidence for step ${step.step}.` : undefined,
    }));

    slots.push({
      slot_id: "preparer_attestation",
      label: "Preparer attestation",
      value: chain.reviewer
        ? `Preparer: ${REVIEWERS[chain.reviewer.reviewer_key]?.name ?? "[unknown]"} (${REVIEWERS[chain.reviewer.reviewer_key]?.role ?? chain.owner_role}). Attestation: "${chain.reviewer.comments}" Timestamp: ${chain.reviewer.attestation_timestamp}.`
        : `[REQUIRES HUMAN REVIEW: preparer attestation missing. Have the control owner attest in writing before workpaper sign-off.]`,
      citations: chain.reviewer ? [chain.reviewer.optro_record_id] : [],
      requires_human_review: !chain.reviewer,
    });
  } else if (section === "exception") {
    if (chain.finding_refs.length === 0 && chain.disposition !== "exception" && chain.disposition !== "passed_with_exception") {
      slots = [
        {
          slot_id: "no_exceptions",
          label: "Exception summary",
          value: `No exceptions identified in cycle ${chain.cycle_period}.`,
          citations: [chain.optro_record_id],
          requires_human_review: false,
        },
      ];
    } else {
      slots = chain.finding_refs.map((finding) => ({
        slot_id: `exception_${finding}`,
        label: `Exception ${finding}`,
        value: `Cross-reference: finding ${finding}. ${chain.final_disposition_note} [REQUIRES HUMAN REVIEW: confirm severity classification (deficiency vs significant deficiency vs material weakness) per AS 2201.]`,
        citations: [chain.optro_record_id, ...chain.artifacts.filter((a) => a.tickmarks.includes("X")).map((a) => a.optro_record_id)],
        requires_human_review: true,
        reviewer_prompt: "Confirm severity classification with Internal Audit and Deloitte engagement team.",
      }));
    }
  } else if (section === "remediation") {
    if (chain.finding_refs.length === 0) {
      slots = [
        {
          slot_id: "no_remediation_needed",
          label: "Remediation",
          value: `No remediation required — control operated effectively in cycle ${chain.cycle_period}.`,
          citations: [chain.optro_record_id],
          requires_human_review: false,
        },
      ];
    } else {
      slots = chain.finding_refs.map((finding) => ({
        slot_id: `remediation_${finding}`,
        label: `Remediation plan — ${finding}`,
        value: `[REQUIRES HUMAN REVIEW: confirm remediation owner, target close date, validation approach, and re-test cycle.] Linked finding: ${finding}. Disposition note: ${chain.final_disposition_note}`,
        citations: [chain.optro_record_id],
        requires_human_review: true,
        reviewer_prompt: "Confirm remediation owner, target close, validation method, and re-test cycle with control owner.",
      }));
    }
  }

  return {
    control_id: chain.control_id,
    section,
    optro_record_id: baseRecord,
    header: baseHeader,
    slots,
    tickmark_legend_ref: "TICKMARK_LEGEND · Deloitte convention",
    citations_summary: Array.from(new Set(slots.flatMap((s) => s.citations))),
  };
}

// ===============================================================
// PER-CONTROL TICKMARK LEGEND
// ===============================================================
// Returns the symbols actually used in the chain's artifacts plus
// the global legend, so the agent can render workpaper-style output
// that's tight to the control.

export function tickmarksForControl(control_id: string) {
  const chain = getChain(control_id);
  if (!chain) return null;
  const usedSymbols = new Set<string>();
  for (const a of chain.artifacts) {
    for (const t of a.tickmarks) usedSymbols.add(t);
  }
  const used = TICKMARK_LEGEND.filter((tm) => usedSymbols.has(tm.symbol));
  return {
    control_id,
    convention: "Deloitte & Touche LLP standard tickmarks",
    used_in_this_control: used,
    full_legend: TICKMARK_LEGEND,
  };
}
