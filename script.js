// ==========================================
// script.js - Arbiter v5.0 Hybrid Engine
// ==========================================

const SYNONYMS = {
  "sleep": ["doze", "nap", "pass out", "snooze", "nod", "dozed"],
  "neglect": ["ignore", "left alone", "unsupervised"],
  "denied PTO": ["refused time off", "vacation denied", "denied my request", "denied friday", "denied day"],
  "photo of client": ["picture", "snapchat", "video", "recording", "camera", "snap"],
  "breakroom": ["lounge", "kitchen", "staff room", "staff area"],
  "unpaid break": ["my lunch", "off the clock", "my 30 minutes", "meal break"],
  "timer": ["stopwatch", "counting down", "tracking time"],
  "stayed late": ["stayed after", "worked past my shift", "stayed behind"],
  "cleaning": ["chores", "sweeping", "wiping down", "trash", "swept"],
  "texting": ["messaging", "imessage", "sms"],
  "social media": ["tiktok", "instagram", "snapchat", "twitter", "ig", "scrolling", "finsta", "facebook"],
  "ripped": ["torn", "hole", "frayed", "tore"],
  "crocs": ["clog", "slipper"],
  "nails": ["acrylic", "gel", "claw", "manicure", "fake nail", "acrylics"],
  "late": ["tardy", "missed alarm", "oversleep", "traffic", "behind", "running late", "overslept"],
  "home client canceled": ["session cancelled", "client called out", "parent cancelled", "cancellation"]
};

// --- TURBOTAX MENU DATA ---
const MENU_DATA = {
    "Attendance, Leave & Cancellations": [
        { label: "Client canceled & refusing clinic shift", trigger: "home client canceled report to the clinic rather take it unpaid" },
        { label: "Calling out sick after denied PTO", trigger: "denied PTO called out sick" },
        { label: "Gross Misconduct / Job Abandonment", trigger: "sleep neglect hit" }
    ],
    "Time, Pay & Breaks": [
        { label: "Unpaid overtime for clinical notes", trigger: "stayed late finishing notes prior approval" },
        { label: "Working during an unpaid break", trigger: "unpaid break breakroom" },
        { label: "Doing unassigned chores/cleaning", trigger: "cleaning kitchen unassigned" }
    ],
    "Phones, Dress Code & Privacy": [
        { label: "Using phone for clinical reasons (Timer/Data)", trigger: "timer data clinical" },
        { label: "Using phone for personal reasons", trigger: "texting social media" },
        { label: "Dress Code (Color or Brand rules)", trigger: "color brand sneakers" },
        { label: "HIPAA / Taking photos of clients", trigger: "photo of client" }
    ],
    "Discipline & Supervisor Coaching": [
        { label: "Written up with no prior verbal warning", trigger: "first time no warning" },
        { label: "Supervisor watched me work but denied pay", trigger: "watched me didn't stop me" }
    ]
};

function translateInput(text) {
    if (!text) return "";
    let processed = text.toLowerCase();

    // 1. Grammar Normalization
    if (window.nlp) {
        let doc = window.nlp(processed);
        doc.verbs().toPresentTense();
        doc.nouns().toSingular();
        processed = doc.text();
    }

    // 2. Typo Corrector (Fuse.js) runs FIRST
    if (window.Fuse && typeof R !== 'undefined') {
        let allValidWords = new Set();
        R.forEach(r => {
            r.kw.forEach(k => k.split(/\s+/).forEach(w => allValidWords.add(w.toLowerCase())));
            if(r.anti_kw) r.anti_kw.forEach(k => k.split(/\s+/).forEach(w => allValidWords.add(w.toLowerCase())));
        });
        CLARIFICATIONS.forEach(c => c.triggers.forEach(t => allValidWords.add(t.toLowerCase())));
        let dict = Array.from(allValidWords).map(w => ({ word: w }));
        let typoEngine = new Fuse(dict, { keys: ['word'], threshold: 0.3 }); 

        let words = processed.split(/\b/); 
        for (let i = 0; i < words.length; i++) {
            let w = words[i];
            if (w.match(/^[a-z]{4,}$/i)) { 
                if (!allValidWords.has(w)) {
                    let res = typoEngine.search(w);
                    if (res.length > 0) words[i] = res[0].item.word; 
                }
            }
        }
        processed = words.join('');
    }

    // 3. Slang Expansion runs SECOND
    for (const [target, slangs] of Object.entries(SYNONYMS)) {
        slangs.forEach(slang => {
            let escapedSlang = slang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let regex = new RegExp("\\b" + escapedSlang + "\\b", "gi");
            processed = processed.replace(regex, target);
        });
    }
    return processed;
}

