// ==========================================
// data.js - HHF Handbook 2025-2027 Dictionary (v3.4 Final)
// ==========================================

var R = [
  // GATE 1: RED ZONE (Gross Misconduct)
  {
    id: "red_zone", s: "2.18 & 6.10", pg: 21, t: "Gross Misconduct & Safety", v: "correct", pri: 1000,
    p: "Gross Misconduct bypasses the progressive discipline ladder.",
    d: "Behaviors involving illegal activities, theft, violence, substance abuse, client neglect, or sleeping during session require immediate action. Section 2.18 explicitly states HHF can bypass the progressive process for these offenses.",
    b: "If you committed a severe safety or ethical violation, HHF reserves the right to terminate immediately.",
    strategy: "Take this seriously and accept the feedback. In these cases, receiving a verbal or written warning instead of immediate termination is considered lenient.",
    kw: ["sleep", "asleep", "steal", "theft", "drug", "alcohol", "drunk", "high", "hit", "abuse", "neglect", "violence", "weapon"],
    anti_kw: []
  },

  // GATE 2: GHOST RULES vs POLICY VIOLATIONS
  {
    id: "ghost_rule_dress", s: "2.16", pg: 18, t: "Appropriate Attire (Ghost Rule)", v: "wrong", pri: 700,
    p: "The handbook does NOT restrict scrub colors or specific shoe brands.",
    d: "Section 2.16 requires an HHF-branded shirt, but the policy is explicitly silent on the color of scrubs/pants and the brand of your sneakers. This is a supervisor's personal preference, not HHF policy.",
    b: "HHF allows 'reasonable self-expression' as long as it does not conflict with safety.",
    strategy: "Ask your supervisor: 'I reviewed Section 2.16 and couldn't find a restriction on this specific color/brand. Could you point me to the policy so I can ensure I am in full compliance?'",
    kw: ["blue", "black", "pink", "color", "brand", "nike", "figs", "hoka", "scrubs", "scrub", "sneaker", "shoe color"],
    anti_kw: ["ripped", "open-toe", "crocs", "slipper", "hoodie", "drawstring", "graphic", "dangling"]
  },
  {
    id: "dress_violation", s: "2.16", pg: 19, t: "Dress Code Violation", v: "correct", pri: 800,
    p: "The handbook explicitly prohibits this specific attire.",
    d: "Section 2.16 strictly prohibits ripped jeans, open-toed shoes, slippers, crop tops, graphic tees, hoodies with drawstrings, and dangling jewelry for safety and professional reasons.",
    b: "If you were wearing an item on the prohibited list, or failed to wear your HHF-branded top, the supervisor is enforcing a legitimate policy.",
    strategy: "Acknowledge the oversight, ensure you have the required HHF-branded tops, and adhere to the safety guidelines regarding jewelry and footwear moving forward.",
    kw: ["ripped", "open-toe", "crocs", "slipper", "hoodie", "drawstring", "graphic", "dangling", "lanyard", "crop top", "flip-flops"],
    anti_kw: []
  },
  {
    id: "device_clinical", s: "6.5", pg: 43, t: "Clinical Device Exception", v: "wrong", pri: 750,
    p: "Clinical device use is protected under Section 6.5.",
    d: "The handbook prohibits personal use, but explicitly protects device usage for 'direct patient care'. This includes timers, data collection, and client reinforcers.",
    b: "If personal apps were open simultaneously, the supervisor may still enforce the ban.",
    strategy: "Highlight the exception: 'I was using the device specifically for a clinical timer/data as permitted by Section 6.5 for direct patient care.'",
    kw: ["timer", "data", "teams", "clock", "music", "youtube", "reward", "clinical device", "ipad timer"],
    anti_kw: ["texting", "social media", "netflix"]
  },
  {
    id: "device_personal", s: "6.5", pg: 43, t: "Personal Device Misuse", v: "correct", pri: 800,
    p: "Personal device use during a session is a severe safety violation.",
    d: "Section 6.5 states that cell phone usage when with a client is 'strictly prohibited' and detrimental to the safety and quality of care for our clients.",
    b: "Even taking a quick personal text takes your eyes off a potentially vulnerable client.",
    strategy: "Do not make excuses. Acknowledge the distraction and cite your commitment to the safety standards outlined in Section 6.5 moving forward.",
    kw: ["scrolling", "social media", "instagram", "tiktok", "facebook", "texting", "personal text", "netflix"],
    anti_kw: ["timer", "data", "reinforcer"]
  },

  // GATE 3: PROCEDURAL LADDER & ADMIN/LABOR RULES
  {
    id: "permitted_work", s: "2.4", pg: 12, t: "Compensated Time (FLSA)", v: "wrong", pri: 950,
    p: "If a supervisor permits you to work, they MUST pay you for that time.",
    d: "Section 2.4 states that all hours worked must be compensated. Under Labor Law ('Suffer or Permit'), if a supervisor witnesses you performing work and does not stop you, the company is legally required to pay for that time.",
    b: "While you should have asked for an assignment per Section 2.10, the supervisor's silence constitutes 'permission' to work in the eyes of the law.",
    strategy: "If pay is threatened, escalate immediately: 'Section 2.4 and FLSA standards require compensation for all work performed. Since the work was performed in the presence of a supervisor who did not intervene, I am requesting that this time be approved as required by law.'",
    kw: ["watched me", "saw me", "didn't say anything", "let me clean", "stood there", "witnessed", "didn't stop me", "permitted"],
    anti_kw: ["stopped me", "told me to stop", "intervened"]
  },
  {
    id: "unassigned_tasks", s: "2.10", pg: 14, t: "Self-Assigned Admin Tasks", v: "correct", pri: 850,
    p: "Administrative tasks and cleaning must be explicitly assigned by a leader.",
    d: "Section 2.10 outlines that admin tasks are provided to maintain hours, but they must be 'assigned by the BCBA or clinic leader.' You cannot self-assign chores to claim admin pay.",
    b: "A supervisor verbally stopping you from unapproved tasks is a standard operational correction, not formal discipline.",
    strategy: "Accept the correction gracefully: 'Understood. Are there any approved admin tasks or materials you would like me to work on instead?'",
    kw: ["cleaning", "kitchen", "sweep", "chore", "unassigned", "floor", "clean", "dishes"],
    anti_kw: ["watched me", "didn't stop me"]
  },
  {
    id: "procedural", s: "2.18", pg: 21, t: "Progressive Discipline Steps", v: "grey", pri: 600,
    p: "Supervisors must provide 'Verbal Coaching' before a written warning.",
    d: "For standard performance issues, Section 2.18 mandates a specific sequence: 1. Verbal Coaching, 2. Written Guidance, 3. Final Written Notice. Skipping straight to a write-up for a first-time minor issue is a procedural error.",
    b: "Gross misconduct (safety risks, harassment) allows the company to bypass this stage entirely.",
    strategy: "Ask for clarification: 'Since this is a first-time issue, I wanted to ask why the Verbal Coaching step outlined in Section 2.18 was bypassed? I value the supportive feedback phase.'",
    kw: ["write up", "written warning", "coaching", "first time", "email warning", "final notice"],
    anti_kw: ["cleaning", "kitchen", "chore", "floor", "stopped me"]
  },

  // HANDBOOK SPECIFICS
  {
    id: "breaks", s: "2.3", pg: 12, t: "Meals and Rest Breaks", v: "wrong", pri: 650,
    p: "Unpaid meal breaks must be completely free of work duties.",
    d: "Section 2.3 mandates a 30-minute unpaid break for shifts 6+ hours. During this time, you must be 'completely relieved of all work duties.' Doing session notes during lunch is prohibited.",
    b: "If you are required to perform ANY work during this break, you must be compensated for it.",
    strategy: "Inform the supervisor: 'Under Section 2.3, I must be completely relieved of work duties during my unpaid break. If I need to complete notes now, how should I log this compensated time?'",
    kw: ["lunch", "break", "eat", "meal", "working lunch", "notes during lunch"],
    anti_kw: []
  },
  {
    id: "attendance_excessive", s: "2.15", pg: 17, t: "Excessive Absenteeism", v: "correct", pri: 500,
    p: "Missing 16 hours in 30 days triggers performance management.",
    d: "Section 2.15 defines excessive absenteeism as missing 16 hours of scheduled work within a 30-day period.",
    b: "During the first 30 days this is observed, the leader MUST partner with you to address barriers before moving to formal discipline.",
    strategy: "If you are within the 16-hour limit, ask to review the hours. If you are over, focus on creating the required 'partnership plan' with your leader to overcome barriers.",
    kw: ["late", "tardy", "call out", "absent", "missed shift", "16 hours"],
    anti_kw: ["doctor", "note"]
  },
  {
    id: "attendance_note", s: "2.15", pg: 17, t: "Medical Absences & Notes", v: "wrong", pri: 550,
    p: "Consecutive medical absences with a note count as ONE occurrence.",
    d: "Section 2.15 states that an unexcused absence due to illness counts as a single occurrence, regardless of the number of consecutive days, provided a note is given (max 2 per month).",
    b: "Without a medical note, every missed shift is logged individually.",
    strategy: "If 3 consecutive sick days were counted as 3 separate hits, provide your doctor's note and respectfully ask them to consolidate it as a single medical event per Section 2.15.",
    kw: ["doctor", "note", "consecutive", "flu", "sick days"],
    anti_kw: []
  },
  {
    id: "cancellation", s: "2.10", pg: 14, t: "Client Cancellation Policy", v: "grey", pri: 500,
    p: "Full-time staff are prioritized for admin tasks; you cannot decline clients.",
    d: "Section 2.10 states that full-time staff (30+ hours) will be assigned another client or admin tasks. However, team members are 'not allowed to decline clients'.",
    b: "If you refuse a fill-in client, you will face unapproved absence discipline.",
    strategy: "If told to go home unpaid, politely remind them of your FT status: 'As a full-time employee, Section 2.10 prioritizes me for admin tasks. Are there any available to maintain my hours?'",
    kw: ["cancel", "cancellation", "admin", "go home unpaid", "fill in", "refuse client"],
    anti_kw: ["cleaning", "kitchen", "chore", "sweep", "floor"]
  },
  {
    id: "harassment", s: "6.2", pg: 41, t: "Anti-Bullying & Retaliation", v: "wrong", pri: 900,
    p: "False discipline and humiliation are prohibited handbook violations.",
    d: "Section 6.2 prohibits 'falsely reporting team members for discipline' and 'constantly putting team members down in meetings through humiliation'.",
    b: "Supervisors are held to the same Code of Conduct as RBTs.",
    strategy: "Do not engage in an argument. Document the dates/times and escalate via the Section 1.8 Open Door Policy or call the Anonymous Complaint Line at 520-521-2222.",
    kw: ["bully", "harass", "retaliation", "humiliate", "target", "unfairly", "false discipline"],
    anti_kw: []
  }
];

