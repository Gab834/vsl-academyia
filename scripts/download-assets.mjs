import { createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');

const ASSETS = [
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/65a937960b586168e58e78f7_de115537816b69099b829ff1e739615e_ninety-eight-logo-full.avif', dest: 'images/logo.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/69729053c3b359f69e5d749e_mobile-logo.avif', dest: 'images/logo-icon.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bb20e71b45fae3a07fdf2_hero-bg.avif', dest: 'images/hero-bg.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bc25f5d77cd9bfa5aee10_91d4171ae4187547e9f3548f0ab2c945_hero-image-mobile.avif', dest: 'images/hero-image-mobile.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bb06224c75cae74e4babb_9964cfbdf4bcbfd57d69a601f670d8e6_hero-image.avif', dest: 'images/hero-image.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bb94fe383e47ccd95af92_service-01.avif', dest: 'images/service-01.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bb94f8ea21ca6c1b539ca_service-02.avif', dest: 'images/service-02.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bb94f00de062b6fef2b32_service-03.avif', dest: 'images/service-03.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bb94ff363a8a547139da3_service-04.avif', dest: 'images/service-04.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bb94f765d429fef367ca3_service-05.avif', dest: 'images/service-05.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696bbc1d160760949e6d869a_gradient-bg.avif', dest: 'images/gradient-bg.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/67c0384973159999f5c0f1f6_slider-new-01.avif', dest: 'images/slider-01.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/67c03845f44e21ab7d27fb20_slider-new-03.avif', dest: 'images/slider-03.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/67c03845fdacf2e879bc08fd_slider-new-05.avif', dest: 'images/slider-05.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696ea52e69b17e96c03f5762_celebrety-03.avif', dest: 'images/celebrity-03.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/696ea52e7a22df6944669fd0_celebrety-02.avif', dest: 'images/celebrity-02.avif' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/659abf44359714d42aaea8fe_Work-3.webp', dest: 'images/work-3.webp' },
  { url: 'https://cdn.prod.website-files.com/659506d2d8118abd35954730/673317ad9cb60c1559e71db1_Group%201865110013.svg', dest: 'images/tate-logo.svg' },
];

mkdirSync(path.join(PUBLIC, 'images'), { recursive: true });

async function download(url, destRel) {
  const dest = path.join(PUBLIC, destRel);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(res.body, createWriteStream(dest));
    console.log(`✓ ${destRel}`);
  } catch (e) {
    console.error(`✗ ${destRel}: ${e.message}`);
  }
}

// Batch 4 at a time
for (let i = 0; i < ASSETS.length; i += 4) {
  await Promise.all(ASSETS.slice(i, i + 4).map(a => download(a.url, a.dest)));
}

console.log('Done.');
