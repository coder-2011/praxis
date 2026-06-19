#!/usr/bin/env node

const { getInstructions } = require('./metacognitive-instructions');
const { writeHookOutput } = require('./metacognitive-runtime');

writeHookOutput('UserPromptSubmit', getInstructions('user prompt'));
