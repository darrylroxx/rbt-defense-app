// ==========================================
// data.js - Arbiter v4.7 FIXED (Context Restored + Leave Abuse)
// ==========================================

var R = [
  // ---------------------------------------------------------
  // BUCKET 0: THE RED ZONE (Gross Misconduct - Priority 1000)
  // ---------------------------------------------------------
  {
    id: "red_zone", s: "2.18 & 6.10", pg: 21, t: "Gross Misconduct & Safety", v: "correct", pri: 1000,
    p: "Gross Misconduct allows for immediate termination, bypassing coaching.",
    d: "Section 2.18 explicitly states that HHF reserves the right to bypass progressive discipline for 'Gross Misconduct.' This includes sleeping on shift, client neglect, theft, or violence.",
    b: "Clinical safety is the #1 priority. If a client is left unsupervised, the standard coaching ladder does not apply.",
    strategy: "Take this extremely seriously. In cases of Gross Misconduct, the procedural ladder (Step 1, 2, 3) does not apply. Focus on clinical safety immediately.",
    kw: ["sleep", "asleep", "bean bag", "neglect", "theft", "drunk", "high", "violence", "hit", "abuse", "fighting"],
    anti_kw: ["timer", "data", "clean", "scrub", "lunch", "breakroom"]
  },
  {
    id: "leave_abuse", s: "6.10", pg: 45, t: "Dishonesty & Leave Abuse", v: "correct", pri: 1000,
    p: "Calling out for a denied PTO day is considered Gross Misconduct.",
    d: "Section 6.10 defines 'Dishonesty' as a terminable offense. If you call out sick for a day that was explicitly denied as PTO, leadership will categorize this as falsifying an absence.",
    b: "The timing creates a 'rebuttable presumption' of dishonesty. Even if you were truly sick, the handbook allows leadership to treat this as a policy violation.",
    strategy: "Provide a doctor's note immediately. Without medical documentation, HHF can treat the call-out as an act of insubordination or dishonesty.",
    kw: ["denied", "PTO", "called out sick", "denied Friday", "denied day", "terminated for sick"],
    anti_kw: ["16 hours", "timer", "clean"]
  },

  // ---------------------------------------------------------
  // BUCKET 1: LEGAL & PRIVACY SHIELDS (Priority 900+)
  // ---------------------------------------------------------
  {
    id: "breakroom_rights", s: "2.3", pg: 12, t: "Breakroom Privacy", v: "wrong", pri: 980, 
    p: "Supervisors cannot restrict personal device use during UNPAID breaks.",
    d: "Section 2.3 mandates that you be 'completely relieved of all duties' during unpaid breaks. Off-clock time in non-clinical areas is not subject to phone bans.",
    b: "If a supervisor controls your activities during an unpaid break, the company may be legally required to pay you for that time.",
    strategy: "Clarify status: 'Under Section 2.3, I am currently on my unpaid break and relieved of all duties. I will follow device policy once I clock back in.'",
    kw: ["breakroom", "unpaid break", "scrolling on my break", "on my lunch", "off the clock"],
    anti_kw: ["during session", "with my client", "at the table", "timer", "data", "asleep", "neglect"]
  },
  {
    id: "device_clinical", s: "6.5", pg: 43, t: "Clinical Device Exception", v: "wrong", pri: 970,
    p: "Device use for 'Direct Patient Care' is protected.",
    d: "Section 6.5 allows device usage for clinical purposes like timers or data collection. This is a protected exception to the phone ban.",
    b: "Supervisors sometimes issue blanket 'no phone' bans that ignore this specific clinical exception for direct care tasks.",
    strategy: "Clarify use: 'I was using my device as a clinical timer/data tool as permitted by Section 6.5.'",
    kw: ["timer", "data", "clock", "clinical use", "reinforcer", "ipad"],
    anti_kw: ["texting", "social media", "cleaning", "dishes", "breakroom", "asleep"]
  },
  {
    id: "permitted_work", s: "2.4", pg: 12, t: "Compensated Time (FLSA)", v: "wrong", pri: 960,
    p: "Work performed while a supervisor watches MUST be paid.",
    d: "Section 2.4 and Labor Law require pay for all work 'permitted.' If a supervisor witnesses work and does not stop it, they cannot deny pay.",
    b: "Silence from a supervisor while you work constitutes legal permission to perform that work, requiring compensation.",
    strategy: "Escalate: 'Since the work was performed while a supervisor was present and did not intervene, Section 2.4 requires compensation.'",
    kw: ["watched me", "saw me", "witnessed", "permitted"],
    anti_kw: ["stopped me", "told me to stop", "phone", "timer", "device", "scrub", "color", "late", "absent", "asleep", "sleeping", "neglect", "breakroom"]
  },

  // ---------------------------------------------------------
  // BUCKET 2: HANDBOOK POLICY VIOLATIONS (Priority 800+)
  // ---------------------------------------------------------
  {
    id: "unassigned_tasks", s: "2.10", pg: 14, t: "Self-Assigned Admin Tasks", v: "correct", pri: 850,
    p: "Admin tasks and cleaning must be explicitly assigned by a leader.",
    d: "Section 2.10 states admin tasks are 'assigned by the BCBA or clinic leader.' You cannot self-assign chores to claim paid time.",
    b: "A supervisor stopping you from unapproved chores is an operational correction, not necessarily a formal discipline.",
    strategy: "Accept correction: 'Understood. Are there any approved admin tasks available for me to work on now?'",
    kw: ["cleaning", "kitchen", "sweep", "dishes", "unassigned", "chores"],
    anti_kw: ["watched me", "didn't stop me", "saw me", "phone", "timer", "absent", "late", "scrub", "asleep"]
  },
  {
    id: "device_personal", s: "6.5", pg: 43, t: "Personal Device Misuse", v: "correct", pri: 810,
    p: "Personal device use DURING SESSIONS is strictly prohibited.",
    d: "Section 6.5 states cell phone use while with a client is 'strictly prohibited.'",
    b: "Even a 'quick text' is considered a safety risk in a clinical setting because it removes focus from the client.",
    strategy: "Acknowledge the safety risk and commit to following Section 6.5 on the floor.",
    kw: ["texting", "social media", "instagram", "tiktok", "facebook", "scrolling", "personal phone"],
    anti_kw: ["timer", "data", "clinical", "emergency", "clean", "dishes", "breakroom", "unpaid break"]
  },
{
    id: "reassignment_refusal", 
    s: "2.10", pg: 14, t: "Reassignment & Refusal of Work", v: "correct", pri: 820,
    p: "Refusing a clinic reassignment after a home cancellation is an unexcused absence.",
    d: "Section 2.10 allows the company to reassign team members to the clinic...",
    b: "By refusing to report to the clinic when work was available, the absence is categorized as 'unexcused' under Section 2.15.",
    strategy: "If you cannot make it to the clinic due to commute or logistics, discuss this as a 'Barrier'...",
    kw: ["home client canceled", "report to the clinic", "rather take it unpaid", "not an option", "unexcused absence", "reassigned"],
    anti_kw: ["phone", "timer", "scrub", "asleep"]
  },
  // ---------------------------------------------------------
  // BUCKET 3: PROCEDURAL & GHOST RULES (Priority 700+)
  // ---------------------------------------------------------
  {
    id: "procedural_skip", s: "2.18", pg: 21, t: "Skipped Coaching Step", v: "grey", pri: 750,
    p: "The handbook requires 'Verbal Coaching' as Step 1.",
    d: "Unless it is Gross Misconduct, Section 2.18 mandates a sequence: 1. Verbal Coaching, 2. Written Guidance.",
    b: "The coaching step is designed to be supportive and focused on barriers rather than being purely punitive.",
    strategy: "Ask: 'Since this is a first-time minor issue, can we follow the Verbal Coaching step outlined in Section 2.18?'",
    kw: ["first time", "no warning", "straight to write up", "procedural"],
    anti_kw: ["sleep", "asleep", "theft", "abuse", "hit", "drunk", "neglect", "phone", "timer", "crocs", "ripped", "denied Friday"]
  },
  {
    id: "dress_ghost", s: "2.16", pg: 18, t: "Dress Code (Ghost Rule)", v: "wrong", pri: 700,
    p: "Color/Brand restrictions are NOT in the handbook.",
    d: "Section 2.16 is silent on scrub color or sneaker brands. Personal preference is not policy.",
    b: "HHF allows 'reasonable self-expression' as long as the clothing is safe and professional.",
    strategy: "Ask: 'Could you show me where in Section 2.16 it restricts this specific color/brand?'",
    kw: ["color", "brand", "sneakers", "figs", "hoka", "scrubs color"],
    anti_kw: ["ripped", "open-toe", "hoodie", "phone", "timer", "clean"]
  }
];

const THEMES = {
  SUPERVISOR_WRONG: { 
    words: ["timer", "data", "clinical", "approved", "note", "doctor", "watched me", "didn't stop me", "sent home unpaid", "first time", "no coaching", "working lunch", "color", "brand", "breakroom", "unpaid break"], 
    weight: 150 
  },
  THERAPIST_WRONG: { 
    words: ["instagram", "tiktok", "facebook", "scrolling", "personal", "ripped", "open-toe", "cleaning", "kitchen", "unassigned", "no note", "16 hours", "asleep", "sleep", "neglect", "denied PTO"], 
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
  }
];
