function auditSituation(userInput) {
  const input = userInput.toLowerCase();
  if (hhfHandbook.red_zone.some(offense => input.includes(offense))) {
    return { status: "RED ZONE", verdict: "Gross Misconduct detected. Section 2.18 allows immediate termination.", action: "Accept feedback; safety violations bypass the coaching ladder." };
  }
  if (input.includes("shirt") || input.includes("color") || input.includes("scrubs") || input.includes("pants")) {
    const isProhibited = hhfHandbook.anchors.appearance.prohibited.some(p => input.includes(p));
    const isSilent = hhfHandbook.anchors.appearance.silent.some(s => input.includes(s));
    if (isSilent && !isProhibited) {
      return { status: "GHOST RULE", verdict: "Section 2.16 does NOT restrict this color or brand.", script: "Ask for the specific handbook section number." };
    }
  }
  if (input.includes("write up") || input.includes("written")) {
    return { status: "PROCEDURAL AUDIT", verdict: "Section 2.18 requires Verbal Coaching before Written Guidance.", action: "Check if Step 1 was skipped." };
  }
  return { status: "ANALYSIS COMPLETE", verdict: "Review HHF Handbook 2025-2027 for specific compliance.", action: "Document the interaction." };
}
