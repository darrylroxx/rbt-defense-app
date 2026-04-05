// logic.js - The 3-Gate Audit Engine
function auditSituation(userInput) {
  const input = userInput.toLowerCase();

  // GATE 1: GRAVITY CHECK (Gross Misconduct)
  const isRedZone = hhfHandbook.red_zone.some(offense => input.includes(offense));
  if (isRedZone) {
    return {
      status: "RED ZONE",
      verdict: "This is Gross Misconduct. Under Section 2.18, HHF can bypass the ladder and terminate immediately.", [cite: 431-432]
      action: "Accept the feedback immediately. You are at risk of losing your job."
    };
  }

  // GATE 2: VERACITY CHECK (Does the rule exist?)
  // Example for Dress Code
  if (input.includes("shirt") || input.includes("color") || input.includes("scrubs")) {
    const isProhibited = hhfHandbook.anchors.appearance.prohibited.some(p => input.includes(p));
    const isSilent = hhfHandbook.anchors.appearance.silent.some(s => input.includes(s));

    if (isSilent && !isProhibited) {
      return {
        status: "GHOST RULE DETECTED",
        verdict: "Section 2.16 does NOT restrict this specific color or brand. This is a personal preference, not HHF policy.", [cite: 387-403]
        script: "Ask the Lead: 'Can you show me where Section 2.16 restricts this color so I can study it and stay in compliance?'"
      };
    }
  }

  // GATE 3: PROCEDURAL CHECK (The Ladder)
  if (input.includes("write up") || input.includes("written warning")) {
    return {
      status: "PROCEDURAL AUDIT",
      verdict: "Section 2.18 requires Step 1 (Verbal Coaching) before moving to Step 2 (Written Guidance) for minor issues.", [cite: 433-437]
      action: "Check if you received a supportive 'Verbal Coaching' first. If not, this is a procedural violation."
    };
  }

  return { status: "NEUTRAL", verdict: "Situation requires further clinical clarification." };
}
