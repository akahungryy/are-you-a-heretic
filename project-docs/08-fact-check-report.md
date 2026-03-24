# Fact-Check Report: "Are You a Heretic?" Website

**Date:** March 23, 2026
**Scope:** Full audit — historical accuracy (web-verified), content completeness, structural integrity, quiz logic

---

## EXECUTIVE SUMMARY

The site is historically solid overall. Of 25 specific factual claims verified against external sources, 19 are fully accurate, 4 need minor corrections or nuance, and 2 are genuinely inaccurate. The biggest gap is **6 missing deep-dive (MDX) heresy pages** and **1 placeholder page**, plus **5 broken related-heresy links** within existing pages. All 8 articles and the quiz logic are structurally sound.

---

## SECTION 1: HISTORICAL ACCURACY ISSUES

### 1.1 — INACCURATE CLAIMS (must fix)

**A. ETS 2016 — Misrepresented as formal conclusion**
- **Location:** `councils.ts` (id: `ets-2016`), `heresies.ts` (id: `efs`), quiz Q18 answer q18a
- **Current claim:** "The ETS concluded that Eternal Functional Subordination does not conform to their doctrinal basis on the Trinity."
- **Reality:** ETS held a plenary forum/debate on the Trinity in 2016. Advocates (Bruce Ware, Wayne Grudem) and opponents (Millard Erickson) both presented. **No formal ETS conclusion or doctrinal position was issued.** It was a vigorous debate, not a binding ruling.
- **Fix:** Change the council description to reflect this was a debate that highlighted significant opposition, not a formal condemnation. Consider changing `type` from `'confession'` to something like `'debate'` or softening the language.

**B. Marcionism — Constantinople I attribution unverified**
- **Location:** `heresies.ts` (id: `marcionism`, condemnedBy: `['constantinople-i']`), quiz Q7
- **Current claim:** Marcionism condemned at Constantinople I (381).
- **Reality:** Marcion was excommunicated ~144 AD (correct). But Constantinople I's canons do not appear to explicitly name Marcionism. The council condemned Sabellians, Macedonians, Apollinarians, and others — Marcion is not listed in the surviving canons.
- **Fix:** Remove `constantinople-i` from condemnedBy or add a note that the condemnation is general rather than specific. Could reference the excommunication from Rome (~144) instead.

### 1.2 — OVERSTATED CLAIMS (should soften)

**C. Council of Rimini — "physically detained by imperial guards"**
- **Location:** `councils.ts` (id: `rimini-359`), `questions.ts` Q1 answer q1b, article `council-of-rimini.mdx`
- **Current claim:** "400 bishops initially voted FOR the Nicene position — then were physically detained by imperial guards until they signed the homoian formula."
- **Reality:** Sources confirm ~300-400 bishops and initial pro-Nicene vote. However, the mechanism was "delay and threats" and imperial prefect Taurus "required the bishops to sign before they could leave" — more bureaucratic coercion than dramatic physical detention by guards. The number "400" is the upper bound; some sources say 300+.
- **Fix:** Soften to "300+ bishops initially voted FOR the Nicene position — then were pressured, delayed, and ultimately required to sign the homoian formula before they could leave." The drama is real without needing embellishment.

**D. Pope Liberius — "tortured" is unconfirmed**
- **Location:** `questions.ts` Q1 answer q1b, Q2 answer q2b
- **Current claim:** "Pope Liberius was exiled and tortured."
- **Reality:** Liberius was definitely exiled to Beroea/Thrace in 355 for refusing to condemn Athanasius. Some sources say "probably tortured" but this is described as probability, not established fact. His envoys were "cruelly beaten."
- **Fix:** Change to "Pope Liberius was exiled" or "Pope Liberius was exiled and pressured into signing."

**E. Synod of Dort — "codified TULIP"**
- **Location:** `councils.ts` (id: `dort-1618`)
- **Current claim:** "Condemned Arminianism and codified the 'Five Points of Calvinism' (TULIP)."
- **Reality:** Dort condemned Arminianism and established the five Canons. But the TULIP acronym is a **20th-century invention** (popularized by a 1963 booklet by Cleland Boyd McAfee), not from the 1618 Canons.
- **Fix:** Change to "Condemned Arminianism and established the five Canons of Dort (later summarized by the TULIP acronym)."

### 1.3 — DISPUTED BUT ACCEPTABLE (note for awareness)

**F. First Council of Sirmium — 347 date**
- The site lists this as 347. Some sources list 351 as the first council (which would conflict with Second Sirmium also being 351). The scholarship is genuinely disputed. The current treatment is defensible but could add a note.

