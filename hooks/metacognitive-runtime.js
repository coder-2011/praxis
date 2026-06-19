const isCopilot = Boolean(process.env.COPILOT_PLUGIN_DATA);
const isCodex = !isCopilot && Boolean(process.env.PLUGIN_DATA);

function readHookInput(callback) {
  let input = '';
  process.stdin.on('data', (chunk) => { input += chunk; });
  process.stdin.on('end', () => {
    if (!input.trim()) {
      callback({});
      return;
    }
    try {
      callback(JSON.parse(input.replace(/^\uFEFF/, '')));
    } catch {
      callback({});
    }
  });
}

function writeHookOutput(event, context) {
  if (isCopilot) {
    process.stdout.write(JSON.stringify(
      event === 'SessionStart' && context ? { additionalContext: context } : {},
    ));
    return;
  }

  if (isCodex) {
    const output = { systemMessage: 'METACOGNITIVE_CODING' };
    if (context) {
      output.hookSpecificOutput = {
        hookEventName: event,
        additionalContext: context,
      };
    }
    process.stdout.write(JSON.stringify(output));
    return;
  }

  process.stdout.write(context || '');
}

function writeNothing() {
  process.stdout.write('');
}

function toolNameFromPayload(data) {
  return String(
    data.tool_name ||
    data.toolName ||
    data.tool ||
    data.name ||
    data.invocation?.toolName ||
    '',
  );
}

function commandFromPayload(data) {
  return String(
    data.tool_input?.command ||
    data.tool_input?.cmd ||
    data.input?.command ||
    data.input?.cmd ||
    data.arguments?.command ||
    data.arguments?.cmd ||
    data.command ||
    data.cmd ||
    '',
  );
}

const WRITE_TOOL_RE = /(Write|Edit|MultiEdit|NotebookEdit|Delete|Remove|apply_patch)/i;
const SHELL_TOOL_RE = /(Bash|Shell|exec_command|write_stdin)/i;
const WRITE_COMMAND_RE = /\b(apply_patch|rm|rmdir|mv|cp|mkdir|touch|chmod|chown|tee|git\s+(add|commit|push|rm|mv|reset|clean|checkout)|sed\s+-i|perl\s+-pi|npm\s+install|npm\s+i|bun\s+add|pnpm\s+add|yarn\s+add)\b|>\s*[^&|]|>>\s*[^&|]/i;

function shouldInjectForTool(data) {
  const toolName = toolNameFromPayload(data);
  if (!toolName) return true;
  if (WRITE_TOOL_RE.test(toolName)) return true;
  if (!SHELL_TOOL_RE.test(toolName)) return false;

  const command = commandFromPayload(data);
  return !command || WRITE_COMMAND_RE.test(command);
}

module.exports = {
  commandFromPayload,
  readHookInput,
  shouldInjectForTool,
  toolNameFromPayload,
  writeHookOutput,
  writeNothing,
};
