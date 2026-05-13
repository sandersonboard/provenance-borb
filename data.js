// Provenance — Helios Robotics mock data
// All numbers, names, and IDs are fictional. As-of date: 2026-05-12.

window.HELIOS = {
  company: "Helios Robotics, Inc.",
  audit_firm: "Deloitte & Touche LLP",
  engagement_partner: "Naomi Wilkes",
  as_of_date: "2026-05-12",
  filing_target: "Q1 2027",
  period_label: "Q1 2026 (Jan 1 — Mar 31, 2026)",
  framework: "COSO 2013 / AS 2201",
};

window.REVIEWERS = {
  pranav: { name: "Pranav Iyer", role: "Controller", org: "Helios" },
  anton:  { name: "Anton Dam", role: "Senior Accountant", org: "Helios" },
  tara:   { name: "Tara Okoye", role: "Chief Audit Executive", org: "Helios" },
  naomi:  { name: "Naomi Wilkes", role: "Engagement Partner", org: "Deloitte" },
};

// ---------- Tickmark legend (Deloitte standard subset) ----------
window.TICKMARKS = [
  { mark: "✓", meaning: "Agreed to source document without exception" },
  { mark: "§", meaning: "Recalculated; mathematically accurate" },
  { mark: "¶", meaning: "Footed and cross-footed" },
  { mark: "b", meaning: "Traced to general ledger" },
  { mark: "c", meaning: "Compared to threshold; within policy" },
  { mark: "‡", meaning: "Significant judgment; reviewer note required" },
  { mark: "†", meaning: "Reviewer override; rationale documented" },
  { mark: "PBC", meaning: "Provided by client; agreed to underlying" },
  { mark: "TB", meaning: "Traced to trial balance" },
  { mark: "AJE", meaning: "Adjusting journal entry posted" },
  { mark: "F/U", meaning: "Follow-up required next period" },
  { mark: "N/E", meaning: "No exception noted" },
  { mark: "X", meaning: "Exception — see disposition" },
];

// ---------- 175-control universe ----------
// Distribution per PRD: 60% complete, 30% partial, 10% broken, 0% untested.
// Categories: FR (financial reporting), RC (revenue cycle), IT (IT general controls),
//   PC (period close), OP (operations), TX (tax), TR (treasury).
const CATEGORIES = [
  { code: "FR", name: "Financial Reporting", count: 38 },
  { code: "RC", name: "Revenue Cycle",      count: 47 },
  { code: "IT", name: "IT General Controls", count: 32 },
  { code: "PC", name: "Period Close",        count: 22 },
  { code: "OP", name: "Operations",          count: 18 },
  { code: "TX", name: "Tax",                  count: 10 },
  { code: "TR", name: "Treasury",             count:  8 },
];

// Deterministic LCG so the page always renders the same data.
function mulberry32(seed) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260512);
function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }

const CONTROL_NAMES = {
  FR: [
    "Account reconciliation review — significant accounts",
    "Manual journal entry approval — non-standard",
    "Period-end accruals review",
    "Goodwill impairment indicator analysis",
    "Deferred revenue rollforward review",
    "Lease accounting (ASC 842) classification review",
    "Stock-based compensation expense recognition",
    "Foreign currency translation review",
    "Intercompany elimination reconciliation",
    "Variable consideration estimation — usage-based",
    "Cutoff testing — period-end revenue",
    "Allowance for doubtful accounts methodology review",
    "Capitalized software development costs review",
    "Fixed asset impairment indicator analysis",
    "Pension/OPEB actuarial assumption review",
    "Significant unusual transaction approval",
    "Related-party transaction identification",
    "Segment reporting — operating segment review",
    "Earnings per share calculation",
    "Other comprehensive income classification",
  ],
  RC: [
    "Order-to-cash — credit approval",
    "Revenue recognition — contract review (ASC 606)",
    "Manual journal entry approval — revenue recognition",
    "Invoice generation accuracy",
    "Customer credit limit override approval",
    "Sales returns and allowances accrual",
    "Bill-and-hold qualification review",
    "Distributor channel revenue cutoff",
    "Standalone selling price allocation",
    "Variable consideration constraint application",
    "Subscription renewal accuracy",
    "Pricing exception approval",
    "Revenue recognition — multi-element arrangements",
    "Cash application accuracy",
    "Deferred revenue release approval",
    "Customer contract modification review",
    "Service usage metering accuracy",
    "Channel partner rebate accrual",
    "Implementation services revenue timing",
    "Tax-inclusive vs tax-exclusive pricing review",
  ],
  IT: [
    "Logical access — production database",
    "Privileged user access review — quarterly",
    "Change management — production code deploy",
    "Backup and recovery — daily verification",
    "Vulnerability scanning — critical systems",
    "Security patching — operating systems",
    "Multi-factor authentication enforcement",
    "User access provisioning — new hires",
    "User access deprovisioning — terminations",
    "Segregation of duties — ERP roles",
    "Application change approval — financial systems",
    "Database administrator activity logging",
    "Encryption at rest — financial data stores",
    "Disaster recovery test — annual",
    "Third-party SOC report review",
    "Network firewall rule review",
  ],
  PC: [
    "Period-close checklist completion",
    "Trial balance review and approval",
    "Bank reconciliation review",
    "Consolidation review — entity-level",
    "Cutoff testing — accounts payable",
    "Cutoff testing — accounts receivable",
    "Inventory count and reconciliation",
    "Prepaid expense rollforward",
    "Other receivables review",
    "Accrued liability review",
    "Suspense account clearing",
    "Subsequent event review",
  ],
  OP: [
    "Vendor master file change review",
    "Customer master file change review",
    "Purchase order approval — over threshold",
    "Three-way match — invoice payment",
    "Payroll change review",
    "Time and attendance approval",
    "Expense report approval",
    "Wire transfer approval — over threshold",
  ],
  TX: [
    "Income tax provision review",
    "Uncertain tax position review (FIN 48)",
    "Sales/use tax accrual review",
    "Indirect tax — VAT rate accuracy",
    "Deferred tax asset valuation allowance",
  ],
  TR: [
    "Investment policy compliance review",
    "Counterparty exposure limit review",
    "Cash forecasting — 13-week rolling",
    "Debt covenant compliance review",
  ],
};

function statusForIndex(globalIdx) {
  // PRD: 60 complete / 30 partial / 10 broken. Deterministic by index.
  const m = globalIdx % 10;
  if (m < 6) return "chain_complete";
  if (m < 9) return "chain_partial";
  return "chain_broken";
}

function buildControls() {
  const out = [];
  let counter = 1;
  CATEGORIES.forEach(cat => {
    const pool = CONTROL_NAMES[cat.code] || [];
    for (let i = 0; i < cat.count; i++) {
      const id = `${cat.code}-${String(counter).padStart(3, "0")}`;
      const baseName = pool[i % pool.length];
      const suffix = i >= pool.length ? ` (${cat.code} subsidiary ${Math.floor(i / pool.length)})` : "";
      const status = statusForIndex(counter - 1);
      // big4 visibility — about 70% in scope for Deloitte testing
      const big4 = (counter % 10) < 7;
      out.push({
        id,
        category_code: cat.code,
        category_name: cat.name,
        name: baseName + suffix,
        status,
        big4_visible: big4,
        evidence_count: status === "chain_broken" ? 1 + Math.floor(rng() * 2)
                       : status === "chain_partial" ? 3 + Math.floor(rng() * 3)
                       : 5 + Math.floor(rng() * 5),
        reviewer_signoff_layers: status === "chain_broken" ? 0
                                : status === "chain_partial" ? 1
                                : (rng() < 0.4 ? 2 : 1),
        last_tested: ["2026-04-08", "2026-04-15", "2026-04-22", "2026-04-29", "2026-05-04"][counter % 5],
      });
      counter += 1;
    }
  });
  return out;
}

window.CONTROLS = buildControls();

// Make sure RC-047 is the hero — it's our showcase control.
const heroIdx = window.CONTROLS.findIndex(c => c.id === "RC-047");
if (heroIdx >= 0) {
  window.CONTROLS[heroIdx].status = "chain_complete";
  window.CONTROLS[heroIdx].big4_visible = true;
  window.CONTROLS[heroIdx].evidence_count = 5;
  window.CONTROLS[heroIdx].reviewer_signoff_layers = 2;
}

