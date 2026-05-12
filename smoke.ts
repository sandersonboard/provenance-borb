// Smoke test — exercise each handler shape directly, bypassing MCP transport.
// Run: npx tsx smoke.ts

import { COMPANY } from "./data.js";
import {
  getChain,
  listDocumentedControlIds,
  validateChain,
  draftWorkpaperSection,
  tickmarksForControl,
  MANAGEMENT_ASSERTION_INPUTS,
  TICKMARK_LEGEND,
  REVIEWERS,
  provenanceSignature,
} from "./provenance.js";

const ANCHOR_CONTROLS = ["RC-047", "FR-007", "FR-002", "IT-001", "FR-008", "IT-003"];

let failures = 0;
function check(label: string, ok: boolean, detail?: string) {
  const icon = ok ? "✓" : "✗";
  console.log(`  ${icon} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

console.log("=".repeat(72));
console.log("optro-provenance-preipo · smoke test");
console.log("=".repeat(72));

console.log(`\n[1] Company + signature`);
console.log(`  ${COMPANY.name} · target ${COMPANY.target_s1_filing_date} · auditor ${COMPANY.external_auditor}`);
const sig = provenanceSignature("rec_smoke");
check("provenance signature has generated_at", typeof sig.generated_at === "string");
check("provenance signature has schema_version", sig.schema_version === "0.1.0");
check("provenance signature has source_system", sig.source_system === "optro-provenance-preipo");

console.log(`\n[2] Reviewer roster`);
const reviewerCount = Object.keys(REVIEWERS).length;
const deloitteCount = Object.values(REVIEWERS).filter((r) => r.affiliation === "Deloitte & Touche LLP").length;
console.log(`  ${reviewerCount} reviewers (${deloitteCount} Deloitte, ${reviewerCount - deloitteCount} Helios)`);
check("reviewer roster has Anton Dam", REVIEWERS.anton_dam?.role === "Controller");
check("reviewer roster has Deloitte partner", REVIEWERS.henrik_esterhazy?.role.includes("Partner"));

console.log(`\n[3] Tickmark legend`);
console.log(`  ${TICKMARK_LEGEND.length} symbols (Deloitte standard)`);
check("legend includes 'X' for exceptions", TICKMARK_LEGEND.some((t) => t.symbol === "X"));
check("legend includes '©' for confirmation", TICKMARK_LEGEND.some((t) => t.symbol === "©"));
check("each legend entry has definition + procedure", TICKMARK_LEGEND.every((t) => t.definition && t.procedure));

console.log(`\n[4] Evidence chain coverage`);
const allIds = listDocumentedControlIds();
console.log(`  ${allIds.length} documented control_ids`);
check("RC-047 chain present (demo anchor)", !!getChain("RC-047"));
check("FR-007 SD chain present", !!getChain("FR-007"));
check("FR-002 SD chain present", !!getChain("FR-002"));
check("IT-001 SD chain present", !!getChain("IT-001"));
check("unknown id returns null", getChain("ZZ-999") === null);

console.log(`\n[5] Defensibility — known SDs surface blocking issues`);
for (const id of ["FR-007", "FR-002", "IT-001"]) {
  const chain = getChain(id)!;
  const { score, issues } = validateChain(chain);
  const blocking = issues.filter((i) => i.severity === "blocking").length;
  console.log(`  ${id}: score=${score}, total issues=${issues.length} (blocking=${blocking})`);
  check(`${id} score < 100`, score < 100, `score=${score}`);
  check(`${id} has at least 1 issue surfaced`, issues.length >= 1);
}

console.log(`\n[6] Defensibility — clean chains score 100 (or near it)`);
for (const id of ["RC-047", "IT-003"]) {
  const chain = getChain(id)!;
  const { score, issues } = validateChain(chain);
  console.log(`  ${id}: score=${score}, issues=${issues.length}`);
  check(`${id} score >= 90`, score >= 90, `score=${score}`);
}

console.log(`\n[7] Workpaper section drafting`);
for (const section of ["narrative", "testing", "exception", "remediation"] as const) {
  const draft = draftWorkpaperSection("FR-007", section);
  check(`draft FR-007 ${section} returns slots`, !!draft && draft.slots.length > 0, `slots=${draft?.slots.length}`);
  if (draft) {
    const hasHumanReviewMarker = draft.slots.some((s) => s.value.includes("REQUIRES HUMAN REVIEW") || s.requires_human_review);
    check(`FR-007 ${section} surfaces human review where appropriate`, section !== "exception" && section !== "remediation" && section !== "testing" ? true : hasHumanReviewMarker);
  }
}
const cleanTesting = draftWorkpaperSection("RC-047", "testing");
check("RC-047 testing draft has citations", !!cleanTesting && cleanTesting.citations_summary.length > 0);

console.log(`\n[8] Tickmark legend for control`);
const tm = tickmarksForControl("FR-007");
check("FR-007 tickmark response includes used subset", !!tm && tm.used_in_this_control.length > 0);
check("FR-007 used subset includes 'X'", !!tm && tm.used_in_this_control.some((t) => t.symbol === "X"));

console.log(`\n[9] Management assertion inputs`);
const mai = MANAGEMENT_ASSERTION_INPUTS;
console.log(`  scope: ${mai.scope_of_program.consolidation_scope.slice(0, 70)}...`);
console.log(`  must-have controls: ${mai.controls_in_scope.must_have_total} (${mai.controls_in_scope.must_have_tested} tested)`);
console.log(`  open findings: MW=${mai.open_findings.by_severity.material_weakness} SD=${mai.open_findings.by_severity.significant_deficiency} D=${mai.open_findings.by_severity.deficiency}`);
check("3 significant deficiencies surfaced", mai.open_findings.by_severity.significant_deficiency === 3);
check("SD list has 3 entries with control_ids", mai.open_findings.significant_deficiencies.length === 3);
check("disclosure recommendation present", !!mai.disclosure_recommendation.severity_to_disclose);

console.log(`\n[10] Anchor control walkthrough (what Claude Desktop will hit)`);
for (const id of ANCHOR_CONTROLS) {
  const chain = getChain(id);
  if (!chain) {
    check(`chain present for ${id}`, false);
    continue;
  }
  const { score } = validateChain(chain);
  console.log(`  ${id} · ${chain.control_name.slice(0, 50)} · ${chain.disposition} · score=${score}`);
  check(`${id} chain shape ok`, chain.test_procedures.length > 0 && !!chain.optro_record_id);
}

console.log(`\n` + "=".repeat(72));
if (failures === 0) {
  console.log("✓ All smoke checks passed. Ready for MCP transport.");
} else {
  console.log(`✗ ${failures} smoke check(s) failed.`);
  process.exitCode = 1;
}
console.log("=".repeat(72));
