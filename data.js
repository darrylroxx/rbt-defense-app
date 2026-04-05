// AI-Optimized Rule Set (No keywords needed)
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
  q: "\"Take those out of your ears\" -> If it's for hearing protection, HR needs to be involved."
},
{
  id:"phone",s:"2.0 & 6.5",t:"Phones ARE allowed for direct patient care",v:"wrong",
  p:"The handbook only bans phone use that is NOT for patient care. Timers, reinforcers, data, and Teams = patient care = allowed.",
  po:"Sections 2.0 & 6.5 ban personal phone use 'when not for direct patient care.' Clinical phone use during sessions is permitted under this exception.",
  d:"If the phone was used for clinical work - timer, data, reinforcer, Teams - it's not a violation. The policy has a clear exception for direct patient care uses.",
  b:"If the phone was used for genuinely personal stuff during a session - social media, personal texts, personal calls - the BCBA is correct to address it.",
  q:"\"No phones, no exceptions\" -> The handbook literally has an exception: direct patient care."
},
{
  id:"ipad",s:"Not in Handbook",t:"iPad requirement does NOT exist in the handbook",v:"wrong",
  p:"The word iPad never appears in the HHF handbook. Not once. The iPad-only rule is a clinic preference, not company policy.",
  po:"Section 2.22 mentions 'tablet, laptops, company phone' generally. No section mandates iPad use for clinical work or data collection.",
  d:"You can't be disciplined for not having an iPad because the handbook never requires one. If you used your phone as a backup clinical tool, you adapted responsibly.",
  b:"If the BCBA recommends iPad use as best practice without disciplining you, that's acceptable guidance - not a violation.",
  q:"\"Your iPad should be charged\" -> The handbook never mentions iPads. This is a clinic preference, not policy."
},
{
  id:"progressive",s:"2.18",t:"They MUST warn you verbally before writing you up",v:"wrong",
  p:"The handbook requires steps in order: verbal coaching first -> written guidance -> final notice. Skipping steps is a policy violation by the BCBA.",
  po:"Section 2.18: (1) Verbal Coaching - supportive, constructive. (2) Written Guidance. (3) Final Written Notice. (4) Separation. Each step before the next.",
  d:"If you got a written warning, email documentation, or formal action without a verbal coaching conversation first, progressive discipline was violated. An email 'paper trail' IS written documentation no matter what they label it.",
  b:"If the BCBA previously had a verbal conversation about this same issue and this is the next documented step for a repeat problem, the process may be correct.",
  q:"\"I'm documenting this via email as a paper trail\" -> That IS a written warning. Calling it verbal doesn't make it verbal."
},
{
  id:"false_report",s:"6.2",t:"Falsely reporting you is prohibited bullying",v:"wrong",
  p:"If your write-up contains false information, the BCBA violated anti-bullying policy - not you. False discipline reports are explicitly banned.",
  po:"Section 6.2 prohibits 'falsely reporting team members for discipline,' 'deliberately sabotaging team members,' and 'all written and verbal intimidation.'",
  d:"If any facts in your write-up are wrong, exaggerated, or twisted to look worse than what happened, that's a policy violation by the BCBA.",
  b:"If the facts are accurate - even if you disagree with the punishment - the documentation itself isn't false reporting.",
  q:""
},
{
  id:"inaccurate_doc",s:"2.0",t:"Inaccurate write-ups violate the Code of Conduct",v:"wrong",
  p:"Putting wrong info in a write-up is a code of conduct violation - by the BCBA, not you. Their own handbook says so.",
  po:"Section 2.0 bans 'providing knowingly inaccurate, incomplete, or misleading information in employment-related documents.' Write-ups are employment documents.",
  d:"If the BCBA knew you were doing your job but framed it as a violation, the write-up is misleading. Their own words may contradict the discipline.",
  b:"If the write-up accurately describes what was observed, the documentation is valid even if you disagree with the conclusion.",
  q:""
},
{
  id:"decline_sign",s:"2.18",t:"You can ALWAYS refuse to sign a write-up",v:"wrong",
  p:"Never let anyone pressure you. Declining to sign is your right - the handbook says so explicitly.",
  po:"Section 2.18: 'Team members may decline to sign corrective action notices.' A supervisor and witness note the refusal. The document stands but signing is optional.",
  d:"No penalty for refusing to sign. No one can force you. No consequences for declining. This is always your right.",
  b:"The write-up still goes in your file unsigned. Declining doesn't erase it - but it preserves your right to contest it later.",
  q:"\"You need to sign this\" -> No you don't. Section 2.18. Always your right to decline."
},
{
  id:"open_door",s:"1.8",t:"You can go above your BCBA to any leader",v:"wrong",
  p:"Your BCBA can't stop you from escalating. You have the right to talk to ANY leader - including senior leadership.",
  po:"Section 1.8: 'All Team Members have the right to, and are encouraged to, speak to leaders about their job-related concerns.' Entire management team committed to resolving concerns.",
  d:"If your BCBA isn't helping or IS the problem, go above them. Clinical director, HR, senior leadership - all open to you.",
  b:"The handbook suggests starting with your direct supervisor. Going above is your right but try the direct route first when safe.",
  q:""
},
{
  id:"equal",s:"2.0 & EEO",t:"All policies apply equally to BCBAs too",v:"grey",
  p:"Same rules for everyone. If BCBAs enforce policies on you but don't follow them themselves, that's selective enforcement.",
  po:"Section 2.0 applies to 'all team members.' EEO commits to equal treatment. No section creates different rules for BCBAs vs RBTs.",
  d:"If BCBAs use phones for non-clinical stuff while writing you up for clinical phone use, that's inconsistent. Document every instance.",
  b:"If policies are applied consistently to everyone - BCBAs included - the enforcement is fair even if strict.",
  q:"\"We're supervisors, it's different\" -> The handbook doesn't create different rules for different roles."
},
{
  id:"attendance",s:"2.15",t:"Attendance has specific thresholds - check the numbers",v:"grey",
  p:"1-2 callouts = verbal only. 3 = written. Medical absences with a doctor's note = ONE occurrence no matter how many days.",
  po:"Section 2.15: 16 hrs missed in 30 days = excessive. 1-2 callouts = verbal. 3 = written/term. 4+ = final/term. Medical with doc note = single occurrence.",
  d:"If written up without reaching these thresholds, discipline is premature. Multi-day illness with a note counts as ONE occurrence, not multiple.",
  b:"If you exceeded thresholds or didn't provide documentation for medical absences, the BCBA is within policy.",
  q:"\"3 days sick = 3 occurrences\" -> With a doctor's note, the handbook says ONE."
},
{
  id:"overtime",s:"2.5",t:"They can't force overtime then blame you for it",v:"wrong",
  p:"If they tell you to stay, that's approved overtime - you must be paid. They can't ask you to work then discipline you for the hours.",
  po:"Section 2.5: Overtime must be pre-approved. But a supervisor directing you to stay = approval. Section 2.4 bans off-the-clock work.",
  d:"If a BCBA told you to stay, finish notes, or complete tasks past your shift - that's directed overtime. Must be paid. Can't be disciplined.",
  b:"If you stayed late on your own without asking anyone, unapproved overtime can lead to discipline. Always get approval first.",
  q:"\"Finish your notes before you leave\" -> Past your shift? That needs overtime approval and must be paid."
},
{
  id:"breaks",s:"2.3",t:"They CANNOT make you work during your break",v:"wrong",
  p:"Your 30-minute break = zero work. If they ask you to do ANYTHING, you must be paid for that time. It's not a break anymore.",
  po:"Section 2.3: 'Team members must be completely relieved of all work duties.' If work is performed during break, time must be compensated.",
  d:"If you watched a client, answered messages, took notes, cleaned, or did ANY task during your break - that's not a break and you're owed pay.",
  b:"If you voluntarily worked during break unasked, or didn't return on time, the BCBA can address that.",
  q:"\"Can you just watch this kid during lunch real quick?\" -> Not a break. You get paid for that."
},
{
  id:"nlra",s:"NLRA - Page 11",t:"Discussing pay and conditions is a LEGAL RIGHT",v:"wrong",
  p:"Federal law protects talking about wages and working conditions with coworkers. NO company policy overrides this. Ever.",
  po:"Page 11: 'Nothing in this policy is intended to limit your rights under the National Labor Relations Act.' NLRA protects discussing wages, benefits, conditions.",
  d:"If warned or disciplined for discussing pay, working conditions, or organizing - that violates federal law regardless of any clinic policy.",
  b:"There is NO scenario where the BCBA is correct on this. NLRA rights cannot be overridden. Period.",
  q:"\"Don't talk about pay at work\" -> Federal law says you can. Always. Non-negotiable."
},
{
  id:"whistleblower",s:"6.3",t:"You're protected from retaliation for reporting",v:"wrong",
  p:"If you reported a concern and then got punished - that may be illegal retaliation. The handbook and the law protect you.",
  po:"Section 6.3: Whistleblowers protected from 'termination, compensation decreases, poor work assignments and threats.' Applies even if report doesn't lead to findings.",
  d:"If discipline followed after you reported concerns or participated in organizing, document the timeline. The connection may be retaliation.",
  b:"If the discipline is based on documented issues predating your report, the timing may be coincidental.",
  q:""
},
{
  id:"bullying",s:"6.2",t:"Humiliation and intimidation are PROHIBITED",v:"wrong",
  p:"Public shaming, exclusion, sabotage, intimidation, yelling - all banned by the handbook. BCBAs are not exempt.",
  po:"Section 6.2 bans: humiliation in meetings, deliberate exclusion, sabotaging team members, written/verbal intimidation, undermining authority, retaliation.",
  d:"If a BCBA's behavior crosses from professional feedback into personal attacks, public shaming, or intimidation - they violated anti-bullying policy.",
  b:"Professional feedback delivered privately and respectfully - even if critical or uncomfortable - is appropriate supervision, not bullying.",
  q:""
},
{
  id:"client_cancel",s:"2.10",t:"Client cancels - you should get admin tasks, not sent home",v:"grey",
  p:"If a client cancels, they should give you another client or admin work. They can't just send you home without options. But you can't decline clients either.",
  po:"Section 2.10: Client cancels -> assigned another client or admin tasks. Can't decline clients. Home cancellations require reporting to clinic.",
  d:"If sent home without pay and not offered alternatives, the clinic broke its own policy. They commit to supporting your scheduled hours.",
  b:"If offered an alternative client or task and you refused, or didn't report to clinic after a home cancellation - the BCBA is correct.",
  q:"\"Your client canceled, just go home\" -> Handbook says offer admin tasks or another client first."
},
{
  id:"admin_permission",s:"2.10 & 2.4",t:"BCBAs can't gatekeep basic clinic tasks from you",v:"grey",
  p:"If you're doing admin work like cleaning, organizing, or clinic maintenance - that's work and you should be compensated. BCBAs requiring permission for basic tasks is micromanagement, not policy.",
  po:"Section 2.10 says admin tasks are assigned when clients cancel. Section 2.4 requires all work to be compensated. The handbook doesn't require BCBA permission for routine clinic maintenance.",
  d:"The handbook says BCBAs assign admin tasks during cancellations. It does NOT say you need BCBA permission for every routine task like cleaning, dishes, or organizing. If you're doing work, you log the time. If they're blocking you from logging admin time for work you performed, that may violate the off-the-clock policy.",
  b:"If the BCBA is trying to ensure you're prioritizing client work over cleaning, and clients are available, they may have a point about task priorities. If they're organizing workflow for the clinic, that's within their supervisory role.",
  q:"\"Ask me before you go clean\" -> The handbook doesn't require permission for routine clinic tasks. If you work, you get paid."
},
{
  id:"dress",s:"2.16",t:"Dress code - what's actually required vs what's not",v:"grey",
  p:"HHF shirts required. Closed-toe shoes. No grabbable jewelry. But self-expression is allowed and accommodations available through HR.",
  po:"Section 2.16: HHF branded shirts, closed-toe shoes, no grabbable jewelry, hair away from face. Accommodations through hr@hhfamily.com.",
  d:"If written up for something not specifically listed, or you weren't given enough company shirts, discipline may be unwarranted.",
  b:"If wearing something specifically prohibited - open-toed shoes, dangling earrings, non-HHF shirt - the BCBA is correct.",
  q:""
},
{
  id:"time_track",s:"2.4 & 2.6",t:"You must be PAID for all work you do",v:"grey",
  p:"Log time same day in Central Reach. But the flip side - if they make you work, they MUST pay you. Off-the-clock work is banned.",
  po:"Sections 2.4/2.6: Log in Central Reach same day. Off-the-clock work prohibited. All work must be compensated.",
  d:"If asked to do tasks - notes, cleaning, meetings, prep - without being allowed to log it, that violates the off-the-clock rule. You must be paid.",
  b:"If you consistently forgot to log time despite clear reminders, the BCBA can address that pattern.",
  q:"\"Do this before you log out\" -> If it's work, it gets logged and paid. Period."
},
{
  id:"policy_claim",s:"General",t:"\"That's policy\" - ask them which section",v:"grey",
  p:"When someone says 'that's policy' without citing a specific section, they might be enforcing a clinic preference as if it's company-wide policy. Ask for the section number.",
  po:"The HHF Handbook is the official source. Clinic rules exist but don't carry the same weight. Only handbook policies are conditions of employment.",
  d:"If a BCBA can't tell you which section of the handbook their rule comes from, it may not exist as official policy. Document it and verify independently.",
  b:"Some clinic rules are legitimate even if not in the handbook - like scheduling procedures. But they shouldn't be called 'HHF policy' if they're not.",
  q:"\"That's policy\" -> Which section? If it's real, they can cite it."
},
{
  id:"kids_guilt",s:"Industry Context",t:"Caring about kids AND wanting fair pay = same fight",v:"wrong",
  p:"\"Be here for the kids not the money\" is a guilt tactic. Fair pay reduces turnover -> better care for kids. They're not opposites.",
  po:"ABA industry: 65% median turnover. RBTs generate majority of revenue. Low pay drives turnover. High turnover disrupts kids. Fair pay IS a clinical quality issue.",
  d:"You CAN care about kids and deserve a living wage. Companies that pay fairly keep staff. Kids get consistency. Everyone wins.",
  b:"There is no scenario where guilt-tripping about children justifies suppressing fair pay. This is always manipulative.",
  q:"\"Be here for the kids, not the money\" -> We ARE here for the kids. That's why we want to STAY. Can't stay if we can't pay rent."
},
{
  id:"weapons",s:"2.0 & 6.11",t:"Weapons on HHF property are prohibited",v:"correct",
  p:"If you brought a gun, firearm, knife, explosive, or other weapon onto HHF property, the supervisor is correct to treat that as a serious policy violation.",
  po:"Section 6.11 prohibits carrying a handgun, firearm, or weapon of any kind on HHF property, licensed or not. Section 2.0 also lists firearms, weapons, and explosive devices as prohibited dangerous materials.",
  d:"If the write-up is accurate and the weapon was on HHF property, this is not protected conduct. The handbook allows immediate action for serious conduct issues like this.",
  b:"If the report is factually wrong, the item was not actually a weapon, or it was not on HHF property, you can challenge the accuracy. The handbook exception is limited to on-duty law enforcement or written executive approval.",
  q:"\"I brought a gun into work\" -> The handbook bans weapons on HHF property, licensed or not."
},
{
  id:"violence",s:"2.0, 6.10 & 2.18",t:"Violence, threats, and fighting are zero-tolerance issues",v:"correct",
  p:"If you threatened someone, fought at work, or engaged in violent or intimidating behavior, the supervisor is correct to take immediate action.",
  po:"Section 6.10 has a zero-tolerance policy for violence or threatening behavior. Section 2.0 lists fighting and harassment as conduct violations. Section 2.18 allows immediate action for violence.",
  d:"If the report accurately describes threats, fighting, stalking, intimidation, or aggressive behavior, the handbook does not treat that as protected conduct.",
  b:"If the report exaggerates what happened, leaves out context, or labels ordinary disagreement as a threat, you can challenge the facts and wording.",
  q:"\"I threatened them\" -> The handbook treats threats and violence as immediate-action issues."
},
{
  id:"substances",s:"2.0, 6.13 & 2.18",t:"Drugs, alcohol, and intoxication at work are serious violations",v:"correct",
  p:"If you used, brought, sold, or were under the influence of drugs or alcohol at work or in session, the supervisor is correct to treat that as a serious handbook violation.",
  po:"Section 6.13 commits HHF to eliminating drug and alcohol use and abuse in the workplace. Section 2.0 lists illegal drugs and being under the influence on HHF property or in client sessions as conduct violations. Section 2.18 allows immediate action for substance abuse.",
  d:"If the report is accurate, this is not a grey area under the handbook. Substance-related conduct can bypass the normal progressive process.",
  b:"If the substance was prescribed medication used appropriately, or the accusation is false, the facts matter and should be clarified immediately.",
  q:"\"I was high/drunk at work\" -> The handbook treats this as a serious policy violation."
},
{
  id:"hipaa",s:"6.19",t:"Sharing PHI or violating HIPAA can justify discipline",v:"correct",
  p:"If you shared client-identifying information, photos, videos, charts, logs, or other PHI without authorization, the supervisor is correct to treat that as a serious privacy violation.",
  po:"Section 6.19 requires all team members to follow HIPAA and protect PHI. Team members are only allowed access to PHI needed for their jobs and are subject to discipline for violating HHF privacy policies and procedures.",
  d:"If the report accurately says you disclosed PHI, sent identifying client information, or shared unauthorized client media, the handbook supports discipline.",
  b:"If nothing identifying was disclosed, consent existed, or the report is inaccurate about what was shared, the exact facts matter.",
  q:"\"I shared client info/photos\" -> The handbook treats unauthorized PHI disclosure as disciplinable."
},
{
  id:"confidentiality",s:"2.0 & 6.20",t:"Sharing HHF confidential information can violate policy",v:"correct",
  p:"If you shared confidential HHF information that is not protected concerted activity, the supervisor may be correct that you violated the handbook.",
  po:"Section 6.20 prohibits sharing private and confidential HHF matters such as client lists, referral relationships, medical records, protocols, treatment plans, billing information, and vendor or contract terms. Section 2.0 also prohibits disclosing trade secrets and confidential information.",
  d:"If the write-up is about disclosing confidential client, billing, operational, or proprietary HHF information, that can be a real handbook violation.",
  b:"This does not override protected rights like discussing your own wages or workplace conditions under the NLRA. The exact content shared matters.",
  q:"\"I shared confidential HHF info\" -> Some disclosures are handbook violations, but wage discussion is still protected."
},
{
  id:"time_fraud",s:"2.0 & 2.4",t:"Falsifying time or working unauthorized hours can justify discipline",v:"correct",
  p:"If you falsified hours, altered time records, or knowingly worked unauthorized time, the supervisor may be correct to discipline you.",
  po:"Section 2.0 lists inaccurate reporting of hours worked as a conduct violation. Section 2.4 says falsifying time entries, working off the clock, or manipulating time records can lead to discipline up to termination.",
  d:"If the report accurately says you changed time records, logged time you did not work, or knowingly worked unauthorized hours, the handbook supports discipline.",
  b:"If you were instructed to work, your time entry was accurate, or the issue is really denial of pay for work performed, the supervisor may be wrong instead.",
  q:"\"I changed my time / clocked hours I didn't work\" -> The handbook treats that as a serious violation."
},
{
  id:"insubordination",s:"2.0",t:"Refusing required directions or tasks can justify discipline",v:"correct",
  p:"If you refused a lawful work direction or required job task, the supervisor may be correct that you violated the handbook.",
  po:"Section 2.0 lists refusal or failure to follow directions or to perform a requested or required job task as a conduct violation.",
  d:"If the report accurately says you flatly refused a required task, ignored directions, or would not perform assigned work, the handbook supports discipline.",
  b:"If the instruction was unsafe, illegal, retaliatory, outside policy, or impossible without violating another rule, the situation may be more complicated.",
  q:"\"I refused to do it\" -> The handbook can treat refusal to follow required directions as a violation."
},
{
  id:"unsafe",s:"2.0 & 6.8",t:"Unsafe conduct and safety-rule violations can justify discipline",v:"correct",
  p:"If you ignored safety rules or created an unsafe situation for clients or staff, the supervisor may be correct to discipline you.",
  po:"Section 6.8 requires team members to follow safety practices and report unsafe conditions. Section 2.0 lists refusal or failure to follow safety rules and procedures as a conduct violation.",
  d:"If the report accurately describes unsafe conduct, failure to follow safety procedures, or behavior that put others at risk, the handbook supports corrective action.",
  b:"If the accusation is vague, the rule was never communicated, or the safety claim is being used as a pretext, the details matter.",
  q:"\"I didn't follow the safety rule\" -> The handbook treats safety noncompliance as disciplinable."
},
{
  id:"theft",s:"2.0",t:"Stealing or destroying HHF property can justify discipline",v:"correct",
  p:"If you stole, damaged, or destroyed HHF property, the supervisor is correct to treat that as a serious handbook violation.",
  po:"Section 2.0 lists stealing or destroying HHF property as a conduct violation and allows discipline up to termination.",
  d:"If the report accurately says you took or damaged HHF property, this is not protected conduct under the handbook.",
  b:"If the accusation is false, the property was yours, or the damage was accidental and mischaracterized, the facts should be challenged directly.",
  q:"\"I took/damaged company property\" -> The handbook treats theft and destruction of property as misconduct."
},
{
  id:"obscene_lang",s:"2.0 & 6.2",t:"Obscene, harassing, or abusive language can justify discipline",v:"correct",
  p:"If you used obscene, abusive, or harassing language at work, the supervisor may be correct to discipline you.",
  po:"Section 2.0 lists obscene or harassing language as a conduct violation. Section 6.2 also prohibits offensive written or verbal abuse and other harassing conduct.",
  d:"If the report accurately describes abusive, degrading, or harassing language, the handbook supports corrective action.",
  b:"If the accusation is vague or strips out context, tone, or who started the exchange, the exact wording matters.",
  q:"\"I cursed them out / used abusive language\" -> The handbook can treat that as a conduct violation."
},
{
  id:"smoking",s:"6.12",t:"Smoking, vaping, and tobacco products on HHF property can justify discipline",v:"correct",
  p:"If you smoked, vaped, or carried tobacco or vaping devices on HHF property in violation of policy, the supervisor may be correct to discipline you.",
  po:"Section 6.12 prohibits smoking and vaping on HHF property, including adjoining property within direct line of sight, and says smoking/vaping devices and tobacco products must be stored in a locked, secure location outside the clinic.",
  d:"If the report accurately says you were smoking, vaping, or carrying prohibited tobacco/vape items on HHF property, the handbook supports corrective action.",
  b:"If you were off HHF property and out of sight of the clinic, or the accusation is inaccurate about where the device was, the facts matter.",
  q:"\"I vaped at work / had my vape in clinic\" -> The handbook restricts vaping and tobacco products on HHF property."
},
{
  id:"photo_video",s:"2.21 & 6.19",t:"Unauthorized photos, videos, or posts can violate policy",v:"correct",
  p:"If you took, posted, or shared unauthorized photos or videos from the clinic or of clients, the supervisor may be correct to discipline you.",
  po:"Section 2.21 requires prior consent for individuals appearing in photos or videos and says client photos or videos, or anything revealing PHI, need prior approval to ensure HIPAA compliance.",
  d:"If the report accurately says you took or posted unauthorized clinic or client media, the handbook supports discipline.",
  b:"If consent and required approvals were in place, or the media did not identify anyone, the exact facts matter.",
  q:"\"I posted clinic/client photos\" -> Consent and HIPAA compliance matter under the handbook."
},
{
  id:"client_family_phone",s:"6.5",t:"Private texting or calling client families from your personal phone can violate policy",v:"correct",
  p:"If you used your personal phone to text or call a client's family privately, the supervisor may be correct to discipline you.",
  po:"Section 6.5 says employees are prohibited from sharing personal phone numbers or engaging in private communication via text messages or phone calls using a personal phone with client families.",
  d:"If the report accurately says you texted or called a client's family from your personal phone, the handbook supports corrective action.",
  b:"If the communication was not with a client family, the number was not personal, or the accusation misstates what happened, the details matter.",
  q:"\"I texted the parent from my personal phone\" -> The handbook prohibits private communication with client families using a personal phone."
},
{
  id:"driving_device",s:"2.20",t:"Texting or using devices while driving for work can justify discipline",v:"correct",
  p:"If you were texting, checking messages, or using a device while driving for work, the supervisor may be correct to discipline you.",
  po:"Section 2.20 says team members must refrain from reading or sending text messages, accessing records on a digital device, or checking team messages while driving, and should use hands-free operations or safely pull over.",
  d:"If the report accurately says you used a device while driving during work, the handbook supports corrective action.",
  b:"If you were safely pulled over, using hands-free appropriately, or not driving for work at the time, the exact facts matter.",
  q:"\"I checked messages while driving\" -> The handbook tells team members not to text or access records while driving."
},
{
  id:"child_abuse",s:"2.28",t:"Abuse or neglect of a child is a zero-tolerance violation",v:"correct",
  p:"If you physically, sexually, or mentally abused or neglected a child, the supervisor is correct to treat that as a severe violation and the conduct may also be unlawful.",
  po:"Section 2.28 says HHF maintains zero tolerance against child abuse and neglect, and it is against the law and against HHF policy for employees to physically, sexually, or mentally abuse or neglect any child.",
  d:"If the report accurately describes abuse, neglect, maltreatment, or coercive sexual conduct involving a child, this is not protected conduct and may require immediate reporting.",
  b:"If the accusation is false or mischaracterizes appropriate clinical handling, the factual details and any witness evidence are critical.",
  q:"\"I abused / neglected a child\" -> The handbook treats that as zero-tolerance conduct."
},
{
  id:"social_media",s:"2.0, 6.4 & 2.21",t:"Malicious or unauthorized social media content can violate policy",v:"correct",
  p:"If you posted malicious, threatening, obscene, intimidating, or unauthorized work-related content on social media, the supervisor may be correct to discipline you.",
  po:"Section 6.4 prohibits statements, photos, video, or audio that could reasonably be viewed as malicious, obscene, threatening, or intimidating toward clients, team members, or others affiliated with HHF. Section 2.0 also lists failure to comply with social media and electronic use policies as a conduct violation.",
  d:"If the report accurately says you posted harassing, threatening, degrading, or unauthorized clinic-related content, the handbook supports corrective action.",
  b:"Protected concerted activity still matters. A post about wages or conditions can be protected if it does not cross into threats, harassment, PHI disclosure, or other prohibited conduct.",
  q:"\"I posted about work on social media\" -> The content and tone determine whether it is protected or disciplinable."
},
{
  id:"equipment",s:"2.22",t:"Misusing company equipment can justify discipline",v:"correct",
  p:"If you misused HHF devices or used company equipment in a way that violates policy, the supervisor may be correct to discipline you.",
  po:"Section 2.22 says HHF computers and devices are company equipment subject to review, should not be used to violate company policies, and team members must not thwart cybersecurity systems or procedures.",
  d:"If the report accurately says you misused HHF equipment, bypassed security expectations, or used a company device for prohibited conduct, the handbook supports corrective action.",
  b:"If the accusation is just normal work use, or the rule was never actually violated, the specific device activity matters.",
  q:"\"I used the HHF iPad/laptop/company phone in a prohibited way\" -> Company equipment use is reviewable and still subject to policy."
},
{
  id:"injury_reporting",s:"6.8 & 6.9",t:"Failing to report injuries or unsafe incidents can justify discipline",v:"correct",
  p:"If you failed to report a workplace injury, unsafe condition, or incident that policy required you to report, the supervisor may be correct to discipline you.",
  po:"Sections 6.8 and 6.9 require team members to report unsafe conditions, workplace accidents, injuries, or illnesses promptly, and work-related injuries or illnesses must be reported within 24 hours.",
  d:"If the report accurately says you did not report an injury, unsafe condition, or incident when required, the handbook supports corrective action.",
  b:"If you did report it, were not the person responsible to report, or were denied a chance to complete the form, the facts should be clarified.",
  q:"\"I didn't report the injury/unsafe condition\" -> The handbook expects prompt reporting."
},
{
  id:"cancel_no_report",s:"2.10",t:"You must report to the clinic after certain client cancellations",v:"correct",
  p:"If your home or community client canceled and you failed to report to the clinic, the supervisor may be correct to discipline you.",
  po:"Section 2.10 says that after a home or community cancellation, team members must report to the clinic. Failure to report can result in PTO use or being marked as an unapproved absence leading to further discipline.",
  d:"If the report accurately says you did not report to the clinic after a qualifying cancellation, the handbook supports corrective action.",
  b:"If you were told not to report, were never informed of the expectation, or the cancellation facts are different, the details matter.",
  q:"\"My client canceled and I just went home\" -> The handbook says some cancellations still require reporting to the clinic."
},
{
  id:"cybersecurity",s:"2.22",t:"Sharing passwords or bypassing cybersecurity rules can justify discipline",v:"correct",
  p:"If you shared passwords, bypassed security controls, or ignored device-security rules, the supervisor may be correct to discipline you.",
  po:"Section 2.22 says cybersecurity is every team member's responsibility, passwords should not be shared, and team members must not take actions to thwart cybersecurity systems or procedures.",
  d:"If the report accurately says you shared credentials, bypassed security, or ignored required security procedures, the handbook supports corrective action.",
  b:"If no credentials were shared and the device use was authorized, the exact security facts matter.",
  q:"\"I shared my password / bypassed security\" -> The handbook treats cybersecurity compliance as part of device use."
},
{
  id:"false_wrongdoing_report",s:"6.3",t:"Intentionally false wrongdoing reports can justify discipline",v:"correct",
  p:"If you knowingly filed a false report of wrongdoing, the supervisor may be correct to discipline you.",
  po:"Section 6.3 protects whistleblowers, but it also says intentionally filing a false report of wrongdoing may lead to discipline, including termination.",
  d:"If the report accurately says you knowingly made a false complaint or dishonest wrongdoing report, the handbook supports corrective action.",
  b:"If you made a good-faith report based on what you believed at the time, whistleblower protections may still apply even if the report was not substantiated.",
  q:"\"I made a report I knew wasn't true\" -> The handbook protects good-faith reporting, not intentional false reports."
},
{
  id:"visitor_security",s:"6.0 & 6.8",t:"Unauthorized visitors and security concerns must be reported",v:"correct",
  p:"If you knowingly allowed or ignored an unauthorized visitor or failed to report a related safety concern, the supervisor may be correct to discipline you.",
  po:"The handbook expects unauthorized visitors and safety concerns to be reported to leadership, and safety reporting is part of every team member's responsibility.",
  d:"If the report accurately says you let an unauthorized person remain or failed to report a visitor/security issue, the handbook supports corrective action.",
  b:"If you reported it promptly or did not know the person was unauthorized, the details matter.",
  q:"\"I let an unauthorized person stay / didn't report them\" -> The handbook expects security concerns to be reported."
},
{
  id: "personal_phone_misuse",
  s: "2.0 & 6.5",
  t: "Personal phone use not tied to patient care can justify discipline",
  v: "correct",
  p: "If you were using your personal phone for non-clinical reasons while on duty or with a client, the supervisor may be correct to discipline you.",
  po: "Section 6.5 and Section 2.0 prohibit personal cellphone usage during work hours when it is not for direct patient care, and personal phone use while with a client is strictly prohibited.",
  d: "If the report accurately says you were texting, scrolling, shopping, using social media, or otherwise using your phone for personal reasons during work, the handbook supports corrective action.",
  b: "If the phone was being used for direct patient care, data, timing, Teams, or another legitimate clinical purpose, the discipline may still be wrong.",
  q: "\"I was on my phone for personal stuff in session\" -> The handbook does not protect personal phone use on duty."
},
{
  id:"unauthorized_overtime",s:"2.0 & 2.5",t:"Working unauthorized overtime can justify discipline",v:"correct",
  p:"If you stayed late or worked overtime without approval on your own, the supervisor may be correct to discipline you.",
  po:"Section 2.5 says overtime must be approved in advance, and Section 2.0 lists working unauthorized overtime as a conduct violation.",
  d:"If the report accurately says you chose to work extra hours without getting approval first, the handbook supports corrective action.",
  b:"If a supervisor directed or expected you to stay, the issue may be unpaid directed work rather than unauthorized overtime.",
  q:"\"I stayed late without asking\" -> The handbook requires advance approval for overtime."
},
{
  id:"dress_code_clear",s:"2.16",t:"Clear dress code violations can justify discipline",v:"correct",
  p:"If you wore something the handbook specifically prohibits, the supervisor may be correct to discipline you.",
  po:"Section 2.16 requires HHF branded shirts, closed-toe shoes, and no grabbable jewelry, with related appearance and safety expectations.",
  d:"If the report accurately says you wore open-toed shoes, prohibited jewelry, or a non-HHF shirt when required, the handbook supports corrective action.",
  b:"If the issue involves something not clearly listed in the handbook, accommodations, or inconsistent enforcement, the situation may still be arguable.",
  q:"\"I wore Crocs / open-toed shoes / no HHF shirt\" -> Some dress code issues are specifically covered by the handbook."
},
{
  id:"hygiene_clear",s:"2.17",t:"Serious hygiene or health-safety noncompliance can justify discipline",v:"correct",
  p:"If you ignored clear hygiene or health-safety standards that put others at risk, the supervisor may be correct to discipline you.",
  po:"The handbook says hygiene and appearance standards exist to protect health and safety, and persistent non-compliance can result in immediate termination when it poses a risk to team members and clients.",
  d:"If the report accurately says you entered the clinic in a condition that violated explicit hygiene or health-safety rules, the handbook supports corrective action.",
  b:"If the accusation is exaggerated, one-off, or not tied to an actual handbook standard, the exact facts matter.",
  q:"\"I came in with a strong smoke/marijuana odor or contagious condition\" -> The handbook treats some hygiene and health risks seriously."
}
];

var RPT=[{n:"Any Supervisor or Leader",r:"Section 1.8"},{n:"People Operations (HR)",r:"hr@hhfamily.com"},{n:"Anonymous Complaint Line",r:"520-521-2222"},{n:"Anonymous Suggestion Box",r:"SharePoint"}];
