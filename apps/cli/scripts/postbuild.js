const fs = require('fs');
const filePath = 'dist/bin.js';
let content = fs.readFileSync(filePath, 'utf8');

// Normalisasi CRLF ke LF
content = content.replace(/\r\n/g, '\n');

// Hapus BOM
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.substring(1);
}

// Hapus SEMUA shebang yang mungkin ada (dari tsup atau sisa sebelumnya)
content = content.replace(/^#!\/usr\/bin\/env node\n?/, '');
content = content.replace(/\n#!\/usr\/bin\/env node\n?/g, '\n');

// Suntikkan shebang di baris 1 mutlak
const shebangStr = '#!/usr/bin/env node\n';
content = shebangStr + content;

fs.writeFileSync(filePath, content, 'utf8');
console.log('[postbuild] Shebang successfully pinned to line 1.');