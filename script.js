// ======================== NEGATION DETECTION ========================
function hasNegation(segment, rule) {
  const negPattern = /\b(not|never|didn't|did not|wasn't|was not|isn't|is not|no\s+phone|without using)\b/i;
  if (!negPattern.test(segment)) return false;
  const actionKw = rule.kw.find(kw => !kw.includes('.*') && segment.includes(kw));
  if (actionKw) {
    const idx = segment.indexOf(actionKw);
    const before = segment.substring(0, idx);
    if (negPattern.test(before)) return true;
  }
  return false;
}

// ======================== CONDITIONAL GREY BRANCHES ========================
function getConditionalBranches(ruleId, text) {
  const branches = {
    phone: {
      ifClinical: "If the phone was used for direct patient care (timer, data, Teams), the BCBA is wrong.",
      ifPersonal: "If the phone was used for personal social media or texts, the BCBA is correct."
    },
    progressive: {
      ifNoVerbal: "If no verbal coaching happened first, the BCBA skipped required steps.",
      ifVerbalGiven: "If a prior verbal conversation occurred for the same issue, the written step may be valid."
    },
    attendance: {
      ifUnderThreshold: "If you have fewer than 3 callouts or a doctor's note, discipline is premature.",
      ifOverThreshold: "If you exceeded attendance thresholds, the BCBA is within policy."
    },
    admin_permission: {
      ifNoClient: "If no client was present and you were doing routine cleaning, the permission demand is micromanagement.",
      ifClientWaiting: "If a client or assigned task was waiting, the BCBA can prioritize that over cleaning."
    }
  };
  const b = branches[ruleId];
  if (!b) return null;
  if (ruleId === "phone") {
    if (/clinical|timer|data|teams|patient care/i.test(text)) return b.ifClinical;
    if (/personal|social media|instagram|texting/i.test(text)) return b.ifPersonal;
    return b.ifClinical + " — " + b.ifPersonal;
  }
  if (ruleId === "progressive") {
    if (/no verbal|skipped|first time/i.test(text)) return b.ifNoVerbal;
    return b.ifNoVerbal + " — " + b.ifVerbalGiven;
  }
  if (ruleId === "attendance") {
    if (/callout|occurrence|doctor note/i.test(text)) return b.ifUnderThreshold;
    return b.ifUnderThreshold + " — " + b.ifOverThreshold;
  }
  if (ruleId === "admin_permission") {
    if (/no client|no session|cleaning|dishes/i.test(text)) return b.ifNoClient;
    if (/client waiting|assigned task|session/i.test(text)) return b.ifClientWaiting;
    return b.ifNoClient + " — " + b.ifClientWaiting;
  }
  return null;
}

// ======================== REASONING TRACE ========================
function getReasoningTrace(segment, rule, matchedKeywords, ctx) {
  let trace = [];
  if (matchedKeywords && matchedKeywords.length) {
    trace.push(`Matched: ${matchedKeywords.slice(0,3).join(', ')}`);
  }
  if (ctx.admission) trace.push("You admitted the action.");
  if (ctx.accusation) trace.push("You described being accused.");
  if (ctx.dispute) trace.push("You dispute the accuracy.");
  if (ctx.internalComm) trace.push("Internal work channel mentioned.");
  if (hasNegation(segment, rule)) trace.push("Negation detected → weaker match.");
  return trace.join(" · ");
}

// ======================== PDF LOOKUP ========================
let pdfDoc = null;
function loadHandbookPDF() {
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.getDocument("./hhf-handbook-2025-2027.pdf").promise.then(doc => { pdfDoc = doc; }).catch(e => console.warn("PDF not loaded", e));
  }
}
loadHandbookPDF();
async function getHandbookSection(section) {
  if (!pdfDoc) return "PDF not loaded yet. Use the link above to open and search.";
  return `See handbook ${section} (PDF). Open the PDF and search for "${section}".`;
}

// ======================== FEEDBACK LOOP ========================
function storeFeedback(inputHash, ruleId, helpful) {
  let fb = JSON.parse(localStorage.getItem("hhf_feedback") || "[]");
  fb.push({ inputHash, ruleId, helpful, ts: Date.now() });
  localStorage.setItem("hhf_feedback", JSON.stringify(fb.slice(-200)));
}
function renderFeedbackButtons(hitId, ruleId, inputText) {
  const hash = btoa(unescape(encodeURIComponent(inputText.substring(0,100))));
  return `<div class="feedback-row">
    <button class="feedback-btn" data-feedback="up" data-rule="${ruleId}" data-hash="${hash}">👍 Helpful</button>
    <button class="feedback-btn" data-feedback="down" data-rule="${ruleId}" data-hash="${hash}">👎 Not helpful</button>
  </div>`;
}

