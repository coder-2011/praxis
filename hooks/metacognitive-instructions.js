const FILLER_PROMPT = `METACOGNITIVE CODING ACTIVE

RANDOM BULLSHIT PLACEHOLDER.

Replace this filler with the real prompt later. For now, pause before code edits,
avoid assumption autopilot, avoid collateral edits, and do not overbuild.
`;

function getInstructions(reason) {
  return `${FILLER_PROMPT.trim()}\n\nInjection point: ${reason}.`;
}

module.exports = {
  FILLER_PROMPT,
  getInstructions,
};
