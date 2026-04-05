// ======================== THE BRAIN ========================
function sanitizedText(text) { return (text || "").toLowerCase().trim(); }

function calculateWeights(text, rule) {
  let score = 0;
  
  // 1. Keyword Strength
  rule.kw.forEach(k => {
    let regex = new RegExp("\\b" + k + "\\b", "i");
    if (regex.test(text)) {
      // Negation check: Look for "not", "never", "didn't" before the word
      let words = text.split(/\s+/);
      let idx = words.findIndex(w => w.includes(k));
      let context = words.slice(Math.max(0, idx - 3), idx).join(" ");
      if (/\b(not|never|didn't|wasn't|no)\b/.test(context)) {
        score -= 50; // Negation found, flip the weight
      } else {
        score += 30;
      }
    }
  });

  // 2. Thematic Weighting
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

  score += (rule.pri || 0);
  return score;
}

function findMatches(text) {
  let results = [];
  R.forEach(r => {
    let weight = calculateWeights(text, r);
    if (weight > 20) {
      let ruleCopy = JSON.parse(JSON.stringify(r));
      // Special logic: Auto-flip attendance to "Wrong" if a note is mentioned
      if (r.id === "attendance" && text.includes("note")) ruleCopy.v = "wrong";
      results.push({ r: ruleCopy, score: weight });
    }
  });
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 3);
}

// ======================== UI & INTERACTION ========================
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
      html += `<div class="crd v-grey" style="padding:20px; color:#aaa; text-align:center;">No clear handbook matches. Try adding more detail.</div>`;
    } else {
      matches.forEach(m => {
        const r = m.r;
        const typeCls = r.v === "wrong" ? "v-wrong" : r.v === "correct" ? "v-correct" : "v-grey";
        const badgeCls = r.v === "wrong" ? "wrong" : r.v === "correct" ? "correct" : "grey";
        const badgeLabel = r.v === "wrong" ? "SUPERVISOR ISSUE" : r.v === "correct" ? "YOU VIOLATED POLICY" : "GREY AREA";

        html += `
          <div class="crd">
            <div class="crd-v ${typeCls}">
              <span class="v-badge ${badgeCls}">${badgeLabel}</span>
              <div class="v-text">${r.p}</div>
              <div class="v-section">Section ${r.s} (Page ${r.pg}) - ${r.t}</div>
            </div>
            <div class="blk"><div class="blk-label">Handbook Analysis</div><p>${r.d}</p></div>
            <div class="blk" style="background:rgba(255,255,255,0.02);">
              <div class="blk-label">When this might not apply</div><p>${r.b}</p>
            </div>
          </div>`;
      });
    }
    
    html += `</div>`;
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
});

// KILL CACHE
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
}
