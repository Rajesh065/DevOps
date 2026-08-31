import fs from 'fs';
import path from 'path';

const root = 'C:\\Users\\gopiv\\Desktop\\deveops';
const excludedDirs = ['node_modules', '.git', 'dist', 'build', 'coverage', '.system_generated', 'tests'];
const validExts = ['.ts', '.tsx', '.js', '.jsx', '.py', '.tf', '.rego', '.json', '.yml', '.yaml'];

let totalLines = 0;
let fileCount = 0;
const langStats = {};

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!excludedDirs.includes(entry.name)) {
        scanDir(full);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (validExts.includes(ext) && !entry.name.includes('.test.') && !entry.name.includes('.spec.')) {
        const content = fs.readFileSync(full, 'utf-8');
        const lines = content.split('\n').length;
        totalLines += lines;
        fileCount++;
        langStats[ext] = (langStats[ext] || 0) + lines;
      }
    }
  }
}

scanDir(root);

console.log('======================================================');
console.log(`TOTAL PRODUCTION LOC: ${totalLines.toLocaleString()} across ${fileCount} files`);
console.log('Language Breakdown:');
for (const [ext, count] of Object.entries(langStats)) {
  console.log(`  ${ext.padEnd(8)}: ${count.toLocaleString()} lines`);
}
console.log('======================================================');