**G. Council of Antioch (341) — "four creeds"**
- Sources confirm multiple creeds and avoidance of homoousios. The exact count "four" varies in scholarship. Not wrong, just imprecise. Fine as-is.

### 1.4 — FULLY VERIFIED ACCURATE

The following claims were verified and are correct:
- Council of Tyre (335): Deposed Athanasius, rehabilitated Arius ✓
- Council of Sardica (343): Eastern bishops split ✓
- Second Council of Sirmium (351) ✓
- Third Council of Sirmium / "Blasphemy of Sirmium" (357) ✓
- Fifth Council of Sirmium / "Dated Creed" (359) ✓
- Council of Seleucia (359): Eastern counterpart to Rimini ✓
- Council of Constantinople (360): Ratified homoian creed empire-wide ✓
- Fourth Lateran Council (1215): Defined transubstantiation ✓
- Fifth Lateran Council (1513-1517): Affirmed immortality of soul ✓
- Council of Frankfurt (794): Condemned Adoptionism ✓
- Marburg Colloquy (1529): 14 of 15 points agreement ✓
- Diet of Speyer (1529): Sentenced Anabaptists to death ✓
- Strange Fire Conference (2013): Sun Valley, California ✓
- Council of Orange (529): Condemned Semi-Pelagianism ✓
- Sabellianism condemned at Constantinople I (381) ✓
- Montanism condemned ~177 AD and at Constantinople I ✓
- Athanasius exiled five times ✓
- Council of Ancyra (358): Semi-Arian reaction to Sirmium III ✓
- Jerome quote: "The whole world groaned..." ✓

---

## SECTION 2: MISSING CONTENT

### 2.1 — Missing Deep-Dive (MDX) Heresy Pages (6 files)

These heresies are defined in `heresies.ts` and referenced by quiz answers, but have **no MDX deep-dive page**. Users clicking "Learn More" from quiz results will hit dead links.

