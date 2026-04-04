# Prompt 14c — Redesign Question 3 (Scripture)

## Context
Read `project-docs/14-site-intent-audit.md` (Issue 6) for full context. The current Q3 ("How do you relate to the God of the OT?") triggers Marcionism for 3 of 4 answers, making it feel rigged. We're redesigning the question entirely.

## Task 1: Replace Q3 in questions.ts

In `src/data/questions.ts`, replace the entire Q3 object (id: 3, category: 'Scripture') with a new question about how Christians should read and use the Bible. This surfaces a wider range of genuine theological debates.

### New Q3

```typescript
{
  id: 3,
  category: 'Scripture',
  question: 'How should Christians read and use the Bible?',
  tone: 'substantive',
  answers: [
    {
      id: 'q3a',
      text: "Every word is directly from God — inerrant, literal, and equally authoritative from Genesis to Revelation.",
      heresyTriggered: 'biblicism',
      revealTitle: 'Strict Biblicism — debated across all traditions',
      revealText:
        "Strict biblicism — treating every verse as equally literal and directly dictated — has been contested since the early church. Origen (3rd century) insisted that some passages demand allegorical reading. Augustine warned against reading Genesis as a science textbook, saying it made Christians look foolish to pagans. The Chicago Statement on Biblical Inerrancy (1978) itself acknowledges genre, metaphor, and literary context. Even the most conservative evangelicals don't read 'if your right eye causes you to sin, gouge it out' (Matt 5:29) literally. The question isn't whether the Bible is authoritative — nearly all Christians agree it is — but whether 'authoritative' requires 'uniformly literal.'",
      severity: 'debated',
      councilIds: [],
      condemnedByCount: 0,
      unityNote: "The desire to take God's word with total seriousness is admirable. The disagreement is about method, not devotion.",
    },
    {
      id: 'q3b',
      text: "The New Testament supersedes the Old — the OT was for a different time and people.",
      heresyTriggered: 'marcionism',
      revealTitle: 'Functional Marcionism — condemned since 144 AD',
      revealText:
        "Marcion was expelled from the church in Rome around 144 AD for teaching that the OT God was a different, inferior deity from the Father Jesus revealed. This is a softer version, but the instinct is similar: the OT feels outdated, so set it aside. Yet Jesus quoted the OT constantly. Paul built his theology on it. The church fought Marcion precisely to keep it. The NT authors never treated the OT as expired — they reinterpreted it through Christ. Even Hebrews, which speaks of a 'new covenant,' doesn't discard the old but reads it as pointing forward.",
      severity: 'condemned',
      councilIds: [],
      condemnedByCount: 0,
      unityNote: "Many thoughtful Christians navigate the OT/NT relationship differently. The conversation itself honours the text.",
    },
    {
      id: 'q3c',
      text: "The Bible is inspired but must be interpreted carefully — some parts are culturally conditioned, and we need wisdom to discern how they apply today.",
      heresyTriggered: 'progressive-hermeneutics',
      revealTitle: 'Progressive hermeneutics — debated between conservative and progressive traditions',
      revealText:
        "Conservative evangelicals worry this opens the door to discarding anything inconvenient — if cultural context can neutralise one command, what stops you neutralising them all? The 'slippery slope' concern is real and has historical precedent. But the church has always interpreted. Jesus himself reinterpreted 'an eye for an eye' in the Sermon on the Mount (Matt 5:38–39). Paul told women to cover their heads (1 Cor 11:5–6) — a command most churches quietly ignore. The question isn't whether we interpret, but where interpretation becomes revision. That boundary has never been agreed upon.",
      severity: 'debated',
      councilIds: [],
      condemnedByCount: 0,
      unityNote: "Every Christian interprets — the disagreement is about where to draw the line. That's a conversation worth having with humility on all sides.",
    },
    {
      id: 'q3d',
      text: "The Bible is a human document — inspired in places, but not fundamentally different from other great spiritual literature.",
      heresyTriggered: 'liberal-theology',
      revealTitle: 'Liberal theology — debated since the 19th century',
      revealText:
        "Friedrich Schleiermacher (19th century) reframed Christianity around religious experience rather than doctrinal authority, effectively demoting Scripture from 'God's word' to 'a record of religious experience.' This undermines biblical authority as every major tradition — Catholic, Orthodox, and Protestant — understands it. The Fundamentalist–Modernist controversy of the 1920s was fought over exactly this. Yet critical scholarship has genuinely shown that the Bible bears human fingerprints: editorial layers, theological development, culturally conditioned language. The tension between 'inspired' and 'human' is built into the text itself (2 Tim 3:16 says 'God-breathed'; 1 Cor 7:12 has Paul saying 'I, not the Lord').",
      severity: 'debated',
      councilIds: [],
      condemnedByCount: 0,
      unityNote: "Honest questions about the Bible's nature aren't the enemy of faith. Some of the most devoted Christians in history have wrestled with exactly these tensions.",
    },
  ],
  option5Reveal: {
    title: 'How to read the Bible: a fight as old as the church',
    text: "Christians have never agreed on how to read the Bible. Origen (3rd century) insisted much of it was allegorical. The Antiochene school demanded literal, historical reading. Augustine warned against rigid literalism. The Reformers championed sola scriptura but immediately disagreed about what Scripture meant. Marcion (144 AD) tried to discard the OT entirely and was expelled. Schleiermacher (19th century) reframed Scripture as human religious expression and sparked the Fundamentalist–Modernist divide that persists today. The Catholic Church at Trent insisted Scripture must be read through tradition. The Orthodox say the same. Evangelicals say 'the Bible alone' but maintain thick interpretive traditions of their own. Even the canon itself — which books belong in the Bible — wasn't settled until the 4th century, and Protestants and Catholics still disagree about the Apocrypha. Everyone claims to read the Bible faithfully. No two traditions do it the same way.",
  },
},
```

