# Agentforce Service — Financial Services Guided Demo

A **self-contained, single-file** guided click-through demo of **Agentforce Service for Financial Services**, built for Financial Services Account Executives to run their own storyline **without an SE**. It pairs with the Agentforce Voice narrative: an AI voice agent handles an inbound call, a supervisor monitors it, warm-transfers to a human rep via Omni-Channel, and the rep resolves it live with the **Service Assistant** — then documents, classifies, and closes the case.

> **Fictional data · synthetic likenesses · no PII · not connected to a live org · for demonstration only.**
> This is a pure front-end mock. One HTML file, zero dependencies, no backend, no org connection, no secrets.

**Live (Claude artifact):** https://claude.ai/code/artifact/54043309-6961-4e99-b410-59ec5d9351b4
**GitHub Pages:** see [DEPLOY.md](DEPLOY.md) (served from `index.html`).

---

## What it does

On the **landing placemat**, the AE fills a short **intake form** — the storyline cards stay greyed-out until it's valid:
1. **Full Name** (required) and **Date** (auto-filled to today, editable).
2. **Account Name** (required) — brands the workspace org name in the console header.
3. Optionally pastes a **brand hex color** (themes the org accent — header swatch, identity-card gradient).
4. An **"Is this related to an opportunity?"** checkbox that, when ticked, reveals + requires **Opportunity Name**, **Amount**, and **Opportunity Link**.

Once the required fields are filled, **all** storyline cards unlock at once; picking one drops into a fully guided walkthrough. The intake feeds optional **usage tracking** (see below).

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
| ⚡ **FinTech** | API Incident + Escalation | ✅ Built end-to-end |
| 📈 **Wealth Management** | Seamless Onboarding | ✅ Built end-to-end |
| 🏦 **Commercial Banking** | sFTP / ACH Onboarding | ✅ Built end-to-end |
| 🛡️ **Insurance Brokerage** | Multi-Carrier Quoting | ✅ Built end-to-end |

All five verticals share the same vertical-agnostic engine and 24-step playbook; each is a self-contained data entry. Cloning a new one is a data exercise — see **[AUTHORING.md](AUTHORING.md)**.

### The FinTech storyline (built end-to-end)

**Derek Vaughn**, VP Engineering at **PayCadence**, calls in — upset — because the **payments API is returning elevated 5xx errors** and blocking production traffic.

- **Act 1 · Command Center:** Agentforce Voice is on the call. It SMS-verifies the API key holder, **delivers the live incident status** (INC-4821, mitigation underway, ~20-min ETA), and — because Derek wants a root-cause commitment, not just a status — flags the call for **escalation**. Supervisor **Monitors** → reads the **Conversation Catch-Up** → **Transfer to Rep** (routed to Tier-2 Enterprise) → **Omni-Channel accept**.
- **Act 2 · Voice workspace:** the Enterprise Support engineer (Priya) picks up with Derek's full 360 and the incident already linked. The **Service Assistant** drafts the *API Incident Escalation & RCA* plan — confirm impact window, verify mitigation against the incident timeline (grounded `[1]` citation to the **Enterprise Incident Response & SLA Credit Policy**), **apply the SLA credit**, **subscribe to status**, and **commit the RCA** — then an incident-summary email → **Send** → **End Call** → **Wrap-Up + Scorecard** (82 — a tough call, owned end to end; strong on ownership/de-escalation) with the supervisor **bell**.
- **Case:** Einstein Classification (**Type = Incident · Sub-Type = API Degradation**) → **Draft Plan** → **Close** → **Draft Knowledge Article** ("Enterprise API Incident Escalation Runbook") → **bell**.

### The Wealth Management storyline (built end-to-end)

**Jonathan Ashford III**, a new **UHNI ($40M) private-wealth client**, calls to **consolidate three external accounts** — a Fidelity brokerage, a Schwab IRA, and a JP Morgan trust — into his new **Premier Portfolio**.

- **Act 1 · Command Center:** Agentforce Voice is on the call. It SMS-verifies Jonathan, captures the three external accounts, and confirms the consolidation runs through **ACATS** with eligible holdings moving **in-kind** (so he stays invested). Supervisor **Monitors** → reads the **Conversation Catch-Up** → **Transfer to Rep** (routed to Private Wealth) → **Omni-Channel accept**.
- **Act 2 · Voice workspace:** the **Private Wealth Advisor** (Marcus) picks up with Jonathan's full 360 and the new Premier Portfolio already open. The **Service Assistant** drafts the *New Client Account Consolidation* plan — confirm the registrations, verify ACATS eligibility and in-kind handling (grounded `[1]` citation to **ACATS Transfer Timelines & In-Kind vs. Liquidation**), **initiate the transfers**, **expedite the trust registration**, and schedule the onboarding — then a welcome email → **Send** → **End Call** → **Wrap-Up + Scorecard** (88 — a white-glove onboarding handled end to end) with the supervisor **bell**.
- **Case:** Einstein Classification (**Type = Onboarding · Sub-Type = Account Transfer (ACATS)**) → **Draft Plan** → **Close** → **Draft Knowledge Article** ("New-Client Account Consolidation Runbook") → **bell**.

### The Commercial Banking storyline (built end-to-end)

