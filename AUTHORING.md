# Authoring guide — how it works & how to clone a new sub-vertical

This is the "everything we learned" doc. The app is **one HTML file** (`index.html`) with three parts: inline `<style>`, the page skeleton (`<div class="app">` + the fixed guidance bar), and one big `<script>`. ~90% of it is an industry-agnostic engine; a new storyline is almost entirely **data**.

**Golden rule:** you rebrand/clone by editing the `VERTICALS` data object and the `STEPS` playbook. You rarely touch the engine (render loop, highlight system, view renderers).

---

## 1. Architecture at a glance

| Piece | What it is |
|---|---|
| `VERTICALS` | The demo content, keyed by a short `id` (built today: `retail-fraud`, `fintech`, `wealth`). Sub-objects mirror the original HLS demo's 8 "files": monitor meta, record/person-360, voice (AFV) transcript + catch-up, `repConvo` (the live rep↔customer transcript that plays), `sra` (Service Assistant: plan, checklist, knowledge, email), `callSummary` (wrap-up + scorecard), `outcomes`, `caseData`. |
| `VMETA()` | The landing placemat cards (one per entry). `ready:true` = playable; others toast "coming soon." |
| `STEPS` (built by `buildSteps()`) | A **flat list of slides**. Each slide declares its view, the flags that are on, the element to highlight, and what advances it. |
| `render()` | The engine. Computes visible state for the current step by **folding flags**, swaps the view if it changed, calls the per-view `update*()`, updates the guidance bar, and applies the highlight. |
| `viewLanding/Monitor/Voice/Case` + `update*` | Pure renderers + incremental updaters per view. |

### The flag-fold model (important)

State for step *i* is `foldState(i)` — it walks steps `0..i` and `Object.assign`s each step's `set` onto an accumulator. **Flags accumulate and stay on** until a later step sets them off.