function sanitizedText(text) { return (text || "").toLowerCase().trim(); }

// --- FIXED MATH ENGINE ---
function calculateWeights(text, rule) {
  let score = 0;
  const cleanText = sanitizedText(text);
  const words = cleanText.split(/\W+/); 
  const negators = ["not", "didn't", "wasn't", "never", "no", "without"];

  if (rule.anti_kw && rule.anti_kw.some(akw => cleanText.includes(akw))) {
      return -5000; // Silo Kill-Switch
  }

  let matchedCount = 0;
  rule.kw.forEach(k => {
      if (cleanText.includes(k)) {
          let isNegated = false;
          let kTokens = k.split(" ");
          let idx = words.indexOf(kTokens[0]);

          if (idx > 0) {
              let start = Math.max(0, idx - 3);
              if (words.slice(start, idx).some(w => negators.includes(w))) isNegated = true;
          }

          if (isNegated) score -= 500; 
          else { score += 600; matchedCount++; }
      }
  });

  if (matchedCount === 0) return 0;
  
  // Flattened scoring: No more +1000 bonuses. Just the rule's natural priority.
  score += (rule.pri || 0);
  return score;
}

function findMatches(text) {
  let results = [];
  R.forEach(r => {
    let weight = calculateWeights(text, r);
    if (weight > 30) results.push({ r: JSON.parse(JSON.stringify(r)), score: weight });
  });
  results.sort((a, b) => b.score - a.score);
  if (results.length > 0 && results[0].r.id === "red_zone") return [results[0]];
  return results.slice(0, 2);
}

// ======================== TURBOTAX UI HANDLERS ========================
function loadTurboTaxCategories() {
    const container = document.getElementById('tt-content');
    container.innerHTML = '';
    Object.keys(MENU_DATA).forEach(category => {
        let btn = document.createElement('button');
        btn.className = 'followup-opt';
        btn.innerText = category;
        btn.onclick = () => loadTurboTaxSub(category);
        container.appendChild(btn);
    });
}

function loadTurboTaxSub(category) {
    const container = document.getElementById('tt-content');
    container.innerHTML = `<p style="color:#aaa; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">${category}</p>`;
    MENU_DATA[category].forEach(item => {
        let btn = document.createElement('button');
        btn.className = 'followup-opt';
        btn.style.background = '#444'; 
        btn.innerText = item.label;
        btn.onclick = () => {
            document.getElementById('tt-wrap').classList.add('hide');
            go(item.trigger, null, true); // Process it as a perfect prompt
        };
        container.appendChild(btn);
    });
}

// ======================== CORE UI ========================
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
    document.getElementById('tt-wrap').classList.add('hide');
    document.getElementById('fs').classList.add('hide');
    document.getElementById('rs').innerHTML = '';
    document.getElementById('mi').focus();
};

function go(text, skipId = null, fromMenu = false) {
  if (!text) return;
  
  const processedText = translateInput(text);
  const clean = sanitizedText(processedText);
  
  document.getElementById('rs').innerHTML = '';
  document.getElementById('ld').classList.add('show');
  document.getElementById('iw').classList.add('hide');
  document.getElementById('tt-wrap').classList.add('hide');

  setTimeout(() => {
    if (!skipId && !fromMenu) {
      let clarification = CLARIFICATIONS.find(c => c.triggers.some(t => clean.includes(t)));
      if (clarification && !clarification.opts.some(o => clean.includes(o.append.toLowerCase()))) {
        renderQuestion(clarification, text); 
        return;
      }
    }

    let matches = findMatches(clean);
    
    // TRIGGER TURBOTAX IF NOTHING FOUND
    if (matches.length === 0) {
        document.getElementById('ld').classList.remove('show');
        document.getElementById('tt-wrap').classList.remove('hide');
        loadTurboTaxCategories();
        return;
    }

    const isLong = text.length > 150;
    let html = `
    <div class="res-block">
        <div class="res-query-wrap">
            <div class="res-query ${isLong ? 'collapsed' : ''}">${fromMenu ? "I selected this topic from the menu." : text}</div>
            ${isLong && !fromMenu ? `<button class="expand-btn" onclick="toggleExpand(this)">Show More</button><br>` : ''}
            <button class="inline-edit-btn" onclick="inlineEdit()">✎ Start Over / Edit</button>
        </div>`;
    
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