// ======================== HELPER FUNCTIONS ========================
function sanitizedText(text){
  var t=(text||"").replace(/\r/g,"").trim();
  t=t.replace(/^(from|sent|subject|to|cc):.*$/gim,"");
  t=t.replace(/^on .+ wrote:.*$/gim,"");
  t=t.replace(/^>.*$/gim,"");
  t=t.replace(/^hi\b.*$/gim,"");
  t=t.replace(/^hello\b.*$/gim,"");
  t=t.replace(/^thanks[,]?.*$/gim,"");
  t=t.replace(/^thank you[,]?.*$/gim,"");
  t=t.replace(/^best[,]?.*$/gim,"");
  t=t.replace(/^sincerely[,]?.*$/gim,"");
  t=t.replace(/^regards[,]?.*$/gim,"");
  t=t.replace(/^\s*[-*]\s+/gm,"");
  t=t.replace(/[-_]{3,}.*/g,"");
  t=t.replace(/\n{3,}/g,"\n\n").trim();
  return t;
}
function formatSectionRef(s){
  var raw=String(s||"").replace(/\s+/g," ").trim();
  if(!raw)return "HHF Handbook";
  if(/^not in handbook$/i.test(raw))return "Not in HHF Handbook";
  if(/^general$/i.test(raw)||/^industry context$/i.test(raw))return raw;
  raw=raw.replace(/&/g,",").replace(/\band\b/gi,",");
  var parts=raw.split(",").map(function(part){return part.trim()}).filter(Boolean);
  return parts.map(function(part){
    return /^§/.test(part)||/^HHF Handbook/i.test(part)?part:"HHF Handbook §"+part;
  }).join(" | ");
}
function hasAccusationContext(text){ return /(they said|my supervisor said|my bcba said|the write-?up says|the email says|i was accused|they accused me|they claimed|they wrote that|they alleged|the report says|it says i)/.test(text); }
function hasDirectAdmission(text){ return /\bi\b.*\b(brought|had|used|texted|called|posted|shared|stole|refused|ignored|went home|didn't report|stayed late|worked overtime|wore|vaped|smoked|hit|threatened|fought|drove|checked)\b/.test(text) && !hasAccusationContext(text); }
function hasDispute(text){ return /false|lied|fabricated|not true|didn't happen|never happened|accused me|they said i|they claim|claim(ed)? i|wasn't me|not mine|misunderstood|misrepresented/.test(text); }
function hasApprovedInternalComm(text){ return /(teams|team app|company teams|microsoft teams|work app|approved channel|company phone|work phone|internal message|internal messaging|coworker|coworkers|supervisor|bcba|leadership|clinic chat|staff chat)/.test(text); }
function hasExplicitPhi(text){ return /(client name|full name|dob|date of birth|diagnosis|medical chart|problem log|billing record|insurance info|client photo|client video|posted client|sent client photo|identifying information)/.test(text); }

function extractIssueSegments(text){
  var base=sanitizedText(text.toLowerCase());
  var primary=base.split(/\n+|[.!?]+/).map(function(part){return part.trim()}).filter(Boolean);
  var out=[];
  primary.forEach(function(part){
    part.split(/\bbut\b|\bhowever\b|\balso\b|\bthen\b|\bwhile\b|\bafter that\b|;/g).forEach(function(chunk){
      var c=chunk.trim();
      if(c.length>=12)out.push(c);
    });
  });
  if(!out.length&&base)out=[base];
  var seen={};
  return out.filter(function(seg){
    if(seen[seg])return false;
    seen[seg]=true;
    return true;
  }).slice(0,10);
}

function cc(t,id){
  if(id==="phone"){
    if(/timer|data|teams|reinforcer|understood|doing.*(her|his|their|my) job|use of timer|clinical|was using|was doing|taking data/.test(t)&&/warning|corrective|no tolerance|verbal warning|discipline|write.?up|written|wrote/.test(t))
      return"The write-up acknowledges clinical/work phone use but still disciplines - the BCBA's own words prove the exception applies.";
  }
  if(id==="progressive"){
    if(/verbal warning|not an official|not a write|paper trail|this email serves|not an official write|this is not/.test(t)&&/action plan|impact|summary|paper trail|email|documented|moving forward|corrective/.test(t))
      return"Claims to be 'verbal' but has formal documentation (summary, impact, action plan). That's written - the step was skipped.";
  }
  if(id==="inaccurate_doc"){
    if(/understood|acknowledged|she understood|he understood|doing.*(her|his|their|my) job|use of timer|was doing|was using|taking data/.test(t)&&/warning|corrective|violation|no tolerance|write.?up|written|wrote/.test(t))
      return"The BCBA acknowledged job performance but still disciplined - their own words contradict the basis for the write-up.";
  }
  if(id==="admin_permission"){
    if(/permission|ask before|ask first|approval/.test(t)&&/clean|dishes|admin|organize|maintenance|sweep|mop|wipe|tidy/.test(t))
      return"The handbook doesn't require BCBA permission for routine clinic tasks. This is micromanagement, not policy.";
  }
  if(id==="weapons"){
    if(/not true|didn't happen|false|lied|fabricated|wasn't mine|never brought|no gun|no weapon/.test(t))
      return"If the report is inaccurate about the weapon or whether it was on HHF property, the facts should be challenged immediately.";
  }
  if(id==="hipaa"){
    if(/no name|not identifiable|consent|permission|authorized|de-identified/.test(t))
      return"If the information was truly de-identified or authorized, the write-up may be overstating the privacy issue.";
    if(hasApprovedInternalComm(t)&&!hasExplicitPhi(t))
      return"If this was internal work communication through an approved channel like Teams and no identifying client information was actually shared, this may not be a real HIPAA issue.";
  }
  if(id==="time_fraud"){
    if(/told me to work|made me work|directed to stay|approved overtime|accurate time/.test(t))
      return"If you accurately recorded directed work time, this may be a pay-compliance issue rather than time fraud.";
  }
  if(id==="social_media"){
    if(/wages|pay|working conditions|union|organizing/.test(t)&&!/threat|obscene|intimidat|harass|client|phi/.test(t))
      return"If the post was about wages or working conditions and did not include threats, harassment, or confidential information, protected concerted activity may still apply.";
  }
  if(id==="client_family_phone"){
    if(/clinical|direct patient care|teams|company phone|approved channel/.test(t))
      return"If the communication was through an approved work channel rather than a personal phone, the write-up may be overstating the issue.";
  }
  if(id==="cancel_no_report"){
    if(/told me to go home|was told not to report|they sent me home|supervisor said go home/.test(t))
      return"If leadership told you not to report to the clinic, the write-up may be misstating your obligations under the cancellation policy.";
  }
  if(id==="cybersecurity"){
    if(/never shared|didn't share|authorized|permission|approved/.test(t))
      return"If the access was authorized and no credentials were improperly shared, the write-up may be overstating a cybersecurity issue.";
  }
  if(id==="false_wrongdoing_report"){
    if(/good faith|i believed|thought it was true|was trying to report|suspected/.test(t))
      return"If you reported in good faith based on what you believed, whistleblower protections may still matter even if the report was not substantiated.";
  }
  if(id==="personal_phone_misuse"){
    if(/timer|data|teams|reinforcer|clinical|direct patient care/.test(t))
      return"If the phone was actually being used for direct patient care, the supervisor may be treating clinical phone use as personal use.";
  }
  if(id==="unauthorized_overtime"){
    if(/told me to stay|made me stay|directed me to stay|expected me to stay|finish before you leave/.test(t))
      return"If leadership directed the extra work, this may be directed overtime rather than unauthorized overtime.";
  }
  return null;
}

function scoreHit(text,rule,mc,contra,ctx){
  ctx=ctx||{};
  var score=mc*10+(rule.pri||0);
  if(rule.v==="correct")score+=8;
  if(rule.v==="wrong")score+=4;
  if(contra)score+=10;
  if(rule.v==="correct"&&ctx.admission&&!ctx.dispute)score+=12;
  if(rule.v==="wrong"&&ctx.admission&&hasSeriousConduct(text)&&!ctx.dispute)score-=35;
  if(rule.v==="correct"&&ctx.accusation&&!ctx.admission)score-=20;
  if(rule.v==="correct"&&ctx.dispute&&!ctx.admission)score-=18;
  if(isSeriousRule(rule.id)&&ctx.accusation&&ctx.dispute&&!ctx.admission)score-=120;
  if(rule.id==="progressive"&&hasSeriousConduct(text))score-=70;
  if(rule.id==="inaccurate_doc"&&hasSeriousConduct(text)&&!/false|lied|fabricated|not true|didn't happen/.test(text))score-=40;
  if(rule.id==="equal"&&hasSeriousConduct(text))score-=20;
  if(rule.id==="phone"&&/personal|social media|instagram|tiktok|facebook|texting|texted|personal call|facetime|shopping/.test(text))score-=45;
  if(rule.id==="phone"&&/client family|parent|mom|dad|guardian/.test(text)&&/text|call|phone/.test(text))score-=30;
  if(rule.id==="phone"&&ctx.internalComm&&!/parent|client family|mom|dad|guardian/.test(text))score+=28;
  if(rule.id==="client_cancel"&&/didn't report to clinic|did not report to clinic|went home after cancellation|failed to report after cancellation/.test(text))score-=40;
  if(rule.id==="whistleblower"&&/false report|made a false complaint|lied in a complaint|intentionally false report/.test(text))score-=45;
  if(rule.id==="nlra"&&/client pay|insurance reimbursement|billing info|confidential.*payor/.test(text))score-=30;
  if(rule.id==="confidentiality"&&/my pay|my wage|my salary|our pay|coworker pay|discuss pay/.test(text))score-=35;
  if((rule.id==="hipaa"||rule.id==="confidentiality")&&ctx.internalComm&&!ctx.explicitPhi)score-=85;
  if(rule.id==="hipaa"&&ctx.internalComm&&ctx.accusationOnly&&!/client name|diagnosis|chart|photo|video|billing|insurance/.test(text))score-=140;
  if(rule.id==="client_family_phone"&&ctx.internalComm&&!/parent|client family|mom|dad|guardian/.test(text))score-=65;
  if(rule.id==="personal_phone_misuse"&&ctx.internalComm&&!/social media|instagram|tiktok|facebook|shopping|personal call|facetime/.test(text))score-=55;
  if(rule.id==="time_track"&&/falsified time|fake hours|logged hours i didn't work|edited my time|manipulated time/.test(text))score-=35;
  if(rule.id==="photo_video"&&/consent|approved|marketing approval|compliance approval|de-identified/.test(text))score-=25;
  if(rule.id==="social_media"&&/my pay|our pay|wages|working conditions|organizing|union/.test(text)&&!/threat|obscene|intimidat|harass|client|phi|photo|video/.test(text))score-=28;
  if(rule.id==="overtime"&&/without approval|on my own|didn't ask|did not ask|wasn't told to stay/.test(text))score-=35;
  if(rule.id==="dress"&&/open-toed|open toed|crocs|flip flops|no hhf shirt|dangling earrings|grabbable jewelry/.test(text))score-=18;
  if(rule.id==="false_report"&&/\bi\b.*(made|filed|reported|complaint).*(false|knew wasn't true|not true)/.test(text))score-=55;
  if(rule.id==="false_wrongdoing_report"&&/\bi\b.*(made|filed|reported|complaint).*(false|knew wasn't true|not true)/.test(text))score+=40;
  if(isSeriousRule(rule.id)&&ctx.accusation&&!ctx.admission&&!contra)score-=18;
  if(isSeriousRule(rule.id)&&!ctx.explicitPhi&&/hipaa|phi/.test(rule.id)&&ctx.internalComm)score-=40;

  // Heavily penalize the "Supervisor Wrong" phone rule AND the "Accommodations" rule if the user admits to personal entertainment or being distracted
  if((rule.id === "phone" || rule.id === "accommodations") && /personal|social media|instagram|tiktok|facebook|snapchat|youtube|scrolling|listening to music|spotify|podcast|distracted|not paying attention/.test(text)) {
      score -= 100;
  }

  // Massive boost to the "You Violated Policy" rule if personal apps or distractions are explicitly mentioned
  if(rule.id === "personal_phone_misuse" && /personal|social media|instagram|tiktok|facebook|snapchat|youtube|scrolling|listening to music|spotify|podcast|distracted|not paying attention/.test(text)) {
      score += 80;
  }

  if (hasNegation(text, rule)) score -= 35;
  return score;
}

function hasSeriousConduct(text){
  return /gun|firearm|weapon|knife|explosive|threat|violent|violence|fight|fighting|assault|hit|shoved|drunk|intoxicated|high at work|used drugs|drug use|selling drugs|hipaa|phi|client photo|client video|shared client info|stole|theft|falsified time|time fraud|insubordination|refused to do|unsafe|safety violation|child abuse|neglect|abuse|smoked at work|vaped at work|texting while driving|texted while driving/.test(text);
}
function isSeriousRule(id){
  return /weapons|violence|substances|hipaa|confidentiality|child_abuse|time_fraud|theft|unsafe|photo_video|false_wrongdoing_report/.test(id);
}

function matchRule(text, rule) {
  var matched = false, mc = 0;
  if(rule.kw) {
    rule.kw.forEach(function(k) {
      if(k.indexOf(".*") !== -1) {
        try { if(new RegExp(k, "i").test(text)) { matched = true; mc++; } } catch(e) {}
      } else {
        // Word boundary check to prevent "earphones" from triggering "phone"
        try {
          var escaped = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          if(new RegExp("\\b" + escaped + "\\b", "i").test(text)) { matched = true; mc++; }
        } catch(e) {
          if(text.indexOf(k) !== -1) { matched = true; mc++; }
        }
      }
    });
  }
  return matched ? { matched: true, mc: mc } : null;
}

function fm(text){
  var l=text.toLowerCase().replace(/['']/g,"'").replace(/[""]/g,'"');
  var segments=extractIssueSegments(l);
  if(segments.indexOf(l)===-1)segments.unshift(l);
  var map={};
  var overallCtx={
    accusation:hasAccusationContext(l),
    accusationOnly:/said it was|told me it was|called it|claimed it was|wrote that it was/.test(l),
    dispute:hasDispute(l),
    admission:hasDirectAdmission(l),
    internalComm:hasApprovedInternalComm(l),
    explicitPhi:hasExplicitPhi(l)
  };
  segments.forEach(function(seg,segIndex){
    var ctx={
      accusation:hasAccusationContext(seg)||overallCtx.accusation,
      accusationOnly:/said it was|told me it was|called it|claimed it was|wrote that it was/.test(seg)||overallCtx.accusationOnly,
      dispute:hasDispute(seg)||overallCtx.dispute,
      admission:hasDirectAdmission(seg)||overallCtx.admission,
      internalComm:hasApprovedInternalComm(seg)||overallCtx.internalComm,
      explicitPhi:hasExplicitPhi(seg)||overallCtx.explicitPhi
    };
    R.forEach(function(r){
      var m=matchRule(seg,r);
      if(!m)return;
      var contra=cc(seg,r.id);
      var score=scoreHit(seg,r,m.mc,contra,ctx);
      var existing=map[r.id];
      var hit={
        r:r,
        c:contra,
        cf:m.mc>=4||score>=130?"HIGH":m.mc>=2||score>=90?"MED":m.mc>=1?"LOW":"INFO",
        mc:m.mc,
        score:score,
        seg:seg,
        segIndex:segIndex
      };
      if(!existing||hit.score>existing.score){
        map[r.id]=hit;
      }else if(existing&&segIndex!==existing.segIndex&&hit.score>=existing.score-10){
        existing.score+=4;
      }
    });
  });
  var hits=Object.keys(map).map(function(k){return map[k]});
  hits.sort(function(a,b){return b.score-a.score||b.mc-a.mc});
  if(!hits.length||hits[0].score<25){
    hits.push({
      r:{
        id:"need_more_facts",
        s:"General",
        t:"More facts are needed before the handbook can be applied confidently",
        v:"grey",
        p:"This input is too vague or too short to give a reliable handbook answer yet.",
        po:"The handbook can only be applied accurately when the facts are specific: what happened, who said what, where it happened, and whether client care, safety, privacy, or a formal write-up was involved.",
        d:"Add more detail: what you did, what the supervisor said, whether it happened on HHF property or in session, and whether there was a write-up, threat, privacy issue, safety issue, or client impact.",
        b:"If the missing facts show a clear policy violation, the supervisor may be correct. If they show a false accusation or skipped procedure, you may have protections.",
        q:"\"They got mad at me\" -> Add what happened, what was said, and what rule they claimed you broke."
      },
      c:null,
      cf:"INFO",
      mc:0,
      score:1
    });
  }
  return hits.slice(0,8);
}

function summaryText(hits){
  var onlyThin=hits.every(function(h){return h.r.id==="need_more_facts"});
  var correct=hits.filter(function(h){return h.r.v==="correct"&&h.r.id!=="need_more_facts"}).length;
  var wrong=hits.filter(function(h){return h.r.v==="wrong"}).length;
  var grey=hits.filter(function(h){return h.r.v==="grey"}).length;
  if(onlyThin)return{main:"The facts are too thin to call this cleanly.",tone:"grey"};
  if(correct&&wrong)return{main:"Both you and your supervisor likely violated HHF policy.",tone:"mixed"};
  if(correct)return{main:seriousCase(hits)?"You clearly violated HHF policy.":"You likely violated HHF policy.",tone:"you"};
  if(wrong)return{main:"Your supervisor likely violated HHF policy.",tone:"sup"};
  if(grey)return{main:"This depends on missing details.",tone:"grey"};
  return{main:"The facts are too thin to call this cleanly.",tone:"grey"};
}
function seriousCase(hits){
  return hits.some(function(hit){
    return /weapons|violence|substances|hipaa|confidentiality|child_abuse|time_fraud|theft|unsafe|photo_video/.test(hit.r.id);
  });
}
function nextStepsForHits(hits){
  var out={lead:"",groups:[]};
  var stepsNow=[],stepsDoc=[],stepsArgue=[],stepsContact=[];
  var ids={};
  hits.forEach(function(hit){ids[hit.r.id]=true});
  if(ids.need_more_facts){
    stepsNow.push("Retype this with more detail.");
    stepsDoc.push("Include what happened, who was involved, what your supervisor said, what rule or write-up was mentioned, and whether a client, safety issue, or private information was involved.");
  }
  if(hits.some(function(hit){return hit.r.v==="correct"&&hit.r.id!=="need_more_facts";})){
    stepsNow.push("Read the cited handbook sections before you respond.");
    stepsDoc.push("Write down exactly what happened, who saw it, and what part of the write-up is factually accurate versus inaccurate.");
  }
  if(hits.some(function(hit){return hit.r.v==="wrong";})){
    stepsDoc.push("Save the write-up, email, text, or meeting notes and preserve the date, time, exact wording, and who was present.");
  }
  if(ids.hipaa||ids.confidentiality||ids.photo_video){
    stepsNow.push("Stop any further sharing of private or confidential information immediately.");
  }
  if(ids.weapons||ids.violence||ids.substances||ids.child_abuse){
    stepsArgue.push("Do not fight the wrong battle here.");
    stepsArgue.push("Focus on accuracy, accountability, and limiting damage. Serious safety, abuse, weapons, violence, or substance issues can bypass normal progressive discipline under the handbook.");
  }
  if(ids.progressive||ids.false_report||ids.inaccurate_doc){
    stepsArgue.push("If your supervisor's write-up skipped steps or misstated facts, quote the exact handbook mismatch when you respond.");
  }
  if(ids.client_cancel||ids.cancel_no_report){
    stepsDoc.push("For cancellation cases, note whether you were expected to report to the clinic, offered alternate work, or directly told to go home.");
  }
  if(ids.phone||ids.personal_phone_misuse||ids.client_family_phone){
    stepsArgue.push("Separate clinical phone use, personal phone use, and parent communication. The handbook treats those differently.");
  }
  if(ids.time_track||ids.time_fraud||ids.unauthorized_overtime){
    stepsArgue.push("Separate accurate recording of directed work from fake time, off-the-clock work, and unauthorized overtime.");
  }
  if(hits.some(function(hit){return hit.r.v==="wrong";})){
    stepsContact.push("Document first, then escalate through the proper HHF channel if needed.");
  }
  if(!stepsNow.length&&!stepsDoc.length&&!stepsArgue.length&&!stepsContact.length){
    stepsNow.push("Your next move is straightforward.");
    stepsDoc.push("Document the facts carefully and compare them to the cited handbook sections before responding.");
  }
  if((ids.weapons||ids.violence||ids.substances||ids.child_abuse)||hits.filter(function(hit){return hit.r.v==="correct"}).length&&hits.filter(function(hit){return hit.r.v==="wrong"}).length){
    out.lead="Start by locking down the facts, documents, and timeline.";
  }
  if(stepsNow.length)out.groups.push({title:"What to do now",steps:stepsNow.slice(0,3)});
  if(stepsDoc.length)out.groups.push({title:"What to document",steps:stepsDoc.slice(0,3)});
  if(stepsArgue.length)out.groups.push({title:"What not to miss",steps:stepsArgue.slice(0,3)});
  if(stepsContact.length)out.groups.push({title:"Who to bring this to",steps:stepsContact.slice(0,2)});
  return out;
}

function renderHitCard(hit, bi, i){
  var r=hit.r;
  var vc=r.v==="wrong"?"v-wrong":r.v==="correct"?"v-correct":"v-grey";
  var bc=r.v==="wrong"?"wrong":r.v==="correct"?"correct":"grey";
  var vl=r.v==="wrong"?"SUPERVISOR ISSUE":r.v==="correct"?"YOU VIOLATED POLICY":"GREY AREA";
  var cl=visibleConfidence(hit);
  var trace = getReasoningTrace(hit.seg, r, r.kw.filter(kw=>hit.seg.includes(kw)), {
    admission: hasDirectAdmission(hit.seg),
    accusation: hasAccusationContext(hit.seg),
    dispute: hasDispute(hit.seg),
    internalComm: hasApprovedInternalComm(hit.seg),
    explicitPhi: hasExplicitPhi(hit.seg)
  });
  var conditional = getConditionalBranches(r.id, hit.seg);
  var feedback = renderFeedbackButtons(bi+i, r.id, hit.seg);
  var h='<div class="crd'+(hit.c?' contra':'')+'" id="'+bi+'c'+i+'" style="animation-delay:'+(220+(i*110))+'ms">';
  h+='<div class="crd-v '+vc+'">';
  h+='<span class="v-badge '+bc+'">'+vl+'</span>';
  h+='<div class="v-text">'+r.p+'</div>';
  h+='<div class="v-section">'+formatSectionRef(r.s)+(r.t?' - '+r.t:'')+'</div>';
  if(cl)h+='<div class="v-conf">'+cl+'</div>';
  if(trace)h+='<div class="v-conf">'+trace+'</div>';
  h+='</div>';
  h+='<div class="crd-body">';
  var mainText = r.d;
  if(hit.c) mainText += '<br><em>But note: '+hit.c+'</em>';
  h+='<div class="blk blk-main"><div class="blk-label">Why this matters</div><p>'+mainText+'</p></div>';
  var changeText = conditional ? conditional : r.b;
  h+='<div class="blk blk-change"><div class="blk-label">When this might not apply</div><p>'+changeText+'</p></div>';
  h+=feedback;
  h+='</div></div>';
  return h;
}
function visibleConfidence(hit){
  if(hit.c)return "Disputed facts";
  if(hit.r.id==="need_more_facts")return "Retype with more detail";
  if(hit.r.v==="grey"||hit.cf==="LOW"||hit.cf==="INFO")return "Depends on missing details";
  return "";
}
function renderGroup(title,cls,list,bi,startIndex,order){
  var h='<div class="grp '+cls+'" style="animation-delay:'+(order*70)+'ms"><div class="grp-head"><div class="grp-title">'+title+'</div><div class="grp-note">'+list.length+' item'+(list.length!==1?'s':'')+'</div></div>';
  if(!list.length){
    var emptyCopy=cls==="you"?"Nothing here shows that you violated HHF policy.":cls==="sup"?"Nothing here shows that your supervisor violated HHF policy.":"Nothing here looks unclear or borderline under the handbook.";
    h+='<div class="group-empty '+cls+'">'+emptyCopy+'</div>';
  }else{
    list.forEach(function(hit,offset){h+=renderHitCard(hit,bi,startIndex+offset)});
  }
  h+='</div>';
  return h;
}
function rb(hits,qt){
  rc++;
  var bi='rb'+rc;
  var correctHits=hits.filter(function(h){return h.r.v==="correct"&&h.r.id!=="need_more_facts"});
  var wrongHits=hits.filter(function(h){return h.r.v==="wrong"});
  var greyHits=hits.filter(function(h){return h.r.v==="grey"||h.r.id==="need_more_facts"});
  var summary=summaryText(hits);
  var nextSteps=nextStepsForHits(hits);
  var h='<div class="res-block" id="'+bi+'">';
  h+='<div class="res-query" id="'+bi+'q" data-toggle-query="'+bi+'q"><div class="res-query-text">'+esc(qt)+'</div><div class="res-query-chevron">v</div></div>';
  h+='<button type="button" class="btn-edit" data-edit-description="1">Edit my description</button>';
  h+='<div class="summ summ-'+summary.tone+'"><div class="summ-top"><div class="summ-main">'+summary.main+'</div></div></div>';
  h+=renderGroup('Where You Violated HHF Policy','you',correctHits,bi,0,1);
  h+=renderGroup('What Your Supervisor Likely Violated','sup',wrongHits,bi,correctHits.length,2);
  h+=renderGroup('Grey Areas','grey',greyHits,bi,correctHits.length+wrongHits.length,3);
  h+='<div class="grp next" style="animation-delay:280ms"><div class="grp-head"><div class="grp-title">Your Best Next Steps</div><div class="grp-note">'+nextSteps.groups.reduce(function(n,g){return n+g.steps.length},0)+' step'+(nextSteps.groups.reduce(function(n,g){return n+g.steps.length},0)!==1?'s':'')+'</div></div><div class="next-box">';
  if(nextSteps.lead)h+='<div class="next-lead">'+esc(nextSteps.lead)+'</div>';
  nextSteps.groups.forEach(function(group){
    h+='<div class="next-cat"><div class="next-cat-title">'+esc(group.title)+'</div>';
    group.steps.forEach(function(step,idx){h+='<div class="next-step">'+(idx+1)+'. '+esc(step)+'</div>'});
    h+='</div>';
  });
  h+='</div></div>';
  if(greyHits.some(function(hit){return hit.r.id==="need_more_facts"})){
    h+='<div class="no-match"><p>Retype this with more detail so the handbook can be applied cleanly.</p><p>Include what happened, who was involved, what your supervisor said, and what rule or write-up was mentioned.</p></div>';
  }
  if(seriousCase(hits)){
    h+='<div class="serious-note"><p>Protect yourself by being fully accurate. Do not leave out facts, exaggerate, or reshape what happened.</p></div>';
  }
  h+='</div>';
  return{html:h,hits:hits,text:qt};
}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
var rc=0,ah=[],activeAnalysisText="";

// ======================== TURBOTAX UI RENDERER ========================
function renderClarificationUI(c, originalText) {
    showLoading(false);
    let encText = btoa(unescape(encodeURIComponent(originalText)));
    let h = `<div class="res-block" style="animation:fs .4s ease">
                <div class="res-query"><div class="res-query-text">${esc(originalText)}</div></div>
                <div class="followup-wrap">
                    <div class="followup-q">${c.q}</div>
                    <div class="followup-opts">
                        ${c.opts.map((opt) => {
                            let encAppend = btoa(unescape(encodeURIComponent(opt.append)));
                            return `<button class="followup-opt" onclick="resolveClarification('${encText}', '${encAppend}', '${c.id}')">${opt.label}</button>`;
                        }).join('')}
                    </div>
                </div>
             </div>`;
             
    document.getElementById('rs').innerHTML = h;
    updateInputMode(true);
}

window.resolveClarification = function(encText, encAppend, skipId) {
    let originalText = decodeURIComponent(escape(atob(encText)));
    let appendText = decodeURIComponent(escape(atob(encAppend)));
    let newText = originalText + appendText;
    document.getElementById('mi').value = newText;
    go(newText, skipId);
}
// ======================================================================

function go(text, skipId = null) {
  var clean=sanitizedText(text);
  if(!clean.trim())return;
  activeAnalysisText=clean;
  document.getElementById('rs').innerHTML='';
  document.getElementById('fs').classList.add('hide');
  showLoading(true);
  var bs=document.querySelectorAll('.btn-def,.btn-def-sm');
  bs.forEach(function(b){b.classList.add('flash');setTimeout(function(){b.classList.remove('flash')},400)});

  setTimeout(function(){
    
    // ======================== TURBOTAX INTERCEPT LOGIC ========================
    if (!skipId) {
      let matchedClarification = null;
      for (let i = 0; i < CLARIFICATIONS.length; i++) {
        let c = CLARIFICATIONS[i];
        let hasTrigger = c.triggers.some(t => new RegExp("\\b" + t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "\\b", "i").test(clean));
        if (hasTrigger) {
          let alreadyAnswered = c.opts.some(o => clean.toLowerCase().includes(o.append.trim().toLowerCase()));
          if (!alreadyAnswered) {
            matchedClarification = c;
            break;
          }
        }
      }
      if (matchedClarification) {
        renderClarificationUI(matchedClarification, clean);
        return; 
      }
    }
    // ==========================================================================

    var hits=fm(clean);
    var res=rb(hits,clean);
    ah=[{t:clean,h:hits,b:res.html}];
    rc=1;
    var stack=document.getElementById('rs');
    stack.innerHTML=res.html;
    document.getElementById('fs').classList.remove('hide');
    updateInputMode(true);
    showLoading(false);
    if(navigator.vibrate)navigator.vibrate(35);
    if(window.matchMedia('(max-width: 768px)').matches){
      var el=document.getElementById('rb1');
      if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
    }
    document.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const helpful = btn.dataset.feedback === 'up';
        storeFeedback(btn.dataset.hash, btn.dataset.rule, helpful);
        btn.classList.add('selected');
        showToast("Thanks for feedback");
      });
    });
  },140);
}

function showLoading(on){var ld=document.getElementById('ld');if(ld)ld.classList.toggle('show',!!on);}
function updateInputMode(hasResults){document.getElementById('iw').classList.toggle('hide',!!hasResults);}
function showToast(msg){var el=document.getElementById('to');if(!el)return;el.textContent=msg||"Copied";el.classList.add('show');clearTimeout(showToast._t);showToast._t=setTimeout(function(){el.classList.remove('show')},1800);}
function clr(){
  document.getElementById('rs').innerHTML='';
  document.getElementById('fs').classList.add('hide');
  updateInputMode(false);
  showLoading(false);
  document.getElementById('mi').value='';
  autoResizeInput();
  ah=[];rc=0;activeAnalysisText="";
}
function autoResizeInput(){var ta=document.getElementById('mi');if(!ta)return;ta.style.height='180px';var next=Math.min(Math.max(ta.scrollHeight,180),420);ta.style.height=next+'px';}

document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('db').addEventListener('click',function(){go(document.getElementById('mi').value)});
  document.getElementById('ds').addEventListener('click',function(){go(document.getElementById('ms').value)});
  document.getElementById('mi').addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();go(this.value)}});
  document.getElementById('mi').addEventListener('input',autoResizeInput);
  document.getElementById('ms').addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();go(this.value)}});
  document.getElementById('eb').addEventListener('click',function(){document.getElementById('mi').focus();});
  document.getElementById('cr').addEventListener('click',function(){cbl('rb1')});
  document.getElementById('cr').addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();cbl('rb1')}});
  document.getElementById('ca').addEventListener('click',clr);
  document.addEventListener('click',function(e){
    var edit=e.target.closest('[data-edit-description]');
    if(edit){
      updateInputMode(false);
      document.getElementById('fs').classList.add('hide');
      document.getElementById('mi').value=activeAnalysisText;
      autoResizeInput();
      document.getElementById('mi').focus();
      document.getElementById('iw').scrollIntoView({behavior:'smooth',block:'start'});
      return
    }
    var query=e.target.closest('[data-toggle-query]');
    if(query){
      query.classList.toggle('open');
      return
    }
  });
  autoResizeInput();
});

