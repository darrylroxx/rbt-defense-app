var R = [
  {
    id: "phone", s: "2.0 & 6.5", pg: 22, t: "Clinical Phone Use Exception", v: "wrong", pri: 50,
    p: "Clinical phone use is protected as an exception to the device ban.",
    d: "Section 6.5 explicitly allows devices when used for 'direct patient care.' This includes timers, data collection apps, client reinforcers (like YouTube/Music rewards), and clinical communication via Teams.",
    b: "If personal apps were open or if the device wasn't being used for a specific client task, the supervisor may enforce the standard ban.",
    strategy: "Highlight that your device use falls under the 'Direct Patient Care' exception in Section 6.5. Focus on the specific clinical function (timer/reinforcer/data) you were performing at that exact moment.",
    kw: ["phone", "cell", "device", "mobile", "timer", "data", "teams", "clock", "music", "youtube", "reward"]
  },
  {
    id: "personal_phone", s: "6.5", pg: 22, t: "Personal Phone Misuse", v: "correct", pri: 40,
    p: "Personal device use during session is a handbook violation.",
    d: "The handbook prohibits personal use while with a client to ensure safety and engagement. This covers social media, personal texts, and entertainment.",
    b: "In cases of true emergencies or pre-approved medical accommodations, the strictness of this rule may be reconsidered.",
    strategy: "If the use was personal, the best path is acknowledging the distraction and citing your commitment to Section 6.5's safety standards moving forward. Avoid making excuses unless it was a documented emergency.",
    kw: ["scrolling", "social media", "instagram", "tiktok", "facebook", "snapchat", "spotify", "music", "podcast", "distracted"]
  },
  {
    id: "attendance", s: "2.15", pg: 14, t: "Attendance & Doctor's Notes", v: "grey", pri: 30,
    p: "Medical absences with a note count as ONE occurrence, not multiple.",
    d: "Section 2.15 states that multiple sick days for the same illness count as a single occurrence if a doctor's note is provided.",
    b: "Without a medical note, every missed shift is typically logged as an individual occurrence.",
    strategy: "Verify how the occurrences were logged. If 3 days were counted as 3 hits, use Section 2.15 to show they should be consolidated into one medical event.",
    kw: ["sick", "flu", "missed", "absent", "call out", "occurrence", "note", "doctor"]
  },
  {
    id: "progressive", s: "2.18", pg: 18, t: "Progressive Discipline Steps", v: "wrong", pri: 60,
    p: "Handbook requires Verbal Coaching before a formal Written Warning.",
    d: "For minor issues, Section 2.18 mandates a sequence: Verbal Coaching -> Written Guidance -> Final Notice. Skipping to a write-up is a procedural error.",
    b: "Severe conduct (safety risks, HIPAA, harassment) allows the company to bypass the coaching stage entirely.",
    strategy: "Ask for clarification on why the Verbal Coaching stage was bypassed. Mention that you value the supportive, constructive intent of the coaching step outlined in Section 2.18.",
    kw: ["write up", "warning", "verbal", "coaching", "first time", "email", "paper trail"]
  }
];

const THEMES = {
  SUPERVISOR_WRONG: { words: ["timer", "data", "teams", "note", "doctor", "clinical", "approved", "verbal", "first time", "reinforcer"], weight: 125 },
  THERAPIST_WRONG: { words: ["instagram", "tiktok", "facebook", "scrolling", "social media", "personal", "spotify", "music", "vape"], weight: 125 }
};

const CLARIFICATIONS = [
  {
    id: "phone_context",
    triggers: ["phone", "device", "music"],
    q: "How exactly was the device being used?",
    opts: [
      { label: "Clinical (Timer, Data, Teams, or Client Reinforcer)", append: " I was using the device for clinical patient care." },
      { label: "Personal (Social Media, Texts, or Music)", append: " I was using the device for personal entertainment." }
    ]
  },
  {
    id: "note_context",
    triggers: ["sick", "missed", "absent"],
    q: "Did you provide a doctor's note for this absence?",
    opts: [
      { label: "Yes, I provided a note", append: " I brought a doctor's note for my absence." },
      { label: "No, I did not have a note", append: " I did not provide a medical note." }
    ]
  }
];
