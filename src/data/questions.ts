import type { QuizQuestion } from './types';

export const questions: QuizQuestion[] = [
  // ──────────────────────────────────────────────────
  // Q1 (old Q1) — Trinity
  // ──────────────────────────────────────────────────
  {
    id: 1,
    category: 'Trinity',
    question:
      'How would you describe the relationship between Father, Son, and Holy Spirit?',
    tone: 'playful',
    answers: [
      {
        id: 'q1a',
        text: "They're one God who appears in three different modes or roles — sometimes Father, sometimes Son, sometimes Spirit.",
        heresyTriggered: 'modalism',
        revealTitle: 'Modalism (Sabellianism) — condemned since the 3rd century',
        revealText:
          "This is Sabellianism — one of the oldest Trinitarian heresies, condemned at the Council of Constantinople (381 AD). The water/ice/steam analogy? Also modalism. Oneness Pentecostals hold this view explicitly. Every creedal tradition since Constantinople considers it heretical. The concern: you've described one God appearing in different modes — rather than three eternal persons in relationship. The counter-argument from modalists: the word 'person' never appears in the NT, and insisting on three distinct 'persons' risks tritheism.",
        severity: 'condemned',
        councilIds: ['constantinople-i'],
        condemnedByCount: 1,
      },
      {
        id: 'q1b',
        text: 'Three persons who share one divine nature — equal, eternal, inseparable.',
        heresyTriggered: 'nicene-trinitarianism',
        revealTitle: 'Nicene Trinitarianism — condemned by 11 councils (341–360 AD)',
        revealText:
          'This is the Nicene-Constantinopolitan position (325/381 AD), and it\'s what most Christians profess today. But between 341 and 380 AD, at least 11 councils explicitly rejected this formula. The Council of Rimini (359) saw over 300 bishops pressured into signing an anti-Nicene creed. Athanasius was exiled five times for defending this view. Pope Liberius was exiled under imperial pressure. Jerome wrote: "The whole world groaned and was astonished to find itself Arian." For twenty years (360–380), this answer was the heretical one across the Roman Empire.',
        severity: 'condemned',
        councilIds: [
          'antioch-341',
          'sardica-east-343',
          'arles-353',
          'milan-355',
          'sirmium-ii-351',
          'sirmium-iii-357',
          'ancyra-358',
          'sirmium-v-359',
          'rimini-359',
          'seleucia-359',
          'constantinople-360',
        ],
        condemnedByCount: 11,
      },
      {
        id: 'q1c',
        text: "The Father is supreme; the Son is divine but subordinate to the Father in nature or authority.",
        heresyTriggered: 'subordinationism',
        revealTitle: 'Subordinationism — condemned at Nicaea (325) and Constantinople (381)',
        revealText:
          'This was the majority position from 341–381 AD, backed by imperial power. The homoiousian ("similar substance") and homoian ("like the Father") factions dominated the church for decades. This would have been the comfortable mainstream in 360 — bishops, emperors, and the majority of churches held it. Then Constantinople (381) drew a new line. Condemned at both Nicaea (325) and Constantinople (381), which declared the Son fully co-equal with the Father. Yet Jesus himself said "the Father is greater than I" (John 14:28), which subordinationists cite to this day.',
        severity: 'condemned',
        councilIds: ['nicaea-i', 'constantinople-i'],
        condemnedByCount: 2,
      },
      {
        id: 'q1d',
        text: "I'm honestly not sure what the Trinity is supposed to mean.",
        heresyTriggered: 'trinitarian-agnosticism',
        revealTitle: 'Trinitarian agnosticism — debated across traditions',
        revealText:
          'Trinitarian agnosticism may be the most honest answer, but every creedal tradition from 325 AD onward insists on a specific Trinitarian formula. The Athanasian Creed opens with: "Whosoever will be saved, before all things it is necessary that he hold the Catholic Faith." Historically, uncertainty alone was enough to put you on the wrong side of the line. On the other hand, many theologians — from Pseudo-Dionysius to Karl Rahner — have argued that the Trinity is ultimately a mystery that exceeds human comprehension, and that honest uncertainty may be more faithful than false confidence.',
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
    ],
    option5Reveal: {
      title: 'The Trinity: an unfinished argument',
      text: 'The doctrine of the Trinity was never settled in a single moment. Nicaea (325) condemned Arianism but didn\'t resolve the key terms. For the next 56 years, councils fought over whether the Son is "of one substance" (homoousios), "of similar substance" (homoiousios), or simply "like" (homoios) the Father. At least 11 councils between 341 and 360 condemned the Nicene formula. Constantinople (381) restored it — but the Oriental Orthodox rejected the next council (Chalcedon, 451), and the East-West Schism (1054) split over the filioque clause ("and the Son"). Modalists, Arians, subordinationists, social Trinitarians, and classical Trinitarians all claim biblical support. The NT never uses the word "Trinity" or the philosophical language the creeds rely on. Two thousand years later, Christians still disagree on what "three persons, one God" actually means.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q2 (old Q3) — Christology
  // ──────────────────────────────────────────────────
  {
    id: 2,
    category: 'Christology',
    question: "When Jesus wept at Lazarus's tomb, what was happening?",
    tone: 'playful',
    answers: [
      {
        id: 'q2a',
        text: 'God in human form was demonstrating compassion as an example for us.',
        heresyTriggered: 'docetism',
        revealTitle: 'Docetism — condemned at Nicaea (325) and Chalcedon (451)',
        revealText:
          '"Demonstrating" implies performance, not genuine experience. If Jesus was demonstrating rather than experiencing, his humanity isn\'t real — it\'s a costume. This is Docetism (from the Greek dokein, "to seem"), condemned since the earliest church. 1 John 4:2–3 is likely written specifically against this view. The Gnostics found the idea of a suffering God intolerable; the church insisted on it.',
        severity: 'condemned',
        councilIds: ['nicaea-i', 'chalcedon'],
        condemnedByCount: 2,
      },
      {
        id: 'q2b',
        text: 'A genuine human being was genuinely grieving the death of his friend.',
        heresyTriggered: 'adoptionism',
        revealTitle: 'Dynamic Monarchianism — condemned at Nicaea (325)',
        revealText:
          'Calling Jesus "a genuine human being" without qualifying his divinity is the instinct behind Dynamic Monarchianism — the view held by Paul of Samosata and Theodotus of Byzantium that Jesus was a human being whom God elevated or empowered. Modern Biblical Unitarians hold a similar position. This was condemned as early as the 3rd century and definitively at Nicaea (325). Not a Biblical Unitarian? This answer would still have got you in trouble at Ephesus in 431, where Nestorius was deposed for separating the human and divine too sharply. The council insisted: it wasn\'t "a human being" weeping — it was God-in-human-nature weeping. The distinction matters more than it sounds.',
        severity: 'condemned',
        councilIds: ['nicaea-i', 'ephesus'],
        condemnedByCount: 2,
      },
      {
        id: 'q2c',
        text: 'Both — truly God AND truly human, experiencing real human emotion.',
        heresyTriggered: 'eutychianism',
        revealTitle: 'The Chalcedonian position — debated between East and West',
        revealText:
          'This is what Chalcedon (451 AD) settled on: two natures, one person, "without confusion, without change, without division, without separation." But the Oriental Orthodox churches rejected Chalcedon entirely and broke communion — they call this Nestorianism in disguise. The how of two natures in one person is where Eutychianism, Apollinarianism, and Monothelitism all lurk. Even the "safe" answer opens a minefield of follow-up questions that the church has never fully resolved.',
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q2d',
        text: 'He was probably performing grief to connect with the people around him.',
        heresyTriggered: 'docetism',
        revealTitle: 'Docetism — condemned from the earliest church',
        revealText:
          'If Jesus performed grief rather than felt it, his humanity is a costume — a hologram of a body housing a divine spirit. This is classic Docetism, condemned from the earliest period of Christianity. The Gnostics loved this idea. The apostle John wrote against it explicitly: "every spirit that does not confess that Jesus Christ has come in the flesh is not from God" (1 John 4:3). Yet the instinct behind this answer — that an omniscient God would not be surprised by death — is a real theological tension the early church wrestled with.',
        severity: 'condemned',
        councilIds: ['nicaea-i', 'chalcedon'],
        condemnedByCount: 2,
      },
    ],
    option5Reveal: {
      title: 'The nature of Christ: fourteen centuries of council fights',
      text: 'How divine and human meet in Jesus has generated more councils, condemnations, and schisms than any other question. The Ebionites said Jesus was a prophet, not God. The Docetists said he was God, not human. Arius said he was created. Apollinaris said he had a divine mind in a human body. Nestorius (or his critics\' version of him) said he was two persons. Eutyches said the two natures fused into one. Chalcedon (451) tried to split the difference — two natures, one person — but the Oriental Orthodox rejected it and remain separated today. Then came Monothelitism (one will or two?), settled at Constantinople III (681). The Church of the East never accepted Ephesus (431). At every stage, the losing side had real biblical texts to cite, and the winning side had political power as well as theological arguments. The question of what was happening when Jesus wept is, at bottom, a question about what the incarnation means — and Christians have never fully agreed.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q3 (old Q7) — Scripture
  // ──────────────────────────────────────────────────
  {
    id: 3,
    category: 'Scripture',
    question: 'How do you relate to the God of the Old Testament?',
    tone: 'substantive',
    answers: [
      {
        id: 'q3a',
        text: "The OT God seems harsh and wrathful — I much prefer the loving God Jesus revealed.",
        heresyTriggered: 'marcionism',
        revealTitle: 'Marcionism — condemned since 144 AD',
        revealText:
          "Marcion was expelled from the church in Rome around 144 AD for teaching that the OT God was a different, inferior deity from the Father Jesus revealed. This is a gentler version, but the instinct is similar: the OT God feels uncomfortable. Marcion edited Paul's letters to remove Jewish references and rejected the entire Old Testament. The church excommunicated him — but this tension between the testaments has never fully gone away. Theologians like Walter Brueggemann argue the OT itself contains competing portraits of God, and the tension is built into the text.",
        severity: 'condemned',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q3b',
        text: "Same God, but the OT was a different era with different rules — we've moved past that.",
        heresyTriggered: 'marcionism',
        revealTitle: 'Functional Marcionism — debated across traditions',
        revealText:
          "The idea that God operates in different 'dispensations' has complex theological baggage. Taken too far, it functionally discards OT ethics. Many theologians call this 'functional Marcionism' — you haven't rejected the OT God in theory, but you've relegated him to an expired era. Dispensationalists formalized this into a system; covenantal theologians object that it severs continuity. The NT authors themselves struggled with this tension (Hebrews 8–10, Galatians 3) but never resolved it by declaring the OT obsolete.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q3c',
        text: 'The OT and NT reveal the same God — wrath and love are both present in both testaments.',
        heresyTriggered: 'continuity-theology',
        revealTitle: 'Continuity theology — debated between traditions',
        revealText:
          "This is the standard position across most traditions. But it requires grappling with genuinely difficult texts — the conquest of Canaan, divine violence, the killing of firstborn children — rather than explaining them away. The moment you start saying 'well, those parts are metaphorical' or 'that reflected the culture,' you're on a spectrum toward the other answers. Gregory Boyd, an evangelical, wrote two volumes arguing that the violent OT texts don't reflect God's actual character. The debate is very much alive.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q3d',
        text: "I honestly don't read the Old Testament much — the New Testament is what matters for Christians.",
        heresyTriggered: 'marcionism',
        revealTitle: 'Practical Marcionism — debated across traditions',
        revealText:
          "This doesn't reject the OT in theory, but it sets it aside in practice — a pattern Marcion would recognise. Two-thirds of the Bible goes largely unread. Jesus quoted it constantly. Paul built his theology on it. The early church fought Marcion precisely to keep it. Yet many modern Christians live in this answer without realising it echoes a 2nd-century controversy. Some scholars argue that the church's lectionary system, which skips the most difficult OT passages, quietly reinforces this tendency.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
    ],
    option5Reveal: {
      title: 'The Old Testament God: a tension as old as Christianity',
      text: 'From the very beginning, Christians have struggled with the God of the Old Testament. Marcion (c. 144 AD) solved the problem by cutting the OT entirely — two different Gods, one wrathful, one loving. The church rejected him but never fully resolved the underlying tension. Dispensationalists organize the Bible into discrete eras with different rules. Covenantal theologians insist on continuity. Gregory Boyd argues the violent texts are a "cruciform" reinterpretation problem. The NT itself is ambivalent: Jesus affirms the law (Matt 5:17–18) but also appears to override it (Matt 5:38–39). Paul declares the law "holy" (Rom 7:12) and also says Christians have "died to the law" (Rom 7:4). Every tradition handles this tension differently, and none has made it disappear.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q4 (old Q8) — Worship/Icons
  // ──────────────────────────────────────────────────
  {
    id: 4,
    category: 'Worship',
    question: 'Is it appropriate to have paintings or statues of Jesus in a church?',
    tone: 'substantive',
    answers: [
      {
        id: 'q4a',
        text: "No — that's dangerously close to idolatry. God said 'no graven images.'",
        heresyTriggered: 'iconoclasm',
        revealTitle: 'Iconoclasm — condemned at Nicaea II (787)',
        revealText:
          "Condemned at the Second Council of Nicaea (787 AD) — the last ecumenical council recognized by both East and West. The iconoclasts lost. The council declared that images are legitimate because God himself became visible in the incarnation. Most Protestants are functional iconoclasts and don't realize an ecumenical council ruled against them. Yet the second commandment's prohibition is clear enough that the debate has never fully ended.",
        severity: 'condemned',
        councilIds: ['nicaea-ii'],
        condemnedByCount: 1,
      },
      {
        id: 'q4b',
        text: 'Yes — images help us worship and remind us of sacred truth.',
        heresyTriggered: 'iconodulism',
        revealTitle: 'Iconodulism — debated between Catholic/Orthodox and Reformed traditions',
        revealText:
          "For Catholics and Orthodox, you're correct per the Second Council of Nicaea (787). But if you're Protestant, many Reformed confessions disagree. The Heidelberg Catechism (Q96–98) and Westminster Larger Catechism (Q109) call religious images a violation of the second commandment. Calvin's Geneva stripped the churches bare. You're affirmed by one ecumenical council but contested by multiple Protestant confessions.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q4c',
        text: "The cross is fine, but realistic depictions of Jesus feel wrong.",
        heresyTriggered: 'iconoclasm',
        revealTitle: 'Selective iconoclasm — debated between traditions',
        revealText:
          "A middle ground that no major tradition fully endorses. Catholics and Orthodox say it's too restrictive — Nicaea II vindicated images. Strict Reformed say it's too permissive — even the cross might be an idol. Islam forbids all representational religious art. This lands in a space where multiple sides have concerns, which is telling in itself.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q4d',
        text: "It doesn't matter either way — it's just art.",
        heresyTriggered: 'adiaphorism',
        revealTitle: 'Adiaphorism on icons — debated across traditions',
        revealText:
          "Adiaphora (a matter of indifference) — some traditions accept this approach. But the Puritans and the Regulative Principle crowd would disagree strongly: nothing in worship is 'indifferent.' What you put in a church shapes what people believe. The iconoclasts killed people over this question. The iconodules died for their icons. Both sides would find indifference more alarming than opposition.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
    ],
    option5Reveal: {
      title: 'Icons and images: blood spilled over artwork',
      text: 'The question of religious images has divided Christians violently. Emperor Leo III launched imperial iconoclasm in 726, ordering the destruction of icons and the persecution of those who venerated them. The Second Council of Nicaea (787) reversed this, declaring images legitimate because the incarnation made the invisible God visible. But the Reformation reopened the wound: Calvin stripped churches bare, the Puritans smashed stained glass, and the Reformed confessions prohibited images in worship. Catholics and Orthodox venerate icons as windows to the divine. Most Protestants practice a soft iconoclasm without knowing it. Islam forbids all representational art in worship. The second commandment says "no graven images"; the incarnation says God took visible form. The tension is built into the sources, and no council has resolved it for all Christians.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q5 (old Q9) — Sacraments/Communion
  // ──────────────────────────────────────────────────
  {
    id: 5,
    category: 'Sacraments',
    question: "When you take communion, what's happening with the bread and wine?",
    tone: 'substantive',
    answers: [
      {
        id: 'q5a',
        text: 'They literally become the body and blood of Christ.',
        heresyTriggered: 'transubstantiation',
        revealTitle: 'Transubstantiation — condemned by every Protestant confession',
        revealText:
          "Catholic doctrine, defined at the Fourth Lateran Council (1215) and reaffirmed at Trent. Every Protestant tradition rejects this. Luther said the bread remains bread (while Christ is present 'in, with, and under' the elements). Calvin said the presence is spiritual. Zwingli said it's symbolic. The bread literally becoming flesh is rejected by over 800 million Protestants. Yet for Catholics, denying it is itself heretical — Trent anathematized all who reject real presence.",
        severity: 'condemned',
        councilIds: ['lateran-iv-1215'],
        condemnedByCount: 1,
      },
      {
        id: 'q5b',
        text: 'Christ is spiritually present in and through the elements.',
        heresyTriggered: 'spiritual-presence',
        revealTitle: 'Spiritual presence — debated between Catholic, Reformed, and Baptist traditions',
        revealText:
          "This is Calvin's 'real spiritual presence' or, loosely, Luther's 'sacramental union.' Catholics say this doesn't go far enough — the Fourth Lateran Council defined literal change. Baptists and Zwinglians say it's unnecessarily mystical — it's just bread. You're in a theological no-man's-land: too Catholic for the memorialists, too Protestant for Rome. The NT itself doesn't specify the mechanism — Paul warns of serious consequences for unworthy participation (1 Cor 11:27–30) but doesn't explain how Christ is present.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q5c',
        text: "It's a memorial — we're remembering what Jesus did, and the bread and wine are symbols.",
        heresyTriggered: 'memorialism',
        revealTitle: 'Memorialism — condemned at Trent and by Luther at Marburg (1529)',
        revealText:
          "Most Baptists and many evangelicals hold this view. But Luther called Zwingli a heretic to his face at the Marburg Colloquy (1529). The Council of Trent anathematized the denial of real presence. The Eastern Orthodox call it a departure from 2,000 years of church teaching. You're in the company of most American churchgoers — and condemned by most of church history. Zwingli cited 'do this in remembrance of me' (Luke 22:19); his opponents cited 'this IS my body' (Matt 26:26).",
        severity: 'condemned',
        councilIds: ['trent', 'marburg-1529'],
        condemnedByCount: 2,
      },
      {
        id: 'q5d',
        text: "I'm not sure, but something meaningful and sacred is happening.",
        heresyTriggered: 'eucharistic-agnosticism',
        revealTitle: 'Eucharistic agnosticism — debated across all traditions',
        revealText:
          "Virtually everyone with a confessional position considers this insufficient. Catholics say you must believe in transubstantiation. Lutherans say real presence is non-negotiable. Reformed say you need to affirm spiritual presence. Even Baptists have a doctrine here (memorialism). Every tradition wants more specificity than this. Yet millions of churchgoers quietly hold this view — sensing something sacred in the meal without committing to a metaphysical explanation. The NT itself never explains the mechanism.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
    ],
    option5Reveal: {
      title: 'The Eucharist: the meal that split the church',
      text: 'What happens to the bread and wine has divided Christians for a millennium. The early church spoke of the elements as Christ\'s body and blood without precise metaphysical explanation. The Fourth Lateran Council (1215) defined transubstantiation — the substance changes, the appearance remains. Luther rejected this but insisted Christ is truly present "in, with, and under" the elements. Calvin said Christ is spiritually present through the Holy Spirit. Zwingli said it\'s a memorial — just bread and wine. Luther and Zwingli met at Marburg (1529) and agreed on 14 of 15 points but couldn\'t agree on this one. Trent anathematized everyone who denied literal change. The Orthodox hold to "real presence" without adopting Western categories. The NT says "this is my body" and "do this in remembrance" — both literal-sounding and memorial-sounding in the same passage. This question has been fought over for 800 years with no resolution in sight.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q6 (old Q12) — Eschatology/Hell
  // ──────────────────────────────────────────────────
  {
    id: 6,
    category: 'Eschatology',
    question: 'What is hell?',
    tone: 'substantive',
    answers: [
      {
        id: 'q6a',
        text: 'Eternal conscious torment — the unsaved suffer forever in separation from God.',
        heresyTriggered: 'eternal-torment',
        revealTitle: 'Eternal conscious torment — debated between traditions',
        revealText:
          "The dominant Western view since Augustine. But annihilationists (including John Stott, one of the most respected evangelicals of the 20th century) called it morally monstrous and biblically dubious. The Bible uses 'destruction' language (Matt 10:28) as often as 'torment' language. Universalists ask: is infinite punishment for finite sins just? The Eastern Orthodox tradition has never dogmatized a single view of hell the way the West has.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q6b',
        text: 'Destruction — the unsaved eventually cease to exist.',
        heresyTriggered: 'annihilationism',
        revealTitle: 'Annihilationism — condemned by the Fifth Lateran Council (1513)',
        revealText:
          "The Fifth Lateran Council (1513) affirmed the immortality of the individual soul, effectively condemning this view. Most Protestant confessions reject it too. But it's growing rapidly among evangelicals — John Stott, Edward Fudge, and the Rethinking Hell movement have made it respectable. The Bible does say God can 'destroy both soul and body in hell' (Matt 10:28). The word 'eternal' (aionios) may mean 'of the age to come' rather than 'everlasting' — the debate hinges on Greek semantics.",
        severity: 'condemned',
        councilIds: ['lateran-v-1513'],
        condemnedByCount: 1,
      },
      {
        id: 'q6c',
        text: 'A temporary state of purification before eventual restoration.',
        heresyTriggered: 'universalism',
        revealTitle: 'Universalism (Apokatastasis) — condemned at Constantinople II (553)',
        revealText:
          "Origen held this — apokatastasis, the restoration of all things. It was condemned at the Second Council of Constantinople (553 AD). But many early fathers (Gregory of Nyssa, Clement of Alexandria) leaned this way. Gregory of Nyssa helped define the Trinity and held universalist views without censure during his lifetime. David Bentley Hart argues it's the only morally coherent position. The condemnation stands, but the argument refuses to die.",
        severity: 'condemned',
        councilIds: ['constantinople-553-origen'],
        condemnedByCount: 1,
      },
      {
        id: 'q6d',
        text: "A metaphor for the consequences of rejecting God's love in this life.",
        heresyTriggered: 'metaphorical-hell',
        revealTitle: 'Metaphorical hell — debated between conservative and progressive traditions',
        revealText:
          "Conservative evangelicals call this a denial of biblical authority. But C.S. Lewis described hell in ways closer to this than to literal fire — 'the doors of hell are locked from the inside.' Lewis's Great Divorce pictures hell as a grey, dreary town people can leave anytime. Is he a liberal? Most evangelicals wouldn't say so — but his view of hell would get him in trouble at many churches. The NT uses fire imagery (Matt 25:41), darkness imagery (Matt 22:13), and relational language (2 Thess 1:9) — the diversity of metaphors suggests none is meant as a literal physics of the afterlife.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
    ],
    option5Reveal: {
      title: 'Hell: the doctrine nobody agrees on',
      text: 'The church has never reached a single consensus on what hell is. Augustine championed eternal conscious torment, and the Western church largely followed. But Origen taught universal restoration (apokatastasis) — all souls eventually reconciled to God — and was condemned for it at Constantinople II (553), though some scholars dispute the details. Gregory of Nyssa, one of the architects of Trinitarian doctrine, held similar views without censure. Annihilationism (the unsaved cease to exist) was condemned by the Fifth Lateran Council (1513) but is growing among modern evangelicals. The Eastern Orthodox tradition has generally been less dogmatic about the mechanics of hell than the West. The NT itself uses multiple images — fire, outer darkness, destruction, separation — that don\'t obviously describe the same thing. Even the meaning of "eternal" (aionios) in Matthew 25:46 is debated: does it mean everlasting duration, or something pertaining to the age to come?',
    },
  },

  // ──────────────────────────────────────────────────
  // Q7 (old Q4) — Soteriology/Atonement
  // ──────────────────────────────────────────────────
  {
    id: 7,
    category: 'Soteriology',
    question: "What did Jesus's death on the cross actually accomplish?",
    tone: 'playful',
    answers: [
      {
        id: 'q7a',
        text: "He paid the penalty for our sins — taking the punishment we deserved so God's justice is satisfied.",
        heresyTriggered: 'penal-substitution',
        revealTitle: 'Penal Substitution — debated between Reformed and Orthodox traditions',
        revealText:
          "This is Penal Substitutionary Atonement, dominant in Reformed theology since Calvin. But the Eastern Orthodox Church considers this a Western distortion — Orthodox theologians argue it pits the Father against the Son and reduces the cross to a legal transaction. Catholic theology incorporates substitutionary elements but doesn't limit the atonement to penal categories. The NT contains texts that support this view (Rom 3:25, Isa 53:5) but never assembles them into the specific framework of 'penal substitution.' The theory in its current form dates to the Reformation, not to the early church.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q7b',
        text: 'He defeated the powers of evil, sin, and death — liberating humanity from spiritual bondage.',
        heresyTriggered: 'christus-victor',
        revealTitle: 'Christus Victor — debated between traditions',
        revealText:
          "This is the earliest atonement theory (Irenaeus, 2nd century) and was the dominant view for over 1,000 years. Post-Reformation Protestants often dismiss it as inadequate — it doesn't explain how sins are forgiven or satisfy God's justice. Reformed theologians say it describes liberation without addressing the legal problem of guilt. But the Orthodox and many Catholics consider it the richest and most biblical framework. The NT uses victory language extensively (Col 2:15, Heb 2:14, 1 John 3:8).",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q7c',
        text: 'He demonstrated the ultimate example of self-sacrificing love, inspiring us to live the same way.',
        heresyTriggered: 'moral-influence',
        revealTitle: 'Moral Influence theory — debated, with echoes of Pelagianism',
        revealText:
          "Associated with Peter Abelard (12th century). Most evangelicals consider this insufficient — if the cross only inspires, it doesn't actually accomplish salvation. Critics say it reduces the cross to a motivational example, and that if humans save themselves by following Jesus's example, it echoes Pelagian assumptions about human capacity. Pelagianism itself was condemned at Carthage (418) and Ephesus (431). However, Abelard never denied other dimensions of the atonement; the 'moral influence only' version is somewhat a straw man of his actual position.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q7d',
        text: "He restored the broken relationship between God and humanity — healing what was fractured.",
        heresyTriggered: 'recapitulation',
        revealTitle: 'Recapitulation / Healing model — debated between East and West',
        revealText:
          "This is close to Irenaeus's Recapitulation theory and the Eastern Orthodox healing (theosis) model. The cross heals the human condition from within. Many Western Protestants say it's too vague about the mechanism of forgiveness — how exactly does the cross heal? But the NT uses all of these metaphors (legal, military, exemplary, relational) without systematizing them into one theory. The Eastern tradition has always been more comfortable with mystery here than the West. Every atonement theory captures part of the truth; none captures all of it.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
    ],
    option5Reveal: {
      title: 'The atonement: four theories, zero consensus',
      text: 'The NT never provides a single, systematic explanation of what the cross accomplished. It uses legal language (justification, propitiation), military language (victory over powers), relational language (reconciliation), and healing language (salvation as wholeness). Early Christians emphasized Christus Victor — Christ defeating evil. Anselm (11th century) introduced satisfaction theory — Christ paying a debt of honor. Calvin developed penal substitution — Christ bearing the legal penalty. Abelard offered moral influence — the cross as transformative example. Irenaeus spoke of recapitulation — Christ reliving and redeeming the human story from within. The Eastern Orthodox have never adopted a single atonement theory, viewing Western debates as overly legalistic. No ecumenical council has ever defined an official atonement theory. The church has declared who Christ is (Nicaea, Chalcedon) but never officially resolved what the cross did.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q8 (old Q5) — Soteriology/Conversion
  // ──────────────────────────────────────────────────
  {
    id: 8,
    category: 'Soteriology',
    question: 'How does someone become a Christian?',
    tone: 'playful',
    answers: [
      {
        id: 'q8a',
        text: "They hear the gospel and choose to accept it — it's a personal decision.",
        heresyTriggered: 'semi-pelagianism',
        revealTitle: 'Semi-Pelagianism — condemned at the Council of Orange (529)',
        revealText:
          'Condemned at the Council of Orange (529 AD). If the human "decides" first and God responds, that makes human will the initiator of salvation. The vast majority of evangelicals talk exactly this way — "I accepted Jesus into my heart." Orange says grace must come first. The council insisted: God initiates, then we respond. Yet Arminians and Wesleyans argue that God\'s prevenient grace enables the choice, so the human decision is itself a response to grace — not the "first move" Orange condemned.',
        severity: 'condemned',
        councilIds: ['orange'],
        condemnedByCount: 1,
      },
      {
        id: 'q8b',
        text: 'God chose them before the foundation of the world — they respond because God made them willing.',
        heresyTriggered: 'calvinism',
        revealTitle: 'Calvinism (Unconditional Election) — debated between Reformed and Arminian traditions',
        revealText:
          'Affirmed at the Council of Orange (529) and codified at the Synod of Dort (1618). But taken to its logical conclusion, this means God also chose not to save specific people — double predestination. The Arminians, most Catholics, most Eastern Orthodox, most Methodists, and most Pentecostals say this makes God responsible for evil. The Remonstrants strongly objected at Dort. Over 1 billion Christians consider this view a serious error. Yet Calvinists cite Romans 9, Ephesians 1, and John 6:44 as clear biblical support.',
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q8c',
        text: 'God offers grace to everyone, but each person must cooperate with that grace.',
        heresyTriggered: 'synergism',
        revealTitle: 'Synergism — debated between Catholic/Orthodox and Reformed traditions',
        revealText:
          "This is the Catholic and Orthodox position, and broadly the Arminian/Wesleyan view. But strict Calvinists say this is dressed-up Semi-Pelagianism — if you 'cooperate,' the decisive factor is still human will, not sovereign grace. The Synod of Dort (1618) condemned the Arminian position. Calvinists say if salvation depends on your cooperation, it ultimately depends on you, not God. Catholics and Orthodox counter that grace-enabled cooperation is fundamentally different from human initiative — it's a distinction with centuries of theological nuance behind it.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q8d',
        text: 'People are basically good and can find God through sincerely seeking truth and living rightly.',
        heresyTriggered: 'pelagianism',
        revealTitle: 'Pelagianism — condemned at Carthage (418) and Ephesus (431)',
        revealText:
          'Condemned at the Council of Carthage (418 AD) and reaffirmed at Ephesus (431 AD). Pelagius was excommunicated. This is perhaps the most widely held "heresy" in popular Western culture — "be a good person and you\'ll be fine." Augustine spent decades fighting this view. Every major Christian tradition — Catholic, Orthodox, and Protestant — agrees this is wrong. Yet Pelagius had a point about human responsibility that the church has never fully dismissed — the tension between grace and effort runs through the entire NT.',
        severity: 'condemned',
        councilIds: ['carthage', 'ephesus'],
        condemnedByCount: 2,
      },
    ],
    option5Reveal: {
      title: 'Conversion: who makes the first move?',
      text: 'The question of how someone becomes a Christian has generated some of the fiercest intra-Christian debates. Pelagius (5th century) said humans can choose God without special grace — condemned at Carthage (418) and Ephesus (431). The Semi-Pelagians said humans make the first move and grace follows — condemned at Orange (529). Augustine said grace is irresistible and God chooses the elect — his position won at Orange but was later softened by Catholic theology. Calvin hardened it into double predestination — affirmed at Dort (1618), rejected by Arminians, Catholics, and Orthodox. Arminius said God gives everyone prevenient grace, enabling free choice — condemned at Dort but adopted by Methodists and most Pentecostals. The Catholic and Orthodox position is synergism: God initiates, humans cooperate. The NT contains texts supporting virtually every position (John 6:44, John 3:16, Romans 9, 1 Timothy 2:4). No single framework captures them all without tension.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q9 (old Q6) — Authority
  // ──────────────────────────────────────────────────
  {
    id: 9,
    category: 'Authority',
    question: 'Where does authoritative Christian teaching come from?',
    tone: 'substantive',
    answers: [
      {
        id: 'q9a',
        text: "The Bible alone — it's the only ultimate authority for faith and practice.",
        heresyTriggered: 'sola-scriptura',
        revealTitle: 'Sola Scriptura — anathematized at the Council of Trent (1545–1563)',
        revealText:
          "This is the core Protestant principle. But the Council of Trent formally anathematized this position. Catholics say you can't properly interpret the Bible apart from the church that compiled it. The practical result has been significant denominational fragmentation, with different communities reaching different conclusions from the same text. Luther and Calvin never intended 'everyone interprets for themselves' — they still believed in creeds, confessions, and church authority. The tension between biblical authority and interpretive authority has never been resolved.",
        severity: 'condemned',
        councilIds: ['trent'],
        condemnedByCount: 1,
      },
      {
        id: 'q9b',
        text: "The Bible interpreted through the church's tradition and teaching authority.",
        heresyTriggered: 'papal-infallibility',
        revealTitle: 'Sacred tradition — debated between Catholic, Orthodox, and Protestant traditions',
        revealText:
          "This is the Catholic and Orthodox approach. But Protestants say this elevates human tradition to divine authority — exactly the problem the Reformation addressed. Luther called it 'the Babylonian captivity of the church.' And Catholic and Orthodox churches disagree with each other about tradition and authority (papal primacy, the filioque, etc.). The NT itself commends both Scripture (2 Tim 3:16) and oral tradition (2 Thess 2:15), leaving room for both sides to claim biblical support.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q9c',
        text: 'The Bible, tradition, reason, AND personal experience all play a role.',
        heresyTriggered: 'wesleyan-quadrilateral',
        revealTitle: 'The Wesleyan Quadrilateral — debated across traditions',
        revealText:
          "John Wesley's method. Calvinists say this opens the door to liberalism by giving 'reason' and 'experience' authority alongside Scripture. Traditionalists on all sides are wary — who decides when experience overrides tradition? When reason overrides Scripture? Methodists counter that all Christians actually use these four sources whether they admit it or not — the question is whether you're honest about it. The Anglican tradition has a similar 'three-legged stool' (Scripture, tradition, reason).",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q9d',
        text: 'The Holy Spirit speaks directly to believers today with authority equal to Scripture.',
        heresyTriggered: 'montanism',
        revealTitle: 'Montanism — condemned around 177 AD',
        revealText:
          "Condemned around 177 AD. Montanus claimed the Holy Spirit spoke new revelation through him and the prophetesses Priscilla and Maximilla. The early church rejected this firmly — the concern being that if anyone can claim the Spirit told them something, there's no way to distinguish true revelation from personal opinion. Yet the NT assumes ongoing prophecy (1 Cor 14) and warns against 'quenching the Spirit' (1 Thess 5:19). The boundary between legitimate prophetic speech and Montanist excess has never been clearly drawn.",
        severity: 'condemned',
        councilIds: ['constantinople-i'],
        condemnedByCount: 1,
      },
    ],
    option5Reveal: {
      title: 'Authority: the question behind every other question',
      text: 'Every doctrinal debate eventually becomes a debate about authority. Catholics point to the Magisterium — the Pope and bishops in union, guided by the Holy Spirit. The Orthodox point to ecumenical councils and sacred tradition. Protestants point to Scripture alone (sola scriptura) — but disagree among themselves about what Scripture means. Anglicans use the "three-legged stool" of Scripture, tradition, and reason. Wesleyans add experience as a fourth source. Pentecostals emphasize the direct voice of the Spirit. The early church had no fixed canon of Scripture until the 4th century and relied on oral tradition, apostolic authority, and community discernment. The Council of Trent (1545–1563) anathematized sola scriptura. The Reformers rejected papal and conciliar authority. The Orthodox rejected both papal supremacy and Protestant individualism. Each tradition claims to be the most faithful to the original pattern. None has convinced the others.',
    },
  },

  // ──────────────────────────────────────────────────
  // Q10 (old Q17) — Soteriology/Unevangelized
  // ──────────────────────────────────────────────────
  {
    id: 10,
    category: 'Soteriology',
    question: 'Can someone who has never heard of Jesus be saved?',
    tone: 'provocative',
    answers: [
      {
        id: 'q10a',
        text: 'No — conscious faith in Jesus Christ is the only way to be saved.',
        heresyTriggered: 'exclusivism',
        revealTitle: 'Exclusivism — debated between evangelical and Catholic/Orthodox traditions',
        revealText:
          "The dominant evangelical position, grounded in Acts 4:12 ('no other name under heaven') and John 14:6 ('no one comes to the Father except through me'). But inclusivists point to Matthew 25 (sheep and goats surprised to learn they served Christ), Romans 2:14–16 (Gentiles who follow the law 'by nature'), and the fate of OT saints who didn't know Jesus's name. The devastating pastoral question remains: what about infants who die, mentally disabled people, and the billions born before Christ or in places missionaries never reached?",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q10b',
        text: "Possibly — God can save through Christ even those who don't know his name.",
        heresyTriggered: 'inclusivism',
        revealTitle: 'Inclusivism — debated between evangelical and Catholic traditions',
        revealText:
          "Held by C.S. Lewis (arguably — see The Last Battle), Karl Rahner ('anonymous Christians'), and many Catholic theologians. Vatican II (Lumen Gentium 16) allows for the possibility. But evangelicals say this undercuts missions and contradicts Acts 4:12. If people can be saved without hearing the gospel, why bother preaching? Inclusivists counter that the gospel is still the fullest revelation — but God's salvific will (1 Tim 2:4) is not limited by human geography.",
        severity: 'debated',
        councilIds: [],
        condemnedByCount: 0,
      },
      {
        id: 'q10c',
        text: 'Yes — all sincere seekers of truth in any religion can find God.',
        heresyTriggered: 'pluralism',
        revealTitle: 'Pluralism — condemned at Carthage (418) and Ephesus (431)',
        revealText:
          "John Hick's position. Rejected by virtually all major Christian traditions — Catholic, Orthodox, and Protestant. If all religions lead to God, what's distinctive about Christianity? What was the cross for? This view implies that human sincerity is sufficient for salvation, which echoes Pelagian assumptions condemned at Carthage (418) and Ephesus (431). But it raises the genuine question: is a just God going to condemn billions of people for being born in the wrong geography?",
        severity: 'condemned',
        councilIds: ['carthage', 'ephesus'],
        condemnedByCount: 2,
      },
      {
        id: 'q10d',
        text: "Everyone will eventually be saved — God's love wins in the end.",
        heresyTriggered: 'universalism',
        revealTitle: 'Universalism — condemned at Constantinople II (553)',
        revealText:
          "Condemned at Constantinople II (553 AD). But Gregory of Nyssa — one of the Cappadocian Fathers who helped define the Trinity — held this view. So did Clement of Alexandria. David Bentley Hart argues it's the only morally coherent position. Rob Bell's Love Wins was a bestseller. The condemnation stands, but the argument refuses to die. 1 Timothy 2:4 says God 'desires all people to be saved'; the question is whether that desire is fulfilled.",
        severity: 'condemned',
        councilIds: ['constantinople-553-origen'],
        condemnedByCount: 1,
      },
    ],
    option5Reveal: {
      title: 'The unevangelized: Christianity\'s hardest pastoral question',
      text: 'What happens to people who never hear the gospel? Exclusivists say conscious faith in Christ is required — Acts 4:12, John 14:6. But this means billions of people are condemned for circumstances beyond their control, which many find incompatible with a just God. Inclusivists (C.S. Lewis, Karl Rahner, Vatican II) say God can save through Christ even those who don\'t know his name — but evangelicals say this undermines the urgency of missions. Pluralists (John Hick) say all religions lead to God — but this effectively eliminates the distinctiveness of Christ. Universalists (Origen, Gregory of Nyssa, David Bentley Hart) say God\'s love eventually wins everyone — condemned at Constantinople II (553) but persistently attractive. The NT contains texts that support exclusivism (John 14:6), inclusivism (Matt 25:31–46), and universalism (1 Tim 2:4, Col 1:20). The early church fathers were divided. No ecumenical council has defined a comprehensive answer. The pastoral weight of this question — infants, the mentally disabled, pre-Christian peoples, isolated communities — makes it one of the most emotionally charged debates in all of theology.',
    },
  },
];
