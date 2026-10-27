// ============================================================
// 🖼️ PLACEHOLDER IMAGE GENERATOR
// Creates soft pastel dummy images so the site renders immediately.
// Run it again any time with:  node scripts/generate-placeholders.mjs
// You do NOT need this script once you add your own real screenshots.
// ============================================================

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, "..", "public");

/* ---------------- PNG encoder ---------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i += 1) {
    c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function encodePng(width, height, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------------- Tiny drawing helpers ---------------- */

function hex(value) {
  const clean = value.replace("#", "");
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
  ];
}

function mix(a, b, t) {
  const amount = Math.max(0, Math.min(1, t));
  return [
    Math.round(a[0] + (b[0] - a[0]) * amount),
    Math.round(a[1] + (b[1] - a[1]) * amount),
    Math.round(a[2] + (b[2] - a[2]) * amount),
  ];
}

class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = Buffer.alloc(width * height * 4, 255);
  }

  set(x, y, [r, g, b], alpha = 1) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const index = (y * this.width + x) * 4;
    const a = Math.max(0, Math.min(1, alpha));
    this.data[index] = Math.round(this.data[index] * (1 - a) + r * a);
    this.data[index + 1] = Math.round(this.data[index + 1] * (1 - a) + g * a);
    this.data[index + 2] = Math.round(this.data[index + 2] * (1 - a) + b * a);
    this.data[index + 3] = 255;
  }

  gradient(from, to, angle = 0) {
    const a = hex(from);
    const b = hex(to);
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const t = ((x / this.width) * dx + (y / this.height) * dy + 1) / 2;
        this.set(x, y, mix(a, b, t));
      }
    }
  }

  softCircle(cx, cy, radius, color, strength = 0.5) {
    const rgb = hex(color);
    for (let y = Math.floor(cy - radius); y <= cy + radius; y += 1) {
      for (let x = Math.floor(cx - radius); x <= cx + radius; x += 1) {
        const distance = Math.hypot(x - cx, y - cy);
        if (distance > radius) continue;
        const falloff = Math.pow(1 - distance / radius, 2);
        this.set(x, y, rgb, falloff * strength);
      }
    }
  }

  roundRect(x0, y0, w, h, radius, color, alpha = 1) {
    const rgb = hex(color);
    for (let y = Math.floor(y0); y < y0 + h; y += 1) {
      for (let x = Math.floor(x0); x < x0 + w; x += 1) {
        const dx = Math.min(x - x0, x0 + w - 1 - x);
        const dy = Math.min(y - y0, y0 + h - 1 - y);
        if (dx < radius && dy < radius) {
          const distance = Math.hypot(radius - dx, radius - dy);
          if (distance > radius) continue;
        }
        this.set(x, y, rgb, alpha);
      }
    }
  }

  ring(cx, cy, radius, thickness, color, alpha = 1) {
    const rgb = hex(color);
    for (let y = Math.floor(cy - radius - thickness); y <= cy + radius + thickness; y += 1) {
      for (let x = Math.floor(cx - radius - thickness); x <= cx + radius + thickness; x += 1) {
        const distance = Math.hypot(x - cx, y - cy);
        if (distance > radius + thickness || distance < radius - thickness) continue;
        this.set(x, y, rgb, alpha);
      }
    }
  }

  toPng() {
    return encodePng(this.width, this.height, this.data);
  }
}

/* ---------------- Image recipes ---------------- */

function projectImage(seed) {
  const palettes = [
    ["#F7D9E3", "#E6E0F8"],
    ["#E6E0F8", "#F5EFE6"],
    ["#F5EFE6", "#F7D9E3"],
    ["#FFFBF7", "#E6E0F8"],
    ["#F7D9E3", "#FFFBF7"],
    ["#E6E0F8", "#F7D9E3"],
  ];
  const [from, to] = palettes[seed % palettes.length];
  const canvas = new Canvas(800, 600);

  canvas.gradient(from, to, 35);
  canvas.softCircle(120 + seed * 40, 110, 200, "#FFFFFF", 0.5);
  canvas.softCircle(680 - seed * 30, 500, 220, "#C9BEEA", 0.35);

  // dashboard panel
  canvas.roundRect(70, 150, 660, 380, 26, "#FFFFFF", 0.72);

  // bars
  const bars = [0.42, 0.66, 0.34, 0.8, 0.55, 0.72, 0.48, 0.62];
  const barWidth = 46;
  bars.forEach((value, index) => {
    const height = Math.round(240 * value);
    const x = 110 + index * (barWidth + 22);
    const y = 480 - height;
    const color = index % 2 === 0 ? "#E8A0B4" : "#C9BEEA";
    canvas.roundRect(x, y, barWidth, height, 12, color, 0.95);
  });

  // header line + dots
  canvas.roundRect(110, 190, 220, 18, 9, "#EADFE8", 0.95);
  canvas.roundRect(110, 224, 130, 12, 6, "#EADFE8", 0.7);
  [0, 1, 2].forEach((dot) => {
    canvas.softCircle(620 - dot * 40, 200, 14, dot === 0 ? "#C97A93" : "#C9BEEA", 1);
  });

  // baseline
  canvas.roundRect(100, 482, 600, 4, 2, "#EADFE8", 0.9);

  return canvas.toPng();
}