// ---------- RC-047 deep detail (the hero workpaper) ----------
window.RC_047 = {
  id: "RC-047",
  name: "Manual journal entry approval — revenue recognition",
  category: "Revenue Cycle",
  workpaper_ref: "WP-RC-047-Q12026",
  period: window.HELIOS.period_label,
  framework: window.HELIOS.framework,
  prepared_by: { ...window.REVIEWERS.anton, signed_at: "2026-04-12T16:48:00-07:00" },
  reviewed_by: { ...window.REVIEWERS.pranav, signed_at: "2026-04-16T09:21:00-07:00" },
  big4_walkthrough: { partner: window.REVIEWERS.naomi, date: "2026-04-22", outcome: "No exceptions noted in walkthrough" },
  defensibility_score: 100,
  status: "chain_complete",
  big4_visible: true,
  control_objective:
    "Manual journal entries posted to revenue accounts are reviewed and approved by an individual independent of the preparer prior to posting, and the threshold for required dual approval is monitored and updated quarterly.",
  narrative: [
    "Helios Robotics applies a $250,000 single-entry threshold to its manual journal entry (\"MJE\") approval workflow within NetSuite. Manual entries posted to any of the 47 in-scope revenue ledger accounts that meet or exceed the threshold require a second-level approval from the Controller prior to posting. Entries below the threshold require single approval by a Senior Accountant.",
    "The control owner reviews the threshold quarterly against the materiality benchmark established by the engagement team for the current audit period. The current threshold is supported by memo M-2026-Q1-MJE, signed by the Controller on 2026-01-09. Entries posted to revenue accounts that did not flow through the MJE workflow are escalated to the Controller for after-the-fact disposition.",
    "The control is supported by NetSuite workflow rule WF-MJE-RR-047, configured to enforce dual approval at the application layer. A weekly exception report (NS-Saved-Search-MJE-EX-047) is generated by the Senior Accountant and reviewed by the Controller; any bypasses are dispositioned and the rationale is documented in the override log.",
  ],
  testing_procedures: [
    { n: 1, text: "Obtain population of all manual journal entries posted to revenue accounts during the testing period from NetSuite (saved search NS-Saved-Search-MJE-ALL-047).", tickmarks: ["PBC", "b"] },
    { n: 2, text: "Foot the population and reconcile total entries to general ledger activity in revenue accounts for the period.", tickmarks: ["¶", "TB"] },
    { n: 3, text: "From the population, select a sample of 25 entries using stratified sampling: 100% of entries ≥ $1,000,000; judgmental selection across remainder weighted toward period-end and unusual postings.", tickmarks: ["§"] },
    { n: 4, text: "For each sampled entry, agree the approval evidence captured in NetSuite to underlying support and verify approver was independent of preparer and at the appropriate authorization level for the entry amount.", tickmarks: ["✓", "c"] },
    { n: 5, text: "For any entries ≥ $250,000, verify dual approval was obtained prior to posting; for entries < $250,000, verify single approval by an authorized Senior Accountant.", tickmarks: ["✓", "c"] },
    { n: 6, text: "Inspect the weekly exception report for the testing period and verify each flagged entry was dispositioned within 5 business days; agree any overrides to the override log and supporting rationale.", tickmarks: ["✓", "†"] },
    { n: 7, text: "Inquire of the Controller and inspect memo M-2026-Q1-MJE to corroborate that the $250,000 threshold was reassessed against current-period materiality and approved during the period.", tickmarks: ["‡"] },
  ],
  sample_selection: {
    population: 218,
    sample_size: 25,
    methodology:
      "Stratified judgmental selection. Tier 1 (≥ $1M): 4 entries, 100% coverage. Tier 2 ($250k–$1M): 11 entries, judgmental, period-end-weighted. Tier 3 (< $250k): 10 entries, judgmental, biased toward unusual postings (round-dollar, reversal pairs, manual offsets).",
    rationale:
      "Stratification ensures highest-dollar entries are tested 100%; judgmental selection at Tier 2/3 surfaces overrides and unusual postings that pure statistical sampling would miss. Methodology agreed in walkthrough with Deloitte engagement team 2026-02-04.",
  },
  evidence: [
    {
      id: "art_rc047_q1",
      filename: "RC-047_population_query_NS_MJE_ALL_2026-04-08.csv",
      type: "Query export",
      source_system: "NetSuite saved search NS-Saved-Search-MJE-ALL-047",
      captured_by: window.REVIEWERS.anton.name,
      captured_at: "2026-04-08T14:12:00-07:00",
      size: "218 rows · 84 KB",
      tickmark: "PBC",
    },
    {
      id: "art_rc047_s1",
      filename: "RC-047_journal_entry_review_sample_Q2.xlsx",
      type: "Workpaper",
      source_system: "Optro Manual — Anton Dam",
      captured_by: window.REVIEWERS.anton.name,
      captured_at: "2026-04-10T11:30:00-07:00",
      size: "25 entries · 142 KB",
      tickmark: "§",
    },
    {
      id: "art_rc047_a1",
      filename: "RC-047_supporting_memo_2026-03.pdf",
      type: "Memo",
      source_system: "Optro Document Vault — uploaded by P. Iyer",
      captured_by: window.REVIEWERS.pranav.name,
      captured_at: "2026-01-09T18:02:00-07:00",
      size: "M-2026-Q1-MJE · 4 pages · 312 KB",
      tickmark: "‡",
    },
    {
      id: "art_rc047_r1",
      filename: "RC-047_workflow_screenshot_NS_WF-MJE-RR-047.png",
      type: "Screenshot",
      source_system: "NetSuite admin panel · captured 2026-04-12",
      captured_by: window.REVIEWERS.anton.name,
      captured_at: "2026-04-12T09:44:00-07:00",
      size: "1240×880 · 218 KB",
      tickmark: "✓",
    },
    {
      id: "art_rc047_q2",
      filename: "RC-047_exception_report_weekly_Q1_2026.xlsx",
      type: "Exception report",
      source_system: "NetSuite saved search NS-Saved-Search-MJE-EX-047",
      captured_by: window.REVIEWERS.anton.name,
      captured_at: "2026-04-08T14:25:00-07:00",
      size: "13 weeks · 47 KB",
      tickmark: "†",
    },
  ],
  exceptions: [
    {
      id: "exc_rc047_01",
      entry_ref: "JE-2026-0098",
      description: "Approver initials illegible on printed approval form for $312,400 manual entry posted 2026-02-14.",
      severity: "Low — administrative",
      disposition:
        "Re-confirmed approval with Controller via email (M-2026-Q1-MJE-EXC-01, dated 2026-04-11). NetSuite workflow record confirms electronic approval by P. Iyer; printed form discarded. No financial statement impact.",
      dispositioned_by: window.REVIEWERS.pranav.name,
      dispositioned_at: "2026-04-11T13:50:00-07:00",
    },
    {
      id: "exc_rc047_02",
      entry_ref: "JE-2026-0214",
      description: "Threshold-bypass override invoked on $248,900 manual entry; below the $250k threshold but flagged by exception report due to round-dollar amount and manual offset.",
      severity: "Low — judgment",
      disposition:
        "Override rationale documented in ovr_rc047_021 (\"Period-end true-up to deferred-revenue waterfall; corresponds to ticket SF-2026-0419\"). Reviewed by Controller; no override needed — control operated as designed. Reclassified as informational.",
      dispositioned_by: window.REVIEWERS.pranav.name,
      dispositioned_at: "2026-04-15T16:11:00-07:00",
    },
  ],
  reviewer_comments: [
    { id: "rc_01", from: window.REVIEWERS.pranav.name, at: "2026-04-14T10:08:00-07:00",
      text: "Sample Tier 2 weighting toward period-end is appropriate given the Q1 close timing. Confirmed no additional procedures needed.",
      resolved: true },
    { id: "rc_02", from: window.REVIEWERS.naomi.name, at: "2026-04-22T11:30:00-07:00",
      text: "Walkthrough completed with A. Dam and P. Iyer. Workflow rule WF-MJE-RR-047 inspected in NetSuite admin panel; configuration consistent with control description. Memo M-2026-Q1-MJE reviewed.",
      resolved: true },
  ],
  override_log: [
    { id: "ovr_rc047_021", at: "2026-02-26T15:14:00-07:00", by: window.REVIEWERS.anton.name,
      reason: "Period-end true-up to deferred-revenue waterfall; corresponds to ticket SF-2026-0419",
      reviewed_by: window.REVIEWERS.pranav.name,
      reviewed_at: "2026-02-27T08:50:00-07:00" },
  ],
};

