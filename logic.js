// logic.js - The 3-Gate Audit Engine
function auditSituation(userInput) {
  const input = userInput.toLowerCase();

  // GATE 1: GRAVITY CHECK (Gross Misconduct)
  const isRedZone = hhfHandbook.red_zone.some(offense => input.includes(offense));
  if (isRedZone) {
    return {
      status: "RED ZONE (Gross Misconduct)",
      verdict: "Safety or ethics violation detected. Under Section 2.18, HHF can bypass the coaching ladder and terminate immediately.",
      action: "Take this seriously. In these cases, a verbal warning is considered lenient."
    };
  }

  // GATE 2: VERACITY CHECK (Ghost Rules)
  // Check Appearance
  if (input.includes("shirt") || input.includes("color") || input.includes("scrubs") || input.includes("pants")) {
    const isProhibited = hhfHandbook.anchors.appearance.prohibited.some(p => input.includes(p));
    const isSilent = hhfHandbook.anchors.appearance.silent.some(s => input.includes(s));

    if (isSilent && !isProhibited) {
      return {
        status: "GHOST RULE DETECTED",
        verdict: "Section 2.16 does NOT restrict this specific color, brand, or accessory. This is a personal preference, not HHF policy.",
        script: "Ask: 'Could you show me the section in the 2025-2027 Handbook that restricts this so I can stay in compliance?'"
      };
    }
  }
  
  // Check Devices
  if (input.includes("ipad") || input.includes("phone") || input.includes("tablet")) {
    const isClinical = hhfHandbook.anchors.devices.protected_use.some(u => input.includes(u)) || input.includes("timer") || input.includes("data");
    if (isClinical) {
      return {
        status: "CLINICAL EXCEPTION",
        verdict: "Section 6.5 protects device use for 'direct patient care.' If you were using it for data or a timer, you are protected.",
        script: "Ask: 'I am using this for direct patient care as allowed by Section 6.5. Is there a new policy for clinical devices?'"
      };
    }
  }

  // GATE 3: PROCEDURAL CHECK (The Ladder)
  if (input.includes("write up") || input.includes("written") || input.includes("final")) {
    return {
      status: "PROCEDURAL AUDIT",
      verdict: "For performance issues, Section 2.18 requires Step 1 (Verbal Coaching) before a Step 2 (Written Guidance).",
      action: "If you didn't receive a supportive coaching session first, the supervisor skipped a mandatory step."
    };
  }

  return { 
    status: "HANDBOOK ANALYSIS", 
    verdict: "Situation analyzed. Please ensure you are following all safety and HIPAA guidelines.",
    action: "Document the conversation and remain professional."
  };
}
