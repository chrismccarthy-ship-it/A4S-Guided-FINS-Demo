# Changelog

All notable changes to the FinServ Guided Demo. Dates are release dates.

## 2026-08-19

A full polish pass across the three-act journey — the live-call experience, the
Command Center, the case record, and global UX — plus new keyboard navigation.
Every change is data-driven across all 7 storylines (retail-fraud, wealth,
commercial, insurance, insurance-claim, insurance-life, fintech) and verified
with headless walk-throughs.

### Voice call experience
- Seed the live transcript on pickup with the full Agentforce Voice history and a
  dismissible Conversation Catch-Up, so the rep never sees an empty transcript.
- Replace the raw routing-summary line with a "[Rep] joined the conversation"
  notice and timestamp; the monitor dock keeps the routing summary.
- Fix the transcript to a constant height (reaching the Cases card) so it no
  longer shifts as turns are added — new turns scroll inside it.
- Recolor transcript bubbles: agent/rep dark grey, customer light grey; teal chat
  icon in the header.
- Remove the pulsing "live" dot and the pause-button highlight; the pickup step
  now spotlights the customer information.
- Human-paced Play: during the live call (slides 16–23), each slide's dwell scales
  with the length of the turn just spoken instead of a flat 10s.

### Monitor / Command Center
- Add the Agentforce robot icon to the panel title; give the selected tile the
  blue-corner checkmark; remove the "Act 1 · Monitoring" banner and three extra tiles.
- Add an interactive Service Reps tab with a full Agent Summary table (name links,
  status/capacity dots, no avatars).
- Streamline the hand-off: Transfer to Rep goes straight to Accept (removed the
  intermediate "open Omni sidebar" step); fix the dock button outline.

### Case record
- Remove all emojis (proper SLDS case icon in the header).
- Replace the History card with an Activity / Timeline / Chatter component —
  Log a Call composer, filters, and a green Upcoming & Overdue timeline (#2876D3).

### Co-worker (Act 0)
- Rebuild the in-progress case tables with six real columns (Case, Subject,
  Description, Status, Date Created, Owner) and domain-specific cases per vertical
  (retail re-themed to card replacement, disputes, online-banking, etc.).

### Wrap-up
- "Get Agentforce Recommendations" button, red agent icon, and pencil-edit fields
  matching the reference.

### Global
- Typography switched to the Salesforce Sans stack with Public Sans as the loaded
  fallback.
- Sidebar rail icons matched to the reference (blue-circle Omni arrow, plain grey
  briefcase).
- Keyboard controls: → next · ← back · ↑ expand footer · ↓ collapse footer ·
  Space play/pause (ignored while typing in a field).
- Move the contact-card Health pill to the bottom-right so long names don't overlap it.
- Emoji cleanup across the console UI and a reformatted Omni-Channel inbox.