// ---------- Provenance metadata (hover popovers) ----------
// Keyed by data-prov ID set on rendered elements.
window.PROVENANCE = {
  "rc047.threshold":          { source: "NetSuite — workflow rule WF-MJE-RR-047 · field threshold_amount_usd",
                                value: "$250,000", captured_at: "2026-01-09T18:02:00-07:00", captured_by: "Pranav Iyer (Controller)",
                                last_modified: "2026-01-09 — threshold raised from $200k to $250k per Q1 2026 materiality memo (M-2026-Q1-MJE)",
                                override_history: 0, record_id: "rec_ns_wf_047_threshold" },
  "rc047.population_count":   { source: "NetSuite saved search NS-Saved-Search-MJE-ALL-047 · row count",
                                value: "218", captured_at: "2026-04-08T14:12:00-07:00", captured_by: "Anton Dam (Senior Accountant)",
                                last_modified: "2026-04-08 — query run; no manual edits", override_history: 0, record_id: "rec_ns_pop_047_q1" },
  "rc047.sample_size":        { source: "Optro Manual — sample selection memo SS-RC-047-Q1",
                                value: "25", captured_at: "2026-04-10T11:30:00-07:00", captured_by: "Anton Dam (Senior Accountant)",
                                last_modified: "2026-04-10 — methodology agreed in walkthrough with Deloitte 2026-02-04",
                                override_history: 0, record_id: "rec_optro_ss_047_q1" },
  "rc047.framework":          { source: "Optro Engagement Setup — engagement_framework_id",
                                value: "COSO 2013 / AS 2201", captured_at: "2025-09-14T10:00:00-07:00", captured_by: "Tara Okoye (CAE)",
                                last_modified: "2025-09-14 — engagement opened for FY2026", override_history: 0, record_id: "rec_optro_eng_helios_fy26" },
  "rc047.period":             { source: "Optro Engagement Setup — testing_period",
                                value: "Q1 2026 (Jan 1 — Mar 31, 2026)", captured_at: "2025-12-22T15:00:00-07:00", captured_by: "Pranav Iyer (Controller)",
                                last_modified: "2025-12-22 — Q1 testing window confirmed", override_history: 0, record_id: "rec_optro_period_q1_2026" },
  "rc047.prepared_by":        { source: "Optro Workpaper Sign — Anton Dam (Senior Accountant)",
                                value: "Anton Dam, 2026-04-12 16:48 PT", captured_at: "2026-04-12T16:48:00-07:00", captured_by: "Anton Dam (Senior Accountant)",
                                last_modified: "2026-04-12 — initial sign", override_history: 0, record_id: "rec_optro_sign_anton_047" },
  "rc047.reviewed_by":        { source: "Optro Workpaper Sign — Pranav Iyer (Controller)",
                                value: "Pranav Iyer, 2026-04-16 09:21 PT", captured_at: "2026-04-16T09:21:00-07:00", captured_by: "Pranav Iyer (Controller)",
                                last_modified: "2026-04-16 — initial sign", override_history: 0, record_id: "rec_optro_sign_pranav_047" },
  "rc047.walkthrough":        { source: "Optro Walkthrough Log — Deloitte engagement 2026 Q1",
                                value: "Naomi Wilkes (Deloitte), 2026-04-22", captured_at: "2026-04-22T11:30:00-07:00", captured_by: "Naomi Wilkes (Deloitte Engagement Partner)",
                                last_modified: "2026-04-22 — walkthrough completed; no exceptions", override_history: 0, record_id: "rec_optro_walkthrough_047_q1" },
  "rc047.defensibility":      { source: "Optro Provenance v1 — defensibility_score",
                                value: "100", captured_at: "2026-04-22T11:35:00-07:00", captured_by: "Optro Provenance engine",
                                last_modified: "2026-04-22 — computed after walkthrough close; all evidence verified, both sign-offs present, override log complete",
                                override_history: 0, record_id: "rec_optro_defens_047" },
  "rc047.exc_01.disposition": { source: "Optro Exception Disposition — exc_rc047_01",
                                value: "Re-confirmed via NetSuite electronic approval; printed form discarded",
                                captured_at: "2026-04-11T13:50:00-07:00", captured_by: "Pranav Iyer (Controller)",
                                last_modified: "2026-04-11 — disposition signed", override_history: 0, record_id: "rec_optro_exc_rc047_01" },
  "rc047.exc_02.override":    { source: "Optro Override Log — ovr_rc047_021",
                                value: "Period-end true-up to deferred-revenue waterfall; SF-2026-0419",
                                captured_at: "2026-02-26T15:14:00-07:00", captured_by: "Anton Dam (entered) → Pranav Iyer (reviewed 2026-02-27)",
                                last_modified: "2026-02-27 — Controller review complete", override_history: 1, record_id: "rec_optro_ovr_rc047_021" },
};

// Fill in provenance entries for every test procedure, every artifact.
window.RC_047.testing_procedures.forEach(p => {
  window.PROVENANCE[`rc047.proc_${p.n}`] = {
    source: "Optro Workpaper — testing procedure", value: `Procedure ${p.n}`,
    captured_at: "2026-04-12T16:48:00-07:00", captured_by: "Anton Dam (Senior Accountant)",
    last_modified: `Procedure ${p.n} drafted 2026-04-10; tickmarks applied 2026-04-12`,
    override_history: 0, record_id: `rec_optro_proc_${p.n}_rc047`,
  };
});
window.RC_047.evidence.forEach(a => {
  window.PROVENANCE[`rc047.${a.id}`] = {
    source: a.source_system, value: a.filename,
    captured_at: a.captured_at, captured_by: a.captured_by,
    last_modified: `Captured ${a.captured_at.slice(0,10)}; sha256 verified at ingest; ${a.size}`,
    override_history: 0, record_id: `rec_${a.id}`,
  };
});

// ---------- Peer defensibility benchmark ----------
// 47 anonymized pre-IPO S-1 filers, Jan 2024 — Apr 2025, technology vertical, Series D+.
window.PEER_COHORT = {
  size: 47,
  vertical: "Technology",
  stage: "Series D+",
  s1_window: "Jan 2024 — Apr 2025",
  source: "Optro Benchmark v1 — anonymized aggregate across consented customers",
};

window.PEER_BENCHMARKS = {
  evidence_artifacts: {
    label: "Evidence artifacts per control (revenue-cycle MJE controls)",
    helios: 6,
    peer_median: 8,
    peer_p10: 4, peer_p25: 6, peer_p50: 8, peer_p75: 11, peer_p90: 14,
    helios_percentile: 30,
    interpretation: "Helios is in the 30th percentile of peers on evidence depth. Most peers attach a second confirmation artifact (e.g., independent recomputation export) that Helios does not.",
    remediation_hint: "Add an independent recomputation export to the standard RC chain (peers tag this as art_*_recomp).",
    distribution_bin_labels: ["≤3", "4-5", "6-7", "8-9", "10-12", "13-15", "16+"],
    distribution_counts: [3, 6, 11, 13, 9, 4, 1],
  },
  reviewer_signoff_layers: {
    label: "Reviewer sign-off layers per control",
    helios: 1.4,
    peer_median: 2.0,
    peer_p10: 1.0, peer_p25: 1.5, peer_p50: 2.0, peer_p75: 2.5, peer_p90: 3.0,
    helios_percentile: 22,
    interpretation: "Helios is in the 22nd percentile. Peers average 2 sign-off layers (preparer → reviewer); Helios averages 1.4, with single sign-off on 60% of controls and dual on 40%.",
    remediation_hint: "Adopt mandatory two-layer sign-off on all Big 4-visible controls before management assertion package is due.",
    distribution_bin_labels: ["1.0", "1.25", "1.5", "1.75", "2.0", "2.25", "2.5+"],
    distribution_counts: [4, 8, 11, 10, 9, 4, 1],
  },
  override_reasons_captured: {
    label: "Override reasons captured (% of overrides with documented rationale)",
    helios: 78,
    peer_median: 100,
    peer_p10: 88, peer_p25: 96, peer_p50: 100, peer_p75: 100, peer_p90: 100,
    helios_percentile: 8,
    interpretation: "Helios captures rationale on 78% of overrides. Peer median is 100%; missing rationale is the single most-cited finding in Big 4 walkthroughs for pre-IPO peers.",
    remediation_hint: "Make the rationale field non-skippable in the override workflow (NetSuite UI + Optro disposition form). Backfill the 22% gap before period close.",
    distribution_bin_labels: ["<70", "70-79", "80-89", "90-94", "95-99", "100"],
    distribution_counts: [1, 2, 4, 8, 9, 23],
  },
};

// ---------- Chain graph (for option-1-chain.html) ----------
// Control at the center; procedures as spokes; artifacts/sign-offs as leaves.
window.RC_047_CHAIN = {
  center: { id: "RC-047", label: window.RC_047.id, type: "control" },
  nodes: [
    // procedures
    ...window.RC_047.testing_procedures.map((p, i) => ({
      id: `proc_${p.n}`, label: `Procedure ${p.n}`, type: "procedure",
      ring: 1, angle: (i / window.RC_047.testing_procedures.length) * Math.PI * 2,
      title: p.text,
    })),
    // artifacts attached to specific procedures
    { id: "art_rc047_q1", label: "Population query", type: "artifact", parent: "proc_1" },
    { id: "art_rc047_q1b", label: "Footing recompute", type: "artifact", parent: "proc_2" },
    { id: "art_rc047_s1", label: "Sample selection memo", type: "artifact", parent: "proc_3" },
    { id: "art_rc047_r1", label: "NS workflow screenshot", type: "artifact", parent: "proc_4" },
    { id: "art_rc047_r1b", label: "Approval evidence export", type: "artifact", parent: "proc_5" },
    { id: "art_rc047_q2", label: "Weekly exception report", type: "artifact", parent: "proc_6" },
    { id: "art_rc047_a1", label: "Threshold memo M-2026-Q1-MJE", type: "artifact", parent: "proc_7" },
    // sign-offs (edges)
    { id: "sign_anton", label: "Preparer sign — A. Dam · 2026-04-12", type: "signoff" },
    { id: "sign_pranav", label: "Reviewer sign — P. Iyer · 2026-04-16", type: "signoff" },
    { id: "sign_naomi", label: "Walkthrough — N. Wilkes (Deloitte) · 2026-04-22", type: "signoff" },
  ],
  broken_edges: [], // RC-047 is fully complete
};

// A second, broken chain for comparison (FR-021 — periodic accruals)
window.FR_021_CHAIN_PREVIEW = {
  control_id: "FR-021",
  control_name: "Period-end accruals review",
  status: "chain_broken",
  missing: ["Reviewer sign-off (Controller layer)", "Threshold memo (3 quarters missing)"],
};

// ===================================================================
// GROUP C — Practice production tool (Agent Commodity Hell hedge)
// ===================================================================

// ---------- FDE pod (Optro Practice) ----------
// FDE pod colors are chosen so each member is distinctive AND distinct from
// the Deloitte green (#1B5E20) used for Naomi/engagement avatars elsewhere.
window.FDE_POD = {
  jamie:  { name: "Jamie Okonkwo", role: "FDE Pod Lead", initials: "JO", color: "#b45309" },
  priya:  { name: "Priya Raman",   role: "Senior FDE",   initials: "PR", color: "#1e3a8a" },
  marcus: { name: "Marcus Chen",   role: "FDE Analyst",  initials: "MC", color: "#6d28d9" },
};

