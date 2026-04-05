var R = [
{
  id: "accommodations",
  s: "5.7 & 5.9",
  t: "Reasonable Accommodations & Medical Needs",
  v: "grey",
  p: "Items used for health, disability, or sensory protection (like hearing protection) fall under ADA accommodations, not standard dress code or tech bans.",
  po: "Section 5.9 states HHF will reasonably accommodate qualified individuals with a disability so they can perform essential functions.",
  d: "If you were using earphones/earplugs specifically as hearing protection during a tantrum and were told to remove them, the clinic must engage in the interactive accommodation process with HR rather than outright banning them as 'headphones'.",
  b: "If you haven't formally requested the accommodation through People Operations, or if the item poses a direct safety risk (like grabbable cords), the supervisor may have grounds to ask you to remove it until approved.",
  q: "\"Take those out of your ears\" -> If it's for hearing protection, HR needs to be involved.",
  kw: ["earphone", "earphones", "earplug", "earplugs", "hearing protection", "noise canceling", "noise cancelling", "headphones", "loop earplugs", "medical", "disability", "accommodation", "ada", "sensory overload"]
},
{
  id: "personal_phone_misuse",
  s: "2.0 & 6.5",
  t: "Personal phone use not tied to patient care can justify discipline",
  v: "correct",
  pri: 112,
  p: "If you were using your personal phone for non-clinical reasons while on duty or with a client, the supervisor may be correct to discipline you.",
  po: "Section 6.5 and Section 2.0 prohibit personal cellphone usage during work hours when it is not for direct patient care, and personal phone use while with a client is strictly prohibited.",
  d: "If the report accurately says you were texting, scrolling, shopping, using social media, or otherwise using your phone for personal reasons during work, the handbook supports corrective action.",
  b: "If the phone was being used for direct patient care, data, timing, Teams, or another legitimate clinical purpose, the discipline may still be wrong.",
  q: "\"I was on my phone for personal stuff in session\" -> The handbook does not protect personal phone use on duty.",
  kw: ["personal phone use", "personal reasons", "social media", "instagram", "facebook", "tiktok", "shopping", "texting my friend", "personal call", "facetime", "scrolling", "personal stuff", "snapchat", "watching youtube", "listening to music", "spotify", "podcast", "distracted", "not paying attention"]
},
{id:"phone",s:"2.0 & 6.5",t:"Phones ARE allowed for direct patient care",v:"wrong",
p:"The handbook only bans phone use that is NOT for patient care. Timers, reinforcers, data, and Teams = patient care = allowed.",
po:"Sections 2.0 & 6.5 ban personal phone use 'when not for direct patient care.' Clinical phone use during sessions is permitted under this exception.",
d:"If the phone was used for clinical work - timer, data, reinforcer, Teams - it's not a violation. The policy has a clear exception for direct patient care uses.",
b:"If the phone was used for genuinely personal stuff during a session - social media, personal texts, personal calls - the BCBA is correct to address it.",
q:"\"No phones, no exceptions\" -> The handbook literally has an exception: direct patient care.",
kw:["phone","cell","timer","reinforcer","music","teams","personal phone","cellphone","mobile","no phone","no device","phone out","phone present","phone during","using her phone","using his phone","using my phone","using their phone","put your phone","phone away","phone policy","personal device","saw your phone","phone on the floor","had your phone","caught me on my phone","told me put my phone","said i can't use my phone","wrote me up for my phone","got in trouble for my phone","she took my phone","he took my phone","they took my phone","phone was out","phone was present","observed.*phone","therapist.*phone","phone.*session","phone.*client","can't have your phone","no phones","not allowed.*phone","phone.*during","got written up.*phone","i was on my phone","my phone was","bcba saw my phone","bcba said.*phone","told me no phone","said no phone","phone.*timer","phone.*data","using.*phone.*for"]},
{id:"progressive",s:"2.18",t:"They MUST warn you verbally before writing you up",v:"wrong",
p:"The handbook requires steps in order: verbal coaching first -> written guidance -> final notice. Skipping steps is a policy violation by the BCBA.",
po:"Section 2.18: (1) Verbal Coaching - supportive, constructive. (2) Written Guidance. (3) Final Written Notice. (4) Separation. Each step before the next.",
d:"If you got a written warning, email documentation, or formal action without a verbal coaching conversation first, progressive discipline was violated. An email 'paper trail' IS written documentation no matter what they label it.",
b:"If the BCBA previously had a verbal conversation about this same issue and this is the next documented step for a repeat problem, the process may be correct.",
q:"\"I'm documenting this via email as a paper trail\" -> That IS a written warning. Calling it verbal doesn't make it verbal.",
kw:["write up","write-up","writeup","written up","written warning","warning","corrective","discipline","feedback","verbal","paper trail","documented","first time","first offense","action plan","impact","corrective action","formal","email serve","not an official","not a write","writing you up","gonna write","going to write","documenting","this serves as","i'm documenting","got written up","she wrote me up","he wrote me up","they wrote me up","received a write","received.*corrective","given.*warning","got a warning","first warning","never been warned","never got.*verbal","no verbal","skipped.*verbal","straight to written","got.*written.*without","never.*coached","my first","i was written up","been written up","being written up","wrote.*up for","gave me.*write","gave me.*warning","formal.*action","final.*warning","termination","fired.*first"]},
{id:"attendance",s:"2.15",t:"Attendance thresholds and Doctor's Notes",v:"grey",
p:"1-2 callouts = verbal only. 3 = written. Medical absences with a doctor's note = ONE occurrence no matter how many days.",
po:"Section 2.15: 16 hrs missed in 30 days = excessive. 1-2 callouts = verbal. 3 = written/term. 4+ = final/term. Medical with doc note = single occurrence.",
d:"If you have a doctor's note, those days only count as ONE occurrence. If the supervisor counted them separately (like 3 days = 3 occurrences), they violated HHF policy.",
b:"If you did not provide a doctor's note, each day can be counted as a separate occurrence. If you exceeded the thresholds without medical proof, the BCBA is correct.",
q:"\"3 days sick = 3 occurrences\" -> With a doctor's note, the handbook says ONE.",
kw:["absent","attendance","late","tardy","call out","callout","called out","no show","missed","sick","flu","didn't come","arrived late","showed up late","left early","tardiness","occurrence","doctor.*note","doctors note","medical.*absence"]},
{id:"equal",s:"2.0 & EEO",t:"All policies apply equally to BCBAs too",v:"grey",
p:"Same rules for everyone. If BCBAs enforce policies on you but don't follow them themselves, that's selective enforcement.",
po:"Section 2.0 applies to 'all team members.' EEO commits to equal treatment.",
d:"If BCBAs use phones for non-clinical stuff while writing you up for clinical phone use, that's inconsistent. Document every instance.",
b:"If policies are applied consistently to everyone - BCBAs included - the enforcement is fair even if strict.",
q:"\"We're supervisors, it's different\" -> The handbook doesn't create different rules for different roles.",
kw:["unfair","only rbt","only us","only me","bcba phone","double standard","selective","they don't follow","rules for me.*not them","why do they get","only enforcing.*on us"]},
{id:"overtime",s:"2.5",t:"They can't force overtime then blame you for it",v:"wrong",
p:"If they tell you to stay, that's approved overtime - you must be paid. They can't ask you to work then discipline you for the hours.",
po:"Section 2.5: Overtime must be pre-approved. But a supervisor directing you to stay = approval.",
d:"If a BCBA told you to stay, finish notes, or complete tasks past your shift - that's directed overtime. Must be paid. Can't be disciplined.",
b:"If you stayed late on your own without asking anyone, unapproved overtime can lead to discipline.",
kw:["stay late","overtime","finish your notes","stay after","work late","extra hours","after my shift","stayed late"]},
{id:"client_cancel",s:"2.10",t:"Client cancels - offer admin tasks first",v:"grey",
p:"If a client cancels, they should give you another client or admin work. They can't just send you home without options.",
po:"Section 2.10: Client cancels -> assigned another client or admin tasks.",
d:"If sent home without pay and not offered alternatives, the clinic broke its own policy.",
b:"If offered an alternative client or task and you refused, the BCBA is correct.",
kw:["cancel","cancellation","no client","sent home","lost hours","go home","client canceled","session canceled"]}
];

