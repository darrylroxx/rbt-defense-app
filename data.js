// ==========================================
// data.js - Arbiter v4.5 FINAL (Red Zone + Silo)
// ==========================================

var R = [
  // ---------------------------------------------------------
  // CATEGORY 0: THE RED ZONE (Gross Misconduct)
  // ---------------------------------------------------------
  {
    id: "red_zone", s: "2.18 & 6.10", pg: 21, t: "Gross Misconduct & Safety", v: "correct", pri: 1000,
    p: "Gross Misconduct allows for immediate termination, bypassing coaching.",
    d: "Section 2.18 explicitly states that HHF reserves the right to bypass progressive discipline for 'Gross Misconduct.' This includes sleeping on shift, client neglect, theft, or violence.",
    b: "Clinical safety is the #1 priority. If a client is left unsupervised because a therapist is asleep, the company is not required to give a verbal warning first.",
    strategy: "Take this extremely seriously. In cases of Gross Misconduct, the procedural ladder (Step 1, 2, 3) does not apply. Your best move is to be honest and emphasize any mitigating factors, though termination is a standard outcome.",
    kw: ["sleep", "asleep", "bean bag", "neglect", "theft", "drunk", "high", "violence", "hit", "abuse", "fighting"],
    anti_kw: ["timer", "data", "clean", "scrub", "lunch"]
  },

  // ---------------------------------------------------------
  // CATEGORY 1: ATTENDANCE & LEAVE (2.15)
  // ---------------------------------------------------------
  {
    id: "att_policy", s: "2.15", pg: 17, t: "Excessive Absenteeism", v: "correct", pri: 800,
    p: "Missing 16 hours in 30 days is a violation of attendance standards.",
    d: "Section 2.15 defines 'excessive' as 16 hours of missed work within a rolling 30-day period.",
    strategy: "If you have reached this limit, focus on the 'Partnership Plan' required by the handbook to address your barriers.",
    kw: ["16 hours", "missed shift", "call out", "absent", "too many days", "attendance"],
    anti_kw: ["doctor", "note", "consecutive", "partnership", "emergency", "phone", "timer", "scrub", "clean", "dishes", "breakroom"]
  },
  {
    id: "att_medical", s: "2.15", pg: 17, t: "Protected Medical Absence", v: "wrong", pri: 950,
    p: "Consecutive sick days with a note must count as a SINGLE occurrence.",
    d: "Section 2.15 states that absences due to illness count as one occurrence, regardless of days, if a note is provided.",
    strategy: "Provide your medical documentation and cite Section 2.15 to consolidate the occurrences.",
    kw: ["doctor", "note", "consecutive", "sick for 3 days", "medical", "hospital"],
    anti_kw: ["no note", "forgot my note", "phone", "timer", "scrub", "clean", "dishes"]
  },

  // ---------------------------------------------------------
  // CATEGORY 2: ADMIN & CLEANING (2.10 / 2.4)
  // ---------------------------------------------------------
  {
    id: "unassigned_tasks", s: "2.10", pg: 14, t: "Self-Assigned Admin Tasks", v: "correct", pri: 850,
    p: "Admin tasks and cleaning must be explicitly assigned by a leader.",
    d: "Section 2.10 states admin tasks are 'assigned by the BCBA or clinic leader.'",
    strategy: "Accept the correction: 'I understand. Are there any approved admin tasks available for me to work on now?'",
    kw: ["cleaning", "kitchen", "sweep", "dishes", "unassigned", "chores"],
    anti_kw: ["watched me", "didn't stop me", "saw me", "phone", "timer", "absent", "late", "scrub", "breakroom", "asleep", "sleep"]
  },
  {
    id: "permitted_work", s: "2.4", pg: 12, t: "Compensated Time (FLSA)", v: "wrong", pri: 960,
    p: "Work performed while a supervisor watches MUST be paid.",
    d: "Section 2.4 and Labor Law require pay for all work 'permitted.' If a supervisor witnesses you working and does not stop you, they cannot later deny the pay.",
    strategy: "Escalate: 'Since the work was performed in the presence of a supervisor who did not intervene, Section 2.4 requires compensation.'",
    kw: ["watched me", "saw me", "witnessed", "permitted"],
    // SILO: Added "asleep" and "neglect" to prevent the "sleeping on bean bag" trap
    anti_kw: ["stopped me", "told me to stop", "phone", "timer", "device", "scrub", "sneaker", "color", "late", "absent", "breakroom", "asleep", "sleeping", "neglect"]
  },

  // ---------------------------------------------------------
  // CATEGORY 3: DEVICES & PHONES (6.5)
  // ---------------------------------------------------------
  {
    id: "breakroom_rights", s: "2.3", pg: 12, t: "Breakroom Privacy", v: "wrong", pri: 980, 
    p: "Supervisors cannot restrict personal device use during UNPAID breaks.",
    d: "Section 2.3 mandates that you be 'completely relieved of all duties' during unpaid breaks.",
    strategy: "Politely clarify: 'Under Section 2.3, I am currently on my unpaid break and relieved of all duties.'",
    kw: ["breakroom", "unpaid break", "scrolling on my break", "on my lunch", "off the clock"],
    anti_kw: ["during session", "with my client", "at the table", "timer", "data"]
  },
  {
    id: "device_personal", s: "6.5", pg: 43, t: "Personal Device Misuse", v: "correct", pri: 800,
    p: "Personal device use DURING SESSIONS is strictly prohibited.",
    d: "Section 6.5 states cell phone use while with a client is 'strictly prohibited.'",
    strategy: "Acknowledge the safety risk and commit to leaving the device in your bag per Section 6.5.",
    kw: ["texting", "social media", "instagram", "tiktok", "facebook", "scrolling", "personal phone"],
    anti_kw: ["timer", "data", "clinical", "emergency", "clean", "dishes", "breakroom", "unpaid break", "on my break"]
  },
  {
    id: "device_clinical", s: "6.5", pg: 43, t: "Clinical Device Exception", v: "wrong", pri: 970,
    p: "Device use for 'Direct Patient Care' is protected.",
    d: "Section 6.5 allows device usage for clinical purposes like timers or data collection.",
    strategy: "Clarify the use: 'I was using my device as a clinical timer/data tool as permitted by Section 6.5.'",
    kw: ["timer", "data", "clock", "clinical use", "reinforcer", "ipad"],
    anti_kw: ["texting", "social media", "cleaning", "dishes", "breakroom"]
  },

  // ---------------------------------------------------------
  // CATEGORY 4: BREAKS & LUNCH (2.3)
  // ---------------------------------------------------------
  {
    id: "break_interrupted", s: "2.3", pg: 12, t: "Unpaid Meal Period", v: "wrong", pri: 900,
    p: "Unpaid breaks must be 'completely relieved of all duties.'",
    d: "Section 2.3 states that if you are not relieved of all work duties, the break must be compensated.",
    strategy: "Request compensation: 'Because I was not relieved of duties per Section 2.3, I am logging this as worked time.'",
    kw: ["working lunch", "notes during break", "watch a client", "relieved of duty"],
    anti_kw: ["left the floor", "off the clock", "phone", "timer", "late", "absent", "scrub"]
  },

  // ---------------------------------------------------------
  // CATEGORY 5: DRESS CODE (2.16)
  // ---------------------------------------------------------
  {
    id: "dress_ghost", s: "2.16", pg: 18, t: "Dress Code (Ghost Rule)", v: "wrong", pri: 700,
    p: "Color/Brand restrictions are NOT in the handbook.",
    d: "Section 2.16 is silent on scrub color or sneaker brands.",
    strategy: "Ask: 'Could you show me where in Section 2.16 it restricts this color?'",
    kw: ["color", "brand", "sneakers", "figs", "hoka", "scrubs color"],
    anti_kw: ["ripped", "open-toe", "hoodie", "lanyard", "phone", "timer", "clean", "breakroom"]
  },
  {
    id: "dress_violation", s: "2.16", pg: 19, t: "Actual Safety Violation", v: "correct", pri: 800,
    p: "Safety-related attire is strictly enforced.",
    d: "Section 2.16 explicitly bans ripped clothing, open-toed shoes, and dangling jewelry.",
    strategy: "Correct the attire immediately to ensure safety compliance per Section 2.16.",
    kw: ["ripped", "open-toe", "hoodie", "drawstring", "dangling", "jewelry", "crocs"],
    anti_kw: ["color", "brand", "phone", "timer", "clean", "breakroom"]
  },

  // ---------------------------------------------------------
  // CATEGORY 6: PROGRESSIVE DISCIPLINE (2.18)
  // ---------------------------------------------------------
  {
    id: "procedural_skip", s: "2.18", pg: 21, t: "Skipped Coaching Step", v: "grey", pri: 750,
    p: "The handbook requires 'Verbal Coaching' as Step 1.",
    d: "Section 2.18 mandates a sequence for minor issues: 1. Verbal Coaching, 2. Written Guidance.",
    strategy: "Ask: 'Since this is a first-time minor issue, can we follow the Verbal Coaching step outlined in Section 2.18?'",
    kw: ["first time", "no warning", "straight to write up", "procedural"],
    anti_kw: ["sleep", "asleep", "theft", "abuse", "hit", "drunk", "neglect", "phone", "timer"]
  }
];

