// ===============================================================
// Helios Robotics, Inc. — provenance-borb fixture
// ===============================================================
// Self-contained snapshot of Helios for the provenance MCP server.
// Mirrors COMPANY and the 30 representative controls from context-borb
// so the two servers can run side-by-side in Claude Desktop without
// a cross-package import.
// ===============================================================

export const COMPANY = {
  optro_record_id: "rec_company_helios_2026",
  name: "Helios Robotics, Inc.",
  industry_vertical: "industrials_hardware_saas",
  funding_stage: "series_d",
  revenue_band_usd: "500M-1B",
  headquarters: "Boston, MA",
  target_s1_filing_date: "2027-01-15",
  as_of_date: "2026-05-12",
  external_auditor: "Deloitte & Touche LLP",
  primary_contact: { name: "Anton Dam", role: "Controller", email: "anton@heliosrobotics.com" },
} as const;

export type ControlCategory = "financial_reporting" | "itgc" | "entity_level";
export type ControlPriority = "must_have" | "should_have" | "nice_to_have";
export type DesignStatus = "not_started" | "drafted" | "reviewed" | "finalized";
export type TestingStatus = "not_tested" | "in_progress" | "tested" | "exception" | "remediated";

export type Control = {
  id: string;
  optro_record_id: string;
  name: string;
  category: ControlCategory;
  pre_ipo_priority: ControlPriority;
  design_status: DesignStatus;
  testing_status: TestingStatus;
  big4_visibility: boolean;
  owner_role: string;
  frequency: string;
};

