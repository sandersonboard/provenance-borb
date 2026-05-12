#!/usr/bin/env -S npx tsx
/**
 * optro-provenance-preipo — MCP server
 *
 * Audit-grade output layer for a pre-IPO Controller. Surfaces SOX
 * evidence chains, tickmark conventions, workpaper section scaffolds,
 * management-assertion inputs, and a defensibility validator — all
 * for consumption by a foundation-model agent (Claude Desktop, etc).
 *
 * Wrapper Era prototype: the agent is the workpaper drafting
 * interface; Optro is the evidence-of-truth backend.
 *
 * Run:   npx tsx server.ts
 * Wire:  add to claude_desktop_config.json (see README.md)
 *
 * Phase 0: trusts local client, no auth, mock data only.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";

import { COMPANY } from "./data.js";
import {
  SCHEMA_VERSION,
  SOURCE_SYSTEM,
  provenanceSignature,
  TICKMARK_LEGEND,
  REVIEWERS,
  MANAGEMENT_ASSERTION_INPUTS,
  getChain,
  listDocumentedControlIds,
  validateChain,
  draftWorkpaperSection,
  tickmarksForControl,
  type WorkpaperSection,
} from "./provenance.js";

// =========================================================================
// Tool definitions
// =========================================================================

const TOOLS: Tool[] = [
  {
    name: "get_evidence_chain",
    description:
      "Return the full audit-grade evidence chain for one control: control " +
      "definition, owner, frequency, test procedures performed, evidence " +
      "artifacts (with ids and types — screenshot, query_output, attestation, " +
      "sample, reconciliation, log_export), reviewer attestation (name, role, " +
      "timestamp, comments), overrides applied (with reasons), and final " +
      "disposition. Response is nested JSON with explicit provenance edges so " +
      "the calling agent can summarize or render it without losing the chain. " +
      "Every artifact and step has an optro_record_id citation. Includes a " +
      "defensibility_score (0-100) and any audit issues identified.",
    inputSchema: {
      type: "object",
      properties: {
        control_id: {
          type: "string",
          description:
            "The control identifier (e.g., 'RC-047', 'FR-007', 'IT-001'). " +
            "Call list_management_assertion_inputs for the must-have universe.",
        },
      },
      required: ["control_id"],
    },
  },
  {
    name: "get_tickmark_legend",
    description:
      "Return the tickmark conventions used in this control's workpapers. " +
      "Each symbol has a definition and the procedure it represents (Deloitte " +
      "standard). Critical when an agent is generating workpaper-style output " +
      "that Big 4 reviewers will recognize. Response distinguishes symbols " +
      "actually used in this control from the full legend.",
    inputSchema: {
      type: "object",
      properties: {
        control_id: {
          type: "string",
          description: "The control identifier (e.g., 'RC-047').",
        },
      },
      required: ["control_id"],
    },
  },
  {
    name: "draft_workpaper_section",
    description:
      "Return a structured draft of a specific workpaper section " +
      "(narrative | testing | exception | remediation) for one control. The " +
      "response is structured slots — not prose — with header, slots[], " +
      "citations, and explicit 'REQUIRES HUMAN REVIEW' markers wherever agent " +
      "judgment would be required. The calling agent renders prose downstream " +
      "using these slots verbatim; the structured response prevents " +
      "hallucination of evidence that doesn't exist.",
    inputSchema: {
      type: "object",
      properties: {
        control_id: {
          type: "string",
          description: "The control identifier.",
        },
        section: {
          type: "string",
          enum: ["narrative", "testing", "exception", "remediation"],
          description: "Which workpaper section to draft.",
        },
      },
      required: ["control_id", "section"],
    },
  },
  {
    name: "list_management_assertion_inputs",
    description:
      "Return the structured inputs a Controller needs to draft the " +
      "management assertion section of their S-1: scope of program (including " +
      "consolidation scope + exclusions), controls in scope (must-have " +
      "count), testing completeness, open findings categorized by severity " +
      "(material weakness / significant deficiency / deficiency), remediation " +
      "status, and a disclosure recommendation with proposed assertion " +
      "caveats. Designed to be summarized by an agent into the actual " +
      "assertion language with citations.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "validate_audit_trail",
    description:
      "Run a defensibility check on one control's evidence chain. Verifies " +
      "every test step has an evidence artifact, every override has a " +
      "documented reason, every reviewer has a role attestation, and no cycle " +
      "was missed. Returns a defensibility_score (0-100) plus an issues " +
      "array — each issue has severity (blocking/high/medium/low), category " +
      "(missing_evidence / missing_reviewer / missing_override_reason / " +
      "missed_cycle / stale_attestation), and a remediation_suggestion. Call " +
      "this for every must-have control before drafting the management " +
      "assertion.",
    inputSchema: {
      type: "object",
      properties: {
        control_id: {
          type: "string",
          description: "The control identifier to validate.",
        },
      },
      required: ["control_id"],
    },
  },
];

// =========================================================================
// Tool handlers
// =========================================================================

function envelope<T extends object>(record_id: string, payload: T) {
  return {
    provenance: provenanceSignature(record_id),
    company: { name: COMPANY.name, optro_record_id: COMPANY.optro_record_id, as_of: COMPANY.as_of_date },
    ...payload,
  };
}

function unknownControl(control_id: string) {
  return envelope("rec_unknown_control_" + control_id, {
    error: `Control "${control_id}" is not documented in this fixture.`,
    suggested_followups: [
      "Call list_management_assertion_inputs() to see in-scope control universe stats.",
      "Documented control ids: " + listDocumentedControlIds().slice(0, 15).join(", ") + " ... (and more).",
    ],
    documented_control_ids: listDocumentedControlIds(),
  });
}

function handleGetEvidenceChain(args: { control_id?: string }) {
  if (!args.control_id) throw new Error("control_id is required");
  const chain = getChain(args.control_id);
  if (!chain) return unknownControl(args.control_id);

  const { score, issues } = validateChain(chain);

  return envelope(chain.optro_record_id, {
    control: {
      id: chain.control_id,
      name: chain.control_name,
      category: chain.category,
      pre_ipo_priority: chain.pre_ipo_priority,
      big4_visibility: chain.big4_visibility,
      owner_role: chain.owner_role,
      frequency: chain.frequency,
      cycle_period: chain.cycle_period,
      optro_record_id: chain.optro_record_id,
    },
    test_procedures: chain.test_procedures,
    artifacts: chain.artifacts,
    reviewer: chain.reviewer
      ? {
          ...chain.reviewer,
          profile: REVIEWERS[chain.reviewer.reviewer_key],
        }
      : null,
    overrides: chain.overrides,
    disposition: chain.disposition,
    final_disposition_note: chain.final_disposition_note,
    finding_refs: chain.finding_refs,
    defensibility_score: score,
    issues_summary: {
      count: issues.length,
      blocking: issues.filter((i) => i.severity === "blocking").length,
      high: issues.filter((i) => i.severity === "high").length,
      medium: issues.filter((i) => i.severity === "medium").length,
      low: issues.filter((i) => i.severity === "low").length,
    },
    issues,
    suggested_followups: [
      `Call get_tickmark_legend(control_id='${chain.control_id}') for the symbols this workpaper uses.`,
      `Call draft_workpaper_section(control_id='${chain.control_id}', section='testing') to draft the testing section.`,
      `Call validate_audit_trail(control_id='${chain.control_id}') for a focused defensibility check.`,
    ],
  });
}

function handleGetTickmarkLegend(args: { control_id?: string }) {
  if (!args.control_id) throw new Error("control_id is required");
  const result = tickmarksForControl(args.control_id);
  if (!result) return unknownControl(args.control_id);

  return envelope("rec_tickmarks_" + args.control_id.toLowerCase(), {
    control_id: result.control_id,
    convention: result.convention,
    used_in_this_control: result.used_in_this_control,
    full_legend: result.full_legend,
    note:
      "Big 4 reviewers expect tickmarks in workpaper-style output. Render the " +
      "'used_in_this_control' subset alongside any procedure description, and " +
      "annotate each step with the symbols matching the procedure performed.",
  });
}

function handleDraftWorkpaperSection(args: { control_id?: string; section?: WorkpaperSection }) {
  if (!args.control_id) throw new Error("control_id is required");
  if (!args.section) throw new Error("section is required");
  const draft = draftWorkpaperSection(args.control_id, args.section);
  if (!draft) return unknownControl(args.control_id);

  return envelope(draft.optro_record_id, {
    control_id: draft.control_id,
    section: draft.section,
    header: draft.header,
    slots: draft.slots,
    tickmark_legend_ref: draft.tickmark_legend_ref,
    citations_summary: draft.citations_summary,
    rendering_guidance:
      "Render each slot's value verbatim as prose, preserving 'REQUIRES " +
      "HUMAN REVIEW' markers and citations. Do not invent evidence beyond " +
      "what is cited. Use the tickmark legend to annotate procedure language.",
    requires_human_review_count: draft.slots.filter((s) => s.requires_human_review).length,
  });
}

function handleListManagementAssertionInputs() {
  return envelope(MANAGEMENT_ASSERTION_INPUTS.optro_record_id, {
    ...MANAGEMENT_ASSERTION_INPUTS,
    suggested_followups: [
      "For each significant_deficiency, call get_evidence_chain(control_id) to retrieve the underlying chain.",
      "Call validate_audit_trail(control_id) on each must-have control before signing the assertion.",
      "Call draft_workpaper_section(control_id, section='exception') to draft exception language per finding.",
    ],
    rendering_guidance:
      "Summarize these inputs into management assertion prose. Disclose the 3 " +
      "significant deficiencies (F-001, F-002, F-003) explicitly. Cite each " +
      "fact back to its optro_record_id in the rendered assertion.",
  });
}

function handleValidateAuditTrail(args: { control_id?: string }) {
  if (!args.control_id) throw new Error("control_id is required");
  const chain = getChain(args.control_id);
  if (!chain) return unknownControl(args.control_id);
  const { score, issues } = validateChain(chain);

  return envelope("rec_validate_" + chain.control_id.toLowerCase() + "_" + new Date().toISOString().slice(0, 10), {
    control_id: chain.control_id,
    control_name: chain.control_name,
    pre_ipo_priority: chain.pre_ipo_priority,
    defensibility_score: score,
    pass: issues.filter((i) => i.severity === "blocking").length === 0,
    issues_summary: {
      count: issues.length,
      blocking: issues.filter((i) => i.severity === "blocking").length,
      high: issues.filter((i) => i.severity === "high").length,
      medium: issues.filter((i) => i.severity === "medium").length,
      low: issues.filter((i) => i.severity === "low").length,
    },
    issues,
    citation_chain_record: chain.optro_record_id,
    suggested_followups: issues.length === 0
      ? [`Call draft_workpaper_section(control_id='${chain.control_id}', section='testing') to draft the testing memo.`]
      : [
          `Call get_evidence_chain(control_id='${chain.control_id}') for full context on the issues.`,
          "Resolve each blocking issue before workpaper sign-off — these will fail defensibility review.",
        ],
  });
}

// =========================================================================
// Server wiring
// =========================================================================

const server = new Server(
  {
    name: SOURCE_SYSTEM,
    version: SCHEMA_VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  let result: unknown;

  try {
    switch (name) {
      case "get_evidence_chain":
        result = handleGetEvidenceChain((args as { control_id?: string }) ?? {});
        break;
      case "get_tickmark_legend":
        result = handleGetTickmarkLegend((args as { control_id?: string }) ?? {});
        break;
      case "draft_workpaper_section":
        result = handleDraftWorkpaperSection((args as { control_id?: string; section?: WorkpaperSection }) ?? {});
        break;
      case "list_management_assertion_inputs":
        result = handleListManagementAssertionInputs();
        break;
      case "validate_audit_trail":
        result = handleValidateAuditTrail((args as { control_id?: string }) ?? {});
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              provenance: provenanceSignature("rec_error_" + Date.now()),
              error: err instanceof Error ? err.message : "unknown error",
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
});

// =========================================================================
// Start
// =========================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[${SOURCE_SYSTEM}] MCP server running on stdio`);
  console.error(`[${SOURCE_SYSTEM}] company: ${COMPANY.name}, as_of: ${COMPANY.as_of_date}`);
  console.error(`[${SOURCE_SYSTEM}] tools: ${TOOLS.map((t) => t.name).join(", ")}`);
  console.error(`[${SOURCE_SYSTEM}] documented control_ids: ${listDocumentedControlIds().length}`);
  // Keep a reference so the variable isn't tree-shaken in dev mode
  void TICKMARK_LEGEND;
}

main().catch((err) => {
  console.error(`[${SOURCE_SYSTEM}] fatal:`, err);
  process.exit(1);
});