// ---------- Active Practice engagements ----------
window.ENGAGEMENTS = [
  {
    id: "eng_helios_s1",
    company: "Helios Robotics, Inc.",
    short: "Helios",
    program: "S-1 readiness",
    audit_firm: "Deloitte",
    audit_partner: "Naomi Wilkes",
    target_filing: "Q1 2027",
    t_minus_days: 244,
    controls_in_scope: 175,
    workpapers_in_production: 22,
    pod_lead: "jamie",
    health: "on_track",
    defensibility_avg: 88,
  },
  {
    id: "eng_aperture_s1",
    company: "Aperture Materials, Inc.",
    short: "Aperture",
    program: "S-1 readiness",
    audit_firm: "EY",
    audit_partner: "Yuki Tanaka",
    target_filing: "Q2 2027",
    t_minus_days: 332,
    controls_in_scope: 142,
    workpapers_in_production: 4,
    pod_lead: "priya",
    health: "on_track",
    defensibility_avg: 79,
  },
  {
    id: "eng_pelagic_s1",
    company: "Pelagic Climate Systems, Inc.",
    short: "Pelagic",
    program: "S-1 readiness",
    audit_firm: "PwC",
    audit_partner: "David Mensah",
    target_filing: "Q3 2027",
    t_minus_days: 418,
    controls_in_scope: 96,
    workpapers_in_production: 2,
    pod_lead: "marcus",
    health: "at_risk",
    defensibility_avg: 71,
  },
];

// ---------- Workpaper production queue (28 items) ----------
// States: agent_drafted -> fde_review -> customer_review -> customer_signoff -> auditor_handoff
const WP_STATES = ["agent_drafted", "fde_review", "customer_review", "customer_signoff", "auditor_handoff"];
const WP_STATE_LABELS = {
  agent_drafted:    "Agent drafted",
  fde_review:       "FDE review",
  customer_review:  "Customer review",
  customer_signoff: "Customer sign-off",
  auditor_handoff:  "Auditor handoff",
};
const WP_STATE_DOTS = {
  agent_drafted:    "#6d28d9",  // violet — synthesized
  fde_review:       "#f59e0b",  // amber — needs human
  customer_review:  "#0e7490",  // teal — at customer
  customer_signoff: "#047857",  // green — signed
  auditor_handoff:  "#1B5E20",  // dark green — at auditor
};
window.WP_STATE_LABELS = WP_STATE_LABELS;
window.WP_STATE_DOTS = WP_STATE_DOTS;

// Build 28 workpapers spread across engagements + states with realistic deadlines.
function buildQueue() {
  const items = [];
  // Helios — 22 workpapers
  const heliosWPs = [
    { id: "RC-047", deadline_days:  4, state: "fde_review",       assigned: "jamie",  defensibility: 92, big4_visible: true },
    { id: "RC-012", deadline_days:  2, state: "fde_review",       assigned: "priya",  defensibility: 84, big4_visible: true },
    { id: "RC-053", deadline_days:  6, state: "agent_drafted",    assigned: "marcus", defensibility: 71, big4_visible: true },
    { id: "RC-068", deadline_days:  9, state: "agent_drafted",    assigned: "marcus", defensibility: 68, big4_visible: true },
    { id: "FR-002", deadline_days:  3, state: "customer_review",  assigned: "jamie",  defensibility: 86, big4_visible: true },
    { id: "FR-007", deadline_days:  7, state: "fde_review",       assigned: "priya",  defensibility: 79, big4_visible: true },
    { id: "FR-021", deadline_days:  1, state: "fde_review",       assigned: "jamie",  defensibility: 64, big4_visible: true, urgent: true },
    { id: "FR-014", deadline_days: 14, state: "customer_review",  assigned: "priya",  defensibility: 91, big4_visible: true },
    { id: "FR-018", deadline_days: 18, state: "customer_signoff", assigned: "jamie",  defensibility: 96, big4_visible: true },
    { id: "IT-001", deadline_days:  5, state: "fde_review",       assigned: "jamie",  defensibility: 73, big4_visible: true },
    { id: "IT-003", deadline_days:  8, state: "fde_review",       assigned: "marcus", defensibility: 81, big4_visible: true },
    { id: "IT-009", deadline_days: 12, state: "customer_review",  assigned: "priya",  defensibility: 88, big4_visible: true },
    { id: "IT-015", deadline_days: 20, state: "auditor_handoff",  assigned: "jamie",  defensibility: 100, big4_visible: true },
    { id: "PC-002", deadline_days: 11, state: "customer_review",  assigned: "marcus", defensibility: 87, big4_visible: true },
    { id: "PC-007", deadline_days: 22, state: "customer_signoff", assigned: "priya",  defensibility: 94, big4_visible: true },
    { id: "PC-012", deadline_days: 28, state: "auditor_handoff",  assigned: "jamie",  defensibility: 100, big4_visible: true },
    { id: "OP-003", deadline_days: 15, state: "customer_review",  assigned: "marcus", defensibility: 82, big4_visible: false },
    { id: "OP-005", deadline_days: 19, state: "customer_signoff", assigned: "priya",  defensibility: 95, big4_visible: false },
    { id: "TX-002", deadline_days: 25, state: "auditor_handoff",  assigned: "jamie",  defensibility: 100, big4_visible: false },
    { id: "TR-001", deadline_days: 30, state: "customer_signoff", assigned: "priya",  defensibility: 93, big4_visible: false },
    { id: "RC-101", deadline_days: 17, state: "agent_drafted",    assigned: "marcus", defensibility: 62, big4_visible: false },
    { id: "FR-029", deadline_days: 21, state: "agent_drafted",    assigned: "marcus", defensibility: 65, big4_visible: false },
  ];
  heliosWPs.forEach(wp => items.push({
    ...wp,
    engagement_id: "eng_helios_s1",
    engagement_short: "Helios",
    audit_firm: "Deloitte",
    last_change_at: ["2026-05-08T15:14:00-07:00","2026-05-09T11:22:00-07:00","2026-05-10T09:48:00-07:00","2026-05-11T13:30:00-07:00","2026-05-12T08:42:00-07:00"][wp.id.charCodeAt(wp.id.length-1) % 5],
  }));
  // Aperture — 4 workpapers
  [
    { id: "AP-RC-008", deadline_days: 38, state: "fde_review",       assigned: "priya",  defensibility: 76 },
    { id: "AP-RC-014", deadline_days: 42, state: "agent_drafted",    assigned: "marcus", defensibility: 64 },
    { id: "AP-IT-002", deadline_days: 50, state: "fde_review",       assigned: "priya",  defensibility: 81 },
    { id: "AP-FR-003", deadline_days: 60, state: "customer_review",  assigned: "priya",  defensibility: 84 },
  ].forEach(wp => items.push({ ...wp, engagement_id: "eng_aperture_s1", engagement_short: "Aperture", audit_firm: "EY", big4_visible: true, last_change_at: "2026-05-11T14:18:00-07:00" }));
  // Pelagic — 2 workpapers
  [
    { id: "PL-RC-002", deadline_days: 70, state: "fde_review",     assigned: "marcus", defensibility: 70 },
    { id: "PL-FR-001", deadline_days: 80, state: "agent_drafted",  assigned: "marcus", defensibility: 58 },
  ].forEach(wp => items.push({ ...wp, engagement_id: "eng_pelagic_s1", engagement_short: "Pelagic", audit_firm: "PwC", big4_visible: true, last_change_at: "2026-05-10T11:45:00-07:00" }));
  return items;
}
window.WP_QUEUE = buildQueue();

// ---------- Big 4 firm templates ----------
window.BIG4_TEMPLATES = [
  {
    firm: "Deloitte",
    color: "#1B5E20",
    ref_prefix: "D-WP-",
    tickmark_conventions: [
      { mark: "✓", meaning: "Agreed to source document without exception" },
      { mark: "§", meaning: "Recalculated; mathematically accurate" },
      { mark: "¶", meaning: "Footed and cross-footed" },
      { mark: "b", meaning: "Traced to general ledger" },
      { mark: "c", meaning: "Compared to threshold; within policy" },
      { mark: "‡", meaning: "Significant judgment; reviewer note required" },
      { mark: "†", meaning: "Reviewer override; rationale documented" },
    ],
    section_order: ["Header", "Objective", "Narrative", "Procedures", "Sampling", "Evidence", "Exceptions", "Conclusion"],
    voice: "Direct, third-person past tense. Avoid hedging language. Tickmark annotations inline with each test step.",
    evidence_format: "Filename · source system · captured by · timestamp · size · tickmark",
    used_in_engagements: 1,
    notes: "Helios uses this template. Most common Big 4 conventions in the pre-IPO segment.",
  },
  {
    firm: "EY",
    color: "#FFE600",
    ref_prefix: "EY-WP-",
    tickmark_conventions: [
      { mark: "TP", meaning: "Test performed without exception" },
      { mark: "AGR", meaning: "Agreed to supporting document" },
      { mark: "RC", meaning: "Recalculated" },
      { mark: "F", meaning: "Footed" },
      { mark: "X", meaning: "Cross-footed" },
      { mark: "INQ", meaning: "Inquired of management" },
      { mark: "EXC", meaning: "Exception — see disposition" },
    ],
    section_order: ["Cover", "Background", "Risk assessment", "Procedures", "Sample selection", "Results", "Exceptions", "Conclusion"],
    voice: "Risk-led framing. Procedures explicitly mapped to the risk they address.",
    evidence_format: "Source system | captured | by | sha256 | tickmark",
    used_in_engagements: 1,
    notes: "Aperture uses this template. Risk-led framing is EY's signature.",
  },
  {
    firm: "PwC",
    color: "#D04A02",
    ref_prefix: "PwC-WP-",
    tickmark_conventions: [
      { mark: "P", meaning: "Procedure performed; no exception" },
      { mark: "A", meaning: "Agreed to source" },
      { mark: "R", meaning: "Recalculated; accurate" },
      { mark: "I", meaning: "Inspected supporting evidence" },
      { mark: "O", meaning: "Observed control operation" },
      { mark: "M", meaning: "Reperformed control procedure" },
      { mark: "E", meaning: "Exception identified — see follow-up" },
    ],
    section_order: ["WP reference", "Control identification", "Risk linkage", "Test procedures", "Sample population", "Findings", "Conclusion"],
    voice: "Procedural and evidentiary. Test steps explicit, sample populations stated up front.",
    evidence_format: "Reference | source | captured by | timestamp | tickmark",
    used_in_engagements: 1,
    notes: "Pelagic uses this template. Sample populations called out before procedures.",
  },
  {
    firm: "KPMG",
    color: "#00338D",
    ref_prefix: "KPMG-WP-",
    tickmark_conventions: [
      { mark: "✓", meaning: "Without exception" },
      { mark: "✓₁", meaning: "Agreed to system" },
      { mark: "✓₂", meaning: "Agreed to underlying support" },
      { mark: "ƒ", meaning: "Footed" },
      { mark: "x", meaning: "Cross-referenced" },
      { mark: "‡", meaning: "Management judgment applied" },
      { mark: "ε", meaning: "Exception noted" },
    ],
    section_order: ["WP header", "Control overview", "Procedures performed", "Test results", "Exceptions and follow-up", "Conclusion"],
    voice: "Concise and evidentiary. Numeric subscripts on tickmarks indicate evidence depth.",
    evidence_format: "Artifact_id · system · captured · captor · sha256 · tickmark",
    used_in_engagements: 0,
    notes: "Available for use; no current engagement assigned.",
  },
];