function cbl(bi){
  var d=ah[0];if(!d)return;
  var correctHits=d.h.filter(function(h){return h.r.v==="correct"&&h.r.id!=="need_more_facts"});
  var wrongHits=d.h.filter(function(h){return h.r.v==="wrong"});
  var greyHits=d.h.filter(function(h){return h.r.v==="grey"||h.r.id==="need_more_facts"});
  var summary=summaryText(d.h);
  var nextSteps=nextStepsForHits(d.h);
  var t="The Handbook Checker\n\n";
  t+="Main Takeaway\n"+summary.main+"\n\n";
  t+='Where You Violated HHF Policy\n';
  if(!correctHits.length)t+="Nothing here shows that you violated HHF policy.\n\n";
  else correctHits.forEach(function(hit,i){
    var r=hit.r;
    t+=(i+1)+". "+r.p+"\n";
    t+=formatSectionRef(r.s)+(r.t?" - "+r.t:"")+"\n";
    if(visibleConfidence(hit))t+="Confidence: "+visibleConfidence(hit)+"\n";
    t+="Why this matters: "+r.d+"\n";
    t+="When this might not apply: "+r.b+"\n";
    if(hit.c)t+="What may change this: "+hit.c+"\n";
    t+="\n";
  });
  t+='What Your Supervisor Likely Violated\n';
  if(!wrongHits.length)t+="Nothing here shows that your supervisor violated HHF policy.\n\n";
  else wrongHits.forEach(function(hit,i){
    var r=hit.r;
    t+=(i+1)+". "+r.p+"\n";
    t+=formatSectionRef(r.s)+(r.t?" - "+r.t:"")+"\n";
    if(visibleConfidence(hit))t+="Confidence: "+visibleConfidence(hit)+"\n";
    t+="Why this matters: "+r.d+"\n";
    t+="When this might not apply: "+r.b+"\n";
    if(hit.c)t+="What may change this: "+hit.c+"\n";
    t+="\n";
  });
  t+='Grey Areas\n';
  if(!greyHits.length)t+="Nothing here looks unclear or borderline under the handbook.\n\n";
  else greyHits.forEach(function(hit,i){
    var r=hit.r;
    t+=(i+1)+". "+r.p+"\n";
    t+=formatSectionRef(r.s)+(r.t?" - "+r.t:"")+"\n";
    if(visibleConfidence(hit))t+="Confidence: "+visibleConfidence(hit)+"\n";
    t+="Why this matters: "+r.d+"\n";
    t+="When this might not apply: "+r.b+"\n";
    if(hit.c)t+="What may change this: "+hit.c+"\n";
    t+="\n";
  });
  t+="Your Best Next Steps\n";
  nextSteps.groups.forEach(function(group){
    t+=group.title+"\n";
    group.steps.forEach(function(step,i){t+=(i+1)+". "+step+"\n"});
    t+="\n";
  });
  cp(t,bi);
}

function cp(t,bi){
  var btn=document.getElementById('cr');
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(function(){
      if(btn){
        btn.classList.add("ok");
        setTimeout(function(){btn.classList.remove("ok")},1200);
      }
      showToast("Copied");
    }).catch(function(){fb(t,btn,"Copy Results")});
  }else fb(t,btn,"Copy Results");
}
function fb(t,btn,o){
  var ta=document.createElement('textarea');ta.value=t;ta.style.cssText='position:fixed;left:-9999px';
  document.body.appendChild(ta);ta.focus();ta.select();
  try{
    document.execCommand("copy");
    if(btn){
      btn.classList.add("ok");
      setTimeout(function(){btn.classList.remove("ok")},1200);
    }
    showToast("Copied");
  }catch(e){}
  document.body.removeChild(ta);
}

// THIS BLOCK ACTIVELY KILLS THE OLD OFFLINE CACHE
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