## Task 2: Add New Heresy Records

In `src/data/heresies.ts`, add three new heresy records:

### Biblicism
```typescript
{
  id: 'biblicism',
  name: 'Strict Biblicism',
  slug: 'biblicism',
  shortDescription: 'Every word of the Bible is equally literal, directly dictated, and self-interpreting.',
  fullDescription: "Strict biblicism holds that the Bible requires no interpretive framework — it says what it means and means what it says, uniformly and literally. While most Christians affirm biblical authority, strict biblicism goes further by rejecting the role of genre, cultural context, or literary form in interpretation.",
  condemnedBy: [],
  condemnedFigures: [],
  modernHolders: ['Some fundamentalist traditions', 'King James Only movement'],
  yearCondemned: 0,
  plainLanguage: "You think the Bible is a straightforward instruction manual where every verse means exactly what it says on the surface — no interpretation needed.",
  whyYouMightAgree: "It's the safest approach — if you start interpreting, where do you stop? Better to take God at his word.",
  ntPerspective: "Even Jesus used allegory (parables), and the NT authors frequently reinterpret OT passages in non-literal ways (e.g., Paul's allegory of Hagar and Sarah in Galatians 4:21–31).",
},
```

### Progressive Hermeneutics
```typescript
{
  id: 'progressive-hermeneutics',
  name: 'Progressive Hermeneutics',
  slug: 'progressive-hermeneutics',
  shortDescription: 'Scripture must be filtered through cultural context — some commands may not apply today.',
  fullDescription: "Progressive hermeneutics emphasises the cultural distance between the biblical world and today, arguing that some commands were specific to their context and must be re-evaluated. Critics worry this makes the interpreter the authority over Scripture rather than the other way around.",
  condemnedBy: [],
  condemnedFigures: [],
  modernHolders: ['Many mainline Protestants', 'Progressive evangelicals', 'Some Catholic moral theologians'],
  yearCondemned: 0,
  plainLanguage: "You think the Bible needs to be read in cultural context, and some of its instructions were for a specific time and place — not universal commandments.",
  whyYouMightAgree: "We already do this with head coverings, slavery, and holy kisses. The question is just about where to draw the line.",
  ntPerspective: "The Jerusalem Council (Acts 15) itself made exactly this kind of contextual judgment — setting aside Mosaic requirements for Gentile believers. The precedent is apostolic.",
},
```