**Marcus Bell**, treasury manager at newly onboarded **PayFlow Logistics**, calls because he needs to **start paying vendors by ACH/wire this week** and has no secure way to send payment files.

- **Act 1 · Command Center:** Agentforce Voice is on the call. It matches Marcus to the PayFlow treasury profile, SMS-verifies him, confirms the commercial entitlement, and captures the request to provision **sFTP**, enable **ACH origination**, and stand up **Lockbox**. Supervisor **Monitors** → **Conversation Catch-Up** → **Transfer to Rep** (routed to Treasury Onboarding) → **Omni-Channel accept**.
- **Act 2 · Voice workspace:** the Treasury Onboarding specialist (Chris) picks up with PayFlow's full 360 and the onboarding case linked. The **Service Assistant** drafts the *Treasury Onboarding — sFTP + ACH* plan — confirm accounts and NACHA file format (grounded `[1]` citation to **Commercial ACH Origination & sFTP Onboarding**), **provision the sFTP channel** with a public-key credential, **enable ACH** with a $250K daily limit + dual approval, **add wire + Lockbox**, and **validate a test NACHA file** — then a go-live email → **Send** → **End Call** → **Wrap-Up + Scorecard** (89 — a multi-part onboarding cleared in one contact) with the supervisor **bell**.
- **Case:** Einstein Classification (**Type = Onboarding · Sub-Type = Treasury services setup (sFTP / ACH)**) → **Draft Plan** → **Close** → **Draft Knowledge Article** ("Commercial sFTP + ACH Onboarding Runbook") → **bell**.

### The Insurance Brokerage storyline (built end-to-end)

**Elena Marchetti** just **closed on a new home with an in-ground pool** and calls her broker — she needs homeowners coverage bound **before Friday's closing** and knows the pool needs extra liability.

- **Act 1 · Command Center:** Agentforce Voice is on the call. It matches Elena to the household profile, SMS-verifies her, pulls the new-home property, and captures the request to quote **HO-3 with pool liability** across carriers and bind before closing. Supervisor **Monitors** → **Conversation Catch-Up** → **Transfer to Rep** (routed to Personal Lines) → **Omni-Channel accept**.
- **Act 2 · Voice workspace:** the licensed broker (Chris) picks up with Elena's full 360 and the new-business case linked. The **Service Assistant** drafts the *New Homeowners + Pool Liability* plan — confirm the property, rebuild cost, and pool exposure (grounded `[1]` citation to **Personal Lines — HO-3 Quoting & Pool Liability**), **build the HO-3 quote** with a pool endorsement, **compare carriers**, **bind the best-value option** effective the closing date with a multi-policy discount, and **issue the certificate** to the lender — then a confirmation email → **Send** → **End Call** → **Wrap-Up + Scorecard** (87 — bound before closing on first contact) with the supervisor **bell**.
- **Case:** Einstein Classification (**Type = New Business · Sub-Type = New homeowners policy (pool liability)**) → **Draft Plan** → **Close** → **Draft Knowledge Article** ("HO-3 Multi-Carrier Quote & Bind Runbook") → **bell**.

### Routing & deep-links

Clicking a **ready** card selects that vertical (`selectVertical(id)` rebuilds the playbook) and drops into its walkthrough; the engine is vertical-agnostic, so only the copy/data changes. You can also **deep-link** straight into a built demo with `?vertical=<id>` (e.g. `?vertical=fintech`), combinable with `?org=` and `?hex=`.

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

## Usage tracking (optional)

The demo can log **who ran it, for which account/opportunity, and how far they got** to a **Google Sheet** — with zero backend. It's **off by default** and completely inert until you opt in.

**How it works.** The landing intake form populates an `INTAKE` object; the engine fires fire-and-forget `navigator.sendBeacon` events at milestones: `demo_opened`, `demo_started`, `step_viewed`, `call_ended`, `case_closed`, `demo_completed`. Each beacon carries a per-session id, timestamp, the intake fields, and the vertical/step. When `TRACK_URL` is blank, `track()` is a guaranteed **no-op** — nothing is sent, and a bad URL can never block or slow the demo.

**To enable it:**
1. Create a Google Sheet with a tab named `Events` and these headers in row 1:
   `ts · event · sessionId · fullName · accountName · date · isOpportunity · opportunityName · amount · opportunityLink · vertical · useCase · step`
2. **Extensions → Apps Script**, add a `doPost(e)` that appends `JSON.parse(e.postData.contents)` as a row, then **Deploy → Web app** (Execute as *Me*, Access *Anyone*).
3. Paste the resulting `/exec` URL into the `TRACK_URL` constant near the top of the `<script>` in `index.html`.

Because beacons are anonymous, **identity comes from the intake form** (Full Name / Account Name) — which is exactly why the storyline cards are gated behind it.

---

## Known simplifications (single-file artifact vs. a full app)

- **Brand color, not logo scraping.** A self-contained page can't fetch a customer's website (CSP), so branding is the **name + a pasted hex** rather than auto-extracting their real logo/colors.
- **Astro is a drawn SVG.** The Service Assistant avatar is an original robot-astronaut approximation, not the actual Salesforce Astro asset (kept self-contained; no external images).
- **Front-end mock.** No jsforce, no live org, no real email/actions — buttons show realistic toasts and state changes.