// ---------- Defensibility scorer findings (mock Claude output for RC-047) ----------
window.SCORER_RC_047 = {
  control_id: "RC-047",
  reviewer_persona: "Big-4 senior reviewing this workpaper before partner sign-off",
  generated_at: "2026-05-12T10:42:00-07:00",
  model: "claude-sonnet-4-5",
  prompt_tokens: 4280,
  completion_tokens: 1850,
  findings: [
    {
      id: "find_01",
      priority: "high",
      category: "Sample selection rationale",
      finding: "Procedure 3 references stratified sampling and judgmental selection, but the workpaper does not explicitly document the agreed-upon methodology with the engagement team. A Big-4 senior will flag this as a sufficiency-of-procedures risk.",
      fix: "Add a single sentence to the sample-selection rationale: \"Methodology agreed in walkthrough with Deloitte engagement team on 2026-02-04, memo MEMO-SS-RC-047.\" Reference the artifact directly.",
      effort: "2 min",
    },
    {
      id: "find_02",
      priority: "medium",
      category: "Tickmark coverage",
      finding: "Tickmarks ‡ (significant judgment) and † (reviewer override) appear in the procedure list but are not used in the evidence section. Big-4 conventions expect that any significant-judgment procedure has at least one evidence artifact tagged with the same mark.",
      fix: "Tag the threshold memo (M-2026-Q1-MJE) artifact with ‡ in the evidence list, since it documents the management judgment that established the $250k threshold.",
      effort: "1 min",
    },
    {
      id: "find_03",
      priority: "low",
      category: "Reviewer comment specificity",
      finding: "Reviewer comment rc_01 says \"sample weighting toward period-end is appropriate\" but does not state what specifically was reviewed to reach that conclusion. Partner-level reviewers prefer comments that point to the evidence consulted.",
      fix: "Reword rc_01 to: \"Sample Tier 2 weighting toward period-end (March 2026) reviewed against the Q1 close calendar (M-2026-Q1-CALENDAR) and population concentration (NS-Saved-Search-MJE-ALL-047, row 47-218); appropriate given Q1 close timing.\"",
      effort: "3 min",
    },
  ],
  defensibility_before: 86,
  defensibility_after_estimate: 96,
};

// ---------- Mock streaming agent draft for testing procedures section ----------
// Split into tokens for fake streaming.
window.AGENT_DRAFT_PROCEDURES = {
  section: "Testing procedures",
  triggered_by: "Jamie Okonkwo",
  triggered_at: "2026-05-12T09:14:00-07:00",
  model: "claude-sonnet-4-5",
  prompt_summary: "Draft Big-4-style testing procedures for RC-047 (manual JE approval — revenue recognition). Follow Deloitte tickmark conventions. Reference threshold $250k, sample size 25, population 218.",
  tokens: [
    "1. Obtain ", "the ", "population ", "of all ", "manual ", "journal ", "entries ",
    "posted ", "to ", "revenue ", "accounts ", "during ", "the ", "testing ", "period ",
    "from ", "NetSuite ", "(saved ", "search ", "NS-Saved-Search-MJE-ALL-047). ",
    "Foot ", "the ", "population ", "and ", "reconcile ", "to ", "general ", "ledger ", "activity. ",
    "[PBC, b, ¶]\n\n",
    "2. ", "From ", "the ", "population, ", "select ", "a ", "sample ", "of ", "25 ", "entries ",
    "using ", "stratified ", "sampling: ", "100% ", "of ", "entries ", "≥ ", "$1,000,000; ",
    "judgmental ", "selection ", "across ", "the ", "remainder ", "weighted ", "toward ",
    "period-end ", "and ", "unusual ", "postings. ", "[§]\n\n",
    "3. ", "For ", "each ", "sampled ", "entry, ", "agree ", "the ", "approval ", "evidence ",
    "captured ", "in ", "NetSuite ", "to ", "the ", "underlying ", "support ", "and ",
    "verify ", "the ", "approver ", "was ", "independent ", "of ", "the ", "preparer ",
    "at ", "the ", "appropriate ", "authorization ", "level. ", "[✓, c]\n\n",
    "4. ", "Verify ", "dual ", "approval ", "was ", "obtained ", "prior ", "to ", "posting ",
    "for ", "all ", "entries ", "≥ ", "$250,000. ", "Single ", "approval ", "by ", "a ",
    "Senior ", "Accountant ", "is ", "sufficient ", "below ", "the ", "threshold. ", "[✓, c]\n\n",
    "5. ", "Inspect ", "the ", "weekly ", "exception ", "report ", "and ", "verify ",
    "each ", "flagged ", "entry ", "was ", "dispositioned ", "within ", "5 ", "business ",
    "days; ", "agree ", "any ", "overrides ", "to ", "the ", "override ", "log ", "and ",
    "supporting ", "rationale. ", "[✓, †]\n\n",
    "[REQUIRES HUMAN REVIEW: ", "Procedure 6 ", "(threshold ", "review) ", "involves ",
    "management ", "judgment ", "on ", "materiality ", "and ", "should ", "be ", "drafted ",
    "by ", "the ", "FDE ", "reviewer ", "with ", "reference ", "to ", "memo ",
    "M-2026-Q1-MJE.]\n"
  ],
};

// ---------- Audit trail seed for RC-047 (workpaper editor right pane) ----------
window.AUDIT_TRAIL_RC_047 = [
  { at: "2026-05-09T08:14:00-07:00", actor: "marcus", action: "Agent generated initial draft (narrative section)", before_summary: "—", after_summary: "847 tokens, claude-sonnet-4-5", reason: "Initial draft trigger" },
  { at: "2026-05-09T08:14:08-07:00", actor: "marcus", action: "Tagged AGENT_DRAFT", before_summary: "—", after_summary: "Narrative tagged as AGENT_DRAFT", reason: "Auto-tag on agent output" },
  { at: "2026-05-10T11:22:00-07:00", actor: "marcus", action: "FDE edit: rewrote para 1 of narrative", before_summary: "Manual JE >= $250k…", after_summary: "Helios Robotics applies a $250,000 single-entry threshold…", reason: "Tighten language for Big-4 voice" },
  { at: "2026-05-10T11:24:00-07:00", actor: "marcus", action: "Section status: AGENT_DRAFT → REVIEWED", before_summary: "Narrative AGENT_DRAFT", after_summary: "Narrative REVIEWED", reason: "FDE approved revised draft" },
  { at: "2026-05-11T13:30:00-07:00", actor: "priya", action: "FDE edit: refined narrative para 2", before_summary: "The control owner reviews quarterly", after_summary: "The control owner reviews the threshold quarterly against the materiality benchmark…", reason: "Specificity for Deloitte voice" },
  { at: "2026-05-12T09:14:00-07:00", actor: "jamie", action: "Agent triggered: testing procedures section", before_summary: "Empty", after_summary: "(streaming)", reason: "Initial draft of section" },
];