// 30 representative controls (universe is 175). Same controls as context-borb,
// so the two servers reference the same FR-001 / IT-001 etc.
export const CONTROLS: Control[] = [
  { id: "FR-001", optro_record_id: "rec_ctrl_fr_001", name: "Revenue recognition — performance obligation review", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "exception", big4_visibility: true, owner_role: "Controller", frequency: "Monthly" },
  { id: "FR-002", optro_record_id: "rec_ctrl_fr_002", name: "Deferred revenue rollforward", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "exception", big4_visibility: true, owner_role: "Senior Accountant", frequency: "Monthly" },
  { id: "FR-003", optro_record_id: "rec_ctrl_fr_003", name: "Inventory standard-cost variance review", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "Controller", frequency: "Quarterly" },
  { id: "FR-004", optro_record_id: "rec_ctrl_fr_004", name: "Inventory physical count", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "Operations Lead", frequency: "Annual + cycle" },
  { id: "FR-005", optro_record_id: "rec_ctrl_fr_005", name: "COGS — bill-of-materials reconciliation", category: "financial_reporting", pre_ipo_priority: "should_have", design_status: "reviewed", testing_status: "in_progress", big4_visibility: false, owner_role: "Cost Accountant", frequency: "Monthly" },
  { id: "FR-006", optro_record_id: "rec_ctrl_fr_006", name: "Stock-based comp expense accrual", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "Senior Accountant", frequency: "Monthly" },
  { id: "FR-007", optro_record_id: "rec_ctrl_fr_007", name: "Journal entry approval — over $25K", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "exception", big4_visibility: true, owner_role: "Controller", frequency: "Per entry" },
  { id: "FR-008", optro_record_id: "rec_ctrl_fr_008", name: "Bank reconciliations", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "Senior Accountant", frequency: "Monthly" },
  { id: "FR-009", optro_record_id: "rec_ctrl_fr_009", name: "Accounts payable cutoff", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "AP Specialist", frequency: "Period-end" },
  { id: "FR-010", optro_record_id: "rec_ctrl_fr_010", name: "Accounts receivable aging review", category: "financial_reporting", pre_ipo_priority: "should_have", design_status: "reviewed", testing_status: "in_progress", big4_visibility: false, owner_role: "AR Lead", frequency: "Monthly" },
  { id: "FR-011", optro_record_id: "rec_ctrl_fr_011", name: "Lease accounting — ASC 842 schedule", category: "financial_reporting", pre_ipo_priority: "should_have", design_status: "drafted", testing_status: "not_tested", big4_visibility: false, owner_role: "Senior Accountant", frequency: "Quarterly" },
  { id: "FR-012", optro_record_id: "rec_ctrl_fr_012", name: "Income tax provision review", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "reviewed", testing_status: "not_tested", big4_visibility: false, owner_role: "External tax provider", frequency: "Quarterly" },
  { id: "FR-013", optro_record_id: "rec_ctrl_fr_013", name: "Foreign exchange revaluation", category: "financial_reporting", pre_ipo_priority: "should_have", design_status: "drafted", testing_status: "not_tested", big4_visibility: false, owner_role: "Senior Accountant", frequency: "Monthly" },
  { id: "FR-014", optro_record_id: "rec_ctrl_fr_014", name: "Accruals — completeness review", category: "financial_reporting", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "Controller", frequency: "Monthly" },
  { id: "FR-015", optro_record_id: "rec_ctrl_fr_015", name: "Goodwill impairment assessment", category: "financial_reporting", pre_ipo_priority: "nice_to_have", design_status: "not_started", testing_status: "not_tested", big4_visibility: false, owner_role: "Controller", frequency: "Annual" },

  { id: "IT-001", optro_record_id: "rec_ctrl_it_001", name: "Production access review", category: "itgc", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "exception", big4_visibility: true, owner_role: "IT Director", frequency: "Quarterly" },
  { id: "IT-002", optro_record_id: "rec_ctrl_it_002", name: "Change management — code deploy approval", category: "itgc", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "Engineering Manager", frequency: "Per change" },
  { id: "IT-003", optro_record_id: "rec_ctrl_it_003", name: "Database backup & restore testing", category: "itgc", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "remediated", big4_visibility: true, owner_role: "IT Director", frequency: "Monthly + semi-annual" },
  { id: "IT-004", optro_record_id: "rec_ctrl_it_004", name: "Segregation of duties — financial systems", category: "itgc", pre_ipo_priority: "must_have", design_status: "reviewed", testing_status: "in_progress", big4_visibility: false, owner_role: "Controller", frequency: "Quarterly" },
  { id: "IT-005", optro_record_id: "rec_ctrl_it_005", name: "Multi-factor authentication enforcement", category: "itgc", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "IT Director", frequency: "Continuous" },
  { id: "IT-006", optro_record_id: "rec_ctrl_it_006", name: "Privileged access review", category: "itgc", pre_ipo_priority: "must_have", design_status: "reviewed", testing_status: "not_tested", big4_visibility: false, owner_role: "IT Director", frequency: "Quarterly" },
  { id: "IT-007", optro_record_id: "rec_ctrl_it_007", name: "Vendor system SOC 2 review", category: "itgc", pre_ipo_priority: "should_have", design_status: "drafted", testing_status: "not_tested", big4_visibility: false, owner_role: "IT Director", frequency: "Annual" },
  { id: "IT-008", optro_record_id: "rec_ctrl_it_008", name: "Audit log retention monitoring", category: "itgc", pre_ipo_priority: "should_have", design_status: "drafted", testing_status: "not_tested", big4_visibility: false, owner_role: "Security Lead", frequency: "Monthly" },
  { id: "IT-009", optro_record_id: "rec_ctrl_it_009", name: "NetSuite vendor master / payment SoD", category: "itgc", pre_ipo_priority: "must_have", design_status: "drafted", testing_status: "not_tested", big4_visibility: false, owner_role: "Controller", frequency: "Per change" },

  { id: "EL-001", optro_record_id: "rec_ctrl_el_001", name: "Code of conduct attestation", category: "entity_level", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "HR", frequency: "Annual" },
  { id: "EL-002", optro_record_id: "rec_ctrl_el_002", name: "Whistleblower hotline", category: "entity_level", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "General Counsel", frequency: "Continuous" },
  { id: "EL-003", optro_record_id: "rec_ctrl_el_003", name: "Audit committee charter", category: "entity_level", pre_ipo_priority: "must_have", design_status: "finalized", testing_status: "tested", big4_visibility: true, owner_role: "General Counsel", frequency: "Quarterly" },
  { id: "EL-004", optro_record_id: "rec_ctrl_el_004", name: "Authority matrix / signature authority", category: "entity_level", pre_ipo_priority: "must_have", design_status: "reviewed", testing_status: "in_progress", big4_visibility: false, owner_role: "CFO", frequency: "Annual" },
  { id: "EL-005", optro_record_id: "rec_ctrl_el_005", name: "Board independence assessment", category: "entity_level", pre_ipo_priority: "should_have", design_status: "drafted", testing_status: "not_tested", big4_visibility: false, owner_role: "General Counsel", frequency: "Annual" },
  { id: "EL-006", optro_record_id: "rec_ctrl_el_006", name: "Related-party transaction disclosure", category: "entity_level", pre_ipo_priority: "must_have", design_status: "reviewed", testing_status: "not_tested", big4_visibility: false, owner_role: "General Counsel", frequency: "Quarterly" },
];

export const CONTROL_UNIVERSE_TOTALS = {
  total: 175,
  must_have: 96,
  should_have: 54,
  nice_to_have: 25,
  by_category: {
    financial_reporting: 95,
    itgc: 55,
    entity_level: 25,
  },
};
