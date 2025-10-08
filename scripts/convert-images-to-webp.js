const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(process.cwd(), 'public', 'images', 'team');
const outDir = srcDir; // overwrite in place with .webp alongside originals

if (!fs.existsSync(srcDir)) {
  console.error('Source directory does not exist:', srcDir);
  process.exit(1);
}

const exts = ['.jpg', '.jpeg', '.png'];

(async () => {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!exts.includes(ext)) continue;

    const input = path.join(srcDir, file);
    const name = path.basename(file, ext);
    const out = path.join(outDir, `${name}.webp`);

    try {
      await sharp(input)
        .resize({ width: 1200 })
        .webp({ quality: 80 })
        .toFile(out);
      console.log('Created', out);
    } catch (err) {
      console.error('Error converting', input, err);
    }
  }
})();