// ---------- Handoff package data (for Helios) ----------
window.HANDOFF_HELIOS = {
  engagement_id: "eng_helios_s1",
  package_id: "PKG-HELIOS-Q1-2026",
  generated_at: "2026-05-12T11:08:00-07:00",
  generated_by: "jamie",
  destination: { firm: "Deloitte & Touche LLP", contact: "Naomi Wilkes, Engagement Partner" },
  contents: {
    workpapers_signed: 4,
    evidence_artifacts: 23,
    cover_memo_pages: 3,
    audit_log_rows: 184,
  },
  cover_memo: {
    scope: "Q1 2026 SOX 404 testing — 22 in-scope controls across Revenue Cycle, Financial Reporting, IT General Controls, and Period Close. Optro Provenance v1 signature attached to every workpaper.",
    methodology: "Stratified judgmental sampling, methodology pre-agreed with Deloitte engagement team in 2026-02-04 walkthrough.",
    exceptions: "Two low-severity exceptions across testing: JE-2026-0098 (illegible initials, electronically reconfirmed); JE-2026-0214 (threshold-bypass override, documented and reviewed).",
    optro_metadata: "All 4 workpapers carry provenance signatures with rec_optro_defens_* citation. Audit log exports as CSV; 184 state transitions captured.",
  },
  manifest_preview: [
    { file: "RC-047_workpaper_signed.pdf", size: "412 KB", sha256: "9a2f3c…", signed_by: "Pranav Iyer (Controller, Helios) · 2026-05-11", optro_rec: "rec_optro_defens_047" },
    { file: "FR-018_workpaper_signed.pdf", size: "488 KB", sha256: "7b1e44…", signed_by: "Pranav Iyer (Controller, Helios) · 2026-05-10", optro_rec: "rec_optro_defens_018" },
    { file: "PC-007_workpaper_signed.pdf", size: "356 KB", sha256: "4c8d11…", signed_by: "Pranav Iyer (Controller, Helios) · 2026-05-09", optro_rec: "rec_optro_defens_007" },
    { file: "OP-005_workpaper_signed.pdf", size: "278 KB", sha256: "1f9a8d…", signed_by: "Tara Okoye (CAE, Helios) · 2026-05-08", optro_rec: "rec_optro_defens_op_005" },
    { file: "PKG-HELIOS-Q1-2026_cover_memo.pdf", size: "84 KB", sha256: "e2c901…", signed_by: "Jamie Okonkwo (Optro Practice) · 2026-05-12", optro_rec: "rec_optro_pkg_helios_q1" },
    { file: "PKG-HELIOS-Q1-2026_audit_log.csv", size: "62 KB", sha256: "a14c22…", signed_by: "—", optro_rec: "rec_optro_log_helios_q1" },
  ],
};

// ---------- Portfolio metrics (Option H exec view) ----------
window.PORTFOLIO_METRICS = {
  as_of: "2026-05-12",
  pod_utilization: { jamie: 92, priya: 88, marcus: 78 },
  workpapers_shipped_this_quarter: 14,
  workpapers_in_progress: 28,
  avg_defensibility_at_handoff: 96,
  avg_rework_rate_at_auditor: 4,  // %
  industry_rework_rate: 18,
  engagements_on_track: 2,
  engagements_at_risk: 1,
  hours_saved_vs_baseline: 1840,  // hours saved by agent drafting + scorer
  customer_handoff_pkgs_shipped: 3,
};

// ===================================================================
// GROUP D — Velocity self-serve customer (AI-Native Newcomers hedge)
// ===================================================================

// Riya — Velocity self-serve VP Finance at Helios (different persona
// from Anton/Pranav, who are Optro Practice customers in Tabs A/C).
window.VELOCITY_BUYER = {
  name: "Riya Patel",
  role: "VP Finance Operations",
  org: "Helios Robotics",
  initials: "RP",
  color: "#0e7490",
  signed_up: "2026-04-22",
  pricing_tier: "Velocity self-serve · $1,800/mo",
  controls_generated_minutes: 11,   // Velocity wizard ran in 11 min
  s1_t_minus_months: 3,             // T-3 to S-1
  walkthrough_in_weeks: 6,          // Deloitte walkthrough in 6 weeks
  walkthrough_date: "2026-06-24",
};

// 12 sample workpapers in various states of completion
window.VELOCITY_WORKPAPERS = [
  { id: "RC-047", name: "Manual JE approval — revenue recognition", state: "ready_to_export", defensibility: 92, evidence_attached: 5, evidence_required: 5, big4: "Deloitte" },
  { id: "RC-012", name: "Revenue recognition — contract review (ASC 606)", state: "rehearsed", defensibility: 88, evidence_attached: 4, evidence_required: 5, big4: "Deloitte" },
  { id: "FR-018", name: "Lease accounting (ASC 842) classification", state: "rehearsed", defensibility: 90, evidence_attached: 4, evidence_required: 4, big4: "Deloitte" },
  { id: "RC-053", name: "Sales returns and allowances accrual", state: "checked", defensibility: 78, evidence_attached: 3, evidence_required: 5, big4: "Deloitte" },
  { id: "IT-001", name: "Logical access — production database", state: "checked", defensibility: 71, evidence_attached: 2, evidence_required: 4, big4: "Deloitte" },
  { id: "IT-003", name: "Privileged user access review — quarterly", state: "checked", defensibility: 74, evidence_attached: 3, evidence_required: 4, big4: "Deloitte" },
  { id: "PC-002", name: "Trial balance review and approval", state: "evidence_pending", defensibility: 0, evidence_attached: 1, evidence_required: 3, big4: "Deloitte" },
  { id: "PC-007", name: "Bank reconciliation review", state: "evidence_pending", defensibility: 0, evidence_attached: 2, evidence_required: 4, big4: "Deloitte" },
  { id: "FR-002", name: "Period-end accruals review", state: "generated", defensibility: 0, evidence_attached: 0, evidence_required: 4, big4: "Deloitte" },
  { id: "FR-007", name: "Goodwill impairment indicator analysis", state: "generated", defensibility: 0, evidence_attached: 0, evidence_required: 3, big4: "Deloitte" },
  { id: "OP-003", name: "Vendor master file change review", state: "draft", defensibility: 0, evidence_attached: 0, evidence_required: 3, big4: "Deloitte" },
  { id: "TX-002", name: "Income tax provision review", state: "draft", defensibility: 0, evidence_attached: 0, evidence_required: 4, big4: "Deloitte" },
];

window.VELOCITY_STATE_LABELS = {
  draft:            "Draft",
  generated:        "Agent-generated",
  evidence_pending: "Evidence pending",
  checked:          "Defensibility checked",
  rehearsed:        "Rehearsed",
  ready_to_export:  "Ready to export",
};
window.VELOCITY_STATE_COLORS = {
  draft:            "#94a3b8",
  generated:        "#6d28d9",
  evidence_pending: "#f59e0b",
  checked:          "#0e7490",
  rehearsed:        "#047857",
  ready_to_export:  "#1B5E20",
};

// ---------- Streaming workpaper generator (Deloitte template, RC-047) ----------
// Split into tokens for fake streaming; total ~280 tokens, feels like 30-60s.
window.VELOCITY_GENERATOR_RC_047 = {
  big4: "Deloitte",
  control_id: "RC-047",
  control_name: "Manual journal entry approval — revenue recognition",
  generated_at: "2026-05-13T09:11:00-07:00",
  generated_by: "Velocity workpaper generator · claude-sonnet-4-5",
  generation_seconds: 47,  // Total streaming time we target
  sections: [
    { id: "header", title: "Workpaper header", tokens: [
      "Workpaper ", "reference: ", "VLC-WP-RC-047-Q22026\n",
      "Control: ", "RC-047 — ", "Manual ", "journal ", "entry ", "approval — ", "revenue ", "recognition\n",
      "Period: ", "Q2 2026 ", "(Apr 1 — ", "Jun 30, ", "2026)\n",
      "Framework: ", "COSO 2013 / AS 2201 · ", "Deloitte ", "tickmark ", "conventions\n",
      "Prepared by: ", "Riya ", "Patel ", "(VP ", "Finance ", "Ops, ", "Helios) · ", "[date]\n",
      "Reviewed by: ", "[pending]"
    ]},
    { id: "narrative", title: "Control narrative", tokens: [
      "Helios ", "Robotics ", "applies ", "a ", "$250,000 ", "single-entry ", "threshold ",
      "to ", "its ", "manual ", "journal ", "entry ", "(\"MJE\") ", "approval ", "workflow ",
      "within ", "NetSuite. ", "Manual ", "entries ", "posted ", "to ", "any ", "of ",
      "the ", "47 ", "in-scope ", "revenue ", "ledger ", "accounts ", "that ", "meet ",
      "or ", "exceed ", "the ", "threshold ", "require ", "a ", "second-level ", "approval ",
      "from ", "the ", "VP Finance ", "Ops ", "prior ", "to ", "posting. ", "Entries ",
      "below ", "the ", "threshold ", "require ", "single ", "approval ", "by ", "a ",
      "Senior ", "Accountant. ", "The ", "threshold ", "is ", "reviewed ", "quarterly ",
      "against ", "the ", "materiality ", "benchmark ", "for ", "the ", "audit ", "period."
    ]},
    { id: "procedures", title: "Testing procedures", tokens: [
      "1. Obtain ", "the ", "population ", "of ", "all ", "manual ", "journal ", "entries ",
      "posted ", "to ", "revenue ", "accounts ", "during ", "Q2 2026 ", "from ", "NetSuite. ",
      "Foot ", "the ", "population ", "and ", "reconcile ", "to ", "general ", "ledger ", "activity. ",
      "[PBC, b, ¶]\n\n",
      "2. ", "Select ", "a ", "sample ", "of ", "25 ", "entries ", "using ", "stratified ", "sampling: ",
      "100% ", "of ", "entries ", "≥ ", "$1M; ", "judgmental ", "selection ", "across ", "remainder, ",
      "period-end-weighted. ", "[§]\n\n",
      "3. ", "Agree ", "each ", "sampled ", "approval ", "to ", "the ", "NetSuite ", "workflow ",
      "record ", "and ", "verify ", "approver ", "independence ", "and ", "authorization ", "level. ",
      "[✓, c]\n\n",
      "4. ", "Verify ", "dual ", "approval ", "for ", "all ", "entries ", "≥ ", "$250,000 ",
      "prior ", "to ", "posting. ", "[✓, c]\n\n",
      "5. ", "Inspect ", "weekly ", "exception ", "report; ", "verify ", "each ", "flagged ",
      "entry ", "was ", "dispositioned ", "within ", "5 ", "business ", "days. ", "[✓, †]\n\n",
      "6. ", "[REQUIRES ", "HUMAN ", "REVIEW: ", "threshold ", "review ", "procedure — ",
      "draft ", "with ", "reference ", "to ", "Helios ", "materiality ", "memo.]"
    ]},
    { id: "sampling", title: "Sample selection rationale", tokens: [
      "Stratified ", "judgmental ", "selection ", "of ", "25 ", "entries ", "from ", "a ",
      "population ", "of ", "~220 ", "Q2 ", "manual ", "entries. ", "Tier ", "1 ", "(≥ $1M): ",
      "100% ", "coverage. ", "Tier ", "2 ", "($250k–$1M): ", "judgmental, ", "period-end-weighted. ",
      "Tier ", "3 ", "(< ", "$250k): ", "judgmental, ", "biased ", "toward ", "unusual ", "postings. ",
      "Methodology ", "to ", "be ", "agreed ", "with ", "Deloitte ", "engagement ", "team ", "in ",
      "walkthrough; ", "Velocity ", "will ", "flag ", "as ", "pending ", "until ", "memo ", "attached."
    ]},
    { id: "tickmarks", title: "Tickmark legend (Deloitte standard)", tokens: [
      "✓ ", "Agreed ", "to ", "source ", "document ", "without ", "exception\n",
      "§ ", "Recalculated; ", "mathematically ", "accurate\n",
      "¶ ", "Footed ", "and ", "cross-footed\n",
      "b ", "Traced ", "to ", "general ", "ledger\n",
      "c ", "Compared ", "to ", "threshold; ", "within ", "policy\n",
      "‡ ", "Significant ", "judgment; ", "reviewer ", "note ", "required\n",
      "† ", "Reviewer ", "override; ", "rationale ", "documented\n",
      "PBC ", "Provided ", "by ", "client; ", "agreed ", "to ", "underlying"
    ]},
    { id: "evidence_slots", title: "Evidence attachment slots", tokens: [
      "[SLOT 1] ", "Population ", "query ", "export ", "from ", "NetSuite ", "(NS-Saved-Search-MJE-ALL-047) · ", "PBC\n",
      "[SLOT 2] ", "Sample ", "selection ", "memo ", "(Velocity-generated, ", "FDE-reviewed) · ", "§\n",
      "[SLOT 3] ", "NetSuite ", "workflow ", "configuration ", "screenshot · ", "✓\n",
      "[SLOT 4] ", "Approval ", "evidence ", "export ", "(per-sample) · ", "✓\n",
      "[SLOT 5] ", "Weekly ", "exception ", "report ", "(Q2 2026) · ", "†"
    ]},
    { id: "exceptions", title: "Exceptions template", tokens: [
      "[Template ", "for ", "customer ", "to ", "populate ", "as ", "testing ", "proceeds. ",
      "Each ", "exception: ", "entry ", "reference, ", "description, ", "severity, ",
      "disposition, ", "dispositioned ", "by, ", "date.]"
    ]},
    { id: "conclusion", title: "Conclusion", tokens: [
      "Based ", "on ", "procedures ", "performed, ", "the ", "control ", "operated ",
      "effectively ", "throughout ", "the ", "testing ", "period. ", "[Update ", "after ",
      "evidence ", "attached ", "and ", "exceptions ", "logged. ", "Add ", "reviewer ", "sign-off.]"
    ]},
  ],
};

