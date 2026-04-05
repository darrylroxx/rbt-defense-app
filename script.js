// ==========================================
// script.js - Arbiter v3.1 3-Gate Engine
// ==========================================

function sanitizedText(text) { return (text || "").toLowerCase().trim(); }

// The 3-Gate Engine replaces the old point system
function calculateWeights(text, rule) {
  let score = 0;
  
  // Base check: Does the text contain the rule's keywords?
  let hasKeyword = rule.kw.some(k => text.includes(k));
  if (!hasKeyword) return 0; // Skip if completely irrelevant
  
  // GATE 1: GRAVITY CHECK (Red Zone Overrides)
  if (rule.id === "red_zone") score += 2000; // Unbeatable score if Red Zone is triggered

  // GATE 2: VERACITY CHECK (Ghost Rules vs Violations)
  if (rule.id === "dress_violation") score += 900;
  if (rule.id === "ghost_rule_dress") {
      // It's a ghost rule ONLY if they didn't ALSO mention a ripped/banned item
      let mentionsBanned = ["ripped", "open-toe", "hoodie", "graphic", "crocs"].some(k => text.includes(k));
      if (!mentionsBanned) score += 950; 
  }
  
  if (rule.id === "device_personal") score += 900;
  if (rule.id === "device_clinical") score += 950;
  
  if (rule.id === "harassment") score += 850;

  // GATE 3: PROCEDURAL CHECK (The Ladder)
  if (rule.id === "procedural") score += 800;

  // Handbook Specifics Check
  if (rule.id === "breaks" || rule.id === "attendance_excessive" || rule.id === "attendance_note" || rule.id === "cancellation") {
      score += 700;
  }

  // Apply contextual +/- weightings from THEMES
  THEMES.SUPERVISOR_WRONG.words.forEach(w => {
    if (text.includes(w)) {
      if (rule.v === "wrong") score += THEMES.SUPERVISOR_WRONG.weight;
      if (rule.v === "correct") score -= THEMES.SUPERVISOR_WRONG.weight;
    }
  });
  THEMES.THERAPIST_WRONG.words.forEach(w => {
    if (text.includes(w)) {
      if (rule.v === "correct") score += THEMES.THERAPIST_WRONG.weight;
      if (rule.v === "wrong") score -= THEMES.THERAPIST_WRONG.weight;
    }
  });

  // Base priority addition
  score += (rule.pri || 0);
  return score;
}

function findMatches(text) {
  let results = [];
  R.forEach(r => {
    let weight = calculateWeights(text, r);
    if (weight > 30) {
      let ruleCopy = JSON.parse(JSON.stringify(r));
      results.push({ r: ruleCopy, score: weight });
    }
  });
  
  // Sort by highest score (the gate that matched the strongest)
  results.sort((a, b) => b.score - a.score);
  
  // If the top match is Red Zone, return ONLY Red Zone
  if (results.length > 0 && results[0].r.id === "red_zone") {
      return [results[0]];
  }
  
  return results.slice(0, 2);
}

// ======================== UI (UNTOUCHED) ========================
function go(text, skipId = null) {
  const clean = sanitizedText(text);
  if (!clean) return;
  document.getElementById('rs').innerHTML = '';
  document.getElementById('ld').classList.add('show');
  document.getElementById('iw').classList.add('hide');

  setTimeout(() => {
    if (!skipId) {
      let clarification = CLARIFICATIONS.find(c => c.triggers.some(t => clean.includes(t)));
      if (clarification && !clarification.opts.some(o => clean.includes(o.append.toLowerCase()))) {
        renderQuestion(clarification, clean);
        return;
      }
    }

    let matches = findMatches(clean);
    let html = `<div class="res-block"><div class="res-query">${text}</div>`;
    
    if (matches.length === 0) {
      html += `<div class="crd" style="padding:20px; color:#aaa; text-align:center;">I need more detail to find a specific rule match. Please include what you were doing or what policy was cited.</div>`;
    } else {
      matches.forEach(m => {
        const r = m.r;
        const typeCls = r.v === "wrong" ? "v-wrong" : r.v === "correct" ? "v-correct" : "v-grey";
        const badgeCls = r.v === "wrong" ? "wrong" : r.v === "correct" ? "correct" : "grey";
        const badgeLabel = r.v === "wrong" ? "SUPERVISOR ISSUE" : r.v === "correct" ? "POLICY VIOLATION" : "GREY AREA";

        html += `
          <div class="crd">
            <div class="crd-v ${typeCls}">
              <span class="v-badge ${badgeCls}">${badgeLabel}</span>
              <div class="v-text">${r.p}</div>
              <div class="v-section">Section ${r.s} (Page ${r.pg}) - ${r.t}</div>
            </div>
            <div class="blk"><div class="blk-label">Handbook Analysis</div><p>${r.d}</p></div>
            <div class="blk" style="border-top: none; padding-top: 0;">
              <div class="blk-label" style="color:var(--accent);">Evidence Strategy</div>
              <div class="strategy-box"><p>${r.strategy}</p></div>
            </div>
            <div class="blk" style="background:rgba(255,255,255,0.01);"><div class="blk-label">Context</div><p>${r.b}</p></div>
          </div>`;
      });
    }
    document.getElementById('rs').innerHTML = html;
    document.getElementById('ld').classList.remove('show');
    document.getElementById('fs').classList.remove('hide');
  }, 400);
}

function renderQuestion(c, text) {
  document.getElementById('ld').classList.remove('show');
  let h = `
    <div class="res-block">
      <div class="res-query">${text}</div>
      <div class="followup-wrap">
        <div class="followup-q">${c.q}</div>
        <div class="followup-opts">
          ${c.opts.map(o => `<button class="followup-opt" onclick="answer('${btoa(unescape(encodeURIComponent(text)))}', '${btoa(o.append)}', '${c.id}')">${o.label}</button>`).join('')}
        </div>
      </div>
    </div>`;
  document.getElementById('rs').innerHTML = h;
}

window.answer = function(t, a, id) {
  let combined = decodeURIComponent(escape(atob(t))) + " " + atob(a);
  document.getElementById('mi').value = combined;
  go(combined, id);
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('db').addEventListener('click', () => go(document.getElementById('mi').value));
  document.getElementById('ca').addEventListener('click', () => location.reload());
  document.getElementById('eb').addEventListener('click', () => {
      document.getElementById('iw').classList.remove('hide');
      document.getElementById('fs').classList.add('hide');
      document.getElementById('rs').innerHTML = '';
  });
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.matchMedia('(display-mode: standalone)').matches) {
      const iosPrompt = document.getElementById('ios-prompt');
      if (iosPrompt) iosPrompt.classList.remove('hide');
  }
});

// Cache Killer
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
}
