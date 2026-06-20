#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('[verify] ERRO: dist/index.html ausente — execute npm run build');
  process.exit(1);
}

const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const badRefs = html.match(/assets\/[^"')\s]+\.(?:jpe?g|png|gif)(?!\.webp)/gi) || [];

const assetsDir = path.join(DIST, 'assets');
const raster = fs.readdirSync(assetsDir).filter(function (f) {
  return /\.(jpe?g|png|gif)$/i.test(f);
});

if (raster.length || badRefs.length) {
  console.error('[verify] ERRO: imagens não-webp detectadas');
  raster.forEach(function (f) { console.error('  ' + f); });
  badRefs.forEach(function (r) { console.error('  ref: ' + r); });
  process.exit(1);
}

console.log('[verify] Site pronto para deploy em dist/');