// ---------- Evidence files for the upload demo (4 files, agent maps to slots) ----------
window.VELOCITY_EVIDENCE_FILES = [
  {
    filename: "RC-047_Q2_population_export.csv",
    size: "94 KB", type: "CSV",
    mock_thumb: "csv",
    suggested_slot: 1,
    suggested_label: "Population query export — NS-Saved-Search-MJE-ALL-047",
    suggested_confidence: 0.96,
    rationale: "Filename matches RC-047 + Q2 + population pattern; CSV format consistent with NetSuite saved-search export schema.",
    hash: "sha256:7f0c19...",
  },
  {
    filename: "RC-047_sample_memo_v3.pdf",
    size: "186 KB", type: "PDF",
    mock_thumb: "pdf",
    suggested_slot: 2,
    suggested_label: "Sample selection memo · stratified methodology",
    suggested_confidence: 0.92,
    rationale: "PDF, RC-047 + sample_memo naming; content scan detects stratified-sampling language and tier breakdown.",
    hash: "sha256:c3b801...",
  },
  {
    filename: "NS_workflow_screenshot_WF-MJE-RR-047.png",
    size: "318 KB", type: "PNG",
    mock_thumb: "png",
    suggested_slot: 3,
    suggested_label: "NetSuite workflow rule WF-MJE-RR-047 configuration",
    suggested_confidence: 0.98,
    rationale: "Filename references the exact NetSuite workflow rule cited in the workpaper narrative; image dimensions consistent with admin-panel screenshot.",
    hash: "sha256:9a2f3c...",
  },
  {
    filename: "Q2_exception_report_weekly_RC-047.xlsx",
    size: "62 KB", type: "XLSX",
    mock_thumb: "xlsx",
    suggested_slot: 5,
    suggested_label: "Weekly exception report (Q2 2026)",
    suggested_confidence: 0.94,
    rationale: "XLSX with Q2 + exception_report + RC-047 naming; structure detected (13 weekly tabs) matches expected schema.",
    hash: "sha256:a14c22...",
  },
  // Slot 4 (approval evidence per sample) is intentionally NOT attached — surfaces as a defensibility-check gap.
];

// ---------- Defensibility self-check (78 → 92 fix loop) ----------
window.VELOCITY_DEFENSIBILITY_CHECK = {
  control_id: "RC-047",
  big4: "Deloitte",
  generated_at: "2026-05-13T09:42:00-07:00",
  generated_by: "Velocity defensibility scorer · claude-sonnet-4-5",
  initial_score: 78,
  after_fixes_estimate: 92,
  checklist: [
    { id: "ck_01", state: "ok",  item: "Workpaper header includes period, framework, preparer" },
    { id: "ck_02", state: "ok",  item: "Tickmark legend matches Deloitte standard" },
    { id: "ck_03", state: "ok",  item: "Every procedure annotated with tickmark references" },
    { id: "ck_04", state: "miss", item: "Slot 4 (approval evidence per sample) missing — 25 sampled entries each need an approval export" },
    { id: "ck_05", state: "ok",  item: "Sample population stratification rationale present" },
    { id: "ck_06", state: "miss", item: "Sample methodology not yet referenced to Deloitte walkthrough memo (pending — to be confirmed in walkthrough)" },
    { id: "ck_07", state: "miss", item: "Reviewer sign-off field empty; needs Controller signature before package export" },
    { id: "ck_08", state: "ok",  item: "Exceptions template prepared; awaiting customer-logged exceptions" },
    { id: "ck_09", state: "ok",  item: "Conclusion section drafted with placeholder for sign-off note" },
    { id: "ck_10", state: "partial", item: "Procedure 6 (threshold review) flagged REQUIRES HUMAN REVIEW — needs Velocity user to draft with materiality memo reference" },
  ],
  fixes: [
    { id: "fix_01", priority: "high",
      addresses: ["ck_04"],
      title: "Generate approval-evidence export for 25 sampled entries",
      description: "Slot 4 is empty. A real Big-4 reviewer expects per-sample evidence that approval was captured prior to posting. Run the NetSuite saved-search NS-Saved-Search-MJE-APPR-047 (Velocity will pre-build this for you) and attach the CSV to Slot 4.",
      auto_action: "Generate the saved-search and attach the export",
      score_lift: 8,
    },
    { id: "fix_02", priority: "high",
      addresses: ["ck_07"],
      title: "Reviewer sign-off — Controller signature",
      description: "Send the workpaper to the Controller (Pranav Iyer) for sign-off. Velocity will route it via the workflow and capture the timestamp on signature.",
      auto_action: "Route to Pranav Iyer for sign-off",
      score_lift: 4,
    },
    { id: "fix_03", priority: "medium",
      addresses: ["ck_10"],
      title: "Draft procedure 6 (threshold review) using materiality memo",
      description: "Procedure 6 is flagged REQUIRES HUMAN REVIEW. Reference the Q1 materiality memo (M-2026-Q1-MJE) in the procedure text and tag with ‡. Velocity will pre-fill the procedure outline; you confirm.",
      auto_action: "Pre-fill procedure 6 outline; you confirm and tag",
      score_lift: 2,
    },
  ],
};

