# Prompt 14f — Tone Audit Pass on All Reveal Texts

## Context
Read `project-docs/14-site-intent-audit.md` (Issue 4, cross-cutting) for full context. This is a final pass to ensure all reveal texts inform rather than condemn, and that the overall tone supports the site's unity intent.

## Task: Review and Adjust Reveal Text Tone

Go through every answer in `src/data/questions.ts` and review the `revealText` field. The goal is NOT to water down the historical content — the facts should remain sharp and surprising. The goal is to ensure the framing leans toward "isn't this fascinating and humbling?" rather than "gotcha, you're a heretic."

### Principles for the tone pass

1. **Replace judgmental framing with curious framing.** "You've described..." → "This describes..." / "The instinct behind this answer..."
2. **Acknowledge the sincerity of all positions.** Every answer represents a position held by thoughtful Christians. The reveal should respect that.
3. **Historical facts stay sharp.** "11 councils condemned this" is a fact, not a gotcha. Keep the surprising historical details.
4. **Remove second-person accusatory phrasing** where it feels pointed. "You've described one God appearing in different modes" → "This describes one God appearing in different modes."
5. **End on nuance, not condemnation.** The last sentence of each reveal should lean toward complexity, not toward "and that's why you're wrong."

### Specific adjustments needed

**Q1a (Modalism):**
Current: "The water/ice/steam analogy? Also modalism."
Adjust: This is fine — it's informative, not accusatory.

Current: "The concern: you've described one God appearing in different modes"
Adjust → "The concern from Trinitarians: this describes one God appearing in different modes — rather than three eternal persons in relationship."

**Q2a (Docetism):**
Current: "If Jesus was demonstrating rather than experiencing, his humanity isn't real — it's a costume."
Adjust → "If Jesus was demonstrating rather than experiencing, the implication is that his humanity wasn't fully real — a concern the earliest church took very seriously."

**Q2d (Docetism):**
Current: "If Jesus performed grief rather than felt it, his humanity is a costume — a hologram of a body housing a divine spirit."
Adjust → "If Jesus performed grief rather than felt it, the implication is that his humanity was a kind of performance — the very concern the earliest church writings address."

**Q3b (Functional Marcionism — in the new Q3 from prompt 14c):**
Ensure the reveal text doesn't feel like a trap. The word "expelled" for Marcion is historical fact and should stay, but frame it as educational.

**Q5a (Transubstantiation):**
Current: "Yet for Catholics, denying it is itself heretical — Trent anathematized all who reject real presence."
This is fine — it shows the two-way nature of the condemnation.

**Q8d (Pelagianism):**
Current: "This is perhaps the most widely held 'heresy' in popular Western culture — 'be a good person and you'll be fine.'"
This is good — it normalises the position before explaining the condemnation.

**Q9a (Sola Scriptura):**
Current: "The practical result has been significant denominational fragmentation"
Adjust → "The practical result has been significant denominational diversity — which critics call fragmentation and supporters call the freedom of conscience."

**Q10c (Pluralism):**
Current: "If all religions lead to God, what's distinctive about Christianity? What was the cross for?"
This is fine as a genuine theological question, not as a gotcha.

### General rule for all reveals
Ensure no reveal text uses the word "you" more than twice. The reveals should describe positions and their history, not diagnose the reader.

### Do NOT change:
- Historical facts (dates, council names, who condemned whom)
- The `unityNote` fields (those were written with the right tone in prompt 14b)
- The Option 5 panoramic reveals (those are already balanced)
- The severity labels or council mappings

## Verification
- Read through all 40 reveal texts (10 questions × 4 answers) end-to-end
- Confirm none feel like a gotcha or personal attack
- Confirm all historical facts remain intact
- Confirm the overall experience of reading reveals feels like "fascinating history" not "you're wrong"
- Build (`npm run build`) — no errors
