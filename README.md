# Agentforce Service — Financial Services Guided Demo

A **self-contained, single-file** guided click-through demo of **Agentforce Service for Financial Services**, built for Financial Services Account Executives to run their own storyline **without an SE**. It pairs with the Agentforce Voice narrative: an AI voice agent handles an inbound call, a supervisor monitors it, warm-transfers to a human rep via Omni-Channel, and the rep resolves it live with the **Service Assistant** — then documents, classifies, and closes the case.

> **Fictional data · synthetic likenesses · no PII · not connected to a live org · for demonstration only.**
> This is a pure front-end mock. One HTML file, zero dependencies, no backend, no org connection, no secrets.

**Live (Claude artifact):** https://claude.ai/code/artifact/54043309-6961-4e99-b410-59ec5d9351b4
**GitHub Pages:** see [DEPLOY.md](DEPLOY.md) (served from `index.html`).

---

## What it does

On the **landing placemat**, the AE:
1. Types the **customer name** (brands the workspace org name in the console header).
2. Optionally pastes a **brand hex color** (themes the org accent — header swatch, identity-card gradient).
3. Picks a **sub-vertical** card and drops into a fully guided walkthrough.

A **guidance bar** pinned to the bottom drives the demo: **Play / Pause / Restart / Back / Next**, a **talk-track** toggle (blurs the narration for a clean screen-share), a step counter, and a value sentence per step. The **next thing to click is always visually indicated** — a light-blue **pulsing ring** on the target (plus a rectangular **box** highlight when a whole component is called out). The spotlight only appears once you're *inside* the demo, never on the landing placemat.

### The Retail Banking storyline (built end-to-end)

**Lauren Bailey** calls in about a **$75 Amazon Marketplace charge she doesn't recognize** that overdrafted her account.

- **Act 1 · Command Center (monitor):** Agentforce Voice is on the call. Supervisor clicks **Monitor** → reads the **Conversation Catch-Up** (SMS-verified, intent + sentiment captured) → **Dismiss** → **Transfer to Rep**.
- **Omni-Channel accept:** the transfer lands in the rep's **Omni-Channel inbox** (paused work steps aside) → open the **presence menu** (every channel routed by skill/priority/capacity) → **✓ accept** the call.
- **Act 2 · Voice workspace:** left = identity 360 + phone controls + live **transcript** (plays turn-by-turn) + Cases/Entitlements; center = Conversation Transcript / Coaching / **Details** tabs; right = **Service Assistant** (Astro hero → **Service Plan** card → **Draft Plan** → grounded checklist with a `[1]` Knowledge citation that pops the article → **Send Article** → **email draft → Send**). Then **End Call** (phone control collapses to a red "Call ended" pill up top) → **Get Einstein Recommendations** → editable **Automated Wrap-Up** + a full **Service Quality Scorecard** (soft-skills, customer concerns, key moments, topics, score justification) → **Save**; a supervisor **bell notification** fires with the score.
- **Case:** **Einstein Classification** (Status/Language/Product Family pre-filled; **Get Einstein Recommendations** fills Type + Sub-Type) → **Draft Plan** → **Close Plan & Case** (status → Closed, resolved outcome) → **Draft Knowledge Article** (fires a second bell notification) → open the **bell** to see "a knowledge article is ready for review."

---

## The five sub-verticals

| Card | Use case | Status |
|---|---|---|
| 💳 **Retail Banking** | Fraud & Disputes | ✅ Built end-to-end |
| 📈 **Wealth Management** | Seamless Onboarding | ⏳ To clone |
| 🏦 **Commercial Banking** | sFTP / ACH Onboarding | ⏳ To clone |
| 🛡️ **Insurance Brokerage** | Multi-Carrier Quoting | ⏳ To clone |
| ⚡ **FinTech** | API Incident + Escalation | ⏳ To clone |

The other four render on the placemat as "coming soon." Cloning is a data exercise — see **[AUTHORING.md](AUTHORING.md)**.

---

## Running it

It's one static file. **Just open `index.html` in a browser** — no build, no install.

For a local server (optional):
```bash
python -m http.server 8000    # then open http://localhost:8000
```

To share it on a URL, see **[DEPLOY.md](DEPLOY.md)** (GitHub Pages is one click).

---

## How it's built (short version)

- **One file, no dependencies.** Inline CSS + vanilla JS. SLDS-flavored (Salesforce Lightning look) but hand-rolled — no framework, no CDN. Committed to a **light UI** (a Salesforce console is a light product).
- **Data-driven.** All demo content lives in a `VERTICALS` object keyed by a short `id`, structured to mirror the original HLS demo's 8-file schema. A flat `STEPS` playbook drives the guided walkthrough.
- **Guided engine.** Each step declares what's visible (a `set` of flags), which element to **pulse** (`target`) or **box**, and what click **advances** it (`advanceOn`). State for any step is derived by folding the flags — so **Back/Forward reconcile cleanly**.
- **Tested headless.** A jsdom harness walks all steps forward/back and asserts the guided targets resolve, transcripts reconcile, and every interaction advances. See AUTHORING.

Full architecture, the slide schema, the highlight system, gotchas, and a step-by-step "add a vertical" guide are in **[AUTHORING.md](AUTHORING.md)**.

---

## Known simplifications (single-file artifact vs. a full app)

- **Brand color, not logo scraping.** A self-contained page can't fetch a customer's website (CSP), so branding is the **name + a pasted hex** rather than auto-extracting their real logo/colors.
- **Astro is a drawn SVG.** The Service Assistant avatar is an original robot-astronaut approximation, not the actual Salesforce Astro asset (kept self-contained; no external images).
- **Front-end mock.** No jsforce, no live org, no real email/actions — buttons show realistic toasts and state changes.