// ---------- Walkthrough rehearsal — Q&A flow (THE moat for Tab D) ----------
// Agent acts as a Big-4 senior reviewer asking the customer questions.
window.VELOCITY_REHEARSAL = {
  control_id: "RC-047",
  big4: "Deloitte",
  reviewer_persona: "Deloitte senior preparing for Q2 walkthrough",
  generated_at: "2026-05-13T11:18:00-07:00",
  generated_by: "Velocity walkthrough rehearsal · claude-sonnet-4-5",
  questions: [
    {
      n: 1,
      area: "Sample selection",
      prompt: "Walk me through how you selected your sample for RC-047 this quarter. Why 25 entries? Why stratified and not statistical?",
      practice_answer_hint: "Cover: population size (~220), stratification rationale (Tier 1/2/3), period-end weighting, agreement with the engagement team on methodology.",
      good_answer:
        "Sample size of 25 was selected to balance coverage with audit effort. We stratified into three tiers: Tier 1 (entries ≥ $1M) at 100% coverage because of materiality; Tier 2 ($250k–$1M) using judgmental selection weighted toward period-end where unusual postings concentrate; Tier 3 (< $250k) using judgmental selection biased toward round-dollar amounts and reversal pairs that often signal manual offsets. The methodology was agreed with the Deloitte engagement team during our 2026-02-04 walkthrough; memo MEMO-SS-RC-047 attached to the workpaper.",
      bad_answer:
        "We used 25 because that's what the prior period workpaper said. We picked entries that looked interesting.",
      feedback_for_bad_answer:
        "This would likely trigger a sufficiency-of-procedures finding. A Big-4 senior will ask why 25 specifically (not 20, not 50) and what made each entry 'interesting'. Refer to the stratification tiers and the methodology memo when you answer.",
    },
    {
      n: 2,
      area: "Threshold rationale",
      prompt: "The $250,000 dual-approval threshold — how did you establish it, and how often is it reviewed?",
      practice_answer_hint: "Cover: materiality benchmark for the audit period, quarterly review, who signs the threshold review memo, prior-period threshold for comparison.",
      good_answer:
        "The $250,000 threshold is set against the Deloitte engagement team's materiality benchmark for the audit period, which is currently $312,000 at 5% of pre-tax income normalized for our growth profile. We set the dual-approval bar deliberately below materiality to provide a margin for aggregated exposures. The threshold is reviewed quarterly; the Controller signs the threshold review memo at each cycle. Prior period was $200,000, raised in Q1 to reflect the increase in materiality.",
      bad_answer:
        "The threshold was set when the control was designed; I'd have to check what it was.",
      feedback_for_bad_answer:
        "A senior reviewer will probe this hard. Threshold judgments are exactly where management-letter findings live. Make sure you can speak to the materiality basis, the review cadence, and the most recent change.",
    },
    {
      n: 3,
      area: "Exception disposition",
      prompt: "I see entry JE-2026-0214 was flagged in the exception report — what did you do?",
      practice_answer_hint: "Cover: the entry-specific story, why the override was needed, who reviewed, that the rationale was documented, how this differs from a control deficiency.",
      good_answer:
        "JE-2026-0214 was a $248,900 deferred-revenue true-up posted at period-end. It was below our $250k dual-approval threshold but flagged by the exception report because of the round-dollar amount and the manual offset pattern. The override was a system-level bypass for the period-end true-up workflow; the rationale was documented in override log entry ovr_rc047_021 referencing the ticket SF-2026-0419 that drove the true-up. The Controller reviewed and signed off on the rationale; the control operated as designed — the exception report exists precisely to surface this kind of pattern for human review, not to indicate a deficiency.",
      bad_answer:
        "I think Pranav approved it. The exception report had a note.",
      feedback_for_bad_answer:
        "Vague. A Big-4 senior wants the entry number, the dollar amount, the override log id, the ticket reference, the date of the disposition, and who signed. If you can't recall these, pull up the override log before the walkthrough.",
    },
    {
      n: 4,
      area: "Reviewer independence",
      prompt: "Who reviewed the testing for this control, and how do we know they were independent of the preparer?",
      practice_answer_hint: "Cover: preparer name + role, reviewer name + role, why the reviewer is independent, when the review happened.",
      good_answer:
        "The workpaper was prepared by me — Riya Patel, VP Finance Operations — and reviewed by Pranav Iyer, our Controller. Pranav is independent of the preparation in two ways: he was not involved in selecting the sample or running the procedures, and his role as Controller is hierarchically removed from the VP Finance Ops function. The review was performed on 2026-05-13 and signed off via Velocity's workflow with the timestamp captured.",
      bad_answer:
        "Pranav reviewed it. He always reviews these.",
      feedback_for_bad_answer:
        "Add the date and the independence rationale. \"Always reviews these\" is exactly the kind of answer that prompts a follow-up about whether the reviewer is actually independent. Walk through why Pranav's role qualifies as independent of yours.",
    },
    {
      n: 5,
      area: "Velocity-generated content disclosure",
      prompt: "I notice this workpaper was generated by an AI tool. Walk me through what was generated, what you reviewed, and what edits you made.",
      practice_answer_hint: "Cover: which sections were Velocity-generated, the disclosure that they're tagged in the audit trail, what you reviewed, where you applied judgment, and the REQUIRES HUMAN REVIEW markers.",
      good_answer:
        "Velocity generated the initial draft — narrative, procedures, tickmark annotations, sample-selection rationale, exception template. Every section is tagged in the workpaper's audit trail with the model and timestamp; the trail is exportable as CSV. I reviewed every section against Helios's actual policies, applied edits where the agent made generic assumptions (the threshold was wrong in the first pass; Velocity assumed $50k but our policy is $250k), and explicitly drafted procedure 6 — the threshold review procedure — myself because the agent flagged it as REQUIRES HUMAN REVIEW. The reviewer sign-off captures my edits and Pranav's review.",
      bad_answer:
        "The agent generated most of it. I read it and it looked right.",
      feedback_for_bad_answer:
        "This will trigger a sufficiency-of-procedures finding. A Big-4 senior will treat any AI-generated content as needing explicit human review evidence. Be specific about what you reviewed, what you changed, where you applied judgment, and where the agent deferred to human review.",
    },
  ],
};

// ---------- Speed comparison — vs Big-4 advisory (the visceral pitch) ----------
window.VELOCITY_SPEED_COMPARE = {
  end_to_end: {
    velocity_minutes: 25,
    big4_weeks: 3,
    velocity_cost_usd: 1800,    // monthly platform fee
    big4_cost_usd: 47000,       // typical pre-IPO advisory engagement per quarter
  },
  steps: [
    { step: "Workpaper draft generated", velocity: "47 seconds", big4: "3–5 days of advisory hours", multiplier: "~500×" },
    { step: "Evidence mapped to procedures", velocity: "90 seconds", big4: "Half-day of admin time", multiplier: "~150×" },
    { step: "Defensibility self-check", velocity: "3 seconds", big4: "Senior-review pass · 4–6 hours", multiplier: "~3,000×" },
    { step: "Walkthrough rehearsal — 5 questions", velocity: "15 minutes", big4: "Big-4 prep session · $20K", multiplier: "~$1,300/min" },
    { step: "Package export — PDF + manifest", velocity: "8 seconds", big4: "1 day of formatting", multiplier: "~900×" },
  ],
};

// ---------- Changelog (visible iteration is the value prop) ----------
window.VELOCITY_CHANGELOG = [
  { date: "2026-05-13", days_after_request: 4, change: "Walkthrough rehearsal mode — 5 question types, Big-4 senior persona", customer: "Helios Robotics" },
  { date: "2026-05-09", days_after_request: 6, change: "Defensibility scorer — Deloitte template, 10-item checklist with auto-fix actions", customer: "Helios Robotics" },
  { date: "2026-05-02", days_after_request: 8, change: "Evidence drag-drop with agent-suggested slot mapping", customer: "Pelagic Climate" },
  { date: "2026-04-25", days_after_request: 3, change: "Big-4 firm template selector (Deloitte + EY)", customer: "Aperture Materials" },
  { date: "2026-04-22", days_after_request: 0, change: "Workpaper generator GA — streaming output, tickmark annotations", customer: "Helios Robotics" },
];

// ---------- Walkthrough package export manifest ----------
window.VELOCITY_PACKAGE_RC_047 = {
  package_id: "VLC-PKG-HELIOS-RC-047-Q2",
  generated_at: "2026-05-13T11:45:00-07:00",
  generated_by: "Riya Patel · VP Finance Operations · Helios Robotics",
  big4_recipient: { firm: "Deloitte & Touche LLP", contact: "Naomi Wilkes, Engagement Partner" },
  walkthrough_scheduled: "2026-06-24",
  cover_memo: {
    scope: "Q2 2026 SOX 404 testing — RC-047 (manual JE approval, revenue recognition). Single-control walkthrough package; full Q2 batch will follow.",
    methodology: "Stratified judgmental sampling pre-agreed with Deloitte (memo MEMO-SS-RC-047). Velocity-generated workpaper reviewed and edited by VP Finance Ops; Controller sign-off captured 2026-05-13. Every section in the audit trail.",
    optro_metadata: "Velocity Provenance v1 signature attached. 5 evidence artifacts, sha256-verified at ingest. Audit log (53 entries) exported alongside.",
  },
  contents: [
    { file: "VLC-PKG-RC-047-Q2_cover_memo.pdf", size: "72 KB", role: "Cover memo + scope" },
    { file: "VLC-WP-RC-047-Q22026_workpaper.pdf", size: "486 KB", role: "Full workpaper (header, narrative, procedures, sampling, evidence, exceptions, conclusion)" },
    { file: "RC-047_Q2_population_export.csv", size: "94 KB", role: "Slot 1 · population query" },
    { file: "RC-047_sample_memo_v3.pdf", size: "186 KB", role: "Slot 2 · sample selection memo" },
    { file: "NS_workflow_screenshot_WF-MJE-RR-047.png", size: "318 KB", role: "Slot 3 · NetSuite workflow configuration" },
    { file: "RC-047_approval_export_per_sample_Q2.csv", size: "112 KB", role: "Slot 4 · per-sample approval evidence" },
    { file: "Q2_exception_report_weekly_RC-047.xlsx", size: "62 KB", role: "Slot 5 · weekly exception report" },
    { file: "VLC-PKG-RC-047-Q2_audit_log.csv", size: "28 KB", role: "53-row provenance trail" },
    { file: "VLC-PKG-RC-047-Q2_manifest.json", size: "11 KB", role: "Provenance metadata for external-auditor working-paper system" },
  ],
};
