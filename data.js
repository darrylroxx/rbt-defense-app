var R = [
  {
    id: "phone", s: "2.0 & 6.5", pg: 22, t: "Clinical Phone Use Exception", v: "wrong", pri: 50,
    p: "Clinical phone use (timers, data, Teams) is an explicit exception to the phone ban.",
    d: "Section 6.5 allows devices for 'direct patient care.' Using a phone for a timer, data tracking, or Teams is protected under this rule.",
    b: "If you were caught scrolling personal apps (social media, personal texts), the supervisor's discipline is likely correct.",
    script: "I’ve been reviewing Section 6.5 on Page 22 of the HHF handbook regarding the device policy. It notes a specific exception for 'direct patient care.' Since I was using my phone strictly as a clinical timer, I’d like to clarify if that exception applies so I can remain in full compliance.",
    kw: ["phone", "cell", "device", "mobile", "timer", "data", "teams", "clock"]
  },
  {
    id: "personal_phone", s: "6.5", pg: 22, t: "Personal Phone Misuse", v: "correct", pri: 40,
    p: "Personal phone use while with a client is strictly prohibited.",
    d: "The handbook is clear: personal use during session—even briefly—is a violation due to safety and engagement concerns.",
    b: "If this was an emergency or a pre-approved medical accommodation, you should mention that immediately.",
    script: "I’ve reviewed the handbook policy in Section 6.5. I realize now that using my phone for personal reasons during a session is a violation. I take full responsibility for the distraction and will keep my device stored away during all future sessions.",
    kw: ["scrolling", "social media", "instagram", "tiktok", "facebook", "snapchat", "spotify", "music", "podcast", "distracted"]
  },
  {
    id: "attendance", s: "2.15", pg: 14, t: "Attendance & Doctor's Notes", v: "grey", pri: 30,
    p: "Medical absences with a doctor's note count as ONE occurrence, regardless of the days.",
    d: "If you provided a note and they counted each day separately (e.g., 3 days = 3 occurrences), they violated Section 2.15.",
    b: "If you did not provide a note, the supervisor is correct to count each day as a separate occurrence.",
    script: "Section 2.15 on Page 14 of the handbook states that absences covered by a doctor's note count as a single occurrence. I provided a note for those days, so I wanted to make sure they were being logged correctly according to HHF policy.",
    kw: ["sick", "flu", "missed", "absent", "call out", "occurrence", "note", "doctor"]
  },
  {
    id: "progressive", s: "2.18", pg: 18, t: "Progressive Discipline Steps", v: "wrong", pri: 60,
    p: "Handbook requires Verbal Coaching before a Written Warning for minor issues.",
    d: "Skipping straight to a written 'paper trail' for a first offense is a procedural violation of Section 2.18.",
    b: "Major safety risks or HIPAA breaches can lead to an immediate written warning or termination.",
    script: "I’m reviewing the progressive discipline steps in Section 2.18. It mentions that verbal coaching is the first step for minor issues. Since this was my first time facing this, I'm hoping we can use this as a coaching moment rather than a formal write-up.",
    kw: ["write up", "warning", "verbal", "coaching", "first time", "email", "paper trail"]
  }
];

const THEMES = {
  SUPERVISOR_WRONG: { words: ["timer", "data", "teams", "note", "doctor", "clinical", "approved", "verbal", "first time", "yelled"], weight: 125 },
  THERAPIST_WRONG: { words: ["instagram", "tiktok", "facebook", "scrolling", "social media", "personal", "spotify", "music", "podcast", "vape"], weight: 125 }
};

const CLARIFICATIONS = [
  {
    id: "phone_context",
    triggers: ["phone", "device", "music"],
    q: "Context Check: How was the device being used?",
    opts: [
      { label: "Clinical (Timer/Data/Teams)", append: " I was using the device for clinical patient care." },
      { label: "Personal (Music/Social/Texts)", append: " I was using the device for personal entertainment." }
    ]
  },
  {
    id: "note_context",
    triggers: ["sick", "missed", "absent"],
    q: "Did you provide a doctor's note?",
    opts: [
      { label: "Yes, I brought a note", append: " I brought a doctor's note for my absence." },
      { label: "No, I did not have a note", append: " I did not provide a medical note." }
    ]
  }
];
