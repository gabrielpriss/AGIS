#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS = path.join(__dirname, '..', 'assets');
const TARGET = 900;
const QUALITY = 92;

const mapping = [
  { src: 'file1.png', out: 'galeria-mosaic-01.webp', label: 'Fachada' },
  { src: 'file3.png', out: 'galeria-mosaic-02.webp', label: 'Equipamento' },
  { src: 'file8.png', out: 'galeria-mosaic-03.webp', label: 'Pontiac GTO' },
  { src: 'file2.png', out: 'galeria-mosaic-04.webp', label: 'Audi R8' },
  { src: 'file5.png', out: 'galeria-mosaic-05.webp', label: 'Esportivo vermelho' },
  { src: 'file4.png', out: 'galeria-mosaic-06.webp', label: 'Rolls-Royce' },
  { src: 'file6.png', out: 'galeria-mosaic-07.webp', label: 'Audi RS Q3' },
  { src: 'file9.png', out: 'galeria-mosaic-08.webp', label: 'Porsche' },
  { src: 'file7.png', out: 'galeria-mosaic-09.webp', label: 'Estrutura AGIS Pneus' },
];

async function convertOne({ src, out, label }) {
  const input = path.join(ASSETS, src);
  const output = path.join(ASSETS, out);
  if (!fs.existsSync(input)) {
    console.error('Ausente:', src);
    return;
  }
  const meta = await sharp(input).metadata();
  const scale = TARGET / Math.max(meta.width, meta.height);
  const width = Math.round(meta.width * scale);
  const height = Math.round(meta.height * scale);

  await sharp(input)
    .resize(width, height, { kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(output);

  const size = fs.statSync(output).size;
  console.log(`✓ ${out} (${meta.width}x${meta.height} → ${width}x${height}, ${size} bytes) — ${label}`);
}

(async function main() {
  for (const item of mapping) {
    await convertOne(item);
  }

  const logoSrc = path.join(ASSETS, 'logo.webp');
  const logoOut = path.join(ASSETS, 'logo-prata.webp');
  if (!fs.existsSync(logoOut) && fs.existsSync(logoSrc)) {
    const meta = await sharp(logoSrc).metadata();
    const logoWidth = Math.round(meta.width * (560 / meta.height));
    await sharp(logoSrc)
      .resize(logoWidth, 560, { kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
      .webp({ quality: 95, effort: 6 })
      .toFile(logoOut);
    console.log(`✓ logo-prata.webp (${logoWidth}x560)`);
  }
})().catch(function (err) {
  console.error(err);
  process.exit(1);
});