function certificateImage(seed) {
  const canvas = new Canvas(800, 450);
  canvas.gradient("#FFFBF7", "#F7D9E3", 20);
  canvas.softCircle(140, 90, 200, "#E6E0F8", 0.5);
  canvas.softCircle(700, 400, 220, "#F5EFE6", 0.7);

  canvas.roundRect(60, 50, 680, 350, 24, "#FFFFFF", 0.85);
  canvas.ring(400, 225, 330, 2, "#E8A0B4", 0.55);

  // title + text lines
  canvas.roundRect(150, 120, 500, 26, 13, "#C97A93", 0.75);
  canvas.roundRect(220, 168, 360, 14, 7, "#8A7C8E", 0.35);
  canvas.roundRect(180, 200, 440, 12, 6, "#8A7C8E", 0.25);
  canvas.roundRect(240, 226, 320, 12, 6, "#8A7C8E", 0.25);

  // seal
  canvas.softCircle(400, 320, 52, seed % 2 === 0 ? "#C9BEEA" : "#E8A0B4", 0.9);
  canvas.softCircle(400, 320, 30, "#FFFFFF", 0.8);
  canvas.softCircle(400, 320, 16, "#C97A93", 0.7);

  return canvas.toPng();
}

function portraitImage() {
  const canvas = new Canvas(600, 600);
  canvas.gradient("#F7D9E3", "#E6E0F8", 40);
  canvas.softCircle(180, 150, 260, "#FFFFFF", 0.6);
  canvas.softCircle(430, 470, 240, "#C9BEEA", 0.4);

  // shoulders
  canvas.softCircle(300, 640, 240, "#E8A0B4", 0.9);
  // head
  canvas.softCircle(300, 270, 130, "#FFFFFF", 0.95);
  canvas.softCircle(300, 250, 118, "#F5EFE6", 1);
  // hair
  canvas.ring(300, 250, 120, 34, "#C97A93", 0.55);

  return canvas.toPng();
}

function coverImage() {
  const canvas = new Canvas(1200, 400);
  canvas.gradient("#E6E0F8", "#F7D9E3", 15);
  canvas.softCircle(200, 80, 260, "#FFFFFF", 0.55);
  canvas.softCircle(950, 330, 300, "#C9BEEA", 0.45);
  canvas.softCircle(620, 200, 220, "#FFFBF7", 0.5);

  for (let i = 0; i < 7; i += 1) {
    canvas.ring(120 + i * 160, 200, 60 + (i % 3) * 22, 2, "#FFFFFF", 0.35);
  }

  return canvas.toPng();
}

/* ---------------- Minimal valid PDF (placeholder resume) ---------------- */

