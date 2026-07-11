#!/usr/bin/env node

const { getInstructions } = require('./metacognitive-instructions');
const { writeHookOutput } = require('./metacognitive-runtime');

writeHookOutput(
  'SessionStart',
  `Read AGENTS.md before doing anything\n\n${getInstructions('session start')}`,
);