### Liberal Theology
```typescript
{
  id: 'liberal-theology',
  name: 'Liberal Theology',
  slug: 'liberal-theology',
  shortDescription: 'The Bible is primarily a human document — valuable but not uniquely authoritative.',
  fullDescription: "Liberal theology, rooted in the work of Friedrich Schleiermacher and developed through the 19th and 20th centuries, treats the Bible as a record of human religious experience rather than the direct word of God. It values the Bible but does not grant it unique authority over other sources of spiritual insight.",
  condemnedBy: [],
  condemnedFigures: ['Friedrich Schleiermacher (founder)', 'Rudolf Bultmann (demythologisation)'],
  modernHolders: ['Some mainline denominations', 'Progressive Christianity movement'],
  yearCondemned: 0,
  plainLanguage: "You think the Bible is a great spiritual book, but it's ultimately written by humans and sits alongside other wisdom traditions rather than above them.",
  whyYouMightAgree: "Critical scholarship has shown the Bible's human fingerprints clearly. Why pretend otherwise?",
  ntPerspective: "2 Timothy 3:16 ('All Scripture is God-breathed') and 2 Peter 1:21 ('prophecy never had its origin in the human will') both claim divine origin — but these are themselves claims within the text, which liberal theology treats as human religious expression.",
},
```

## Task 3: Create New Heresy MDX Pages

Create three new MDX files in `src/content/heresies/`:

### `biblicism.mdx`
Write a heresy deep-dive page following the same structure as existing pages (see `modalism.mdx` for template). Sections: The Story, What the Council Actually Said (or "Why It's Debated" if no council condemned it), The NT Evidence, Modern Relevance. ~600–800 words.

Key content points:
- Origen's allegorical method vs. Antiochene literal method
- Augustine warning against literal Genesis reading
- The Reformation introduced "perspicuity of Scripture" but Reformers still disagreed
- The Chicago Statement (1978) explicitly acknowledges genre and metaphor
- Christian Smith's "The Bible Made Impossible" as a scholarly critique of biblicism
- Modern examples: Young Earth Creationism insists on literal Genesis; most Christians read Revelation symbolically

### `progressive-hermeneutics.mdx`
Key content points:
- The Jerusalem Council (Acts 15) as the first contextual hermeneutical decision
- Head coverings (1 Cor 11), slavery (Philemon, Eph 6), holy kisses (Rom 16:16)
- The "slippery slope" concern and why conservatives take it seriously
- William Webb's "Redemptive Movement Hermeneutic"
- The distinction between descriptive and prescriptive texts
- Historical precedent: the church changed its reading of passages used to justify slavery

### `liberal-theology.mdx`
Key content points:
- Schleiermacher's "On Religion: Speeches to Its Cultured Despisers" (1799)
- Bultmann's demythologisation programme
- The Fundamentalist–Modernist controversy (1920s)
- Karl Barth's "Neo-Orthodox" pushback — taking Scripture seriously without fundamentalism
- The tension in 1 Cor 7:12 where Paul distinguishes his own words from the Lord's
- The genuine findings of textual criticism and how they challenge simple "dictation" models

## Task 4: Update Unity Notes

Replace the placeholder unity notes for Q3 answers (set in prompt 14b) with the `unityNote` values provided in the new Q3 definition above.

## Verification
- Build (`npm run build`) — no TypeScript or build errors
- Verify the new Q3 renders correctly in the quiz
- Verify 4 distinct heresies are triggered (not 3× Marcionism)
- Verify new heresy pages render at `/explore/biblicism`, `/explore/progressive-hermeneutics`, `/explore/liberal-theology`
- Verify the old Marcionism page (`/explore/marcionism`) still exists and is linked from Q3b
- Verify the Option 5 panoramic reveal for Q3 renders correctly