function buildPdf(title, lines) {
  const parts = [
    `BT /F1 22 Tf 60 780 Td (${title}) Tj ET`,
    `BT /F1 10 Tf 60 756 Td (Placeholder file - replace me with your real resume) Tj ET`,
    ...lines.map((line, index) => `BT /F1 12 Tf 60 ${712 - index * 24} Td (${line}) Tj ET`),
  ];
  const content = `${parts.join("\n")}\n`;

  const bodies = [
    "<</Type/Catalog/Pages 2 0 R>>",
    "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>",
    `<</Length ${Buffer.byteLength(content, "latin1")}>>\nstream\n${content}endstream`,
    "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];

  bodies.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const startxref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${bodies.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<</Size ${bodies.length + 1}/Root 1 0 R>>\nstartxref\n${startxref}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}

/* ---------------- Minimal baseline JPEG encoder ---------------- */
// Used to create the placeholder portrait at public/DSC00456.jpg.
// Replace that file with your real photo — you never need this encoder again.

const ZIGZAG = [
  0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20,
  13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59,
  52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63,
];

const LUMA_QUANT = [
  16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56,
  14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113,
  92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99,
];

const CHROMA_QUANT = [
  17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99,
  47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
  99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
];

const DC_BITS = [0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
const DC_VALS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const AC_BITS = [0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 0x7d];
const AC_VALS = [
  0x01, 0x02, 0x03, 0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61, 0x07,
  0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08, 0x23, 0x42, 0xb1, 0xc1, 0x15, 0x52, 0xd1, 0xf0,
  0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0a, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28,
  0x29, 0x2a, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49,
  0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69,
  0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89,
  0x8a, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7,
  0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9, 0xba, 0xc2, 0xc3, 0xc4, 0xc5,
  0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2,
  0xe3, 0xe4, 0xe5, 0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7, 0xf8,
  0xf9, 0xfa,
];

const COS = Array.from({ length: 8 }, (_, u) =>
  Array.from({ length: 8 }, (_, x) => Math.cos(((2 * x + 1) * u * Math.PI) / 16)),
);

function buildHuffmanTable(bits, values) {
  const table = new Map();
  let code = 0;
  let index = 0;

  for (let length = 1; length <= 16; length += 1) {
    for (let i = 0; i < bits[length - 1]; i += 1) {
      table.set(values[index], { code, length });
      code += 1;
      index += 1;
    }
    code <<= 1;
  }

  return table;
}

const DC_TABLE = buildHuffmanTable(DC_BITS, DC_VALS);
const AC_TABLE = buildHuffmanTable(AC_BITS, AC_VALS);

class BitWriter {
  constructor() {
    this.bytes = [];
    this.buffer = 0;
    this.count = 0;
  }

  write(code, length) {
    for (let i = length - 1; i >= 0; i -= 1) {
      this.buffer = (this.buffer << 1) | ((code >> i) & 1);
      this.count += 1;

      if (this.count === 8) {
        this.bytes.push(this.buffer & 0xff);
        if ((this.buffer & 0xff) === 0xff) this.bytes.push(0x00);
        this.buffer = 0;
        this.count = 0;
      }
    }
  }

  flush() {
    while (this.count !== 0) this.write(1, 1);
  }
}

function bitLength(value) {
  let length = 0;
  let current = Math.abs(value);
  while (current > 0) {
    current >>= 1;
    length += 1;
  }
  return length;
}

/** Separable 8x8 forward DCT. Input is 64 level-shifted samples. */
function fdct(samples) {
  const temp = new Float64Array(64);
  const out = new Float64Array(64);

  for (let row = 0; row < 8; row += 1) {
    for (let u = 0; u < 8; u += 1) {
      let sum = 0;
      for (let x = 0; x < 8; x += 1) sum += samples[row * 8 + x] * COS[u][x];
      temp[row * 8 + u] = sum * (u === 0 ? Math.SQRT1_2 : 1) * 0.5;
    }
  }

  for (let column = 0; column < 8; column += 1) {
    for (let v = 0; v < 8; v += 1) {
      let sum = 0;
      for (let y = 0; y < 8; y += 1) sum += temp[y * 8 + column] * COS[v][y];
      out[v * 8 + column] = sum * (v === 0 ? Math.SQRT1_2 : 1) * 0.5;
    }
  }

  return out;
}

function encodeBlock(writer, samples, quant, state) {
  const coefficients = fdct(samples);
  const quantized = new Int32Array(64);

  for (let i = 0; i < 64; i += 1) {
    quantized[i] = Math.round(coefficients[i] / quant[i]);
  }

  // DC coefficient (differential)
  const dc = quantized[0];
  const diff = dc - state.dc;
  state.dc = dc;

  const dcSize = bitLength(diff);
  const dcCode = DC_TABLE.get(dcSize);
  if (!dcCode) throw new Error(`Missing DC Huffman code for category ${dcSize}`);
  writer.write(dcCode.code, dcCode.length);
  if (dcSize > 0) {
    writer.write(diff < 0 ? diff - 1 : diff, dcSize);
  }

  // AC coefficients (run-length + EOB)
  let run = 0;
  for (let k = 1; k < 64; k += 1) {
    const value = quantized[ZIGZAG[k]];

    if (value === 0) {
      run += 1;
      continue;
    }

    while (run > 15) {
      const zrl = AC_TABLE.get(0xf0);
      writer.write(zrl.code, zrl.length);
      run -= 16;
    }

    const size = bitLength(value);
    const symbol = (run << 4) | size;
    const acCode = AC_TABLE.get(symbol);
    if (!acCode) throw new Error(`Missing AC Huffman code for symbol 0x${symbol.toString(16)}`);
    writer.write(acCode.code, acCode.length);
    writer.write(value < 0 ? value - 1 : value, size);
    run = 0;
  }

  if (run > 0) {
    const eob = AC_TABLE.get(0x00);
    writer.write(eob.code, eob.length);
  }
}

function segment(marker, payload) {
  const length = payload.length + 2;
  return Buffer.from([0xff, marker, (length >> 8) & 0xff, length & 0xff, ...payload]);
}

/** Encodes a 4:4:4 baseline JPEG from a `(x, y) => [r, g, b]` function. */
function encodeJpeg(width, height, pixelAt) {
  if (width % 8 !== 0 || height % 8 !== 0) {
    throw new Error("encodeJpeg needs width and height to be multiples of 8");
  }

  const pixels = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = pixelAt(x, y);
      const index = (y * width + x) * 3;
      pixels[index] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
    }
  }

  const writer = new BitWriter();
  const blocksX = width / 8;
  const blocksY = height / 8;

  // A single quantisation table is used for every component, and a single pair
  // of Huffman tables — valid baseline JPEG, just slightly larger files.
  const yState = { dc: 0 };
  const cbState = { dc: 0 };
  const crState = { dc: 0 };

  const ySamples = new Float64Array(64);
  const cbSamples = new Float64Array(64);
  const crSamples = new Float64Array(64);

  for (let by = 0; by < blocksY; by += 1) {
    for (let bx = 0; bx < blocksX; bx += 1) {
      for (let row = 0; row < 8; row += 1) {
        for (let column = 0; column < 8; column += 1) {
          const x = bx * 8 + column;
          const y = by * 8 + row;
          const index = (y * width + x) * 3;

          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];

          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          const blue = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
          const red = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

          const offset = row * 8 + column;
          ySamples[offset] = luminance - 128;
          cbSamples[offset] = blue - 128;
          crSamples[offset] = red - 128;
        }
      }

      encodeBlock(writer, ySamples, LUMA_QUANT, yState);
      encodeBlock(writer, cbSamples, CHROMA_QUANT, cbState);
      encodeBlock(writer, crSamples, CHROMA_QUANT, crState);
    }
  }

  writer.flush();

  const header = Buffer.from([0xff, 0xd8]);

  const app0 = segment(0xe0, [
    0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
  ]);

  const dqt = segment(0xdb, [
    0x00,
    ...ZIGZAG.map((index) => LUMA_QUANT[index]),
  ]);

  const sof0 = segment(0xc0, [
    0x08,
    (height >> 8) & 0xff,
    height & 0xff,
    (width >> 8) & 0xff,
    width & 0xff,
    0x03,
    0x01,
    0x11,
    0x00,
    0x02,
    0x11,
    0x00,
    0x03,
    0x11,
    0x00,
  ]);

  const dhtDc = segment(0xc4, [0x00, ...DC_BITS, ...DC_VALS]);
  const dhtAc = segment(0xc4, [0x10, ...AC_BITS, ...AC_VALS]);

  const sos = segment(0xda, [0x03, 0x01, 0x00, 0x02, 0x00, 0x03, 0x00, 0x00, 0x3f, 0x00]);

  const eoi = Buffer.from([0xff, 0xd9]);

  return Buffer.concat([
    header,
    app0,
    dqt,
    sof0,
    dhtDc,
    dhtAc,
    sos,
    Buffer.from(writer.bytes),
    eoi,
  ]);
}

