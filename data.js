// ==========================================
// data.js - Arbiter v4.0 "Triple-Bucket" Logic
// ==========================================

var R = [
  // ---------------------------------------------------------
  // CATEGORY 1: ATTENDANCE & LEAVE (2.15)
  // ---------------------------------------------------------
  {
    id: "att_policy", s: "2.15", pg: 17, t: "Excessive Absenteeism", v: "correct", pri: 800,
    p: "Missing 16 hours in 30 days is a violation of attendance standards.",
    d: "Section 2.15 defines 'excessive' as 16 hours of missed work within a rolling 30-day period. This triggers the performance management process.",
    b: "Regular attendance is essential for clinical consistency for our clients.",
    strategy: "If you have reached this limit, focus on the 'Partnership Plan' required by the handbook to address your barriers.",
    kw: ["16 hours", "missed shift", "call out", "absent", "too many days", "attendance"],
    anti_kw: ["doctor", "note", "consecutive", "partnership", "emergency"]
  },
  {
    id: "att_medical", s: "2.15", pg: 17, t: "Protected Medical Absence", v: "wrong", pri: 900,
    p: "Consecutive sick days with a note must count as a SINGLE occurrence.",
    d: "Section 2.15 states that absences due to illness count as one occurrence, regardless of days, if a note is provided. They cannot 'stack' multiple hits for one illness.",
    b: "Supervisors often count every day missed as a separate hit; the handbook explicitly forbids this if you have a note.",
    strategy: "Provide your medical documentation and cite Section 2.15: 'Because these were consecutive days for a single illness and I provided a note, this should be recorded as one occurrence.'",
    kw: ["doctor", "note", "consecutive", "sick for 3 days", "medical", "hospital"],
    anti_kw: ["no note", "forgot my note"]
  },
  {
    id: "att_procedural", s: "2.15", pg: 17, t: "Missing Partnership Plan", v: "grey", pri: 700,
    p: "Discipline for attendance requires a 'Partnership Plan' first.",
    d: "Section 2.15 mandates that leadership must 'partner with the team member' to create a plan to overcome barriers before moving to formal discipline.",
    b: "If they went straight to a write-up without a coaching meeting about your barriers, they skipped a step.",
    strategy: "Ask: 'I noticed we haven't created the Partnership Plan mentioned in Section 2.15 yet. Can we sit down to discuss my barriers so I can improve my attendance?'",
    kw: ["partnership", "barriers", "straight to write up", "no coaching"],
    anti_kw: []
  },

  // ---------------------------------------------------------
  // CATEGORY 2: ADMIN & CLEANING (2.10 / 2.4)
  // ---------------------------------------------------------
  {
    id: "unassigned_tasks", s: "2.10", pg: 14, t: "Self-Assigned Admin Tasks", v: "correct", pri: 850,
    p: "Admin tasks and cleaning must be explicitly assigned by a leader.",
    d: "Section 2.10 states admin tasks are 'assigned by the BCBA or clinic leader.' You cannot independently decide to clean to stay on the clock.",
    b: "A supervisor stopping you from unapproved chores is an operational correction.",
    strategy: "Accept the correction: 'I understand. Are there any approved admin tasks available for me to work on now?'",
    kw: ["cleaning", "kitchen", "sweep", "dishes", "unassigned", "chores"],
    anti_kw: ["watched me", "didn't stop me", "saw me"]
  },
  {
    id: "permitted_work", s: "2.4", pg: 12, t: "Compensated Time (FLSA)", v: "wrong", pri: 950,
    p: "Work performed while a supervisor watches MUST be paid.",
    d: "Section 2.4 and Labor Law require pay for all work 'permitted.' If a supervisor witnesses you working and does not stop you, they cannot later deny the pay.",
    b: "Silence from a supervisor while you work constitutes legal permission.",
    strategy: "Escalate: 'Since the work was performed in the presence of a supervisor who did not intervene, Section 2.4 and FLSA require this time to be compensated.'",
    kw: ["watched me", "saw me", "didn't say anything", "let me clean", "witnessed"],
    anti_kw: ["stopped me", "told me to stop"]
  },

  // ---------------------------------------------------------
  // CATEGORY 3: DEVICES & PHONES (6.5)
  // ---------------------------------------------------------
  {
    id: "device_personal", s: "6.5", pg: 43, t: "Personal Device Misuse", v: "correct", pri: 800,
    p: "Personal device use during sessions is strictly prohibited.",
    d: "Section 6.5 states cell phone use while with a client is 'strictly prohibited.' This is a safety and quality of care violation.",
    b: "Even a 'quick text' is considered a safety risk in a clinical setting.",
    strategy: "Acknowledge the safety risk and commit to leaving the device in your bag or a designated area per Section 6.5.",
    kw: ["texting", "social media", "instagram", "tiktok", "facebook", "scrolling", "personal phone"],
    anti_kw: ["timer", "data", "clinical", "emergency"]
  },
  {
    id: "device_clinical", s: "6.5", pg: 43, t: "Clinical Device Exception", v: "wrong", pri: 850,
    p: "Device use for 'Direct Patient Care' is protected.",
    d: "Section 6.5 allows device usage for clinical purposes like timers, data collection, and client reinforcers. It is not a violation if used for these tasks.",
    b: "Supervisors sometimes issue blanket 'no phone' bans that ignore this specific clinical exception.",
    strategy: "Clarify the use: 'I was using my device as a clinical timer/data tool as permitted by the Direct Patient Care exception in Section 6.5.'",
    kw: ["timer", "data", "clock", "clinical use", "reinforcer", "youtube for client"],
    anti_kw: ["texting", "social media"]
  },

  // ---------------------------------------------------------
  // CATEGORY 4: BREAKS & LUNCH (2.3)
  // ---------------------------------------------------------
  {
    id: "break_interrupted", s: "2.3", pg: 12, t: "Unpaid Meal Period", v: "wrong", pri: 850,
    p: "Unpaid breaks must be 'completely relieved of all duties.'",
    d: "Section 2.3 states that if you are not relieved of all work duties (e.g., asked to watch a client or do notes), the break must be compensated.",
    b: "If you are 'working' while eating, that 30 minutes must be paid at your hourly rate.",
    strategy: "Request compensation: 'Because I was not relieved of duties during my break per Section 2.3, I am logging this as worked time.'",
    kw: ["working lunch", "notes during break", "watch a client", "stayed in the room"],
    anti_kw: ["left the floor", "off the clock"]
  },

  // ---------------------------------------------------------
  // CATEGORY 5: DRESS CODE (2.16)
  // ---------------------------------------------------------
  {
    id: "dress_ghost", s: "2.16", pg: 18, t: "Dress Code (Ghost Rule)", v: "wrong", pri: 700,
    p: "Color/Brand restrictions are NOT in the handbook.",
    d: "Section 2.16 requires an HHF shirt, but is silent on scrub color or sneaker brands. Personal preference of a supervisor is not a policy.",
    b: "HHF allows 'reasonable self-expression' as long as it is safe.",
    strategy: "Ask: 'Could you show me where in Section 2.16 it restricts this color? I want to ensure my apparel is in line with the written policy.'",
    kw: ["color", "brand", "sneakers", "figs", "hoka", "scrubs color"],
    anti_kw: ["ripped", "open-toe", "hoodie", "lanyard"]
  },
  {
    id: "dress_violation", s: "2.16", pg: 19, t: "Actual Safety Violation", v: "correct", pri: 800,
    p: "Safety-related attire is strictly enforced.",
    d: "Section 2.16 explicitly bans ripped clothing, open-toed shoes, hoodies with drawstrings, and dangling jewelry for safety reasons.",
    b: "These items pose a risk during physical interventions or client behaviors.",
    strategy: "Correct the attire immediately to ensure safety compliance per Section 2.16.",
    kw: ["ripped", "open-toe", "hoodie", "drawstring", "dangling", "jewelry", "crocs"],
    anti_kw: ["color", "brand"]
  },

  // ---------------------------------------------------------
  // CATEGORY 6: CANCELLATIONS (2.10)
  // ---------------------------------------------------------
  {
    id: "cancel_ft_rights", s: "2.10", pg: 14, t: "FT Pay Protection", v: "wrong", pri: 800,
    p: "Full-time staff are prioritized for admin/fill-in tasks.",
    d: "Section 2.10 states that for cancellations, FT staff (30+ hrs) will be prioritized for other assignments to maintain their scheduled hours.",
    b: "Being sent home unpaid as a FT employee without the offer of admin work may violate this priority status.",
    strategy: "Remind them of your status: 'As a FT employee, Section 2.10 notes I should be prioritized for admin or fill-in work. Are there any tasks available?'",
    kw: ["sent home unpaid", "no admin offered", "cancel", "full time"],
    anti_kw: ["refused a client", "part time"]
  },

  // ---------------------------------------------------------
  // CATEGORY 7: PROGRESSIVE DISCIPLINE (2.18)
  // ---------------------------------------------------------
  {
    id: "procedural_skip", s: "2.18", pg: 21, t: "Skipped Coaching Step", v: "grey", pri: 750,
    p: "The handbook requires 'Verbal Coaching' as Step 1.",
    d: "Unless it is Gross Misconduct, Section 2.18 mandates a sequence: 1. Verbal Coaching, 2. Written Guidance. Skipping to a write-up for a minor first-time issue is a procedural error.",
    b: "The coaching step is designed to be supportive, not punitive.",
    strategy: "Ask for procedural clarity: 'Since this is a first-time minor issue, can we follow the Verbal Coaching step outlined in Section 2.18?'",
    kw: ["first time", "no warning", "straight to write up", "procedural"],
    anti_kw: ["sleep", "theft", "abuse", "hit", "drunk"]
  },

  // ---------------------------------------------------------
  // CATEGORY 8: HARASSMENT & OPEN DOOR (1.8 / 6.2)
  // ---------------------------------------------------------
  {
    id: "harassment", s: "6.2", pg: 41, t: "Bullying & Retaliation", v: "wrong", pri: 900,
    p: "Retaliation and humiliation are strictly prohibited.",
    d: "Section 6.2 prohibits 'falsely reporting' or 'humiliating' team members. Supervisors are not exempt from the Code of Conduct.",
    b: "HHF maintains an Open Door Policy (Section 1.8) for these issues.",
    strategy: "Escalate via the Open Door Policy or call the Anonymous Complaint Line at 520-521-2222.",
    kw: ["bully", "harass", "retaliation", "humiliate", "target", "mean"],
    anti_kw: []
  }
];

const THEMES = {
  SUPERVISOR_WRONG: { 
    words: ["timer", "data", "clinical", "approved", "note", "doctor", "watched me", "didn't stop me", "sent home unpaid", "first time", "no coaching", "working lunch", "color", "brand"], 
    weight: 150 
  },
  THERAPIST_WRONG: { 
    words: ["instagram", "tiktok", "facebook", "scrolling", "personal", "ripped", "open-toe", "cleaning", "kitchen", "unassigned", "no note", "16 hours"], 
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
