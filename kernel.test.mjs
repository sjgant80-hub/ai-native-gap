import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LAYERS, CRITICALITY, auditStack } from './kernel.mjs';

const all = (stance) => { const m = {}; for (const l of LAYERS) m[l.layer] = stance; return m; };

test('the seven are exactly seven, criticality a permutation, routing first', () => {
  assert.equal(LAYERS.length, 7);
  assert.equal(CRITICALITY.length, 7);
  assert.equal(CRITICALITY[0], 'ROUTING');
  assert.equal(CRITICALITY[1], 'HARNESS');
  assert.equal(LAYERS[0].layer, 'GATEWAY');
  assert.equal(LAYERS[6].layer, 'AGENTS');
  for (const l of LAYERS) assert.equal(CRITICALITY.includes(l.layer), true);
  // every layer carries a receipt name (a public repo)
  for (const l of LAYERS) assert.equal(typeof l.receipt === 'string' && l.receipt.length > 0, true);
});

test('all sovereign is AI-NATIVE at 100 with the native headline', () => {
  const r = auditStack(all('sovereign'));
  assert.equal(r.ok, true);
  assert.equal(r.sovereignty, 100);
  assert.equal(r.verdict, 'AI-NATIVE');
  assert.equal(r.headline, 'all seven layers are yours — the intelligence is native');
  assert.equal(r.rented.length, 0);
  assert.equal(r.notes.length, 0);
});

test('all rented is AI-RENTED at 0 — the full-tenant shape, named', () => {
  const r = auditStack(all('rented'));
  assert.equal(r.sovereignty, 0);
  assert.equal(r.verdict, 'AI-RENTED');
  assert.equal(r.headline, 'take ROUTING sovereign next — it is the most critical rented layer');
  assert.equal(r.notes.some((n) => n.includes('your logo on the door')), true);
  assert.equal(r.notes.some((n) => n.includes('stops thinking')), true);
  assert.equal(r.notes.length, 4);
});

test('the market shape: sovereign gateway+agents, everything else rented — still AI-RENTED', () => {
  const m = all('rented');
  m.GATEWAY = 'sovereign';
  m.AGENTS = 'hybrid';
  const r = auditStack(m);           // (1 + 0.5) / 7 = 21.4 → 21
  assert.equal(r.sovereignty, 21);
  assert.equal(r.verdict, 'AI-RENTED');
  assert.equal(r.headline, 'take ROUTING sovereign next — it is the most critical rented layer');
});

test('verdict edges pinned on the lattice: 71 sovereign-leaning, 64 hybrid, 36 hybrid, 29 rented', () => {
  const five = all('rented');       // 5 sovereign / 7 = 71.43 → 71
  for (const l of ['ROUTING', 'HARNESS', 'BRAIN', 'GATEWAY', 'CONTEXT']) five[l] = 'sovereign';
  assert.equal(auditStack(five).sovereignty, 71);
  assert.equal(auditStack(five).verdict, 'sovereign-leaning');
  const fourHalf = all('rented');   // (4 + 0.5)/7 = 64.29 → 64 → hybrid-stack
  for (const l of ['ROUTING', 'HARNESS', 'BRAIN', 'GATEWAY']) fourHalf[l] = 'sovereign';
  fourHalf.CONTEXT = 'hybrid';
  assert.equal(auditStack(fourHalf).sovereignty, 64);
  assert.equal(auditStack(fourHalf).verdict, 'hybrid-stack');
  const twoHalf = all('rented');    // (2 + 0.5)/7 = 35.7 → 36 → hybrid-stack (boundary)
  for (const l of ['ROUTING', 'HARNESS']) twoHalf[l] = 'sovereign';
  twoHalf.BRAIN = 'hybrid';
  assert.equal(auditStack(twoHalf).sovereignty, 36);
  assert.equal(auditStack(twoHalf).verdict, 'hybrid-stack');
  const two = all('rented');        // 2/7 = 28.6 → 29 → AI-RENTED
  for (const l of ['ROUTING', 'HARNESS']) two[l] = 'sovereign';
  assert.equal(auditStack(two).sovereignty, 29);
  assert.equal(auditStack(two).verdict, 'AI-RENTED');
});

test('the headline follows criticality among the rented, then the hybrid', () => {
  const m = all('sovereign');
  m.AGENTS = 'rented';
  m.CONTEXT = 'rented';             // CONTEXT outranks AGENTS
  assert.equal(auditStack(m).headline, 'take CONTEXT sovereign next — it is the most critical rented layer');
  const h = all('sovereign');
  h.ONBOARDING = 'hybrid';
  h.GATEWAY = 'hybrid';             // GATEWAY outranks ONBOARDING
  assert.equal(auditStack(h).headline, 'finish GATEWAY next — nothing is rented, but it is the most critical hybrid layer');
});

test('notes fire on their layers, and only then', () => {
  const m = all('sovereign');
  m.HARNESS = 'rented';
  const r = auditStack(m);
  assert.equal(r.notes.length, 1);
  assert.equal(r.notes[0].includes('payroll'), true);
  const b = all('sovereign');
  b.BRAIN = 'rented';
  assert.equal(auditStack(b).notes.some((n) => n.includes('bigger')), true);
});

test('all seven required — an unanswered layer refused by name', () => {
  const m = all('sovereign');
  delete m.CONTEXT;
  const r = auditStack(m);
  assert.equal(r.ok, false);
  assert.equal(r.why.startsWith('CONTEXT is unanswered'), true);
});

test('unknown layers and bad stances refused', () => {
  const r1 = auditStack({ ...all('sovereign'), VIBES: 'sovereign' });
  assert.equal(r1.ok, false);
  assert.equal(r1.why, 'unknown layer "VIBES" — the seven are fixed');
  const r2 = auditStack({ ...all('sovereign'), BRAIN: 'leased' });
  assert.equal(r2.ok, false);
  assert.equal(r2.why, 'answer for BRAIN must be rented|hybrid|sovereign, got "leased"');
});

test('total on garbage, refusal pinned per guard clause', () => {
  const why = 'auditStack reads an answers object: { "<LAYER>": "rented"|"hybrid"|"sovereign" }';
  assert.equal(auditStack('x').why, why);
  assert.equal(auditStack(null).why, why);
  assert.equal(auditStack(Object.assign([], all('sovereign'))).why, why);
  assert.equal(auditStack(undefined).why, why);
});

test('the lists partition the seven in fixed order', () => {
  const m = all('hybrid');
  m.GATEWAY = 'sovereign';
  m.AGENTS = 'rented';
  const r = auditStack(m);
  assert.equal(r.sovereign.length + r.hybrid.length + r.rented.length, 7);
  assert.equal(r.sovereign[0], 'GATEWAY');
  assert.equal(r.rented[0], 'AGENTS');
  assert.equal(r.hybrid[0], 'BRAIN');   // first hybrid in LAYERS order
  assert.equal(r.sovereignty, Math.round(((1 + 0.5 * 5) / 7) * 100));  // 50
  assert.equal(r.sovereignty, 50);
});
