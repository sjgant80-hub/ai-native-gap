// ai-native-gap · the seven-layer audit
//
// "AI-native" as the market sells it is AI-RENTED: a chatbot bolted onto a knowledge base,
// routed to a rented model hub, supervised to catch bad output. AI-native means something
// stricter: the intelligence is NATIVE, SOVEREIGN, and YOURS — and it contains itself.
// This kernel scores any stack against the seven layers where that difference lives.
// The RENTED layers become the roadmap: what to make sovereign next, most critical first.
//
// Pure and total — garbage in returns { ok:false, why } and never throws.

export const LAYERS = Object.freeze([
  { layer: 'GATEWAY',    rented: 'one rented API/MCP door into your systems — a dependency', sovereign: 'your own admission wall: identity, capability, replay-guard, budget — the door is yours', receipt: 'chorus' },
  { layer: 'BRAIN',      rented: 'a static knowledge base the AI reads — a filing cabinet', sovereign: 'dreaming memory: reorganises itself overnight, wakes with better recall, never rewrites a memory', receipt: 'the-dreamer' },
  { layer: 'CONTEXT',    rented: 'raw feeds wired in and taken as true because someone wrote them', sovereign: 'witnessed-not-believed: what enters is what a gate confirmed happened', receipt: 'seam-check' },
  { layer: 'HARNESS',    rented: 'supervision to catch bad output after it happens', sovereign: 'structural self-refusal: the gate the system cannot sweet-talk refuses its slop before shipping', receipt: 'witness-kit' },
  { layer: 'ONBOARDING', rented: 'one-way: the AI learns from the team', sovereign: 'bidirectional: the system audits its overseer back and makes the overseer safer', receipt: 'ui-gate' },
  { layer: 'ROUTING',    rented: 'work routed to rented model hubs — the mind is a tenant', sovereign: 'own models on own metal; the cloud only ever by a named, budgeted, ledgered grant', receipt: 'fallrelay' },
  { layer: 'AGENTS',     rented: 'supervised tools built on top', sovereign: 'sovereign agents that ship from hours they own and contain themselves — with the receipt', receipt: 'pixelwhisperer' },
]);

// When more than one layer is rented, which do you make sovereign FIRST? A pinned order:
// own the metal (everything else is rented at the root without it), then the self-refusing
// harness (or you are the babysitter forever), then the mind itself, then the doors.
export const CRITICALITY = Object.freeze([
  'ROUTING', 'HARNESS', 'BRAIN', 'GATEWAY', 'CONTEXT', 'ONBOARDING', 'AGENTS',
]);

const STANCES = Object.freeze(['rented', 'hybrid', 'sovereign']);
const NAMES = LAYERS.map((l) => l.layer);

/**
 * auditStack(answers) — answers maps EVERY layer to 'rented' | 'hybrid' | 'sovereign'.
 * All seven are required: an unanswered layer is not a rented layer, it is an unasked
 * question. sovereignty = (sovereign + 0.5·hybrid) / 7 as a percentage; the verdict names
 * the species, the headline names the next layer to take, and the lists are the roadmap.
 */
export function auditStack(answers) {
  if (typeof answers !== 'object') return { ok: false, why: 'auditStack reads an answers object: { "<LAYER>": "rented"|"hybrid"|"sovereign" }' };
  if (answers === null) return { ok: false, why: 'auditStack reads an answers object: { "<LAYER>": "rented"|"hybrid"|"sovereign" }' };
  if (Array.isArray(answers)) return { ok: false, why: 'auditStack reads an answers object: { "<LAYER>": "rented"|"hybrid"|"sovereign" }' };
  for (const k of Object.keys(answers)) {
    if (!NAMES.includes(k)) return { ok: false, why: 'unknown layer "' + k + '" — the seven are fixed' };
  }
  for (const l of NAMES) {
    if (answers[l] === undefined) return { ok: false, why: l + ' is unanswered — an unanswered layer is not a rented layer, it is an unasked question; answer all seven' };
    if (!STANCES.includes(answers[l])) return { ok: false, why: 'answer for ' + l + ' must be rented|hybrid|sovereign, got "' + String(answers[l]) + '"' };
  }
  const sovereign = NAMES.filter((l) => answers[l] === 'sovereign');
  const hybrid = NAMES.filter((l) => answers[l] === 'hybrid');
  const rented = NAMES.filter((l) => answers[l] === 'rented');
  const sovereignty = Math.round(((sovereign.length + 0.5 * hybrid.length) / 7) * 100);

  let headline;
  if (rented.length > 0) {
    const next = CRITICALITY.find((l) => rented.includes(l));
    headline = 'take ' + next + ' sovereign next — it is the most critical rented layer';
  } else if (hybrid.length > 0) {
    const next = CRITICALITY.find((l) => hybrid.includes(l));
    headline = 'finish ' + next + ' next — nothing is rented, but it is the most critical hybrid layer';
  } else {
    headline = 'all seven layers are yours — the intelligence is native';
  }

  const notes = [];
  if (rented.includes('ROUTING')) notes.push('rented ROUTING: the mind itself is a tenant — if the hub goes dark, the company stops thinking');
  if (rented.includes('HARNESS')) notes.push('rented HARNESS: supervision-to-catch is a payroll for finding what the system should refuse itself');
  if (rented.includes('BRAIN')) notes.push('rented BRAIN: a filing cabinet does not get smarter overnight — it just gets bigger');
  if (rented.length === 7) notes.push('the full-tenant shape: every layer rented — this is AI bolted on, with your logo on the door');

  // Verdict thresholds sit ON the score lattice (multiples of round(k·100/14)): 100, 71, 36.
  let verdict;
  if (sovereignty === 100) verdict = 'AI-NATIVE';
  else if (sovereignty >= 71) verdict = 'sovereign-leaning';
  else if (sovereignty >= 36) verdict = 'hybrid-stack';
  else verdict = 'AI-RENTED';

  return { ok: true, sovereignty, verdict, headline, rented, hybrid, sovereign, notes };
}