const THEMES = {
  SUPERVISOR_WRONG: { words: ["timer", "data", "teams", "note", "doctor", "clinical", "approved", "first time", "reinforcer", "lunch", "break", "watched me", "didn't stop me"], weight: 125 },
  THERAPIST_WRONG: { words: ["instagram", "tiktok", "facebook", "scrolling", "social media", "personal", "netflix", "sleep", "theft", "drug", "ripped", "open-toe", "cleaning", "kitchen", "dishes", "unassigned"], weight: 125 }
};

const CLARIFICATIONS = [
  {
    id: "phone_context",
    triggers: ["phone", "device", "tablet", "ipad"],
    q: "How exactly was the device being used?",
    opts: [
      { label: "Clinical (Timer, Data, or Client Reinforcer)", append: " I was using the device for a clinical timer." },
      { label: "Personal (Social Media, Texts, or Music)", append: " I was using the device for personal texting." }
    ]
  },
  {
    id: "dress_context",
    triggers: ["scrub", "shirt", "pants", "shoes", "sneaker", "dress"],
    q: "What specifically were you warned about regarding your attire?",
    opts: [
      { label: "A specific color or shoe brand", append: " I was told my specific color or brand was wrong." },
      { label: "A prohibited item (ripped, open-toe, no HHF shirt)", append: " I was wearing a ripped item or open-toe shoes." }
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
