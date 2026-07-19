#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const skillPath = path.join(__dirname, '..', 'SKILL.md');

let skillContent;
try {
  skillContent = fs.readFileSync(skillPath, 'utf8');
} catch (err) {
  console.error('Error reading SKILL.md:', err.message);
  process.exit(1);
}

const targets = [
  {
    name: 'Claude Code / OpenCode / Vercel Skills',
    dir: '.skills',
    file: 'slow-and-steady.md'
  },
  {
    name: 'Cursor',
    dir: '.cursor/rules',
    file: 'slow-and-steady.mdc'
  },
  {
    name: 'Claude Code (Native)',
    dir: '.claudecode/skills',
    file: 'slow-and-steady.md'
  },
  {
    name: 'OpenCode (Native)',
    dir: '.opencode/skills',
    file: 'slow-and-steady.md'
  }
];

console.log('Installing slow-and-steady skill...\n');

let installedCount = 0;

targets.forEach(target => {
  const targetDir = path.join(cwd, target.dir);
  const targetPath = path.join(targetDir, target.file);

  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(targetPath, skillContent);
    console.log(`✅ Installed for ${target.name} -> ${target.dir}/${target.file}`);
    installedCount++;
  } catch (error) {
    console.error(`❌ Failed to install for ${target.name}:`, error.message);
  }
});

if (installedCount > 0) {
  console.log('\n✨ Skill successfully installed! Your AI agent will now use the slow-and-steady methodology.');
} else {
  console.error('\nFailed to install the skill to any target directory.');
}
