// ==========================================
// data.js - Arbiter v4.2 Global Silo Logic
// ==========================================

var R = [
  // ---------------------------------------------------------
  // CATEGORY 1: ATTENDANCE & LEAVE (2.15)
  // ---------------------------------------------------------
  {
    id: "att_policy", s: "2.15", pg: 17, t: "Excessive Absenteeism", v: "correct", pri: 800,
    p: "Missing 16 hours in 30 days is a violation of attendance standards.",
    d: "Section 2.15 defines 'excessive' as 16 hours of missed work within a rolling 30-day period.",
    strategy: "If you have reached this limit, focus on the 'Partnership Plan' required by the handbook.",
    kw: ["16 hours", "missed shift", "call out", "absent", "late", "attendance"],
    anti_kw: ["doctor", "note", "phone", "timer", "scrub", "clean", "dishes"]
  },
  {
    id: "att_medical", s: "2.15", pg: 17, t: "Protected Medical Absence", v: "wrong", pri: 950,
    p: "Consecutive sick days with a note must count as a SINGLE occurrence.",
    d: "Section 2.15 states that absences due to illness count as one occurrence, regardless of days, if a note is provided.",
    strategy: "Provide your medical documentation and cite Section 2.15 to consolidate the occurrences.",
    kw: ["doctor", "note", "consecutive", "sick for 3 days", "medical"],
    anti_kw: ["phone", "timer", "scrub", "clean", "dishes"]
  },

  // ---------------------------------------------------------
  // CATEGORY 2: ADMIN & CLEANING (2.10 / 2.4)
  // ---------------------------------------------------------
  {
    id: "unassigned_tasks", s: "2.10", pg: 14, t: "Self-Assigned Admin Tasks", v: "correct", pri: 850,
    p: "Admin tasks and cleaning must be explicitly assigned by a leader.",
    d: "Section 2.10 states admin tasks are 'assigned by the BCBA or clinic leader.'",
    strategy: "Accept the correction: 'I understand. Are there any approved admin tasks available?'",
    kw: ["cleaning", "kitchen", "sweep", "dishes", "unassigned", "chores", "admin time"],
    anti_kw: ["watched me", "didn't stop me", "saw me", "phone", "timer", "late", "scrub"]
  },
  {
    id: "permitted_work", s: "2.4", pg: 12, t: "Compensated Time (FLSA)", v: "wrong", pri: 960,
    p: "Work performed while a supervisor watches MUST be paid.",
    d: "Section 2.4 and Labor Law require pay for all work 'permitted.' If they saw you cleaning and didn't stop you, they must pay.",
    strategy: "Escalate: 'Since the work was performed while a supervisor was present and did not intervene, Section 2.4 requires compensation.'",
    kw: ["watched me", "saw me", "witnessed", "permitted"],
    // SILO: This rule ONLY triggers if cleaning/admin words are also present
    anti_kw: ["phone", "timer", "device", "scrub", "sneaker", "color", "late", "absent"]
  },

  // ---------------------------------------------------------
  // CATEGORY 3: DEVICES & PHONES (6.5)
  // ---------------------------------------------------------
  {
    id: "device_personal", s: "6.5", pg: 43, t: "Personal Device Misuse", v: "correct", pri: 800,
    p: "Personal device use during sessions is strictly prohibited.",
    d: "Section 6.5 states cell phone use while with a client is 'strictly prohibited.'",
    strategy: "Acknowledge the safety risk and commit to following Section 6.5.",
    kw: ["texting", "social media", "instagram", "tiktok", "facebook", "scrolling", "personal phone"],
    anti_kw: ["timer", "data", "clinical", "emergency", "clean", "dishes"]
  },
  {
    id: "device_clinical", s: "6.5", pg: 43, t: "Clinical Device Exception", v: "wrong", pri: 970,
    p: "Device use for 'Direct Patient Care' is protected.",
    d: "Section 6.5 allows device usage for clinical purposes like timers, data collection, and reinforcers.",
    strategy: "Clarify the use: 'I was using my device as a clinical timer/data tool as permitted by Section 6.5.'",
    kw: ["timer", "data", "clock", "clinical use", "reinforcer", "ipad"],
    anti_kw: ["texting", "social media", "cleaning", "dishes"]
  },

  // ---------------------------------------------------------
  // CATEGORY 4: BREAKS & LUNCH (2.3)
  // ---------------------------------------------------------
  {
    id: "break_interrupted", s: "2.3", pg: 12, t: "Unpaid Meal Period", v: "wrong", pri: 900,
    p: "Unpaid breaks must be 'completely relieved of all duties.'",
    d: "Section 2.3 states that if you are not relieved of all duties, the break must be compensated.",
    strategy: "Request compensation: 'Because I was not relieved of duties during my break per Section 2.3, I am logging this as worked time.'",
    kw: ["working lunch", "notes during break", "watch a client", "relieved of duty"],
    anti_kw: ["phone", "timer", "late", "absent", "scrub"]
  },

  // ---------------------------------------------------------
  // CATEGORY 5: DRESS CODE (2.16)
  // ---------------------------------------------------------
  {
    id: "dress_ghost", s: "2.16", pg: 18, t: "Dress Code (Ghost Rule)", v: "wrong", pri: 700,
    p: "Color/Brand restrictions are NOT in the handbook.",
    d: "Section 2.16 is silent on scrub color or sneaker brands. Personal preference is not policy.",
    strategy: "Ask: 'Could you show me where in Section 2.16 it restricts this color?'",
    kw: ["color", "brand", "sneakers", "figs", "hoka", "scrubs color"],
    anti_kw: ["ripped", "open-toe", "hoodie", "phone", "timer", "clean"]
  },
  {
    id: "dress_violation", s: "2.16", pg: 19, t: "Actual Safety Violation", v: "correct", pri: 800,
    p: "Safety-related attire is strictly enforced.",
    d: "Section 2.16 explicitly bans ripped clothing, open-toed shoes, and dangling jewelry.",
    strategy: "Correct the attire immediately to ensure safety compliance.",
    kw: ["ripped", "open-toe", "hoodie", "drawstring", "dangling", "jewelry", "crocs"],
    anti_kw: ["color", "brand", "phone", "timer", "clean"]
  },

  // ---------------------------------------------------------
  // CATEGORY 6: CANCELLATIONS (2.10)
  // ---------------------------------------------------------
  {
    id: "cancel_ft_rights", s: "2.10", pg: 14, t: "FT Pay Protection", v: "wrong", pri: 800,
    p: "Full-time staff are prioritized for admin/fill-in tasks.",
    d: "Section 2.10 states FT staff (30+ hrs) will be prioritized to maintain hours.",
    strategy: "Ask: 'As a FT employee, Section 2.10 notes I should be prioritized for admin tasks. Are there any available?'",
    kw: ["sent home unpaid", "no admin offered", "cancel", "full time"],
    anti_kw: ["refused a client", "phone", "timer", "scrub"]
  },

  // ---------------------------------------------------------
  // CATEGORY 7: PROGRESSIVE DISCIPLINE (2.18)
  // ---------------------------------------------------------
  {
    id: "procedural_skip", s: "2.18", pg: 21, t: "Skipped Coaching Step", v: "grey", pri: 750,
    p: "The handbook requires 'Verbal Coaching' as Step 1.",
    d: "Section 2.18 mandates a sequence: 1. Verbal Coaching, 2. Written Guidance.",
    strategy: "Ask: 'Since this is a first-time minor issue, can we follow the Verbal Coaching step outlined in Section 2.18?'",
    kw: ["first time", "no warning", "straight to write up", "procedural"],
    anti_kw: ["sleep", "theft", "abuse", "hit", "drunk", "phone", "timer"]
  },

  // ---------------------------------------------------------
  // CATEGORY 8: HARASSMENT & OPEN DOOR (1.8 / 6.2)
  // ---------------------------------------------------------
  {
    id: "harassment", s: "6.2", pg: 41, t: "Bullying & Retaliation", v: "wrong", pri: 900,
    p: "Retaliation and humiliation are strictly prohibited.",
    d: "Section 6.2 prohibits 'falsely reporting' or 'humiliating' team members.",
    strategy: "Escalate via the Open Door Policy (Section 1.8).",
    kw: ["bully", "harass", "retaliation", "humiliate", "target", "mean"],
    anti_kw: ["phone", "timer", "late", "absent", "scrub"]
  }
];

// ... (THEMES and CLARIFICATIONS stay the same as previous)