/* ---------------- Placeholder profile photo (JPEG) ---------------- */

/**
 * Soft pastel gradient used as the placeholder for public/DSC00456.jpg.
 * Replace that file with your real photo of the same name.
 */
function portraitPhotoPlaceholder() {
  const size = 512;
  const blush = [247, 217, 227];
  const lavender = [230, 224, 248];
  const cream = [255, 251, 247];
  const rose = [232, 160, 180];

  return encodeJpeg(size, size, (x, y) => {
    const t = (x / size) * 0.5 + (y / size) * 0.5;
    let color = mix(blush, lavender, t);

    // soft central glow
    const distance = Math.hypot(x - size * 0.5, y - size * 0.42) / (size * 0.62);
    if (distance < 1) color = mix(color, cream, Math.pow(1 - distance, 2) * 0.85);

    // gentle rose edge
    const edge = Math.hypot(x - size * 0.86, y - size * 0.9) / (size * 0.7);
    if (edge < 1) color = mix(color, rose, Math.pow(1 - edge, 2) * 0.5);

    return color;
  });
}

/* ---------------- Write files ---------------- */

function write(relativePath, buffer) {
  const fullPath = join(publicDir, relativePath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, buffer);
  console.log(`created public/${relativePath} (${buffer.length} bytes)`);
}

write("img/portrait.png", portraitImage());
write("img/cover.png", coverImage());

// Placeholder for the profile photo used by the About section.
// Replace public/DSC00456.jpg with your real photo (same file name).
write("DSC00456.jpg", portraitPhotoPlaceholder());

for (let index = 1; index <= 6; index += 1) {
  write(`img/projects/dummy-${index}.png`, projectImage(index));
}

for (let index = 1; index <= 5; index += 1) {
  write(`img/certificate/dummy-${index}.png`, certificateImage(index));
}

write(
  "pdf/resume-en.pdf",
  buildPdf("Maurel Chairinniswah Yasmine", [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  ]),
);

write(
  "pdf/resume-id.pdf",
  buildPdf("Maurel Chairinniswah Yasmine", [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  ]),
);

console.log("Done. Replace these files with your real screenshots any time.");
