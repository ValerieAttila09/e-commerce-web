const fs = require('fs');
const path = require('path');

// Tentukan sumber dan tujuan
const sourceDir = path.join(__dirname, 'node_modules/.prisma/client');
const targetDir = path.join(__dirname, '.next/server/chunks');

// Buat folder target jika tidak ada
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Cari dan salin semua .so.node files
function copyEngineFiles(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory tidak ditemukan: ${src}`);
    return;
  }

  const files = fs.readdirSync(src);
  
  files.forEach((file) => {
    if (file.includes('libquery_engine') && file.endsWith('.so.node')) {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      
      try {
        fs.copyFileSync(srcFile, destFile);
        console.log(`✓ Tersalin: ${file}`);
      } catch (err) {
        console.error(`✗ Gagal menyalin ${file}:`, err.message);
      }
    }
  });
}

// Jalankan penyalinan
console.log('Menyalin Prisma Query Engine...');
copyEngineFiles(sourceDir, targetDir);

// Juga cek di lokasi alternatif
const altSourceDirs = [
  path.join(__dirname, 'lib/generated/prisma'),
  path.join(__dirname, '.prisma/client'),
];

altSourceDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    copyEngineFiles(dir, targetDir);
  }
});

console.log('Selesai!');
