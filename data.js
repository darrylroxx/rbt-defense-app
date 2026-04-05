var R = [
  {
    id: "phone", s: "2.0 & 6.5", pg: 22, t: "Clinical Phone Use Exception", v: "wrong", pri: 50,
    p: "Clinical phone use (timers, data, Teams) is an explicit exception to the phone ban.",
    d: "If the device was for patient care, the supervisor is wrong. Section 6.5 allows devices for 'direct patient care.'",
    b: "If used for non-work apps (TikTok, personal texts) while with a client, the supervisor is correct.",
    kw: ["phone", "cell", "device", "mobile", "timer", "data", "teams", "clock"]
  },
  {
    id: "personal_phone", s: "6.5", pg: 22, t: "Personal Phone Misuse", v: "correct", pri: 40,
    p: "Personal phone use while with a client is strictly prohibited.",
    d: "Handbook is clear: personal use during session is a violation. This includes social media, personal calls, or entertainment.",
    b: "If it was an emergency call or a pre-approved medical accommodation, this is a grey area.",
    kw: ["scrolling", "social media", "instagram", "tiktok", "facebook", "snapchat", "spotify", "music", "podcast"]
  },
  {
    id: "attendance", s: "2.15", pg: 14, t: "Attendance & Doctor's Notes", v: "grey", pri: 30,
    p: "Medical absences with a doctor's note count as ONE occurrence, regardless of the days.",
    d: "If you provided a note and they counted days separately (e.g., 3 days = 3 occurrences), they violated Section 2.15.",
    b: "Without a note, each day can be counted as a separate occurrence.",
    kw: ["sick", "flu", "missed", "absent", "call out", "occurrence", "note", "doctor"]
  },
  {
    id: "progressive", s: "2.18", pg: 18, t: "Progressive Discipline Steps", v: "wrong", pri: 60,
    p: "Handbook requires Verbal Coaching before a Written Warning for minor issues.",
    d: "Skipping straight to a written warning for a first offense is a procedural violation of Section 2.18.",
    b: "Serious safety violations or HIPAA breaches can bypass the verbal stage entirely.",
    kw: ["write up", "warning", "verbal", "coaching", "first time", "email", "paper trail"]
  }
];

// ======================== THEMATIC WEIGHTS ========================
const THEMES = {
  SUPERVISOR_WRONG: {
    words: ["timer", "data", "teams", "note", "doctor", "clinical", "approved", "emergency", "verbal", "first time", "never happened", "yelled"],
    weight: 120
  },
  THERAPIST_WRONG: {
    words: ["instagram", "tiktok", "facebook", "scrolling", "social media", "personal", "spotify", "music", "podcast", "distracted", "ignored", "vape"],
    weight: 120
  }
};

const CLARIFICATIONS = [
  {
    id: "phone_context",
    triggers: ["phone", "device", "music", "earphones"],
    q: "Context Check: How was the device being used?",
    opts: [
      { label: "Clinical (Timer/Data/Teams)", append: " I was using the device for clinical patient care." },
      { label: "Personal (Music/Social/Texts)", append: " I was using the device for personal entertainment." }
    ]
  },
  {
    id: "note_context",
    triggers: ["sick", "missed", "absent", "occurrence"],
    q: "Did you provide a doctor's note for these days?",
    opts: [
      { label: "Yes, I brought a note", append: " I brought a doctor's note for my absence." },
      { label: "No, I did not have a note", append: " I did not provide a medical note." }
    ]
  }
];
