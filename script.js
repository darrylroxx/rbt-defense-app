// ====== YOUR API KEY GOES HERE ======
const GEMINI_API_KEY = 'AIzaSyAK9qzMtzpMVVN1R051h2DwH4ZOxQ1WtEc';
// ====================================

// ======================== PDF LOOKUP ========================
let pdfDoc = null;
function loadHandbookPDF() {
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.getDocument("./hhf-handbook-2025-2027.pdf").promise.then(doc => { pdfDoc = doc; }).catch(e => console.warn("PDF not loaded", e));
  }
}
loadHandbookPDF();

// ======================== HELPER FUNCTIONS ========================
function sanitizedText(text){
  var t=(text||"").replace(/\r/g,"").trim();
  t=t.replace(/^(from|sent|subject|to|cc):.*$/gim,"");
  t=t.replace(/^on .+ wrote:.*$/gim,"");
  t=t.replace(/^>.*$/gim,"");
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

// ======================== AI FETCH LOGIC ========================
async function go(text) {
  var clean = sanitizedText(text);
  if (!clean.trim()) return;
  activeAnalysisText = clean;
  document.getElementById('rs').innerHTML = '';
  document.getElementById('fs').classList.add('hide');
  showLoading(true);
  
  var bs = document.querySelectorAll('.btn-def,.btn-def-sm');
  bs.forEach(b => { b.classList.add('flash'); setTimeout(() => b.classList.remove('flash'), 400) });

  try {
    // We send a stripped-down version of the rules so we don't overload the AI
    const rulePromptData = JSON.stringify(R.map(r => ({ id: r.id, desc: r.p })));
    
    const promptText = `You are an HR compliance expert analyzing employee situations against a company handbook. 
    Situation: "${clean}". 
    Handbook Rules: ${rulePromptData}. 
    Identify which rule IDs apply to this situation (either broken by the employee or broken by the supervisor). 
    Return ONLY a JSON array of the matching rule IDs. If no rules match, return an empty array [].`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    
    // Parse the JSON array of IDs from the AI
    let rawText = data.candidates[0].content.parts[0].text;
    let matchedIds = JSON.parse(rawText);

    // Build the hits array for the UI
    let hits = [];
    matchedIds.forEach((id, index) => {
      let ruleObj = R.find(r => r.id === id);
      if (ruleObj) {
        hits.push({
          r: ruleObj,
          c: null,
          cf: "HIGH",
          mc: 5,
          score: 100 - index, 
          seg: clean,
          segIndex: 0
        });
      }
    });

    // Fallback if AI found nothing
    if (hits.length === 0) {
      hits.push({
        r: {
          id:"need_more_facts", s:"General", t:"More facts are needed", v:"grey",
          p:"The AI could not identify a specific policy violation here.",
          po:"", d:"Please add more specific details.", b:"", q:""
        },
        c: null, cf: "INFO", mc: 0, score: 1
      });
    }

    var res = rb(hits, clean);
    ah = [{ t: clean, h: hits, b: res.html }];
    rc = 1;
    
    document.getElementById('rs').innerHTML = res.html;
    document.getElementById('fs').classList.remove('hide');
    updateInputMode(true);
    showLoading(false);

    if (navigator.vibrate) navigator.vibrate(35);
    if (window.matchMedia('(max-width: 768px)').matches) {
      var el = document.getElementById('rb1');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    console.error("AI Error:", error);
    showLoading(false);
    alert("Connection to the AI failed. Please check your internet connection.");
  }
}


// ======================== UI RENDERING ========================
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
  
  var h='<div class="crd'+(hit.c?' contra':'')+'" id="'+bi+'c'+i+'" style="animation-delay:'+(220+(i*110))+'ms">';
  h+='<div class="crd-v '+vc+'">';
  h+='<span class="v-badge '+bc+'">'+vl+'</span>';
  h+='<div class="v-text">'+r.p+'</div>';
  h+='<div class="v-section">'+formatSectionRef(r.s)+(r.t?' - '+r.t:'')+'</div>';
  h+='</div>';
  h+='<div class="crd-body">';
  var mainText = r.d;
  h+='<div class="blk blk-main"><div class="blk-label">Why this matters</div><p>'+mainText+'</p></div>';
  h+='<div class="blk blk-change"><div class="blk-label">When this might not apply</div><p>'+r.b+'</p></div>';
  h+='</div></div>';
  return h;
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
  
  if(seriousCase(hits)){
    h+='<div class="serious-note"><p>Protect yourself by being fully accurate. Do not leave out facts, exaggerate, or reshape what happened.</p></div>';
  }
  h+='</div>';
  return{html:h,hits:hits,text:qt};
}

function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

var rc=0,ah=[],activeAnalysisText="";

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
    t+="Why this matters: "+r.d+"\n";
    t+="When this might not apply: "+r.b+"\n\n";
  });
  
  t+='What Your Supervisor Likely Violated\n';
  if(!wrongHits.length)t+="Nothing here shows that your supervisor violated HHF policy.\n\n";
  else wrongHits.forEach(function(hit,i){
    var r=hit.r;
    t+=(i+1)+". "+r.p+"\n";
    t+=formatSectionRef(r.s)+(r.t?" - "+r.t:"")+"\n";
    t+="Why this matters: "+r.d+"\n";
    t+="When this might not apply: "+r.b+"\n\n";
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
