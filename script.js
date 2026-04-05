// ======================== CORE LOGIC ========================
function hasNegation(segment, rule) {
  const negPattern = /\b(not|never|didn't|did not|wasn't|was not|isn't|is not|no\s+phone|without using)\b/i;
  if (!negPattern.test(segment)) return false;
  const actionKw = rule.kw.find(kw => segment.includes(kw));
  if (actionKw) {
    const idx = segment.indexOf(actionKw);
    const before = segment.substring(0, idx);
    if (negPattern.test(before)) return true;
  }
  return false;
}

function getConditionalBranches(ruleId, text) {
  const branches = {
    phone: {
      ifClinical: "If the phone was used for direct patient care, the BCBA is wrong.",
      ifPersonal: "If used for personal entertainment, the BCBA is correct."
    },
    attendance: {
      ifNote: "If you have a doctor's note, multiple days = ONE occurrence. Treating them as separate is a supervisor violation.",
      ifNoNote: "Without a note, each day is a separate occurrence. The BCBA is within policy."
    }
  };
  const b = branches[ruleId];
  if (!b) return null;
  if (ruleId === "attendance") {
    if (/doctor.*note|doctors note|brought a note/i.test(text)) return b.ifNote;
    if (/no note|did not have a note/i.test(text)) return b.ifNoNote;
  }
  return null;
}

// ======================== DYNAMIC CONTRA CHECK ========================
function cc(t, id) {
  if (id === "attendance") {
    if (/doctor.*note|doctors note|brought a note/i.test(t)) {
       return "You provided a doctor's note. Section 2.15 says this must be ONE occurrence. Writing you up for 3 separate occurrences is a direct violation of HHF policy.";
    }
  }
  if (id === "phone" && /timer|data|teams|clinical/i.test(t)) {
    return "Clinical phone use is a handbook exception. The supervisor is wrong to ignore Section 6.5.";
  }
  return null;
}

// ======================== SCORING ========================
function scoreHit(text, rule, mc, contra, ctx) {
  var score = mc * 10 + (rule.pri || 0);
  if (contra) score += 50; // Give a massive boost to confirmed violations
  if (rule.id === "attendance" && /doctor.*note|doctors note|brought a note/i.test(text)) score += 100;
  if (hasNegation(text, rule)) score -= 35;
  return score;
}

function matchRule(text, rule) {
  var matched = false, mc = 0;
  if (rule.kw) {
    rule.kw.forEach(function(k) {
      var escaped = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      if (new RegExp("\\b" + escaped + "\\b", "i").test(text)) { matched = true; mc++; }
    });
  }
  return matched ? { matched: true, mc: mc } : null;
}

function fm(text) {
  var l = text.toLowerCase();
  var map = {};
  R.forEach(function(r) {
    var m = matchRule(l, r);
    if (!m) return;
    var contra = cc(l, r.id);
    var score = scoreHit(l, r, m.mc, contra, {});
    // If a contra-check is found for attendance, flip the type to "wrong" (Supervisor Issue)
    if (r.id === "attendance" && contra) {
        var modifiedRule = JSON.parse(JSON.stringify(r));
        modifiedRule.v = "wrong";
        map[r.id] = { r: modifiedRule, c: contra, mc: m.mc, score: score, seg: l };
    } else {
        map[r.id] = { r: r, c: contra, mc: m.mc, score: score, seg: l };
    }
  });
  var hits = Object.keys(map).map(function(k) { return map[k] });
  hits.sort(function(a, b) { return b.score - a.score });
  return hits.slice(0, 5);
}

// ======================== UI RENDERING ========================
function rb(hits, qt) {
  rc++;
  var bi = 'rb' + rc;
  var correctHits = hits.filter(function(h) { return h.r.v === "wrong" }); // Supervisor Wrong
  var wrongHits = hits.filter(function(h) { return h.r.v === "correct" }); // You Wrong
  var greyHits = hits.filter(function(h) { return h.r.v === "grey" });
  
  var h = `<div class="res-block" id="${bi}">
    <div class="res-query"><div class="res-query-text">${esc(qt)}</div></div>
    <div class="summ summ-mixed"><div class="summ-main">Handbook Analysis Results</div></div>`;
  
  h += renderGroup('Supervisor Issues', 'sup', correctHits, bi, 0, 1);
  h += renderGroup('Your Possible Violations', 'you', wrongHits, bi, 10, 2);
  h += renderGroup('Grey Areas', 'grey', greyHits, bi, 20, 3);
  h += '</div>';
  return { html: h };
}

function renderGroup(title, cls, list, bi, startIndex, order) {
  var h = `<div class="grp ${cls}"><div class="grp-head"><div class="grp-title">${title}</div></div>`;
  if (!list.length) h += `<div class="group-empty ${cls}">No items found for this category.</div>`;
  else list.forEach(function(hit, i) { h += renderHitCard(hit, bi, startIndex + i) });
  h += '</div>';
  return h;
}

function renderHitCard(hit, bi, i) {
  var r = hit.r;
  var vc = r.v === "wrong" ? "v-wrong" : r.v === "correct" ? "v-correct" : "v-grey";
  var bc = r.v === "wrong" ? "wrong" : r.v === "correct" ? "correct" : "grey";
  var vl = r.v === "wrong" ? "SUPERVISOR VIOLATION" : r.v === "correct" ? "YOU VIOLATED POLICY" : "GREY AREA";
  
  return `<div class="crd" style="animation-delay:${i * 50}ms">
    <div class="crd-v ${vc}">
      <span class="v-badge ${bc}">${vl}</span>
      <div class="v-text" style="color:#f5f5f5;">${r.p}</div>
      <div class="v-section" style="color:#d7b1bc;">${r.s} - ${r.t}</div>
    </div>
    <div class="crd-body">
      <div class="blk blk-main"><div class="blk-label" style="color:#d7dceb;">Why this matters</div><p style="color:#d4d9e5;">${hit.c || r.d}</p></div>
      <div class="blk blk-change"><div class="blk-label" style="color:#d9cfb8;">When this might not apply</div><p style="color:#ddd0c4;">${r.b}</p></div>
    </div>
  </div>`;
}

// ======================== TURBOTAX INTERCEPT ========================
function renderClarificationUI(c, originalText) {
  showLoading(false);
  let encText = btoa(unescape(encodeURIComponent(originalText)));
  let h = `<div class="res-block">
    <div class="res-query"><div class="res-query-text">${esc(originalText)}</div></div>
    <div class="followup-wrap">
      <div class="followup-q" style="color:#e8dce0;">${c.q}</div>
      <div class="followup-opts">
        ${c.opts.map(o => `<button class="followup-opt" onclick="resolveClarification('${encText}', '${btoa(o.append)}', '${c.id}')">${o.label}</button>`).join('')}
      </div>
    </div>
  </div>`;
  document.getElementById('rs').innerHTML = h;
  updateInputMode(true);
}

window.resolveClarification = function(encT, encA, id) {
  let txt = decodeURIComponent(escape(atob(encT))) + atob(encA);
  document.getElementById('mi').value = txt;
  go(txt, id);
}

function go(text, skipId = null) {
  var clean = sanitizedText(text);
  if (!clean) return;
  document.getElementById('rs').innerHTML = '';
  showLoading(true);
  
  setTimeout(() => {
    if (!skipId) {
      let match = CLARIFICATIONS.find(c => c.triggers.some(t => new RegExp("\\b" + t + "\\b", "i").test(clean)));
      if (match && !match.opts.some(o => clean.includes(o.append))) {
        renderClarificationUI(match, clean);
        return;
      }
    }
    var hits = fm(clean);
    var res = rb(hits, clean);
    document.getElementById('rs').innerHTML = res.html;
    document.getElementById('fs').classList.remove('hide');
    showLoading(false);
    updateInputMode(true);
  }, 200);
}

// Standard UI helpers
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function showLoading(on){document.getElementById('ld').classList.toggle('show',!!on)}
function updateInputMode(res){document.getElementById('iw').classList.toggle('hide',!!res)}
var rc=0;
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('db').addEventListener('click', () => go(document.getElementById('mi').value));
  document.getElementById('ca').addEventListener('click', () => location.reload());
});

// KILL CACHE
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => { for(let r of regs) r.unregister(); });
}