var RPT=[{n:"Any Supervisor",r:"Section 1.8"},{n:"HR",r:"hr@hhfamily.com"}];
var DYK=["iPads are never mentioned in the handbook","Discussing pay is a federal right","A doctor's note turns multiple sick days into ONE occurrence"];

const CLARIFICATIONS = [
  {
    id: "phone_context",
    triggers: ["phone", "music", "podcast", "earphones", "headphones", "spotify", "scrolling", "device"],
    q: "To give you the right policy, I need a quick detail. How exactly were you using your device/items?",
    opts: [
      { label: "For a clinical timer, data, or reinforcer", append: " I was using my phone strictly for direct patient care." },
      { label: "For an ADA/Medical accommodation", append: " I was using earphones specifically as a medical accommodation." },
      { label: "For personal entertainment or scrolling", append: " I was using my device for personal reasons, social media, and entertainment." }
    ]
  },
  {
    id: "attendance_context",
    triggers: ["sick", "missed work", "absent", "called out", "call out", "occurrence"],
    q: "Did you provide a doctor's note for the days you missed?",
    opts: [
      { label: "Yes, I brought a doctor's note", append: " I brought a doctor's note for the days I missed." },
      { label: "No, I did not have a note", append: " I did not have a doctor's note for my absence." }
    ]
  },
  {
    id: "overtime_context",
    triggers: ["stayed late", "after my shift", "overtime", "extra hours"],
    q: "Did your supervisor tell you to stay late, or did you stay on your own?",
    opts: [
      { label: "Supervisor told me to stay", append: " My supervisor directed me to stay late to finish work." },
      { label: "I stayed on my own", append: " I stayed late on my own without advance approval." }
    ]
  }
];