> **Gotcha we hit:** to *turn a flag off* on a later slide you must set it explicitly false, e.g. `channelOpen:0`. Otherwise it lingers (that's why the Omni-Channel dropdown stayed open one slide too long until we added `channelOpen:0`). This fold model is what makes **Back/Forward** reconcile perfectly, so keep using it.

---

## 2. The slide (STEPS) schema

```js
{
  view: "voice",                 // landing | monitor | voice | case  (drives which renderer)
  set: { phoneLive:1, sraPlanCard:1 },   // flags ON for this slide (fold-accumulated)
  turns: 3,                      // (voice) how many rep↔customer transcript turns are revealed
  target: "#draftPlanSra",       // element to PULSE (light-blue ring + pulsing dot)
  box: ["#idCard","#phoneCard"], // element(s) to BOX (rectangular highlight) — string or array
  advanceOn: "#draftPlanSra",    // clicking this element advances to the next slide
  stopHere: true,                // Play auto-run pauses here (hand-off beat)
  autoplay: true, dur: 1900,     // Play auto-advances through this slide after dur ms
  title: "…", talk: "…",         // shown in the guidance bar
  dothis: "Click 'Draft Plan'.", // the imperative "➤ do this" line
}
```

- **Highlighting:** `target` → the pulsing pill/ring (the "click here" indicator). `box` → a rectangular outline for calling out a whole component (no dot). Both are cleared and re-applied every render; neither appears on the `landing` view.
- **Advancing:** `advanceOn` makes that element clickable to go Next (users can also use the guidance-bar Next). Some interactions (bell, Draft Knowledge Article) are handled in the global click delegate instead, using the pattern `if (STEPS[idx].target === '#x') next()`.
- **Scroll-within-component:** if a `target` lives inside a scroll container (`.sra-scroll`, `.convo`, `.dbody`), the engine scrolls **that container**, not the page — so the Service Assistant scrolls internally and the screen stays put.

---

## 3. The highlight / guidance system

- `.guided` — the pulsing blue ring + dot. Applied to `step.target`.
- `.boxed` — a blue rectangular outline. Applied to `step.box`.
- Guidance bar (`#guidebar`) — Play/Pause/Restart/Back/Next, talk-track toggle, counter, progress line. **Hidden on the landing view** (and the app padding adjusts) so the placemat is clean.
- Talk-track toggle blurs `.talk`/`.dothis` for a clean screen-share.

## 4. Notifications (the bell)

A small notification center: `notifications[]` + `addNotif/removeNotif/updateBell/toggleBellPanel`. `render()` syncs the **scorecard** notification from the `bell` flag; the **Draft Knowledge Article** button adds a second ("ready for review") via the click delegate. Clicking the bell opens the panel; **Restart** clears it.

## 5. Per-view notes

- **Voice** center tabs (Conversation Transcript / Coaching / Details / Financials / Related) switch via `voiceTab` + `applyVoiceTab()`; the step engine forces **Coaching** on the scorecard slide. **Details** holds the Current Case.
- **End call:** when `callEnded` is set, the Phone control card is removed and a red "Call ended" pill appears in the top voicetop strip.
- **Case path:** every status renders; only completed/in-progress are filled green (`.pstep.done`), Closed fills dark green (`.pstep.closed-hl`) on close, unreached stay unfilled.

---

## 6. How to add / build a sub-vertical

1. **Pick an `id`** (kebab-case), e.g. `fintech-incident`.
2. In `VERTICALS`, add an entry with that id and fill every sub-object (copy `retail-fraud` as the template): `monitor`, `record` (person 360 + cases + entitlement + current case), `voice` (AFV transcript + `catchupText`), `repConvo` (the 9-turn live transcript that plays), `sra` (`planTitle`, `planSummary`, `planBullets`, `groups` for the checklist, `knowledge`, `email`, `workSummary`), `callSummary` (`score`, `rubric`, `softSkills`, `customerConcern`, `keyMoments`, `topics`, `recommended`, `justification`, `wrapFields`), `outcomes`, `caseData`.
3. In `VMETA()`, set that card `ready:true`.
4. **Routing is already generalized.** `V` is a mutable `let` (not `const`), and clicking a ready card calls `selectVertical(id)` → sets `activeVertical`/`V` and re-runs `buildSteps()` before `go(1)`. The `STEPS` playbook reads from `V`, so a new vertical needs **no engine change** — just the data entry. You can also deep-link with `?vertical=<id>`.
5. **Keep the data shapes identical** to `retail-fraud`, because a few renderers key off *position*, not names:
   - The `[1]` **Knowledge citation** (`#src4`) is injected on the **4th flat checklist item** (`i===3`) *only if that item has `src`*. Keep your `groups` so the 4th item across all groups is a grounded (`src:1`) step — e.g. Gather has `[done, src]`, Work has `[done, src]` (the 2nd Work item is #4).
   - Keep the **9-turn** `repConvo` arc and the **Play-pauses-at-the-hand-off** `stopHere` so the transcript reveals line up with the plan reveals.
   - The case tab (`#tabCase`), voice tab (`#tabVoice`), scorecard bell, email sign-off, and close/KB toasts are all driven from `V` (`caseData.number`, `monitor.voiceCallId`, `callSummary.score`, `monitor.caller`) — so they rebrand automatically.
6. **Vertical-specific step copy** in `buildSteps()` is interpolated from `V` (`cust = V.monitor.caller.split(' ')[0]`, `planName = V.sra.planTitle`). If you add copy that names the customer or the plan, use those instead of hardcoding — that's how the same 24 slides read correctly for every vertical.

> The data field names are exactly what the renderers read. If something prints `undefined`, a field is missing (that's how we caught a missing `planSummary`).

---

## 7. Testing (do this before you ship)

There's no framework, but the whole thing is testable headless with **jsdom**. The pattern we used:

```js
const {JSDOM} = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body>'+html+'</body></html>', {
  runScripts:'dangerously', pretendToBeVisual:true,
  beforeParse(w){ w.matchMedia=()=>({matches:false}); w.requestAnimationFrame=cb=>setTimeout(cb,0); w.Math.random=()=>0.5; }
});
// then: walk every step forward and back, click advanceOn targets with a bubbling MouseEvent,
// and assert the guided element resolves, transcripts reconcile, and flows advance.
```

Notes learned the hard way:
- jsdom has no `matchMedia`/`requestAnimationFrame` — stub them in `beforeParse` (the app also guards `matchMedia`).
- `top-level `let`/`const` are **not** on `window`; only function declarations are. Test through the exposed functions (`go`, `next`) and the DOM.
- Use a **bubbling** `MouseEvent('click',{bubbles:true})` — delegated handlers (tabs, bell, Draft KB) rely on bubbling; a plain `Event('click')` won't reach `document`.
- `body.textContent` in jsdom **includes `<script>` source** — scope text assertions to the rendered stage, not the whole body.
