import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const table = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  table[n] = c >>> 0;
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const chunk = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(chunk), 0);
  return Buffer.concat([length, chunk, crc]);
}

function createPNG(width, height, drawPixel) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < width; x++) {
      const idx = rowStart + 1 + x * 4;
      const [r, g, b, a] = drawPixel(x, y, width, height);
      raw[idx] = r;
      raw[idx + 1] = g;
      raw[idx + 2] = b;
      raw[idx + 3] = a;
    }
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = zlib.deflateSync(raw);
  const chunks = [pngChunk('IHDR', ihdr), pngChunk('IDAT', idat), pngChunk('IEND', Buffer.alloc(0))];
  return Buffer.concat([signature, ...chunks]);
}

function drawLogo(x, y, width, height) {
  const bg = [44, 93, 46, 255];
  const cx = width * 0.5;
  const cy = height * 0.46;
  const radius = width * 0.37;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist <= radius) {
    return [207, 245, 124, 255];
  }

  return bg;
}

function drawHeart(x, y, width, height) {
  const background = drawLogo(x, y, width, height);
  const size = Math.min(width, height);
  const cx = width / 2;
  const cy = height * 0.44;
  const rx = size * 0.23;
  const ry = size * 0.22;
  const nx = (x - cx) / rx;
  const ny = (y - cy) / ry;
  const heart = Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * ny * ny * ny;
  if (heart <= 0) {
    return [255, 255, 255, 255];
  }
  return background;
}

function writeIcon(filename, size) {
  const buffer = createPNG(size, size, drawHeart);
  fs.writeFileSync(filename, buffer);
  console.log(`Wrote ${filename}`);
}

writeIcon('public/favicon-96x96.png', 96);
writeIcon('public/apple-touch-icon.png', 180);
