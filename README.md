# AI-Native or AI-Rented — the seven-layer audit

**Live: https://sjgant80-hub.github.io/ai-native-gap/**

The market sells "AI-native" as a chatbot bolted onto a knowledge base, routed to a rented
model hub, supervised to catch its mistakes. That is **AI-rented**. AI-native means the
intelligence is **yours** — sovereign, local, self-refusing — and contains itself.

This repo is the difference made runnable: a gated scorer over the seven layers where the
gap lives, and a live audit page where each sovereign answer links a **running public
receipt**, not a claim.

## The seven layers

| layer | AI-RENTED | AI-NATIVE | receipt |
|---|---|---|---|
| GATEWAY | one rented API door — a dependency | your own admission wall (identity, capability, budget) | [chorus](https://github.com/sjgant80-hub/chorus) |
| BRAIN | a static knowledge base — a filing cabinet | dreaming memory: reorganises overnight, never rewrites | [the-dreamer](https://github.com/sjgant80-hub/the-dreamer) |
| CONTEXT | raw feeds taken as true | witnessed-not-believed admission | [seam-check](https://github.com/sjgant80-hub/seam-check) |
| HARNESS | supervision to catch bad output after | structural self-refusal before shipping | [witness-kit](https://github.com/sjgant80-hub/witness-kit) |
| ONBOARDING | one-way: the AI learns from the team | bidirectional: the system audits its overseer back | [ui-gate](https://github.com/sjgant80-hub/ui-gate) |
| ROUTING | rented model hubs — the mind is a tenant | own models on own metal; cloud only by named grant | [fallrelay](https://github.com/sjgant80-hub/fallrelay) |
| AGENTS | supervised tools on top | sovereign agents shipping from hours they own | [pixelwhisperer](https://github.com/sjgant80-hub/pixelwhisperer) |

## Scoring

`sovereignty = (sovereign + 0.5 × hybrid) / 7` → verdicts **AI-NATIVE** (100) /
**sovereign-leaning** (≥71) / **hybrid-stack** (≥36) / **AI-RENTED** — thresholds pinned on
the score's reachable lattice. The headline names the most critical rented layer to take
next (pinned order: ROUTING first — without your own metal, everything else is rented at
the root — then HARNESS, BRAIN, the doors).

## Proof

`kernel.mjs` — one pure, total scorer. Mutation gate **CLEAN: 12/12 killed, zero survivors,
zero exemptions** (11 tests; thresholds, criticality and partitions pinned). CI re-runs the
vendored gate on every push:

```
node tools/witness.mjs mutate kernel.mjs --timeout 30000 --cap 180 --test node --test kernel.test.mjs
```

The page carries `kernel.mjs` verbatim between generated markers; CI regenerates and diffs —
the live scorer cannot drift from the gated one. Pure client-side; nothing entered leaves
the page.

Companion instruments: [twelve-powers](https://sjgant80-hub.github.io/twelve-powers/)
(completeness) · [structural-alignment](https://sjgant80-hub.github.io/structural-alignment/)
(alignment as architecture, with receipts).

MIT.