const THEMES = {
  SUPERVISOR_WRONG: { 
    words: ["timer", "data", "clinical", "approved", "note", "doctor", "watched me", "didn't stop me", "sent home unpaid", "first time", "no coaching", "working lunch", "color", "brand", "breakroom", "unpaid break"], 
    weight: 150 
  },
  THERAPIST_WRONG: { 
    words: ["instagram", "tiktok", "facebook", "scrolling", "personal", "ripped", "open-toe", "cleaning", "kitchen", "unassigned", "no note", "16 hours", "asleep", "sleep", "neglect"], 
    weight: 150 
  }
};

const CLARIFICATIONS = [
  {
    id: "phone_context",
    triggers: ["phone", "device", "tablet", "ipad"],
    q: "How exactly was the device being used?",
    opts: [
      { label: "Clinical (Timer, Data, Reinforcer)", append: " I was using the device for a clinical timer." },
      { label: "Personal (Social Media, Texts)", append: " I was using the device for personal texting." }
    ]
  },
  {
    id: "dress_context",
    triggers: ["scrub", "shirt", "pants", "shoes", "sneaker"],
    q: "What specifically was the issue with your attire?",
    opts: [
      { label: "Specific color or brand", append: " It was about the specific color or brand." },
      { label: "Safety (ripped, open-toe, hoodie)", append: " It was a safety issue like ripped clothes or open-toe shoes." }
    ]
  },
  {
    id: "attendance_context",
    triggers: ["sick", "missed", "absent", "call out"],
    q: "Did you provide a doctor's note for this absence?",
    opts: [
      { label: "Yes, I provided a note", append: " I brought a doctor's note for my consecutive absence." },
      { label: "No, I did not have a note", append: " I did not provide a medical note." }
    ]
  }
];
