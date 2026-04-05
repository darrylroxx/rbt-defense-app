// ==========================================
// script.js - Arbiter v3.3 Heuristic + Expand UI
// ==========================================

function sanitizedText(text) { return (text || "").toLowerCase().trim(); }

// The advanced 3-Gate NLP Engine
function calculateWeights(text, rule) {
  let score = 0;
  const cleanText = sanitizedText(text);
  const words = cleanText.split(/\W+/); 
  const negators = ["not", "didn't", "wasn't", "never", "no", "without"];

  if (rule.anti_kw && rule.anti_kw.some(akw => cleanText.includes(akw))) {
      return -5000; 
  }

  let matchedCount = 0;
  rule.kw.forEach(k => {
      if (cleanText.includes(k)) {
          let isNegated = false;
          let kTokens = k.split(" ");
          let firstWordOfK = kTokens[0];
          let idx = words.indexOf(firstWordOfK);

          if (idx > 0) {
              let start = Math.max(0, idx - 3);
              let contextWindow = words.slice(start, idx);
              if (contextWindow.some(w => negators.includes(w))) {
                  isNegated = true;
              }
          }

          if (isNegated) {
              score -= 500; 
          } else {
              score += 600; 
              matchedCount++;
          }
      }
  });

  if (matchedCount === 0) return 0;

  if (rule.id === "red_zone") score += 2000; 
  if (rule.id === "ghost_rule_dress" || rule.id === "dress_violation") score += 900;
  if (rule.id === "device_personal" || rule.id === "device_clinical") score += 900;
  if (rule.id === "unassigned_tasks") score += 1000; 
  if (rule.id === "procedural" || rule.id === "harassment") score += 800;
  if (rule.id === "breaks" || rule.id === "attendance_excessive" || rule.id === "attendance_note" || rule.id === "cancellation") score += 700;

  THEMES.SUPERVISOR_WRONG.words.forEach(w => {
    if (cleanText.includes(w)) {
      if (rule.v === "wrong") score += THEMES.SUPERVISOR_WRONG.weight;
      if (rule.v === "correct") score -= THEMES.SUPERVISOR_WRONG.weight;
    }
  });
  THEMES.THERAPIST_WRONG.words.forEach(w => {
    if (cleanText.includes(w)) {
      if (rule.v === "correct") score += THEMES.THERAPIST_WRONG.weight;
      if (rule.v === "wrong") score -= THEMES.THERAPIST_WRONG.weight;
    }
  });

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
  
  results.sort((a, b) => b.score - a.score);
  
  if (results.length > 0 && results[0].r.id === "red_zone") {
      return [results[0]];
  }
  
  return results.slice(0, 2);
}

// ======================== NEW UI HANDLERS ========================
window.toggleExpand = function(btn) {
    const queryDiv = btn.previousElementSibling;
    if (queryDiv.classList.contains('collapsed')) {
        queryDiv.classList.remove('collapsed');
        btn.innerText = "Show Less";
    } else {
        queryDiv.classList.add('collapsed');
        btn.innerText = "Show More";
    }
};

window.inlineEdit = function() {
    document.getElementById('iw').classList.remove('hide');
    document.getElementById('fs').classList.add('hide');
    document.getElementById('rs').innerHTML = '';
    // Optional: auto-focus the text box when they hit edit
    document.getElementById('mi').focus();
};

// ======================== CORE UI ========================
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
    
    // NEW: Check length to trigger the accordion (150 chars is a good visual cutoff)
    const isLong = text.length > 150;
    
    let html = `
    <div class="res-block">
        <div class="res-query-wrap">
            <div class="res-query ${isLong ? 'collapsed' : ''}">${text}</div>
            ${isLong ? `<button class="expand-btn" onclick="toggleExpand(this)">Show More</button><br>` : ''}
            <button class="inline-edit-btn" onclick="inlineEdit()">✎ Edit description</button>
        </div>`;
    
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
    
    html += `</div>`; // Close res-block
    document.getElementById('rs').innerHTML = html;
    document.getElementById('ld').classList.remove('show');
    document.getElementById('fs').classList.remove('hide');
  }, 400);
}

function renderQuestion(c, text) {
  document.getElementById('ld').classList.remove('show');
  
  // Also adding the edit button to the Clarification screen so they aren't trapped
  let h = `
    <div class="res-block">
      <div class="res-query-wrap">
          <div class="res-query">${text}</div>
          <button class="inline-edit-btn" onclick="inlineEdit()">✎ Edit description</button>
      </div>
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
  document.getElementById('eb').addEventListener('click', () => inlineEdit());
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.matchMedia('(display-mode: standalone)').matches) {
      const iosPrompt = document.getElementById('ios-prompt');
      if (iosPrompt) iosPrompt.classList.remove('hide');
  }
});

// Cache Killer
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
}