| Missing File | Heresy | Quiz Questions |
|---|---|---|
| `transubstantiation.mdx` | Transubstantiation | Q9a |
| `cessationism.mdx` | Cessationism | Q16b |
| `papal-infallibility.mdx` | Papal Infallibility | Q6b, Q15a |
| `paedobaptism.mdx` | Paedobaptism | Q10a |
| `credobaptism.mdx` | Credobaptism (Believer's Baptism) | Q10b |
| `semi-arianism.mdx` | Semi-Arianism (Homoiousian) | Related links from other pages |

**Note:** The slug for homoiousian in heresies.ts is `semi-arianism` but there is no `semi-arianism.mdx` file. The heresy page for homoianism exists but its related link to "semi-arianism" is broken.

### 2.2 — Placeholder/Incomplete Page (1 file)

**`anti-nicene-period.mdx`** — Only 43 lines. Contains a timeline outline and "Full content coming soon." This exists in the content collection but is NOT listed in `heresies.ts`, so it won't appear on the Explore index. It would render at `/explore/anti-nicene-period` if directly navigated to, but as an incomplete stub.

### 2.3 — Broken Related-Heresy Links in MDX Files (5 broken references)

These MDX files reference heresies in their `relatedHeresies` frontmatter that don't exist:

| File | Broken Reference | Fix |
|---|---|---|
| `anti-nicene-period.mdx` | `"semi-arianism"` | Change to `"homoianism"` or create the missing MDX |
| `docetism.mdx` | `"gnosticism"` | Remove (no gnosticism heresy page) or create one |
| `homoianism.mdx` | `"semi-arianism"` | Change to slug that exists or create MDX |
| `modalism.mdx` | `"patripassianism"` | Remove (patripassianism is an alias for modalism itself) |
| `subordinationism.mdx` | `"semi-arianism"` | Change to slug that exists or create MDX |

**Impact:** The code in `explore/[slug].astro` gracefully filters out undefined slugs, so these won't cause errors — but the related-heresies sections are silently incomplete.

---

## SECTION 3: QUIZ LOGIC & DATA INTEGRITY

### 3.1 — Council ID References: ALL VALID ✓
All 23 unique council IDs referenced across all 18 questions exist in `councils.ts`.

### 3.2 — Heresy ID References: ALL VALID ✓
All heresy IDs in quiz answers exist in `heresies.ts`.

### 3.3 — Scoring Logic: SOUND ✓
`scoring.ts` correctly categorizes councils and counts them. `sharing.ts` correctly pulls from heresies array.

### 3.4 — Article References: ALL VALID ✓
All `relatedHeresies` and `relatedQuestions` in article frontmatter reference valid IDs.

### 3.5 — Site Configuration: CORRECT ✓
Domain correctly set to `https://areyouaheretick.com`.

---

## SECTION 4: CONTENT QUALITY NOTES

### 4.1 — Minor Factual Softening Needed
- **"45,000+ Protestant denominations"** (Q6, Q15): This number comes from the World Christian Encyclopedia's count of ~45,000 "denominations," but that counts each country's branch separately. The more defensible number is ~200-300 major traditions. Consider adding "depending on how you count" or using a more nuanced number.
- **"84% of evangelicals"** (Q5a): This statistic about Semi-Pelagian language among evangelicals is unsourced. It may derive from LifeWay Research surveys, but should be verified or softened to "the vast majority."

### 4.2 — Theological Balance: STRONG ✓
- The "never frame as orthodox" design principle is consistently followed
- Both sides of disputes are represented
- Historical attribution (not truth claims) is the framing throughout

### 4.3 — Article Quality: ALL COMPLETE ✓
All 8 articles are fully written, well-structured, and factually consistent with the quiz data.

---

## SECTION 5: STRUCTURAL ISSUES

### 5.1 — Asymmetric Coverage
The missing pages create one-sided coverage in some theological areas:
- **Sacraments:** Memorialism exists but Transubstantiation doesn't
- **Baptism:** Neither paedobaptism nor credobaptism has a page
- **Authority:** Sola Scriptura exists but Papal Infallibility doesn't
- **Pneumatology:** Montanism exists but Cessationism doesn't

### 5.2 — Monothelitism in quiz
Monothelitism has a full deep-dive page (`monothelitism.mdx`) and entry in `heresies.ts`, but is NOT directly triggered by any quiz answer. It appears only as related content. This is fine architecturally but worth noting — it's discoverable only through the Explore page.

---

# CLAUDE CODE FIX PROMPT

```
I need to fix factual issues and fill content gaps in the "Are You a Heretic?" quiz at /Users/paulrobson/Projects/are-you-a-heretic. Read the fact-check report first:

- project-docs/08-fact-check-report.md

THE FIXES — DO ALL OF THESE:

### 1. Fix Historical Inaccuracies in src/data/councils.ts

A. ETS 2016 entry (id: 'ets-2016'):
Change description from "The ETS concluded that Eternal Functional Subordination (EFS) of the Son does not conform to their doctrinal basis on the Trinity." to "The ETS held a major plenary forum on the Trinity, where significant opposition to EFS was voiced. No formal doctrinal position was issued, but the debate highlighted that many evangelical theologians consider EFS incompatible with Nicene Trinitarianism."

B. Synod of Dort (id: 'dort-1618'):
Change description from "Condemned Arminianism and codified the 'Five Points of Calvinism' (TULIP)." to "Condemned Arminianism and established the Canons of Dort — the five points later summarized by the TULIP acronym (a 20th-century mnemonic)."

### 2. Fix Historical Inaccuracies in src/data/heresies.ts

A. Marcionism (id: 'marcionism'):
Change condemnedBy from ['constantinople-i'] to []. Add a note in the fullDescription that Marcion was excommunicated from Rome around 144 AD and that early church writers universally condemned his views, but no ecumenical council specifically named Marcionism in its canons.

B. EFS (id: 'efs'):
Change condemnedBy from ['ets-2016'] to []. Update fullDescription to note the 2016 ETS debate and significant scholarly opposition, without framing it as a formal condemnation.

### 3. Fix Overstated Claims in src/data/questions.ts

A. Council of Rimini description (appears in Q1 answer q1b and Q2 answer q2b):
Change "then physically detained by imperial guards until they signed" to "then pressured and effectively required to sign before they could leave"

B. Pope Liberius (appears in Q1 answer q1b and Q2 answer q2b):
Change "Pope Liberius was exiled and tortured" to "Pope Liberius was exiled"

C. Council of Rimini council entry (councils.ts, id: 'rimini-359'):
Change "physically detained by imperial guards" to "pressured and effectively required to sign before they could leave". Change "400 bishops" to "Over 300 bishops".

### 4. Fix Broken Related-Heresy Links in MDX Files

In these files, fix the relatedHeresies frontmatter arrays:
- src/content/heresies/modalism.mdx: Remove "patripassianism" from relatedHeresies
- src/content/heresies/docetism.mdx: Remove "gnosticism" from relatedHeresies
- src/content/heresies/anti-nicene-period.mdx: Change "semi-arianism" to "homoianism" in relatedHeresies
- src/content/heresies/homoianism.mdx: Change "semi-arianism" to "anomoeanism" in relatedHeresies
- src/content/heresies/subordinationism.mdx: Change "semi-arianism" to "homoianism" in relatedHeresies

### 5. Create Missing Deep-Dive MDX Pages

Create 6 new heresy deep-dive pages. Each should follow the EXACT format and tone of the existing pages (e.g., arianism.mdx, memorialism.mdx). Match their frontmatter schema, section structure, and voice. Each page should be 150-250 lines and include:
- Frontmatter: title, description, councilsThatCondemned, relatedHeresies, relatedQuestions
- Sections: The story of how/why this was condemned, what the believers actually thought, the strongest arguments for and against, the modern relevance, and NT perspective
- Tone: Sympathetic to the "heretics," historically informed, no position framed as simply "correct"

The 6 pages to create:

A. src/content/heresies/transubstantiation.mdx
- Title: "Transubstantiation: When Bread Becomes God"
- Council: Fourth Lateran Council (1215), Council of Trent
- Key tension: Catholic doctrine vs. all Protestant positions. Aristotelian substance/accidents framework. The "how dare you say it's JUST bread" vs. "how dare you say it's LITERALLY flesh" divide.
- Related heresies: memorialism
- Related questions: [9]

B. src/content/heresies/cessationism.mdx
- Title: "Cessationism: The God Who Stopped Talking"
- No condemning council (not formally condemned)
- Key tension: 600+ million Charismatics/Pentecostals vs. Reformed/Presbyterian tradition. 1 Cor 13:10 debate. MacArthur's Strange Fire.
- Related heresies: montanism
- Related questions: [16]

C. src/content/heresies/papal-infallibility.mdx
- Title: "Papal Infallibility: One Man, One Chair, No Errors"
- Council: Vatican I (1870) defined it
- Key tension: 1,870 years without this dogma. Pope Honorius condemned as heretic by Constantinople III (681). Catholic vs. everyone else.
- Related heresies: sola-scriptura
- Related questions: [6, 15]

D. src/content/heresies/paedobaptism.mdx
- Title: "Paedobaptism: Why Are You Baptizing That Baby?"
- Not formally condemned by any council
- Key tension: 1,500+ years of practice vs. no explicit NT command. Covenant theology vs. believer's baptism. Anabaptists executed for disagreeing.
- Related heresies: credobaptism
- Related questions: [10]

E. src/content/heresies/credobaptism.mdx
- Title: "Believer's Baptism: The Heresy People Died For"
- Council: Diet of Speyer (1529) — sentenced to death
- Key tension: Every baptism in Acts is a believing adult. Felix Manz drowned for his baptismal views. Both Catholics AND Protestants agreed Anabaptists were heretics.
- Related heresies: paedobaptism
- Related questions: [10]

F. src/content/heresies/semi-arianism.mdx
- Title: "Semi-Arianism: Almost Orthodox, Off by One Letter"
- Councils: Nicaea I, Constantinople I, Third Council of Sirmium
- Key tension: homoiousios vs. homoousios — "similar substance" vs. "same substance." Athanasius saw them as potential allies. The single-iota difference. Basil of Ancyra's middle ground.
- Related heresies: homoianism, anomoeanism, arianism, subordinationism
- Related questions: [1, 2]

### 6. Complete the anti-nicene-period.mdx Placeholder

Flesh out src/content/heresies/anti-nicene-period.mdx from its current 43-line stub into a full page (200-300 lines). This should be the "entry point" page that tells the story of 341-381 as a narrative. Include:
- The timeline of anti-Nicene dominance
- The key players (Constantius II, Athanasius, the Cappadocians)
- How and why Nicaea "lost" for 50+ years
- The coerced councils (Rimini, Seleucia)
- How Constantinople (381) finally resolved it
- Related heresies: nicene-trinitarianism, homoianism, arianism, subordinationism, anomoeanism

### 7. Minor Content Fixes

A. In questions.ts Q6a (sola-scriptura answer): Change "Over 45,000 Protestant denominations" to "thousands of Protestant denominations" — the 45,000 number is misleading (it counts each country's branch separately).

B. In questions.ts Q15b: Same fix — change "45,000+ denominations" to "thousands of denominations."

C. In questions.ts Q5a: Change "An estimated 84% of evangelicals" to "The vast majority of evangelicals" unless a specific citation can be added.

After making ALL changes:
1. Run `npm run build` and fix any build errors
2. Verify all new MDX pages render correctly
3. Check that no quiz answers reference broken heresy IDs or council IDs
```

---

# END OF REPORT
